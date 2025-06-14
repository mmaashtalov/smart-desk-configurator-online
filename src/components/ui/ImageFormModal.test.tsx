import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ImageFormModal } from './ImageFormModal';
import { vi } from 'vitest';

describe('ImageFormModal', () => {
  const commonProps = {
    onClose: vi.fn(),
    onConfirm: vi.fn(),
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('does not render the modal when isOpen is false', () => {
    render(<ImageFormModal isOpen={false} mode="add" {...commonProps} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  describe('Add Mode', () => {
    it('renders correctly in add mode and clears input on open', () => {
      render(<ImageFormModal isOpen={true} mode="add" {...commonProps} />);
      expect(screen.getByText('Добавить изображение')).toBeInTheDocument();
      const input = screen.getByPlaceholderText('https://example.com/image.jpg');
      expect(input).toHaveValue('');
    });

    it('updates input value on change', async () => {
      render(<ImageFormModal isOpen={true} mode="add" {...commonProps} />);
      const input = screen.getByPlaceholderText('https://example.com/image.jpg');
      await userEvent.type(input, 'http://newimage.com/test.png');
      expect(input).toHaveValue('http://newimage.com/test.png');
    });

    it('calls onConfirm with the image URL and onClose when "Добавить" is clicked', async () => {
      render(<ImageFormModal isOpen={true} mode="add" {...commonProps} />);
      const input = screen.getByPlaceholderText('https://example.com/image.jpg');
      await userEvent.type(input, 'http://newimage.com/test.png');
      fireEvent.click(screen.getByRole('button', { name: 'Добавить' }));
      await waitFor(() => {
        expect(commonProps.onConfirm).toHaveBeenCalledWith('http://newimage.com/test.png');
        expect(commonProps.onClose).toHaveBeenCalledTimes(1);
      });
    });

    it('calls onClose when "Отмена" is clicked in add mode', async () => {
      render(<ImageFormModal isOpen={true} mode="add" {...commonProps} />);
      fireEvent.click(screen.getByRole('button', { name: 'Отмена' }));
      await waitFor(() => {
        expect(commonProps.onClose).toHaveBeenCalledTimes(1);
        expect(commonProps.onConfirm).not.toHaveBeenCalled();
      });
    });
  });

  describe('Delete Mode', () => {
    it('renders correctly in delete mode and displays current image URL', () => {
      render(<ImageFormModal isOpen={true} mode="delete" currentImageUrl="http://current.com/image.jpg" {...commonProps} />);
      expect(screen.getByText('Удалить изображение')).toBeInTheDocument();
      expect(screen.getByText('Вы уверены, что хотите удалить текущее изображение?')).toBeInTheDocument();
      expect(screen.getByText('http://current.com/image.jpg')).toBeInTheDocument();
    });

    it('calls onConfirm and onClose when "Удалить" is clicked in delete mode', async () => {
      render(<ImageFormModal isOpen={true} mode="delete" {...commonProps} />);
      fireEvent.click(screen.getByRole('button', { name: 'Удалить' }));
      await waitFor(() => {
        expect(commonProps.onConfirm).toHaveBeenCalledWith();
        expect(commonProps.onClose).toHaveBeenCalledTimes(1);
      });
    });

    it('calls onClose when "Отмена" is clicked in delete mode', async () => {
      render(<ImageFormModal isOpen={true} mode="delete" {...commonProps} />);
      fireEvent.click(screen.getByRole('button', { name: 'Отмена' }));
      await waitFor(() => {
        expect(commonProps.onClose).toHaveBeenCalledTimes(1);
        expect(commonProps.onConfirm).not.toHaveBeenCalled();
      });
    });
  });
}); 