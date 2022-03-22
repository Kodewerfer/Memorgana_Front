import { useEffect } from "react";
import useTimeout from "./useTimeout";

export default function useDebounce(callback: Function, delay: number, depts: [any]) {
  const { reset, clear } = useTimeout(callback, delay);
  useEffect(reset, [...depts, reset]);
  useEffect(clear, []);
}