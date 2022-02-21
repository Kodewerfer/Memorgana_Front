import { useDebugValue, useState } from "react";

export default function useToggle(valDefault: Boolean) {
  const [value, setVal] = useState(valDefault);
  useDebugValue(value)
  function toggleValue() {
    setVal(prev => {
      return !prev;
    })
    return;
  }

  return [value, toggleValue] as const
}