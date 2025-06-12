/// <reference types="vitest/globals" />
import { screen } from '@testing-library/react';
import { AdminDashboard } from './AdminDashboard';
import { render } from '../test/test-utils';

describe('AdminDashboard', () => {
  it('renders the main heading', () => {
    render(<AdminDashboard />);
    expect(screen.getByRole('heading', { name: /Панель управления/i })).toBeInTheDocument();
  });
}); 