import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import GalleryPage from './GalleryPage';
import { getGalleryImages } from '@/services/gallery.service';
import type { GalleryImage } from '@/types/gallery';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock the service
vi.mock('@/services/gallery.service');

const mockImages: GalleryImage[] = [
  { id: '1', image_url: '/image1.jpg', alt_text: 'Image 1', category: 'Дуб', type: 'Фотография', coating: 'Масло', has_storage: true, is_lift: false, created_at: '2023-01-01' },
  { id: '2', image_url: '/image2.jpg', alt_text: 'Image 2', category: 'Орех', type: 'Визуализация', coating: 'Лак', has_storage: false, is_lift: true, created_at: '2023-01-02' },
];

describe('GalleryPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should display a loading spinner initially', () => {
    // Mock a promise that never resolves to keep it in a loading state
    (getGalleryImages as vi.Mock).mockReturnValue(new Promise(() => {})); 
    render(
        <MemoryRouter>
            <GalleryPage />
        </MemoryRouter>
    );
    // In your component, the loading spinner should have a role of 'status' for accessibility
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('should display images after successful fetching', async () => {
    (getGalleryImages as vi.Mock).mockResolvedValue(mockImages);
    render(
        <MemoryRouter>
            <GalleryPage />
        </MemoryRouter>
    );

    // Wait for the elements with the alt text to appear
    await waitFor(() => {
      expect(screen.getByAltText('Image 1')).toBeInTheDocument();
      expect(screen.getByAltText('Image 2')).toBeInTheDocument();
    });

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute('src', '/image1.jpg');
  });

  it('should display an error message if fetching fails', async () => {
    const errorMessage = 'Failed to fetch images';
    (getGalleryImages as vi.Mock).mockRejectedValue(new Error(errorMessage));
    render(
        <MemoryRouter>
            <GalleryPage />
        </MemoryRouter>
    );

    // Check for the error message to appear
    await waitFor(() => {
      // The text might be part of a larger sentence, so we use a regex
      expect(screen.getByText(/произошла ошибка/i)).toBeInTheDocument();
    });
  });
});