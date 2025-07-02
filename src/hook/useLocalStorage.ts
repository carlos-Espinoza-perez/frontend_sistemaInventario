import { useState, useEffect, useCallback } from "react";

type UseLocalStorageReturn<T> = {
  value: T;
  updateValue: (val: T) => void;
  removeValue: () => void;
};

export function useLocalStorage<T = string>(
  key: string,
  defaultValue: T,
  isList: boolean = false
): UseLocalStorageReturn<T> {
  const parseValue = (val: string | null): T => {
    if (val === null) return defaultValue;
    try {
      return isList ? JSON.parse(val) : (val as unknown as T);
    } catch {
      return defaultValue;
    }
  };

  const getStoredValue = () => parseValue(localStorage.getItem(key));

  const [value, setValue] = useState<T>(getStoredValue);

  const updateValue = useCallback(
    (val: T) => {
      setValue(val);
      const stringified = isList ? JSON.stringify(val) : String(val);
      localStorage.setItem(key, stringified);

      // 🔁 Emitimos un evento personalizado para sincronizar otros hooks en la misma pestaña
      window.dispatchEvent(new CustomEvent("localstorage-update", { detail: { key } }));
    },
    [key, isList]
  );

  const removeValue = useCallback(() => {
    localStorage.removeItem(key);
    setValue(defaultValue);

    // 🔁 Emitimos el evento también al eliminar
    window.dispatchEvent(new CustomEvent("localstorage-update", { detail: { key } }));
  }, [key, defaultValue]);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === key) {
        setValue(parseValue(e.newValue));
      }
    };

    const onCustomUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<{ key: string }>;
      if (customEvent.detail?.key === key) {
        setValue(getStoredValue());
      }
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener("localstorage-update", onCustomUpdate);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("localstorage-update", onCustomUpdate);
    };
  }, [key]);

  return { value, updateValue, removeValue };
}
