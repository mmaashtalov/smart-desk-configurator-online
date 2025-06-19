import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import GalleryPage from './GalleryPage';
import { getGalleryImages } from '@/services/gallery.service';
import { GalleryImage } from '@/types/gallery';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

vi.mock('@/services/gallery.service');

const mockImages: GalleryImage[] = [
  { id: '1', image_url: '/image1.jpg', alt_text: 'Image 1', category: 'Дуб', type: 'Фотография', coating: 'Масло', has_storage: true, is_lift: false, created_at: '2023-01-01' },
  { id: '2', image_url: '/image2.jpg', alt_text: 'Image 2', category: 'Орех', type: 'Визуализация', coating: 'Лак', has_storage: false, is_lift: true, created_at: '2023-01-02' },
];

describe('GalleryPage', () => {
  beforeEach(() => {
    (getGalleryImages as vi.Mock).mockResolvedValue(mockImages);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render a loading state initially', () => {
    render(
        <MemoryRouter>
            <GalleryPage />
        </MemoryRouter>
    );
    expect(screen.getByText('Загрузка изображений...')).toBeInTheDocument();
  });

  it('should render images after successful fetch', async () => {
    render(
        <MemoryRouter>
            <GalleryPage />
        </MemoryRouter>
    );
    
    await waitFor(() => {
        expect(screen.queryByText('Загрузка изображений...')).not.toBeInTheDocument();
    });

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute('src', '/image1.jpg');
    expect(screen.getByAltText('Image 1')).toBeInTheDocument();
  });

  it('should render an error message if fetch fails', async () => {
    (getGalleryImages as vi.Mock).mockRejectedValue(new Error('Fetch failed'));
    render(
        <MemoryRouter>
            <GalleryPage />
        </MemoryRouter>
    );

    await waitFor(() => {
        expect(screen.getByText('Не удалось загрузить изображения.')).toBeInTheDocument();
    });
  });
}); 