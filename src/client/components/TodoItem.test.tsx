import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TodoItem } from './TodoItem';
import { Todo } from '../../shared/types';

describe('TodoItem', () => {
  const mockTodo: Todo = {
    id: '1',
    title: 'Test todo',
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockOnUpdate = vi.fn();
  const mockOnDelete = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render todo item', () => {
    render(
      <TodoItem 
        todo={mockTodo} 
        onUpdate={mockOnUpdate} 
        onDelete={mockOnDelete} 
      />
    );

    expect(screen.getByText('Test todo')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('should render completed todo with strikethrough', () => {
    const completedTodo = { ...mockTodo, completed: true };
    render(
      <TodoItem 
        todo={completedTodo} 
        onUpdate={mockOnUpdate} 
        onDelete={mockOnDelete} 
      />
    );

    const todoText = screen.getByText('Test todo');
    expect(todoText).toHaveClass('line-through');
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('should toggle completion when checkbox is clicked', async () => {
    const user = userEvent.setup();
    render(
      <TodoItem 
        todo={mockTodo} 
        onUpdate={mockOnUpdate} 
        onDelete={mockOnDelete} 
      />
    );

    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);

    expect(mockOnUpdate).toHaveBeenCalledWith('1', { completed: true });
  });

  it('should enter edit mode when edit button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <TodoItem 
        todo={mockTodo} 
        onUpdate={mockOnUpdate} 
        onDelete={mockOnDelete} 
      />
    );

    await user.click(screen.getByText('Edit'));

    expect(screen.getByDisplayValue('Test todo')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('should save changes when save button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <TodoItem 
        todo={mockTodo} 
        onUpdate={mockOnUpdate} 
        onDelete={mockOnDelete} 
      />
    );

    await user.click(screen.getByText('Edit'));
    
    const input = screen.getByDisplayValue('Test todo');
    await user.clear(input);
    await user.type(input, 'Updated todo');
    
    await user.click(screen.getByText('Save'));

    expect(mockOnUpdate).toHaveBeenCalledWith('1', { title: 'Updated todo' });
  });

  it('should cancel edit mode when cancel button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <TodoItem 
        todo={mockTodo} 
        onUpdate={mockOnUpdate} 
        onDelete={mockOnDelete} 
      />
    );

    await user.click(screen.getByText('Edit'));
    
    const input = screen.getByDisplayValue('Test todo');
    await user.clear(input);
    await user.type(input, 'Changed text');
    
    await user.click(screen.getByText('Cancel'));

    expect(screen.getByText('Test todo')).toBeInTheDocument();
    expect(mockOnUpdate).not.toHaveBeenCalled();
  });

  it('should call delete when delete button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <TodoItem 
        todo={mockTodo} 
        onUpdate={mockOnUpdate} 
        onDelete={mockOnDelete} 
      />
    );

    await user.click(screen.getByText('Delete'));

    expect(mockOnDelete).toHaveBeenCalledWith('1');
  });

  it('should save on Enter key press', async () => {
    const user = userEvent.setup();
    render(
      <TodoItem 
        todo={mockTodo} 
        onUpdate={mockOnUpdate} 
        onDelete={mockOnDelete} 
      />
    );

    await user.click(screen.getByText('Edit'));
    
    const input = screen.getByDisplayValue('Test todo');
    await user.clear(input);
    await user.type(input, 'Updated todo');
    await user.keyboard('{Enter}');

    expect(mockOnUpdate).toHaveBeenCalledWith('1', { title: 'Updated todo' });
  });

  it('should cancel on Escape key press', async () => {
    const user = userEvent.setup();
    render(
      <TodoItem 
        todo={mockTodo} 
        onUpdate={mockOnUpdate} 
        onDelete={mockOnDelete} 
      />
    );

    await user.click(screen.getByText('Edit'));
    
    const input = screen.getByDisplayValue('Test todo');
    await user.clear(input);
    await user.type(input, 'Changed text');
    await user.keyboard('{Escape}');

    expect(screen.getByText('Test todo')).toBeInTheDocument();
    expect(mockOnUpdate).not.toHaveBeenCalled();
  });
});