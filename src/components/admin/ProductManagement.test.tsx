import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import ProductManagement from './ProductManagement';
import { logger } from '@/services/logger.service';
import { vi } from 'vitest';

vi.setConfig({ testTimeout: 10000 });

// Mock logger to prevent actual logging during tests
vi.mock('@/services/logger.service', () => ({
  logger: {
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
  },
}));

describe('ProductManagement', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<ProductManagement />);
    expect(screen.getByText('Управление продуктами')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Добавить новый продукт' })).toBeInTheDocument();
  });

  it('opens add new product modal', async () => {
    render(<ProductManagement />);
    fireEvent.click(screen.getByRole('button', { name: 'Добавить новый продукт' }));
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Добавить новый продукт' })).toBeInTheDocument();
    });
    expect(logger.info).toHaveBeenCalledWith('Attempting to add a new product');
  });

  it('adds a new product successfully', async () => {
    render(<ProductManagement />);
    fireEvent.click(screen.getByRole('button', { name: 'Добавить новый продукт' }));

    const modal = await screen.findByRole('dialog');

    const [nameInput, categoryInput] = within(modal).getAllByRole('textbox');
    const priceInput = within(modal).getByRole('spinbutton');

    fireEvent.change(nameInput, { target: { value: 'Test Product' } });
    fireEvent.change(categoryInput, { target: { value: 'executive-desks' } });
    fireEvent.change(priceInput, { target: { value: 1000 } });

    fireEvent.click(within(modal).getByRole('button', { name: 'Сохранить продукт' }));

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      expect(screen.getByText('Test Product')).toBeInTheDocument();
      expect(logger.info).toHaveBeenCalledWith(
        'New product saved successfully',
        expect.objectContaining({ productName: 'Test Product' })
      );
    });
  });

  it('logs a warning if new product fields are empty', async () => {
    render(<ProductManagement />);
    fireEvent.click(screen.getByRole('button', { name: 'Добавить новый продукт' }));

    const modal = await screen.findByRole('dialog');
    fireEvent.click(within(modal).getByRole('button', { name: 'Сохранить продукт' }));

    expect(logger.warn).toHaveBeenCalled();
  });

  // Add tests for editing and deleting products, and image management similar to above
}); 