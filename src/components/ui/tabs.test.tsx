import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './tabs';

describe('Tabs', () => {
  it('renders TabsList and TabsTrigger', () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>
    );
    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Tab 2')).toBeInTheDocument();
  });

  it('shows the correct content when switching tabs', async () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>
    );

    const trigger1 = screen.getByText('Tab 1');
    const trigger2 = screen.getByText('Tab 2');

    // Initial state
    expect(trigger1).toHaveAttribute('data-state', 'active');
    expect(trigger2).toHaveAttribute('data-state', 'inactive');

    // Switch to Tab 2 using userEvent for better Radix compatibility
    const user = userEvent.setup();
    await user.click(trigger2);

    // After switching, data-state values should update
    expect(trigger1).toHaveAttribute('data-state', 'inactive');
    expect(trigger2).toHaveAttribute('data-state', 'active');
  });

  it('applies custom className to TabsList', () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList className="custom-list" data-testid="tabs-list">
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        </TabsList>
      </Tabs>
    );
    expect(screen.getByTestId('tabs-list')).toHaveClass('custom-list');
  });

  it('applies custom className to TabsTrigger', () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1" className="custom-trigger" data-testid="tabs-trigger">Tab 1</TabsTrigger>
        </TabsList>
      </Tabs>
    );
    expect(screen.getByTestId('tabs-trigger')).toHaveClass('custom-trigger');
  });

  it('applies custom className to TabsContent', () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1" className="custom-content" data-testid="tabs-content">Content 1</TabsContent>
      </Tabs>
    );
    expect(screen.getByTestId('tabs-content')).toHaveClass('custom-content');
  });

  it('forwards ref to TabsList', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Tabs defaultValue="tab1">
        <TabsList ref={ref} data-testid="tabs-list">
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        </TabsList>
      </Tabs>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('forwards ref to TabsTrigger', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1" ref={ref}>Tab 1</TabsTrigger>
        </TabsList>
      </Tabs>
    );
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('forwards ref to TabsContent', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1" ref={ref}>Content 1</TabsContent>
      </Tabs>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
}); 