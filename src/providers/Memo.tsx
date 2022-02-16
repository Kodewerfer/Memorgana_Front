import React from "react";
import useMemowo from "../hooks/useMemowo";

import IMemo from "../types/IMemo";
import Logger from "../helpers/SimpleLogger";

/**
 * -deprecated-
 * Don't like the potiental wrapper hell structure. used /hooks instead. 
 * Keeping it for reference and future change-of-mind
 */
export interface I_MemoContext {
  memos: IMemo[],
  fetchMemos: () => void,
}


export const MemoContext = React.createContext<I_MemoContext>(null!);
export default function MemoContextProvider({ children }: { children: React.ReactNode }) {
  const [memos, fetchMemos] = useMemowo();
  Logger.dev("Provider");
  return (
    <MemoContext.Provider value={{ memos, fetchMemos }}>{children}</MemoContext.Provider>
  )

}