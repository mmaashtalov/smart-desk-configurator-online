import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { Switch } from './switch';
import { vi } from 'vitest';

describe('Switch', () => {
  it('renders the switch', () => {
    render(<Switch aria-label="Test Switch" />);
    expect(screen.getByLabelText('Test Switch')).toBeInTheDocument();
  });

  it('is unchecked by default', () => {
    render(<Switch aria-label="Test Switch" />);
    const input = screen.getByLabelText('Test Switch');
    expect(input).not.toBeChecked();
  });

  it('is checked when defaultChecked is true', () => {
    render(<Switch aria-label="Test Switch" defaultChecked />);
    const input = screen.getByLabelText('Test Switch');
    expect(input).toBeChecked();
  });

  it('calls onCheckedChange when toggled', () => {
    const handleChange = vi.fn();
    render(<Switch aria-label="Test Switch" onCheckedChange={handleChange} />);
    const input = screen.getByLabelText('Test Switch');
    fireEvent.click(input);
    expect(handleChange).toHaveBeenCalled();
  });

  it('is disabled when disabled prop is set', () => {
    render(<Switch aria-label="Test Switch" disabled />);
    const input = screen.getByLabelText('Test Switch');
    expect(input).toBeDisabled();
  });

  it('applies custom className', () => {
    render(<Switch aria-label="Test Switch" className="custom-switch" data-testid="switch-root" />);
    expect(screen.getByTestId('switch-root')).toHaveClass('custom-switch');
  });

  it('forwards ref to the root element', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Switch aria-label="Test Switch" ref={ref} data-testid="switch-root" />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
}); 