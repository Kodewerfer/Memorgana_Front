import { forwardRef } from "react";
import { MdAdd } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import IEntry_Related from "../types/IEntry_Related";
import IMemo from "../types/IMemo";
import Styles from "./MemoItems.module.css";

type T_ItemProps = { memo: IMemo; useCompact?: boolean; active?: boolean };
/**
 * Memowo List Items
 * @param memo data
 * @param useCompact primarily for rendering compact items in the search modal
 */
export function ItemUI(
  { memo, useCompact = false, active = false }: T_ItemProps,
  ref: any
) {
  const nav = useNavigate();
  let handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (active) return;
    nav(`/memo/?ID=${memo._id}`);
  };

  return (
    <article
      className={useCompact ? Styles.itemCompact : Styles.item}
      ref={ref}
      onClick={(e) => handleClick(e)}
    >
      <h1 className={useCompact ? Styles.titleCompact : Styles.title}>
        {memo.keyword}
      </h1>
      {!useCompact && <Related memo={memo} active={active} />}
      <p>{memo.description}</p>
    </article>
  );
}

const Item = forwardRef(ItemUI);

export default Item;

type T_RelatedProps = { memo: IMemo; active?: boolean };

function Related({ memo, active = false }: T_RelatedProps) {
  return (
    <div className={Styles.related}>
      {memo.entries_related.map((entry) => {
        return <RelatedEntries key={entry._id} entry={entry} />;
      })}
      {/* new related entry */}
      <span
        className={`${Styles.newRelated} group ${
          active ? Styles.entryNormal : Styles.entryHid
        }`}
      >
        <a href="">
          <MdAdd className="group-hover:animate-ping" size={25} />
        </a>
      </span>
    </div>
  );
}

function RelatedEntries({ entry }: { entry: IEntry_Related }) {
  return (
    <span className={`${Styles.relatedItem} ${Styles.entryNormal}`}>
      <a href="test">{entry.keyword}</a>
    </span>
  );
}
