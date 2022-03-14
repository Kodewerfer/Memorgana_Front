import Dialog from "@reach/dialog";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import Styles from "./MemoModal.module.css";

export default function SearchModal() {
  const { memoId } = useParams();
  const navigation = useNavigate();

  function onDismiss() {
    return navigation(-1);
  }

  return <div>modal</div>;
}
