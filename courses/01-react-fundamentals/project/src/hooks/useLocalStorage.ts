import { useState } from "react";

export default function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      
      return item?JSON.parse(item):initialValue;
      }catch{
        return initialValue;
      }
  }
);

  const setValue: React.Dispatch<React.SetStateAction<T>> = (value) => {
    try{
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

        setStoredValue(valueToStore);

        localStorage.setItem(key,JSON.stringify(valueToStore));
    }catch{
      return;
    }    
  };

  return [storedValue, setValue];
}