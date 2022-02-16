import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="not-found">
      <p>Path not found</p>

      <Link to="/">
        <p>return to index</p>
      </Link>
    </div>
  );
}
