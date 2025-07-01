import React from 'react';
import { Todo } from '../shared/types';
import { todoApi } from './api';
import { AddTodoForm } from './components/AddTodoForm';
import { TodoList } from './components/TodoList';

function App() {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const loadTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedTodos = await todoApi.getAllTodos();
      setTodos(fetchedTodos);
    } catch (err) {
      setError('Failed to load todos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadTodos();
  }, []);

  const handleAddTodo = async (title: string) => {
    try {
      const newTodo = await todoApi.createTodo({ title });
      setTodos(prev => [...prev, newTodo]);
    } catch (err) {
      setError('Failed to add todo');
      console.error(err);
    }
  };

  const handleUpdateTodo = async (id: string, updates: { title?: string; completed?: boolean }) => {
    try {
      const updatedTodo = await todoApi.updateTodo(id, updates);
      setTodos(prev => prev.map(todo => todo.id === id ? updatedTodo : todo));
    } catch (err) {
      setError('Failed to update todo');
      console.error(err);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await todoApi.deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (err) {
      setError('Failed to delete todo');
      console.error(err);
    }
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Todo List</h1>
          <p className="text-gray-600 mb-6">
            {totalCount === 0 ? 'No todos yet' : `${completedCount} of ${totalCount} completed`}
          </p>

          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <AddTodoForm onAdd={handleAddTodo} />

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading todos...</p>
            </div>
          ) : (
            <TodoList
              todos={todos}
              onUpdate={handleUpdateTodo}
              onDelete={handleDeleteTodo}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;