import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './input';
import { cn } from '@/lib/utils';
import React from 'react';

describe('Input', () => {
  it('renders with type text by default', () => {
    render(<Input placeholder="Enter text" />);
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
  });

  it('renders with specified type', () => {
    render(<Input type="email" placeholder="Enter email" />);
    const input = screen.getByPlaceholderText('Enter email');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'email');
  });

  it('applies additional class names', () => {
    render(<Input className="custom-input" data-testid="test-input" />);
    const input = screen.getByTestId('test-input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('custom-input');
  });

  it('handles input changes', async () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} placeholder="Type something" />);
    const input = screen.getByPlaceholderText('Type something');
    await userEvent.type(input, 'hello');
    expect(handleChange).toHaveBeenCalledTimes(5);
    expect(input).toHaveValue('hello');
  });

  it('forwards the ref to the input element', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('renders a disabled input when disabled prop is true', () => {
    render(<Input disabled placeholder="Disabled input" />);
    const input = screen.getByPlaceholderText('Disabled input');
    expect(input).toBeDisabled();
  });

  it('displays correct placeholder text', () => {
    render(<Input placeholder="Search..." />);
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  it('displays correct value', () => {
    render(<Input value="Pre-filled value" onChange={() => {}} />);
    expect(screen.getByDisplayValue('Pre-filled value')).toBeInTheDocument();
  });
});