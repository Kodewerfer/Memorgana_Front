import { useEffect, useRef } from "react";

type TCallbackType = (e: KeyboardEvent) => any;
export default function useKeybind(callback: TCallbackType) {
  const refCallback = useRef<TCallbackType>(callback);

  useEffect(() => {
    refCallback.current = callback
  }, [callback])

  useEffect(() => {
    document.removeEventListener("keydown", refCallback.current);
    document.addEventListener("keydown", refCallback.current);

    return () => {
      document.removeEventListener("keydown", refCallback.current);
    };
  }, [callback]);
}