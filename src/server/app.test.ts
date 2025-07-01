import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from './app';

describe('Todo API', () => {
  describe('GET /api/todos', () => {
    it('should return empty array initially', async () => {
      const response = await request(app)
        .get('/api/todos')
        .expect(200);

      expect(response.body).toEqual([]);
    });
  });

  describe('POST /api/todos', () => {
    it('should create a new todo', async () => {
      const newTodo = { title: 'Test todo' };
      
      const response = await request(app)
        .post('/api/todos')
        .send(newTodo)
        .expect(201);

      expect(response.body).toMatchObject({
        id: '1',
        title: 'Test todo',
        completed: false,
      });
      expect(response.body.createdAt).toBeDefined();
      expect(response.body.updatedAt).toBeDefined();
    });

    it('should return 400 for empty title', async () => {
      const response = await request(app)
        .post('/api/todos')
        .send({ title: '' })
        .expect(400);

      expect(response.body.error).toBe('Title is required');
    });

    it('should return 400 for missing title', async () => {
      const response = await request(app)
        .post('/api/todos')
        .send({})
        .expect(400);

      expect(response.body.error).toBe('Title is required');
    });
  });

  describe('GET /api/todos/:id', () => {
    it('should return 404 for non-existent todo', async () => {
      const response = await request(app)
        .get('/api/todos/999')
        .expect(404);

      expect(response.body.error).toBe('Todo not found');
    });

    it('should return the todo by id', async () => {
      // First create a todo
      const createResponse = await request(app)
        .post('/api/todos')
        .send({ title: 'Test todo' });

      const todoId = createResponse.body.id;

      // Then get it by ID
      const response = await request(app)
        .get(`/api/todos/${todoId}`)
        .expect(200);

      expect(response.body.id).toBe(todoId);
      expect(response.body.title).toBe('Test todo');
    });
  });

  describe('PUT /api/todos/:id', () => {
    it('should return 404 for non-existent todo', async () => {
      const response = await request(app)
        .put('/api/todos/999')
        .send({ title: 'Updated' })
        .expect(404);

      expect(response.body.error).toBe('Todo not found');
    });

    it('should update todo title', async () => {
      // Create a todo
      const createResponse = await request(app)
        .post('/api/todos')
        .send({ title: 'Original title' });

      const todoId = createResponse.body.id;

      // Update it
      const response = await request(app)
        .put(`/api/todos/${todoId}`)
        .send({ title: 'Updated title' })
        .expect(200);

      expect(response.body.title).toBe('Updated title');
      expect(response.body.id).toBe(todoId);
    });

    it('should toggle completion status', async () => {
      // Create a todo
      const createResponse = await request(app)
        .post('/api/todos')
        .send({ title: 'Test todo' });

      const todoId = createResponse.body.id;

      // Mark as completed
      const response = await request(app)
        .put(`/api/todos/${todoId}`)
        .send({ completed: true })
        .expect(200);

      expect(response.body.completed).toBe(true);
    });
  });

  describe('DELETE /api/todos/:id', () => {
    it('should return 404 for non-existent todo', async () => {
      const response = await request(app)
        .delete('/api/todos/999')
        .expect(404);

      expect(response.body.error).toBe('Todo not found');
    });

    it('should delete existing todo', async () => {
      // Create a todo
      const createResponse = await request(app)
        .post('/api/todos')
        .send({ title: 'To be deleted' });

      const todoId = createResponse.body.id;

      // Delete it
      await request(app)
        .delete(`/api/todos/${todoId}`)
        .expect(204);

      // Verify it's gone
      await request(app)
        .get(`/api/todos/${todoId}`)
        .expect(404);
    });
  });
});