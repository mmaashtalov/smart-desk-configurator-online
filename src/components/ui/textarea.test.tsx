import { render, screen, fireEvent } from '@testing-library/react';
import { Textarea } from './textarea';
import React from 'react';

describe('Textarea', () => {
  it('renders with placeholder', () => {
    render(<Textarea placeholder="Type here..." />);
    expect(screen.getByPlaceholderText('Type here...')).toBeInTheDocument();
  });

  it('renders with value', () => {
    render(<Textarea value="Hello" readOnly />);
    expect(screen.getByDisplayValue('Hello')).toBeInTheDocument();
  });

  it('calls onChange when value changes', () => {
    const handleChange = vi.fn();
    render(<Textarea onChange={handleChange} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('applies custom className', () => {
    render(<Textarea className="custom-class" data-testid="ta" />);
    expect(screen.getByTestId('ta')).toHaveClass('custom-class');
  });

  it('is disabled when disabled prop is set', () => {
    render(<Textarea disabled data-testid="ta" />);
    expect(screen.getByTestId('ta')).toBeDisabled();
  });

  it('forwards ref to the textarea element', () => {
    const ref = React.createRef<HTMLTextAreaElement>();
    render(<Textarea ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });
}); 