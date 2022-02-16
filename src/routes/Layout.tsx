import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <nav className="relative top-0 m-0 flex h-screen flex-col flex-wrap overflow-auto bg-slate-800 pr-2 text-white">
        <div className="">
          <Link to="/Memoboard" className="w-full truncate">
            Memo'board
          </Link>
        </div>
        <div className="">
          <Link to="/">Memowo</Link>
        </div>
      </nav>
      <main className="overflow-y-auto pl-5">
        <Outlet />
      </main>
    </>
  );
}
