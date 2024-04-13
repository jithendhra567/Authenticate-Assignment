import { useState } from "react";
import { getItem, setItem } from "../utils/common";

const useLocalStorage = <T extends {}>(keyName: string, defaultValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const value = getItem(keyName);
      if (value) {
        if (typeof value === "string") return value;
        return JSON.parse(value);
      } else {
        setItem(keyName, defaultValue);
        return defaultValue;
      }
    } catch (err) {
      console.log(err);
      return defaultValue;
    }
  });

  const setValue = (newValue: T) => {
    setItem(keyName, newValue);
    setStoredValue(newValue);
  };
  return [storedValue, setValue] as [T, typeof setValue];
};

export default useLocalStorage;
