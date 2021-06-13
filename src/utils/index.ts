import { useEffect, useState } from 'react';

export const isFalsy = (value: any) => value === 0 ? false : !value;

export const cleanObject = (object: object) => {
  const result = {...object}
  Object.keys(result).forEach(key => {
    // @ts-ignore
    const value = result[key]
    if(isFalsy(value)) {
      // @ts-ignore
      delete result[key];
    }
  })
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(()=>{
    callback()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

// export function debounce(func, delay) {
//   let timeout;
//   return () => {
//     if (timeout) clearTimeout(timeout)
//     timeout = setTimeout(() => {
//       func();
//     }, delay);
//   }
// }

export const useDebounce = (value: any, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // 每次在上一个 useEffect 处理完以后再运行
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
}
