import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/button';
import { describe, test, expect } from 'vitest';

describe('Button', () => {
    test('should render with default props', () => {
        render(<Button>Click me</Button>);
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
        expect(button.className).toContain('bg-primary');
    });

    test('should apply variant and size classes', () => {
        render(<Button variant="accent" size="lg">Тест</Button>);
        const btn = screen.getByRole('button', { name: /Тест/i });
        expect(btn.className).toMatch(/bg-accent/);
        expect(btn.className).toMatch(/h-11/);
    });

    test('should render as a child with asChild prop', () => {
        render(<Button asChild><a href="/">Link</a></Button>);
        const link = screen.getByRole('link');
        expect(link).toBeInTheDocument();
        expect(link.tagName).toBe('A');
    });
});
