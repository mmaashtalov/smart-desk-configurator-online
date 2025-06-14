import { render, screen } from '@testing-library/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './card';
import { cn } from '@/lib/utils';

describe('Card', () => {
  it('renders Card with children and default classes', () => {
    render(<Card>Test Card</Card>);
    const card = screen.getByText('Test Card');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('rounded-lg border bg-card text-card-foreground shadow-sm');
  });

  it('applies additional class names to Card', () => {
    render(<Card className="custom-card">Custom Card</Card>);
    const card = screen.getByText('Custom Card');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('custom-card');
  });

  it('renders CardHeader with children and default classes', () => {
    render(<CardHeader>Test Header</CardHeader>);
    const header = screen.getByText('Test Header');
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass('flex flex-col space-y-1.5 p-6');
  });

  it('applies additional class names to CardHeader', () => {
    render(<CardHeader className="custom-header">Custom Header</CardHeader>);
    const header = screen.getByText('Custom Header');
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass('custom-header');
  });

  it('renders CardTitle with children and default classes', () => {
    render(<CardTitle>Test Title</CardTitle>);
    const title = screen.getByText('Test Title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass('text-2xl font-semibold leading-none tracking-tight');
  });

  it('applies additional class names to CardTitle', () => {
    render(<CardTitle className="custom-title">Custom Title</CardTitle>);
    const title = screen.getByText('Custom Title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass('custom-title');
  });

  it('renders CardDescription with children and default classes', () => {
    render(<CardDescription>Test Description</CardDescription>);
    const description = screen.getByText('Test Description');
    expect(description).toBeInTheDocument();
    expect(description).toHaveClass('text-sm text-muted-foreground');
  });

  it('applies additional class names to CardDescription', () => {
    render(<CardDescription className="custom-description">Custom Description</CardDescription>);
    const description = screen.getByText('Custom Description');
    expect(description).toBeInTheDocument();
    expect(description).toHaveClass('custom-description');
  });

  it('renders CardContent with children and default classes', () => {
    render(<CardContent>Test Content</CardContent>);
    const content = screen.getByText('Test Content');
    expect(content).toBeInTheDocument();
    expect(content).toHaveClass('p-6 pt-0');
  });

  it('applies additional class names to CardContent', () => {
    render(<CardContent className="custom-content">Custom Content</CardContent>);
    const content = screen.getByText('Custom Content');
    expect(content).toBeInTheDocument();
    expect(content).toHaveClass('custom-content');
  });

  it('renders CardFooter with children and default classes', () => {
    render(<CardFooter>Test Footer</CardFooter>);
    const footer = screen.getByText('Test Footer');
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveClass('flex items-center p-6 pt-0');
  });

  it('applies additional class names to CardFooter', () => {
    render(<CardFooter className="custom-footer">Custom Footer</CardFooter>);
    const footer = screen.getByText('Custom Footer');
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveClass('custom-footer');
  });
}); 