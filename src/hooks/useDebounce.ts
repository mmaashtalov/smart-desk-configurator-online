import { useEffect, useState } from 'react';

/**
 * Returns a debounced version of the provided value that only updates
 * after the given delay.
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
} 