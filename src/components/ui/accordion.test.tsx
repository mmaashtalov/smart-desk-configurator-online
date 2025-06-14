import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './accordion';

describe('Accordion', () => {
  it('renders AccordionItem with children', () => {
    render(
      <Accordion type="single">
        <AccordionItem value="item-1">
          <AccordionTrigger>Trigger 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    expect(screen.getByText('Trigger 1')).toBeInTheDocument();
    expect(screen.queryByText('Content 1')).toBeNull();
  });

  it('opens and closes AccordionContent on trigger click', () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Trigger 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    const trigger = screen.getByText('Trigger 1');
    fireEvent.click(trigger);
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    fireEvent.click(trigger);
    expect(screen.queryByText('Content 1')).toBeNull();
  });

  it('applies custom className to AccordionItem and AccordionContent', () => {
    render(
      <Accordion type="single">
        <AccordionItem value="item-1" className="custom-item">
          <AccordionTrigger>Trigger 1</AccordionTrigger>
          <AccordionContent className="custom-content" data-testid="custom-content">Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    expect(screen.getByText('Trigger 1').closest('.custom-item')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Trigger 1'));
    const content = screen.getByTestId('custom-content');
    expect(content.querySelector('.custom-content')).toBeInTheDocument();
  });

  it('forwards ref to AccordionItem', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Accordion type="single">
        <AccordionItem value="item-1" ref={ref}>
          <AccordionTrigger>Trigger 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
}); 