import { useState } from 'react';

export const useSessionStorage = (
  key: string,
  initialValue: string | null = ''
): [string | null, (value: string | null) => void] => {
  const [storedValue, setStoredValue] = useState<string | null>(() => {
    if (typeof window === 'undefined') return initialValue;
    const item = sessionStorage.getItem(key);
    return item ?? initialValue;
  });

  const setValue = (value: string | null) => {
    try {
      setStoredValue(value);
      if (typeof window !== 'undefined') {
        if (value === null) sessionStorage.removeItem(key);
        else sessionStorage.setItem(key, value);
      }
    } catch (error) {
      console.error(`Error setting sessionStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}
