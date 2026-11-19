import { useEffect, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';

/**
 * State-Hook mit localStorage-Persistenz (JSON).
 * `initial` wird nur ausgewertet, wenn noch kein Wert gespeichert ist.
 */
export function usePersistentState<T>(
  key: string,
  initial: () => T,
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw !== null) {
        return JSON.parse(raw) as T;
      }
    } catch {
      // Defekte Daten ignorieren und mit Initialwert starten.
    }
    return initial();
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Speicher voll / privat-Modus: App läuft trotzdem weiter.
    }
  }, [key, value]);

  return [value, setValue];
}
