import { Todo, CreateTodoRequest, UpdateTodoRequest } from '../shared/types';

export class TodoService {
  private todos: Todo[] = [];
  private nextId = 1;

  getAllTodos(): Todo[] {
    return this.todos;
  }

  getTodoById(id: string): Todo | undefined {
    return this.todos.find(todo => todo.id === id);
  }

  createTodo(request: CreateTodoRequest): Todo {
    const now = new Date();
    const todo: Todo = {
      id: this.nextId.toString(),
      title: request.title,
      completed: false,
      createdAt: now,
      updatedAt: now
    };
    this.nextId++;
    this.todos.push(todo);
    return todo;
  }

  updateTodo(id: string, request: UpdateTodoRequest): Todo | null {
    const todoIndex = this.todos.findIndex(todo => todo.id === id);
    if (todoIndex === -1) {
      return null;
    }

    const todo = this.todos[todoIndex];
    const updatedTodo: Todo = {
      ...todo,
      ...request,
      updatedAt: new Date()
    };
    this.todos[todoIndex] = updatedTodo;
    return updatedTodo;
  }

  deleteTodo(id: string): boolean {
    const todoIndex = this.todos.findIndex(todo => todo.id === id);
    if (todoIndex === -1) {
      return false;
    }
    this.todos.splice(todoIndex, 1);
    return true;
  }
}