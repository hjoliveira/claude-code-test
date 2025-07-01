import React from 'react';

interface AddTodoFormProps {
  onAdd: (title: string) => void;
}

export const AddTodoForm: React.FC<AddTodoFormProps> = ({ onAdd }) => {
  const [title, setTitle] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim());
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new todo..."
          className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
        >
          Add Todo
        </button>
      </div>
    </form>
  );
};