import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';
import { vi } from 'vitest';
import { logger } from '@/services/logger.service';

// Mock logger.error to prevent actual console errors during tests
vi.mock('@/services/logger.service', () => ({
  logger: {
    error: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
  },
}));

const ProblemChild = () => {
  throw new Error('Test Error');
};

describe('ErrorBoundary', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders children normally when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Normal Child</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('Normal Child')).toBeInTheDocument();
  });

  it('renders fallback UI when an error occurs', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );
    expect(screen.getByText('Что-то пошло не так.')).toBeInTheDocument();
    expect(screen.getByText('Мы уже получили уведомление об ошибке и работаем над ее исправлением.')).toBeInTheDocument();
    expect(consoleErrorSpy).toHaveBeenCalled();
    consoleErrorSpy.mockRestore();
  });

  it('logs the error using logger.error when an error occurs', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );
    expect(logger.error).toHaveBeenCalledWith(
      'Uncaught error:',
      expect.any(Error),
      expect.objectContaining({
        componentStack: expect.any(String),
      })
    );
    consoleErrorSpy.mockRestore();
  });
}); 