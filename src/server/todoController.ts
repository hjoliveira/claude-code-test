import { Request, Response } from 'express';
import { TodoService } from './todoService';
import { CreateTodoRequest, UpdateTodoRequest } from '../shared/types';

export class TodoController {
  constructor(private todoService: TodoService) {}

  getAllTodos = (req: Request, res: Response): void => {
    const todos = this.todoService.getAllTodos();
    res.json(todos);
  };

  getTodoById = (req: Request, res: Response): void => {
    const { id } = req.params;
    const todo = this.todoService.getTodoById(id);
    
    if (!todo) {
      res.status(404).json({ error: 'Todo not found' });
      return;
    }
    
    res.json(todo);
  };

  createTodo = (req: Request, res: Response): void => {
    const createRequest: CreateTodoRequest = req.body;
    
    if (!createRequest.title || createRequest.title.trim() === '') {
      res.status(400).json({ error: 'Title is required' });
      return;
    }
    
    const todo = this.todoService.createTodo(createRequest);
    res.status(201).json(todo);
  };

  updateTodo = (req: Request, res: Response): void => {
    const { id } = req.params;
    const updateRequest: UpdateTodoRequest = req.body;
    
    const todo = this.todoService.updateTodo(id, updateRequest);
    
    if (!todo) {
      res.status(404).json({ error: 'Todo not found' });
      return;
    }
    
    res.json(todo);
  };

  deleteTodo = (req: Request, res: Response): void => {
    const { id } = req.params;
    const deleted = this.todoService.deleteTodo(id);
    
    if (!deleted) {
      res.status(404).json({ error: 'Todo not found' });
      return;
    }
    
    res.status(204).send();
  };
}