import { render, screen, fireEvent } from '@testing-library/react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from './dialog';
import React from 'react';

describe('Dialog', () => {
  it('does not render content when closed', () => {
    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>Dialog Content</DialogContent>
      </Dialog>
    );
    expect(screen.queryByText('Dialog Content')).not.toBeInTheDocument();
  });

  it('opens the dialog when trigger is clicked', () => {
    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>Dialog Content</DialogContent>
      </Dialog>
    );
    fireEvent.click(screen.getByText('Open'));
    expect(screen.getByText('Dialog Content')).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('closes the dialog when close button is clicked', () => {
    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>Dialog Content</DialogContent>
      </Dialog>
    );
    fireEvent.click(screen.getByText('Open'));
    expect(screen.getByText('Dialog Content')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.queryByText('Dialog Content')).not.toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders DialogHeader with children and custom class', () => {
    render(
      <Dialog open>
        <DialogContent>
          <DialogHeader className="custom-header">Header Content</DialogHeader>
        </DialogContent>
      </Dialog>
    );
    expect(screen.getByText('Header Content')).toBeInTheDocument();
    expect(screen.getByText('Header Content')).toHaveClass('custom-header');
  });

  it('renders DialogTitle with children and custom class', () => {
    render(
      <Dialog open>
        <DialogContent>
          <DialogTitle className="custom-title">Title Text</DialogTitle>
        </DialogContent>
      </Dialog>
    );
    expect(screen.getByText('Title Text')).toBeInTheDocument();
    expect(screen.getByText('Title Text')).toHaveClass('custom-title');
    expect(screen.getByRole('heading', { name: 'Title Text' })).toBeInTheDocument();
  });

  it('renders DialogDescription with children and custom class', () => {
    render(
      <Dialog open>
        <DialogContent>
          <DialogDescription className="custom-description">Description Text</DialogDescription>
        </DialogContent>
      </Dialog>
    );
    expect(screen.getByText('Description Text')).toBeInTheDocument();
    expect(screen.getByText('Description Text')).toHaveClass('custom-description');
  });

  it('renders DialogFooter with children and custom class', () => {
    render(
      <Dialog open>
        <DialogContent>
          <DialogFooter className="custom-footer">Footer Content</DialogFooter>
        </DialogContent>
      </Dialog>
    );
    expect(screen.getByText('Footer Content')).toBeInTheDocument();
    expect(screen.getByText('Footer Content')).toHaveClass('custom-footer');
  });

  it('renders nested Dialog components correctly', () => {
    render(
      <Dialog>
        <DialogTrigger>Open Outer</DialogTrigger>
        <DialogContent>
          Outer Dialog Content
          <Dialog>
            <DialogTrigger>Open Inner</DialogTrigger>
            <DialogContent>Inner Dialog Content</DialogContent>
          </Dialog>
        </DialogContent>
      </Dialog>
    );

    fireEvent.click(screen.getByText('Open Outer'));
    expect(screen.getByText('Outer Dialog Content')).toBeInTheDocument();
    expect(screen.queryByText('Inner Dialog Content')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('Open Inner'));
    expect(screen.getByText('Inner Dialog Content')).toBeInTheDocument();
  });

  it('DialogClose closes the dialog', () => {
    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          Dialog Content
          <DialogClose>Custom Close</DialogClose>
        </DialogContent>
      </Dialog>
    );
    fireEvent.click(screen.getByText('Open'));
    expect(screen.getByText('Dialog Content')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Custom Close'));
    expect(screen.queryByText('Dialog Content')).not.toBeInTheDocument();
  });
}); 