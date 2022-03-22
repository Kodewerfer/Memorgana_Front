import { useDebugValue, useState } from "react";

export default function useToggle(valDefault: boolean) {
  const [value, setVal] = useState(valDefault);
  useDebugValue(value)
  function toggleValue(val?: boolean) {
    setVal(prev => {
      typeof val === "boolean" ? prev = val : prev = !prev;
      return prev;
    })
  }

  return [value, toggleValue] as const
}