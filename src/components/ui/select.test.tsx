import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem, SelectSeparator, SelectScrollUpButton, SelectScrollDownButton } from './select';
import React from 'react';
import { vi } from 'vitest';

describe('Select', () => {
  const options = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
  ];

  it('renders the SelectTrigger with SelectValue placeholder', () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
      </Select>
    );
    expect(screen.getByText('Select a fruit')).toBeInTheDocument();
  });

  it('opens and closes the SelectContent when trigger is clicked', async () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
            <SelectSeparator data-testid="select-separator" />
          </SelectGroup>
        </SelectContent>
      </Select>
    );
    fireEvent.click(screen.getByText('Select a fruit'));
    expect(screen.getByText('Fruits')).toBeInTheDocument();
    expect(screen.getByTestId('select-separator')).toBeInTheDocument();
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    await waitFor(() => {
      expect(screen.queryByText('Fruits')).not.toBeInTheDocument();
    });
  });

  it('selects an item and displays its value', async () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
    fireEvent.click(screen.getByText('Select a fruit'));
    fireEvent.click(screen.getByText('Banana'));
    expect(screen.getByText('Banana')).toBeInTheDocument();
  });

  it.skip('renders SelectScrollUpButton and SelectScrollDownButton when scroll is needed', () => {
    // Radix UI не рендерит скролл-кнопки в JSDOM, даже если добавить много опций и data-testid.
    // Это ограничение среды тестирования, а не бага компонента.
    // Поэтому этот тест пропущен.
  });
}); 