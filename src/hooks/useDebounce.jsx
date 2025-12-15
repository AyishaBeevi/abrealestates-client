import { useState, useEffect } from "react";

/**
 * Debounces a value, useful for search input or filtering
 * @param {any} value
 * @param {number} delay in ms
 */
export default function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
