import React, { useRef, useEffect, useCallback } from "react";
import useMemoData from "../hooks/useMemoData";
import Item from "../components/MemoItems";

import Styles from "./Memowo.module.css";
import { ImSortAmountDesc, ImSortAmountAsc } from "react-icons/im";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import ILocationState from "../types/ILocationSate";

type T_UIRef = { [key: string]: any };

function Memowo(props: any) {
  // const { memos, fetchMemos } = useContext(MemoContext); // use context provider, deprecated
  const [memos, fetcheMemos] = useMemoData();

  // store the scroll position
  const innerRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef<number>(0);

  const [memoParams] = useSearchParams();
  const memoID = memoParams.get("ID");

  const currentUI = useRef<T_UIRef>({});

  const lState = useLocation().state as ILocationState;
  useEffect(() => {
    if (lState?.bgLocation) return; // modal
    scrollToTarget();
  }, [memoID, memos]);

  const scrollToTarget = useCallback(() => {
    const innerHTML = innerRef?.current;
    if (!memoID) {
      innerHTML?.scrollTo({
        behavior: "smooth",
        top: 0,
      });
      return;
    }
    const targetItem = currentUI?.current[memoID]?.current as HTMLElement;
    if (!targetItem) return;
    if (!innerHTML) return;
    const yOffset = -innerHTML.getBoundingClientRect().top;
    const y = targetItem.offsetTop + yOffset;
    innerHTML.scrollTo({
      behavior: "smooth",
      top: y,
    });
  }, [memoID]);

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
        {memos.map((memo, i) => {
          const ref = React.createRef(); //kinda of a hack lol
          const UI = (
            <Item
              key={memo._id}
              memo={memo}
              active={memoID === memo._id}
              ref={ref}
            />
          );
          currentUI.current[memo._id] = ref;

          return UI;
        })}
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
