/**
 * The Search component
 * Functions at APP level
 * accessible via /search, show a modal dialog when a bgLocation is set,
 * show SearchResult.tsx otherwise
 */

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
// hooks
import useMemoData from "../hooks/useMemoData";
// components
import Item from "../components/MemoItems";

import Styles from "./Search.module.css";
import { MdClose } from "react-icons/md";

export default function SearchModal() {
  const navigation = useNavigate();
  const [memos, fetcheMemos] = useMemoData();

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
