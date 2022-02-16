import React from "react";

import useMemowo from "../hooks/useMemowo";

function Memowo(props: any) {
  // const { memos, fetchMemos } = useContext(MemoContext);
  const [memos, fetcheMemos] = useMemowo();

  return (
    <>
      memowo
      {/* <button onClick={() => fetcheMemos()}>refresh</button> */}
      {memos.map((memo) => (
        <li className="memo" key={memo._id}>
          {memo.keyword}|||{memo.description}
        </li>
      ))}
    </>
  );
}

export default Memowo;
