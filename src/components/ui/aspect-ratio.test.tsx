import { render, screen } from '@testing-library/react';
import React from 'react';
import { AspectRatio } from './aspect-ratio';

describe('AspectRatio', () => {
  it('renders children inside the aspect ratio container', () => {
    render(
      <AspectRatio>
        <img src="/test.jpg" alt="test" />
      </AspectRatio>
    );
    expect(screen.getByAltText('test')).toBeInTheDocument();
  });

  it('applies custom className to the container', () => {
    render(
      <AspectRatio className="custom-aspect" data-testid="aspect-root">
        <div>Content</div>
      </AspectRatio>
    );
    expect(screen.getByTestId('aspect-root')).toHaveClass('custom-aspect');
  });

  it('forwards other props to the container', () => {
    render(
      <AspectRatio id="aspect-id" data-testid="aspect-root">
        <div>Content</div>
      </AspectRatio>
    );
    expect(screen.getByTestId('aspect-root')).toHaveAttribute('id', 'aspect-id');
  });
}); 