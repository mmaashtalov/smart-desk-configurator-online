import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GalleryManagement } from './GalleryManagement';
import * as galleryService from '@/services/gallery.service';
import { useToast } from '@/hooks/use-toast';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { render } from '@/test/test-utils';

const mockToast = vi.fn();

vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: mockToast,
    toasts: [],
  }),
}));

const uploadGalleryImageSpy = vi.spyOn(galleryService, 'uploadGalleryImage');

describe('GalleryManagement', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the form with all fields', () => {
    render(<GalleryManagement />);
    expect(screen.getByRole('textbox', { name: /Название/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /Категория/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /Тип/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /Покрытие/i })).toBeInTheDocument();
    expect(screen.getByRole('switch', { name: /Подъемный стол?/i })).toBeInTheDocument();
    expect(screen.getByRole('switch', { name: /Есть тумба?/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Загрузить изображение/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Изображение/i)).toBeInTheDocument();
  });

  it('should display validation errors for required fields', async () => {
    const user = userEvent.setup();
    render(<GalleryManagement />);
    await user.click(screen.getByRole('button', { name: /Загрузить изображение/i }));
    expect(await screen.findByText(/Название обязательно/i)).toBeInTheDocument();
    expect(await screen.findByText(/Изображение обязательно/i)).toBeInTheDocument();
  });

  it('should successfully submit the form with valid data', async () => {
    uploadGalleryImageSpy.mockResolvedValue({ success: true, url: 'some-url' });
    const user = userEvent.setup();
    render(<GalleryManagement />);

    const file = new File(['(⌐□_□)'], 'desk.png', { type: 'image/png' });

    await user.type(screen.getByRole('textbox', { name: /Название/i }), 'Тестовый стол');
    await user.type(screen.getByRole('textbox', { name: /Категория/i }), 'Столы');
    await user.click(screen.getByRole('combobox', { name: /Тип/i }));
    await user.click(await screen.findByRole('option', { name: 'Фото' }));
    await user.click(screen.getByRole('combobox', { name: /Покрытие/i }));
    await user.click(await screen.findByRole('option', { name: 'Дуб' }));
    await user.click(screen.getByRole('switch', { name: /Подъемный стол?/i }));
    await user.click(screen.getByRole('switch', { name: /Есть тумба?/i }));
    await user.upload(screen.getByLabelText(/Изображение/i), file);

    await user.click(screen.getByRole('button', { name: /Загрузить изображение/i }));

    await waitFor(() => {
      expect(uploadGalleryImageSpy).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        title: 'Успех!',
        description: 'Изображение успешно загружено в галерею.',
      });
    });
  });

  it('should show an error toast if upload fails', async () => {
    const errorMessage = 'Test error';
    uploadGalleryImageSpy.mockRejectedValue(new Error(errorMessage));
    const user = userEvent.setup();
    render(<GalleryManagement />);

    const file = new File(['(⌐□_□)'], 'desk.png', { type: 'image/png' });

    await user.type(screen.getByRole('textbox', { name: /Название/i }), 'Ошибка загрузки');
    await user.type(screen.getByRole('textbox', { name: /Категория/i }), 'Столы');
    await user.upload(screen.getByLabelText(/Изображение/i), file);

    await user.click(screen.getByRole('button', { name: /Загрузить изображение/i }));

    await waitFor(() => {
      expect(uploadGalleryImageSpy).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        variant: 'destructive',
        title: 'Ошибка',
        description: `Не удалось загрузить изображение: ${errorMessage}`,
      });
    });
  });
});