import React, { useRef } from "react";

import useMemoData from "../hooks/useMemoData";

import Styles from "./Memowo.module.css";
// types

import { ImSortAmountDesc, ImSortAmountAsc } from "react-icons/im";

import { Item } from "../components/MemoItems";

function Memowo(props: any) {
  // const { memos, fetchMemos } = useContext(MemoContext); //deprecated
  const [memos, fetcheMemos] = useMemoData();

  // store the scroll position
  const innerRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef<number>(0);

  // for modal
  // let location = useLocation();

  // scroll to previous postion after searching
  // useEffect(() => {
  //   if (isSearching) return;
  //   innerRef.current?.scrollTo({
  //     top: scrollPositionRef.current,
  //   });
  //   Logger.dev(`scrolling to: ${scrollPositionRef.current}`);
  // }, [isSearching]);

  return (
    <div
      className={Styles.inner}
      ref={innerRef}
      onScroll={() => {
        // if (isSearching) return;
        scrollPositionRef.current = innerRef.current?.scrollTop ?? 0;
      }}
    >
      <div className={`${Styles.list}`}>
        {memos.map((memo) => (
          <Item key={memo._id} memo={memo} />
        ))}
      </div>
      <p className={Styles.endMark}>--- End ---</p>
    </div>
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
