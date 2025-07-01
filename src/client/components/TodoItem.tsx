import React from 'react';
import { Todo } from '../../shared/types';

interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: string, updates: { title?: string; completed?: boolean }) => void;
  onDelete: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editTitle, setEditTitle] = React.useState(todo.title);

  const handleSave = () => {
    if (editTitle.trim() !== todo.title) {
      onUpdate(todo.id, { title: editTitle.trim() });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setIsEditing(false);
  };

  const handleToggleComplete = () => {
    onUpdate(todo.id, { completed: !todo.completed });
  };

  return (
    <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggleComplete}
        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
      />
      
      {isEditing ? (
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="flex-1 px-2 py-1 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSave();
              if (e.key === 'Escape') handleCancel();
            }}
            autoFocus
          />
          <button
            onClick={handleSave}
            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-between">
          <span className={`${todo.completed ? 'line-through text-gray-500' : ''}`}>
            {todo.title}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};