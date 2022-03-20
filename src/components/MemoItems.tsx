import { forwardRef } from "react";
import { MdAdd } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import IEntry_Related from "../types/IEntry_Related";
import IMemo from "../types/IMemo";
import Styles from "./MemoItems.module.css";

type TItemProps = { memo: IMemo; useCompact?: boolean; active?: boolean };
/**
 * Memowo List Items
 * @param memo data
 * @param useCompact primarily for rendering compact items in the search modal
 */
export function ItemUI(
  { memo, useCompact = false, active = false }: TItemProps,
  ref: any
) {
  const navigate = useNavigate();
  let handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (active) return;
    navigate(`/memo/?ID=${memo._id}`);
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

type TRelatedProps = { memo: IMemo; active?: boolean };

function Related({ memo, active = false }: TRelatedProps) {
  const navigate = useNavigate();
  const currentLocation = useLocation();
  return (
    <div className={Styles.related}>
      {memo.entries_related.map((entry) => {
        return <RelatedEntries key={entry._id} entry={entry} />;
      })}
      {/* new related entry */}
      <span
        onClick={() => {
          navigate("/search", {
            state: { bgLocation: currentLocation, context: "relatedEntry" },
          });
        }}
        className={`${Styles.newRelated} group ${
          active ? Styles.entryNormal : Styles.entryHid
        }`}
      >
        <MdAdd className="group-hover:animate-ping" size={25} />
      </span>
    </div>
  );
}

function RelatedEntries({ entry }: { entry: IEntry_Related }) {
  return (
    <span className={`${Styles.relatedItem} ${Styles.entryNormal}`}>
      <Link to={`/memo/?ID=${entry._id}`}>{entry.keyword}</Link>
    </span>
  );
}
