import { render, screen } from '@testing-library/react';
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from './alert';

describe('Alert', () => {
  it('renders Alert with children and default variant', () => {
    render(
      <Alert>
        <AlertTitle>Title</AlertTitle>
        <AlertDescription>Description</AlertDescription>
      </Alert>
    );
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  it('applies destructive variant', () => {
    render(
      <Alert variant="destructive">
        <AlertTitle>Danger</AlertTitle>
        <AlertDescription>Be careful!</AlertDescription>
      </Alert>
    );
    const alert = screen.getByRole('alert');
    expect(alert.className).toMatch(/destructive/);
  });

  it('applies custom className', () => {
    render(
      <Alert className="custom-alert">
        <AlertTitle>Title</AlertTitle>
        <AlertDescription>Description</AlertDescription>
      </Alert>
    );
    expect(screen.getByRole('alert')).toHaveClass('custom-alert');
  });

  it('forwards ref to Alert', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Alert ref={ref}>
        <AlertTitle>Title</AlertTitle>
        <AlertDescription>Description</AlertDescription>
      </Alert>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('AlertTitle and AlertDescription forward refs and apply className', () => {
    const titleRef = React.createRef<HTMLHeadingElement>();
    const descRef = React.createRef<HTMLDivElement>();
    render(
      <Alert>
        <AlertTitle ref={titleRef} className="custom-title">Title</AlertTitle>
        <AlertDescription ref={descRef} className="custom-desc">Description</AlertDescription>
      </Alert>
    );
    expect(titleRef.current).toBeInstanceOf(HTMLHeadingElement);
    expect(titleRef.current).toHaveClass('custom-title');
    expect(descRef.current).toBeInstanceOf(HTMLDivElement);
    expect(descRef.current).toHaveClass('custom-desc');
  });
}); 