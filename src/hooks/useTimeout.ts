import { useCallback, useEffect, useRef } from "react";

export default function useTimeout(callback: Function, delay: number) {

  const refCallback = useRef(callback);
  useEffect(() => {
    refCallback.current = callback;
  }, [callback])

  const refTimeout = useRef<NodeJS.Timeout>();

  const set = useCallback(() => {
    refTimeout.current = setTimeout(() => {
      refCallback.current();
    }, delay);
  }, [delay])

  const clear = useCallback(() => {
    refTimeout.current && clearTimeout(refTimeout.current)
  }, [])

  useEffect(() => {
    set();
    return clear;
  }, [delay, set, clear])

  const reset = useCallback(() => {
    clear();
    set();
  }, [clear, set])

  return { reset, clear }

}