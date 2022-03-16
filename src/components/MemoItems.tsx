import { MdAdd } from "react-icons/md";
import IEntry_Related from "../types/IEntry_Related";
import IMemo from "../types/IMemo";
import Styles from "./MemoItems.module.css";

type ItemProps = { memo: IMemo; useCompact?: boolean };
/**
 * Memowo List Items
 * @param memo data
 * @param useCompact primarily for rendering compact items in the search modal
 */
export function Item({ memo, useCompact = false }: ItemProps) {
  return (
    <article className={useCompact ? Styles.itemCompact : Styles.item}>
      <h1 className={useCompact ? Styles.titleCompact : Styles.title}>
        {memo.keyword}
      </h1>
      {!useCompact && <Related memo={memo} />}
      <p>{memo.description}</p>
    </article>
  );
}

type RelatedProps = { memo: IMemo };

function Related({ memo }: RelatedProps) {
  return (
    <div className={Styles.related}>
      {memo.entries_related.map((entry) => {
        return <RelatedEntries key={entry._id} entry={entry} />;
      })}
      <NewRelatedEntries />
    </div>
  );
}

function RelatedEntries({ entry }: { entry: IEntry_Related }) {
  return (
    <span className={Styles.normal}>
      <a href="test">{entry.keyword}</a>
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
