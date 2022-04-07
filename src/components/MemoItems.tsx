import { Link, useLocation, useNavigate } from "react-router-dom";
import IEntry_Related from "../types/IEntry_Related";
import IMemo from "../types/IMemo";

import Styles from "./MemoItems.module.css";
import {
  forwardRef,
  useCallback,
  useDebugValue,
  useEffect,
  useState,
} from "react";
import { MdAdd } from "react-icons/md";
import useKeybind from "../hooks/useKeybind";
import Logger from "../helpers/SimpleLogger";
import useMemoItem from "../hooks/useMemoItem";

type TItemProps = {
  memo: IMemo;
  useCompact?: boolean;
  isAactive?: boolean;
};
/**
 * Memowo List Items
 * Used in all cases involving displaying individual data.
 * @param memo props, data
 * @param useCompact primarily for rendering compact items in the search modal
 */
export function ItemUI(
  { memo, useCompact = false, isAactive = false }: TItemProps,
  ref: any
) {
  const navigate = useNavigate();
  // TODO: remove this, use a tag
  let handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isAactive) return;
    navigate(`/memo/?ID=${memo._id}`);
  };

  // make a deep copy to prevent contamination.
  const [itemData, setItemData, fetchItem, patchMemoItem] = useMemoItem({
    ...memo,
  });

  // while editing, what user sees should always and only be what is (successfully) stored on DB.
  useEffect(() => {
    if (isAactive) fetchItem();
  }, []);
  useEffect(() => {
    if (isAactive) fetchItem();
  }, [isAactive]);

  useDebugValue(itemData);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setItemData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [setItemData]
  );

  const handlePatch = useCallback(() => {
    if (!patchMemoItem || !itemData) return;
    patchMemoItem(itemData._id);
    fetchItem();
  }, [fetchItem, patchMemoItem]);

  // manual save
  useKeybind((e: KeyboardEvent) => {
    if (!isAactive) return;
    if (e.code === "KeyS" && e.ctrlKey === true) {
      e.preventDefault();
      handlePatch();
    }
  });

  return (
    <article
      className={useCompact ? Styles.itemCompact : Styles.item}
      ref={ref}
      onClick={(e) => handleClick(e)}
    >
      <h1 className={useCompact ? Styles.titleCompact : Styles.title}>
        <input
          type="text"
          disabled={!isAactive}
          name="keyword"
          value={itemData.keyword}
          onChange={handleChange}
          onBlur={handlePatch}
        />
      </h1>
      {!useCompact && <Related memo={itemData} active={isAactive} />}
      <p>
        <input
          type="text"
          name="description"
          onChange={handleChange}
          onBlur={handlePatch}
          value={itemData.description}
        />
      </p>
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
            state: { bgLocation: currentLocation, context: "RelatedEntry" },
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
