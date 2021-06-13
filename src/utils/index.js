import { useEffect, useState } from 'react';

export const isFalsy = (value) => value === 0 ? false : !value;

export const cleanObject = (object) => {
  const result = {...object}
  Object.keys(result).forEach(key => {
    const value = result[key]
    if(isFalsy(value)) {
      delete result[key];
    }
  })
  return result;
};

export const useMount = (callback) => {
  useEffect(()=>{
    callback()
  }, [])
}

export function debounce(func, delay) {
  let timeout;
  return () => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      func();
    }, delay);
  }
}

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // 每次在上一个 useEffect 处理完以后再运行
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
}
