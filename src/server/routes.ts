import { Router } from 'express';
import { TodoController } from './todoController';
import { TodoService } from './todoService';

const router = Router();
const todoService = new TodoService();
const todoController = new TodoController(todoService);

router.get('/todos', todoController.getAllTodos);
router.get('/todos/:id', todoController.getTodoById);
router.post('/todos', todoController.createTodo);
router.put('/todos/:id', todoController.updateTodo);
router.delete('/todos/:id', todoController.deleteTodo);

export default router;