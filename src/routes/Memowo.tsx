import React, { useRef } from "react";
import useMemoData from "../hooks/useMemoData";
import { Item } from "../components/MemoItems";

import Styles from "./Memowo.module.css";
import { ImSortAmountDesc, ImSortAmountAsc } from "react-icons/im";

function Memowo(props: any) {
  // const { memos, fetchMemos } = useContext(MemoContext); // use context provider, deprecated
  const [memos, fetcheMemos] = useMemoData();

  // store the scroll position
  const innerRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef<number>(0);

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
export function RouteActions() {
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
