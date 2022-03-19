import { useDebugValue, useEffect, useRef, useState } from "react";
import Logger from "../helpers/SimpleLogger";

export default function usePathNameOB(callback: Function) {
  const [OB, setOB] = useState<MutationObserver>(null!);
  const _pathnameRef = useRef(window.location.pathname);
  useDebugValue(_pathnameRef.current);

  useEffect(() => {
    const OBS = new MutationObserver(() => {
      if (window.location.pathname === _pathnameRef.current) {
        return;
      }
      callback();
    });
    setOB(() => {
      return OBS
    });

  }, [setOB])

  useEffect(() => {
    if (!OB) return;
    _pathnameRef.current = window.location.pathname;
    OB.observe(document, { subtree: true, childList: true });
    return function cleanup() {
      OB.disconnect();
      Logger.dev("usePathnameOB: cleanup")
    };
  });
}