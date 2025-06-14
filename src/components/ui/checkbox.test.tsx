import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox } from './checkbox';
import React from 'react';

describe('Checkbox', () => {
  it('renders unchecked by default', () => {
    render(<Checkbox aria-label="Test Checkbox" />);
    const checkbox = screen.getByLabelText('Test Checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
    expect(checkbox).toHaveAttribute('data-state', 'unchecked');
  });

  it('renders checked when defaultChecked is true', () => {
    render(<Checkbox aria-label="Test Checkbox" defaultChecked />);
    const checkbox = screen.getByLabelText('Test Checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toBeChecked();
    expect(checkbox).toHaveAttribute('data-state', 'checked');
  });

  it('toggles checked state on click', () => {
    render(<Checkbox aria-label="Test Checkbox" />);
    const checkbox = screen.getByLabelText('Test Checkbox');
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(checkbox).toHaveAttribute('data-state', 'checked');
    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
    expect(checkbox).toHaveAttribute('data-state', 'unchecked');
  });

  it('applies additional class names', () => {
    render(<Checkbox className="custom-checkbox" aria-label="Custom Checkbox" />);
    const checkbox = screen.getByLabelText('Custom Checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveClass('custom-checkbox');
  });

  it('renders a disabled checkbox when disabled prop is true', () => {
    render(<Checkbox disabled aria-label="Disabled Checkbox" />);
    const checkbox = screen.getByLabelText('Disabled Checkbox');
    expect(checkbox).toBeDisabled();
  });

  it('calls onChange when state changes', () => {
    const handleChange = vi.fn();
    render(<Checkbox aria-label="Change Checkbox" onCheckedChange={handleChange} />);
    const checkbox = screen.getByLabelText('Change Checkbox');
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(true);
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(2);
    expect(handleChange).toHaveBeenCalledWith(false);
  });
}); 