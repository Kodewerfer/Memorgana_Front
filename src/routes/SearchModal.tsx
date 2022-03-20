/**
 * The Search component
 * Functions at APP level
 * accessible via /search, show a modal dialog when a bgLocation is set,
 * show SearchResult.tsx otherwise
 */

import React from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
// hooks
import useMemoData from "../hooks/useMemoData";
// components
import Item from "../components/MemoItems";

import ILocationState from "../types/ILocationSate";

import Styles from "./Search.module.css";
import { MdClose } from "react-icons/md";
import Logger from "../helpers/SimpleLogger";

export default function SearchModal() {
  const [memos, fetcheMemos] = useMemoData();
  const [searchModalParams] = useSearchParams();

  // get the "modal background", if applies.
  const lState = useLocation().state as ILocationState;
  Logger.dev("%cSearch modal lState: ", "green");
  Logger.dev(lState);

  // from "new related entry"
  let backgroundMemoID: string | null;
  const [memoSearchParams] = useSearchParams(lState.bgLocation?.search);
  if (
    lState.bgLocation?.pathname === "/memo/" ||
    lState.bgLocation?.pathname === "/memo"
  ) {
    backgroundMemoID = memoSearchParams.get("ID");
    Logger.dev("%cBG Memo ID: " + backgroundMemoID, "red");
  }

  const navigation = useNavigate();
  const onDismiss = () => {
    return navigation(-1);
  };

  return (
    <div className={Styles.modal} onClick={() => onDismiss()}>
      <div className={Styles.inner} onClick={(e) => e.stopPropagation()}>
        <div className={Styles.header}>
          <input
            type="text"
            placeholder="🔎search.."
            autoFocus
            className={`${Styles.searchBar}`}
          />
          <span className={Styles.exit} onClick={() => onDismiss()}>
            <MdClose size={28} />
          </span>
        </div>

        <div className={Styles.results}>
          {memos.map((memo) => (
            <Item key={memo._id} memo={memo} useCompact={true} />
          ))}
        </div>
      </div>
    </div>
  );
}
