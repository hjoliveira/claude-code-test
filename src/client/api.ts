import { Todo, CreateTodoRequest, UpdateTodoRequest } from '../shared/types';

const API_BASE = '/api';

export const todoApi = {
  async getAllTodos(): Promise<Todo[]> {
    const response = await fetch(`${API_BASE}/todos`);
    if (!response.ok) {
      throw new Error('Failed to fetch todos');
    }
    const todos = await response.json();
    return todos.map((todo: any) => ({
      ...todo,
      createdAt: new Date(todo.createdAt),
      updatedAt: new Date(todo.updatedAt)
    }));
  },

  async createTodo(request: CreateTodoRequest): Promise<Todo> {
    const response = await fetch(`${API_BASE}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    if (!response.ok) {
      throw new Error('Failed to create todo');
    }
    const todo = await response.json();
    return {
      ...todo,
      createdAt: new Date(todo.createdAt),
      updatedAt: new Date(todo.updatedAt)
    };
  },

  async updateTodo(id: string, request: UpdateTodoRequest): Promise<Todo> {
    const response = await fetch(`${API_BASE}/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    if (!response.ok) {
      throw new Error('Failed to update todo');
    }
    const todo = await response.json();
    return {
      ...todo,
      createdAt: new Date(todo.createdAt),
      updatedAt: new Date(todo.updatedAt)
    };
  },

  async deleteTodo(id: string): Promise<void> {
    const response = await fetch(`${API_BASE}/todos/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete todo');
    }
  },
};