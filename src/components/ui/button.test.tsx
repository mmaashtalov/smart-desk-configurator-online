import { render, screen } from '@testing-library/react';
import { Button, buttonVariants } from './button';
import { cn } from '@/lib/utils';

describe('Button', () => {
  it('renders with default variant and size', () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(cn(buttonVariants({ variant: 'default', size: 'default' })));
  });

  it('renders with specified variant', () => {
    render(<Button variant="accent">Accent Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(cn(buttonVariants({ variant: 'accent' })));
  });

  it('renders with specified size', () => {
    render(<Button size="sm">Small Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(cn(buttonVariants({ size: 'sm' })));
  });

  it('applies additional class names', () => {
    render(<Button className="custom-class">Custom Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('custom-class');
    expect(button).toHaveClass(cn(buttonVariants({ variant: 'default', size: 'default' }), 'custom-class'));
  });

  it('renders children correctly', () => {
    render(<Button><span>Child Span</span></Button>);
    expect(screen.getByText('Child Span')).toBeInTheDocument();
  });

  it('renders as a Slot when asChild is true', () => {
    render(
      <Button asChild>
        <a href="/" data-testid="link">Link Button</a>
      </Button>
    );
    const link = screen.getByTestId('link');
    expect(link).toBeInTheDocument();
    expect(link.tagName).toBe('A');
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(link).toHaveClass(cn(buttonVariants({ variant: 'default', size: 'default' })));
  });

  it('renders a disabled button when disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('renders button with icon size', () => {
    render(<Button size="icon">ICON</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass(cn(buttonVariants({ size: 'icon' })));
  });

  it('renders button with ghost variant', () => {
    render(<Button variant="ghost">Ghost Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass(cn(buttonVariants({ variant: 'ghost' })));
  });

  it('renders button with link variant', () => {
    render(<Button variant="link">Link Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass(cn(buttonVariants({ variant: 'link' })));
  });
}); 