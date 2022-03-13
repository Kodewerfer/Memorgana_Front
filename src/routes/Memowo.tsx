import React, { useState, useRef, useDebugValue, useEffect } from "react";

import useMemoData from "../hooks/useMemoData";
import { useSearchStatus } from "../hooks/useSearchStatus";

import Styles from "./Memowo.module.css";
// types
import IMemo from "../types/IMemo";
import IEntry_Related from "../types/IEntry_Related";

import { MdAdd } from "react-icons/md";
import { ImSortAmountDesc, ImSortAmountAsc } from "react-icons/im";
import Logger from "../helpers/SimpleLogger";
import { Link, useLocation, Location } from "react-router-dom";

function Memowo(props: any) {
  // const { memos, fetchMemos } = useContext(MemoContext); //deprecated
  const [memos, fetcheMemos] = useMemoData();
  const { isSearching } = useSearchStatus();

  // store the scroll position
  const innerRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef<number>(0);

  // for modal
  let location = useLocation();

  // scroll to previous postion after searching
  useEffect(() => {
    if (isSearching) return;
    innerRef.current?.scrollTo({
      top: scrollPositionRef.current,
    });
    Logger.dev(`scrolling to: ${scrollPositionRef.current}`);
  }, [isSearching]);

  return (
    <div
      className={Styles.inner}
      ref={innerRef}
      onScroll={() => {
        if (isSearching) return;
        scrollPositionRef.current = innerRef.current?.scrollTop ?? 0;
      }}
    >
      <div className={`${isSearching ? Styles.onSearch : Styles.list}`}>
        {memos.map((memo) => (
          <Item key={memo._id} memo={memo} parentLocation={location} />
        ))}
      </div>
      <p className={Styles.endMark}>--- End ---</p>
    </div>
  );
}

// Memowo List Items
function Item({
  memo,
  parentLocation,
}: {
  memo: IMemo;
  parentLocation?: Location;
}) {
  return (
    <article className={Styles.item}>
      <h1>
        <Link to={`/${memo._id}`} state={{ bgLocation: parentLocation }}>
          {memo.keyword}
        </Link>
      </h1>
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
