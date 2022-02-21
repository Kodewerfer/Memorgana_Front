import { useDebugValue, useEffect, useRef } from "react";
import Logger from "../helpers/SimpleLogger";

export default function usePathNameOB(callback: Function) {
  const _pathnameRef = useRef(window.location.pathname);
  useDebugValue(_pathnameRef.current);

  const OB = new MutationObserver(() => {
    if (window.location.pathname === _pathnameRef.current) {
      return;
    }
    Logger.dev("usePathnameOB: calling")
    callback();
  });

  useEffect(() => {
    OB.observe(document, { subtree: true, childList: true });
    return function cleanup() {
      OB.disconnect();
      Logger.dev("usePathnameOB: cleanup")
    };
  }, [])

  useEffect(() => {
    _pathnameRef.current = window.location.pathname;
  });
}