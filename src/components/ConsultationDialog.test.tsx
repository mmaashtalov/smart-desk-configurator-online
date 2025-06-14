import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ConsultationDialog } from './ConsultationDialog';
import { logger } from '@/services/logger.service';

// Mock logger to prevent actual logging during tests
vi.mock('@/services/logger.service', () => ({
  logger: {
    info: vi.fn(),
    error: vi.fn(),
  },
}));

describe('ConsultationDialog', () => {
  const mockOnOpenChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly when open', () => {
    render(<ConsultationDialog open={true} onOpenChange={mockOnOpenChange} />);
    expect(screen.getByText('Получить консультацию')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ваше имя')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Телефон для связи')).toBeInTheDocument();
    expect(screen.getByText('Удобное время для звонка')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Отправить запрос' })).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(<ConsultationDialog open={false} onOpenChange={mockOnOpenChange} />);
    expect(screen.queryByText('Получить консультацию')).not.toBeInTheDocument();
  });

  it('calls onOpenChange with false when close button is clicked', () => {
    render(<ConsultationDialog open={true} onOpenChange={mockOnOpenChange} />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Close' })[1]);
    expect(mockOnOpenChange).toHaveBeenCalledTimes(1);
    expect(mockOnOpenChange).toHaveBeenCalledWith(false);
  });

  it('displays subject in title when provided', () => {
    render(<ConsultationDialog open={true} onOpenChange={mockOnOpenChange} subject="Test Package" />);
    expect(screen.getByText('Заявка: Test Package')).toBeInTheDocument();
  });

  it('handles form submission and logs info on success', async () => {
    render(<ConsultationDialog open={true} onOpenChange={mockOnOpenChange} subject="Test Package" />);

    fireEvent.change(screen.getByPlaceholderText('Ваше имя'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Телефон для связи'), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Как можно быстрее' } });

    fireEvent.click(screen.getByRole('button', { name: 'Отправить запрос' }));

    await waitFor(() => {
      expect(logger.info).toHaveBeenCalledWith(
        'Consultation form submitted successfully',
        { name: 'John Doe', phone: '1234567890', time: 'Как можно быстрее', subject: 'Test Package' }
      );
      expect(mockOnOpenChange).toHaveBeenCalledWith(false);
    });
  });
}); 