import Dialog from "@reach/dialog";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import { MdClose } from "react-icons/md";

import Styles from "./Search.module.css";

type SearchProps = {
  appSearch: [Boolean, () => void];
};

export default function SearchModal({ appSearch }: SearchProps) {
  const { memoId } = useParams();
  const navigation = useNavigate();

  const [isSearching, toggleSearching] = appSearch;

  function onDismiss() {
    toggleSearching();
    return navigation(-1);
  }

  return (
    <div className={Styles.modal} onClick={() => onDismiss()}>
      <div className={Styles.inner} onClick={(e) => e.stopPropagation()}>
        <div className={Styles.header}>
          {" "}
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

        <div className={Styles.results}>123</div>
      </div>
    </div>
  );
}
