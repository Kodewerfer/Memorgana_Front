/**
 * The Search component
 * Functions at APP level
 * accessible via /search, show a modal dialog when a bgLocation is set,
 * show SearchResult.tsx otherwise
 */

import React, { useDebugValue, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
// hooks
import useMemoData from "../hooks/useMemoData";
// components
import Item from "../components/MemoItems";

import ILocationState from "../types/ILocationSate";
import Logger from "../helpers/SimpleLogger";

import Styles from "./Search.module.css";
import { MdClose } from "react-icons/md";
import { SiSpinrilla } from "react-icons/si";
import useDebounce from "../hooks/useDebounce";
import useKeybind from "../hooks/useKeybind";
import filterData from "../helpers/filterData";
import { lstat } from "fs/promises";

export default function SearchModal() {
  const [searchInput, setSearchInput] = useState("");
  const [searchModalParams] = useSearchParams();

  const [memos, fetcheMemos] = useMemoData();
  const [memosFiltered, setMemoFiltered] = useState(memos);
  useEffect(() => {
    setSearchInput((prev) => "");
    setMemoFiltered((prev) => memos);
  }, [memos]);

  // get the "modal background", if applies.
  const lState = useLocation().state as ILocationState;
  const isEditingRelatedEntries =
    lState.context === "RelatedEntry" ? true : false;

  // from "new related entry"
  let backgroundMemoID: string | null;
  const [memoSearchParams] = useSearchParams(lState.bgLocation?.search);
  if (
    lState.bgLocation?.pathname === "/memo/" ||
    lState.bgLocation?.pathname === "/memo"
  ) {
    backgroundMemoID = memoSearchParams.get("ID");
    // Logger.dev("%cBG Memo ID: " + backgroundMemoID, "red");
  }

  // filter data
  useDebounce(
    () => {
      Logger.dev("%cSearching", "red");
      refSpinner.current.classList.add("scale-0");
      // filter data
      setMemoFiltered((prev) => {
        return filterData(memos, {
          input: searchInput,
          flat: isEditingRelatedEntries,
        });
      });
    },
    800,
    [searchInput]
  );

  const navigation = useNavigate();
  const onDismiss = () => {
    return navigation(-1);
  };

  const refSpinner = useRef<HTMLElement>(null!);

  useKeybind((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onDismiss();
    }
  });

  return (
    <div className={Styles.modal} onClick={() => onDismiss()}>
      <div className={Styles.inner} onClick={(e) => e.stopPropagation()}>
        <div className={Styles.header}>
          <input
            type="text"
            placeholder="🔎search.."
            autoFocus
            className={`${Styles.searchBar}`}
            value={searchInput}
            onChange={(e) => {
              setSearchInput((prev) => {
                refSpinner.current.classList.remove("scale-0");
                return e.target.value;
              });
            }}
          />
          <span className={`${Styles.floatSpinner} scale-0`} ref={refSpinner}>
            <SiSpinrilla size={28} className={"animate-spin"} />
          </span>
          <span className={Styles.exit} onClick={() => onDismiss()}>
            <MdClose size={28} />
          </span>
        </div>

        <div className={Styles.results}>
          {memosFiltered.map((memo) => (
            <Item key={memo._id} memo={memo} useCompact={true} />
          ))}
        </div>
      </div>
    </div>
  );
}
