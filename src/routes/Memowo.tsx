import React from "react";

import useMemoData from "../hooks/useMemoData";
import { useSearchStatus } from "../hooks/useSearchStatus";

import Styles from "./Memowo.module.css";
// types
import IMemo from "../types/IMemo";
import IEntry_Related from "../types/IEntry_Related";

import { MdAdd } from "react-icons/md";
import { ImSortAmountDesc, ImSortAmountAsc } from "react-icons/im";

function Memowo(props: any) {
  // const { memos, fetchMemos } = useContext(MemoContext);
  const [memos, fetcheMemos] = useMemoData();
  const { isSearching } = useSearchStatus();

  return (
    <div className={Styles.inner}>
      <div className={`${isSearching ? Styles.onSearch : Styles.list}`}>
        {memos.map((memo) => (
          <Item key={memo._id} memo={memo} />
        ))}
      </div>
      <p className={Styles.endMark}>--- End ---</p>
    </div>
  );
}

// Memowo List Items
function Item({ memo }: { memo: IMemo }) {
  return (
    <article className={Styles.item}>
      <h1>{memo.keyword}</h1>
      <div className={Styles.related}>
        {memo.entries_related.map((entry) => {
          return <RelatedEntries key={entry._id} entry={entry} />;
        })}
        <NewRelatedEntries />
      </div>
      <p>{memo.description}</p>
    </article>
  );
}

function RelatedEntries({ entry }: { entry: IEntry_Related }) {
  return (
    <span className={Styles.normal}>
      <a href="">{entry.keyword}</a>
    </span>
  );
}

function NewRelatedEntries() {
  return (
    <span className={`${Styles.new} group`}>
      <a href="">
        <MdAdd className="group-hover:animate-ping" size={25} />
      </a>
    </span>
  );
}

// operator for side bar
export function RouteActions({}) {
  const currentLocation = window.location.pathname;

  return (
    <>
      <div className={`${Styles.itemAction} group`}>
        <ImSortAmountDesc size={20} />
        <span className={`${Styles.tooltip}  group-hover:scale-100`}>
          sort by
        </span>
      </div>
      <div className={Styles.subActions}>
        <ImSortAmountAsc size={18} />
        <span className={`${Styles.tooltip}  group-hover:scale-100`}>
          sort by
        </span>
      </div>
    </>
  );
}

export default Memowo;
