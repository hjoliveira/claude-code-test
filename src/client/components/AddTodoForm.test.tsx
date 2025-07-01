import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AddTodoForm } from './AddTodoForm';

describe('AddTodoForm', () => {
  const mockOnAdd = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render form elements', () => {
    render(<AddTodoForm onAdd={mockOnAdd} />);

    expect(screen.getByPlaceholderText('Add a new todo...')).toBeInTheDocument();
    expect(screen.getByText('Add Todo')).toBeInTheDocument();
  });

  it('should call onAdd with trimmed title when form is submitted', async () => {
    const user = userEvent.setup();
    render(<AddTodoForm onAdd={mockOnAdd} />);

    const input = screen.getByPlaceholderText('Add a new todo...');
    await user.type(input, '  Test todo  ');
    await user.click(screen.getByText('Add Todo'));

    expect(mockOnAdd).toHaveBeenCalledWith('Test todo');
  });

  it('should clear input after successful submission', async () => {
    const user = userEvent.setup();
    render(<AddTodoForm onAdd={mockOnAdd} />);

    const input = screen.getByPlaceholderText('Add a new todo...');
    await user.type(input, 'Test todo');
    await user.click(screen.getByText('Add Todo'));

    expect(input).toHaveValue('');
  });

  it('should not call onAdd with empty title', async () => {
    const user = userEvent.setup();
    render(<AddTodoForm onAdd={mockOnAdd} />);

    const input = screen.getByPlaceholderText('Add a new todo...');
    await user.type(input, '   ');
    await user.click(screen.getByText('Add Todo'));

    expect(mockOnAdd).not.toHaveBeenCalled();
  });

  it('should submit on Enter key press', async () => {
    const user = userEvent.setup();
    render(<AddTodoForm onAdd={mockOnAdd} />);

    const input = screen.getByPlaceholderText('Add a new todo...');
    await user.type(input, 'Test todo{Enter}');

    expect(mockOnAdd).toHaveBeenCalledWith('Test todo');
  });
});