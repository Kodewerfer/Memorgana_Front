import React from "react";
import styles from "./Layout.module.css";
import { Link, Outlet } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { BiBrain } from "react-icons/bi";
import { CgDarkMode } from "react-icons/cg";

export default function Layout() {
  return (
    <>
      <div className={styles.search}>
        <input
          type="text"
          placeholder="search memos.."
          className={`${styles.searchBar} peer`}
        />
        <span className={`${styles.darkMode} peer-focus:scale-0`}>
          <CgDarkMode size={30} />
        </span>
      </div>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <Items
            to="/Memoboard"
            icon={<AiOutlineDashboard size={50} />}
            text={"Memo'board"}
          />
          <Items to="/" icon={<BiBrain size={50} />} text={"Memʘωʘ"} />
        </ul>
      </nav>
      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  );
}

// nav item component
function Items({
  to,
  icon,
  text = "Default Text",
}: {
  to: string;
  icon: any;
  text: string;
}) {
  return (
    <div className={`${styles.item} group`}>
      <Link to={to}>{icon}</Link>
      <span className={`${styles.tooltip} group-hover:scale-100`}>{text}</span>
    </div>
  );
}
