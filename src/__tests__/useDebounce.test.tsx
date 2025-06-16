import { renderHook, act } from '@testing-library/react';
import { vi, test, expect, describe } from 'vitest';
import { useDebounce } from '@/hooks/useDebounce';

describe('useDebounce', () => {
    vi.useFakeTimers();

    test('should return the initial value immediately', () => {
        const { result } = renderHook(() => useDebounce('initial', 500));
        expect(result.current).toBe('initial');
    });

    test('should update value only after specified delay', () => {
        const { result, rerender } = renderHook(
            ({ value, delay }) => useDebounce(value, delay),
            { initialProps: { value: 'first', delay: 500 } }
        );

        rerender({ value: 'second', delay: 500 });
        expect(result.current).toBe('first'); // Not updated yet

        act(() => {
            vi.advanceTimersByTime(499);
        });
        expect(result.current).toBe('first'); // Still not updated

        act(() => {
            vi.advanceTimersByTime(1);
        });
        expect(result.current).toBe('second'); // Updated after 500ms
    });

    test('should handle rapid changes, only taking the last one', () => {
        const { result, rerender } = renderHook(
            ({ value, delay }) => useDebounce(value, delay),
            { initialProps: { value: 'A', delay: 300 } }
        );

        rerender({ value: 'B', delay: 300 });
        rerender({ value: 'C', delay: 300 });

        act(() => {
            vi.advanceTimersByTime(300);
        });

        expect(result.current).toBe('C');
    });
});
