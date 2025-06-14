import { render, screen } from '@testing-library/react';
import { Label } from './label';
import React from 'react';
import { cn } from '@/lib/utils';

describe('Label', () => {
  it('renders children correctly', () => {
    render(<Label>Test Label</Label>);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('applies additional class names', () => {
    render(<Label className="custom-class">Styled Label</Label>);
    const label = screen.getByText('Styled Label');
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass('custom-class');
  });

  it('forwards the ref to the label element', () => {
    const ref = React.createRef<HTMLLabelElement>();
    render(<Label ref={ref}>Label with Ref</Label>);
    expect(ref.current).toBeInstanceOf(HTMLLabelElement);
  });

  it('renders with htmlFor prop', () => {
    render(<Label htmlFor="test-input">For Input</Label>);
    const label = screen.getByText('For Input');
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('for', 'test-input');
  });

  it('applies peer-disabled styles when peer is disabled', () => {
    // This test primarily checks the className application for peer-disabled
    // Actual peer interaction requires a more complex setup, but this verifies the class is passed
    render(
      <div className="peer-disabled:opacity-70">
        <input type="checkbox" id="test-checkbox" disabled className="peer" />
        <Label htmlFor="test-checkbox">Disabled Checkbox Label</Label>
      </div>
    );
    const label = screen.getByText('Disabled Checkbox Label');
    // Expect it to have the base class and implicitly check if peer-disabled logic is sound via snapshot/visual inspection during dev
    expect(label).toHaveClass('peer-disabled:cursor-not-allowed');
    expect(label).toHaveClass('peer-disabled:opacity-70');
  });
}); 