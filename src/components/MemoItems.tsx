import { MdAdd } from "react-icons/md";
import IEntry_Related from "../types/IEntry_Related";
import IMemo from "../types/IMemo";
import Styles from "./MemoItems.module.css";

// Memowo List Items
export function Item({ memo }: { memo: IMemo }) {
  return (
    <article className={Styles.item}>
      <h1>
        {/* <Link to={`/${memo._id}`} state={{ bgLocation: parentLocation }}> */}
        {memo.keyword}
        {/* </Link> */}
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
