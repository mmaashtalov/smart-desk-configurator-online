import { render, screen, fireEvent } from '@testing-library/react';
import { ImageWithFallback } from './ImageWithFallback';

describe('ImageWithFallback', () => {
  it('renders the image with the correct src initially', () => {
    render(<ImageWithFallback src="/valid-image.jpg" alt="Test Image" />);
    const image = screen.getByAltText('Test Image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/valid-image.jpg');
  });

  it('uses the fallbackSrc when the original image fails to load', () => {
    render(<ImageWithFallback src="/invalid-image.jpg" alt="Test Image" fallbackSrc="/fallback.svg" />);
    const image = screen.getByAltText('Test Image');
    fireEvent.error(image);
    expect(image).toHaveAttribute('src', '/fallback.svg');
  });

  it('uses the default fallbackSrc if none is provided and the original image fails', () => {
    render(<ImageWithFallback src="/invalid-image.jpg" alt="Test Image" />);
    const image = screen.getByAltText('Test Image');
    fireEvent.error(image);
    expect(image).toHaveAttribute('src', '/placeholder.svg');
  });
}); 