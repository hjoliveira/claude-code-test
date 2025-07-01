import { describe, it, expect, beforeEach } from 'vitest';
import { TodoService } from './todoService';

describe('TodoService', () => {
  let todoService: TodoService;

  beforeEach(() => {
    todoService = new TodoService();
  });

  describe('createTodo', () => {
    it('should create a new todo', () => {
      const request = { title: 'Test todo' };
      const todo = todoService.createTodo(request);

      expect(todo).toMatchObject({
        id: '1',
        title: 'Test todo',
        completed: false,
      });
      expect(todo.createdAt).toBeInstanceOf(Date);
      expect(todo.updatedAt).toBeInstanceOf(Date);
    });

    it('should assign incremental IDs', () => {
      const todo1 = todoService.createTodo({ title: 'Todo 1' });
      const todo2 = todoService.createTodo({ title: 'Todo 2' });

      expect(todo1.id).toBe('1');
      expect(todo2.id).toBe('2');
    });
  });

  describe('getAllTodos', () => {
    it('should return empty array initially', () => {
      const todos = todoService.getAllTodos();
      expect(todos).toEqual([]);
    });

    it('should return all created todos', () => {
      todoService.createTodo({ title: 'Todo 1' });
      todoService.createTodo({ title: 'Todo 2' });

      const todos = todoService.getAllTodos();
      expect(todos).toHaveLength(2);
      expect(todos[0].title).toBe('Todo 1');
      expect(todos[1].title).toBe('Todo 2');
    });
  });

  describe('getTodoById', () => {
    it('should return undefined for non-existent todo', () => {
      const todo = todoService.getTodoById('999');
      expect(todo).toBeUndefined();
    });

    it('should return the correct todo', () => {
      const created = todoService.createTodo({ title: 'Test todo' });
      const found = todoService.getTodoById(created.id);

      expect(found).toEqual(created);
    });
  });

  describe('updateTodo', () => {
    it('should return null for non-existent todo', () => {
      const result = todoService.updateTodo('999', { title: 'Updated' });
      expect(result).toBeNull();
    });

    it('should update todo title', () => {
      const created = todoService.createTodo({ title: 'Original' });
      const updated = todoService.updateTodo(created.id, { title: 'Updated' });

      expect(updated).toMatchObject({
        id: created.id,
        title: 'Updated',
        completed: false,
      });
      expect(updated!.updatedAt.getTime()).toBeGreaterThanOrEqual(created.createdAt.getTime());
    });

    it('should toggle completion status', () => {
      const created = todoService.createTodo({ title: 'Test' });
      const updated = todoService.updateTodo(created.id, { completed: true });

      expect(updated!.completed).toBe(true);
    });
  });

  describe('deleteTodo', () => {
    it('should return false for non-existent todo', () => {
      const result = todoService.deleteTodo('999');
      expect(result).toBe(false);
    });

    it('should delete existing todo', () => {
      const created = todoService.createTodo({ title: 'Test todo' });
      const deleted = todoService.deleteTodo(created.id);

      expect(deleted).toBe(true);
      expect(todoService.getTodoById(created.id)).toBeUndefined();
      expect(todoService.getAllTodos()).toHaveLength(0);
    });
  });
});