import { render, screen } from '@testing-library/react';
import { Badge, badgeVariants } from './badge';
import { cn } from '@/lib/utils';

describe('Badge', () => {
  it('renders with default variant if no variant is provided', () => {
    render(<Badge>Default Badge</Badge>);
    const badge = screen.getByText('Default Badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass(badgeVariants({ variant: 'default' }));
  });

  it('renders with the specified variant', () => {
    render(<Badge variant="secondary">Secondary Badge</Badge>);
    const badge = screen.getByText('Secondary Badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass(badgeVariants({ variant: 'secondary' }));
  });

  it('applies additional class names', () => {
    render(<Badge className="custom-class">Custom Badge</Badge>);
    const badge = screen.getByText('Custom Badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('custom-class');
  });

  it('renders children correctly', () => {
    render(<Badge>Hello World</Badge>);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('combines default variant with additional class names', () => {
    render(<Badge className="extra-class">Combined Badge</Badge>);
    const badge = screen.getByText('Combined Badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass(cn(badgeVariants({ variant: 'default' }), 'extra-class'));
  });

  it('combines specified variant with additional class names', () => {
    render(<Badge variant="destructive" className="error-class">Error Badge</Badge>);
    const badge = screen.getByText('Error Badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass(cn(badgeVariants({ variant: 'destructive' }), 'error-class'));
  });
}); 