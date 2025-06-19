import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GalleryManagement } from './GalleryManagement';
import { uploadGalleryImage } from '@/services/gallery.service';
import { useToast } from '@/hooks/use-toast';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Мокируем зависимости
vi.mock('@/services/gallery.service');
vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: vi.fn(),
  }),
}));

// Компонент Toaster не нужен для этого теста, мокируем его
vi.mock('@/components/ui/sonner', () => ({
  Sonner: () => <div data-testid="toaster" />,
}));


describe('GalleryManagement', () => {
  const mockUpload = uploadGalleryImage as vi.Mock;
  const mockToast = useToast().toast as vi.Mock;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the form with all fields', () => {
    render(<GalleryManagement />);

    expect(screen.getByLabelText(/Название/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Изображение/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /Категория/i })).toBeInTheDocument();
    expect(screen.getByRole('radiogroup', { name: /Тип/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /Покрытие/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Наличие системы хранения/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Наличие электропривода/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Добавить в галерею/i })).toBeInTheDocument();
  });

  it('should display validation errors for required fields', async () => {
    render(<GalleryManagement />);
    
    await userEvent.click(screen.getByRole('button', { name: /Добавить в галерею/i }));

    // Ждем появления сообщений об ошибках
    expect(await screen.findByText('Название обязательно для заполнения.')).toBeInTheDocument();
    expect(await screen.findByText('Необходимо загрузить файл изображения.')).toBeInTheDocument();
  });

  it('should successfully submit the form with valid data', async () => {
    mockUpload.mockResolvedValue({ id: '123', image_url: 'http://example.com/new.jpg' });
    render(<GalleryManagement />);

    const user = userEvent.setup();
    const file = new File(['hello'], 'hello.png', { type: 'image/png' });

    // Заполняем форму
    await user.type(screen.getByLabelText(/Название/i), 'Test Image');
    await user.upload(screen.getByLabelText(/Изображение/i), file);
    
    await user.click(screen.getByLabelText('Фото'));

    await user.click(screen.getByRole('button', { name: /Добавить в галерею/i }));

    await waitFor(() => {
        expect(mockUpload).toHaveBeenCalledTimes(1);
        // Проверяем, что сервис был вызван с правильными данными
        expect(mockUpload).toHaveBeenCalledWith(expect.objectContaining({
            title: 'Test Image',
            imageFile: file,
            type: 'Фото',
        }));
        // Проверяем, что было показано уведомление об успехе
        expect(mockToast).toHaveBeenCalledWith({
            title: 'Успех!',
            description: 'Изображение успешно загружено.',
        });
    });
  });

  it('should show an error toast if upload fails', async () => {
    const errorMessage = 'Upload failed';
    mockUpload.mockRejectedValue(new Error(errorMessage));

    render(<GalleryManagement />);
    const user = userEvent.setup();
    const file = new File(['hello'], 'hello.png', { type: 'image/png' });
    
    await user.type(screen.getByLabelText(/Название/i), 'Test Image Fail');
    await user.upload(screen.getByLabelText(/Изображение/i), file);
    await user.click(screen.getByLabelText('Фото'));
    
    await user.click(screen.getByRole('button', { name: /Добавить в галерею/i }));

    await waitFor(() => {
      expect(mockUpload).toHaveBeenCalledTimes(1);
      // Проверяем, что было показано уведомление об ошибке
      expect(mockToast).toHaveBeenCalledWith({
        variant: 'destructive',
        title: 'Ошибка!',
        description: `Не удалось загрузить изображение: ${errorMessage}`,
      });
    });
  });
});