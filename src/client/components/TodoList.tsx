import React from 'react';
import { Todo } from '../../shared/types';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onUpdate: (id: string, updates: { title?: string; completed?: boolean }) => void;
  onDelete: (id: string) => void;
}

export const TodoList: React.FC<TodoListProps> = ({ todos, onUpdate, onDelete }) => {
  if (todos.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No todos yet. Add one above!
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};