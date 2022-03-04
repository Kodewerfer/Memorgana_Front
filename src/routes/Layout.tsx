import React, { useState } from "react";
import Styles from "./Layout.module.css";
import { Link, Outlet } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { BiBrain } from "react-icons/bi";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";
// custom hooks
import useToggle from "../hooks/useToggle";
import usePathNameOB from "../hooks/usePathNameOB";
// sidebar operators
import { RouteActions as MemowoActions } from "./Memowo";

export default function Layout() {
  const [currentLocation, SetCurrentLocation] = useState(
    window.location.pathname
  );
  const [isDarkMode, toggleDarkMode] = useToggle(false);
  const [isSearching, toggleSearching] = useToggle(false);

  // nav tracking
  usePathNameOB(() => {
    SetCurrentLocation((prev) => {
      return window.location.pathname;
    });
  });

  return (
    <>
      {/*--- nav */}
      <nav className={`${Styles.nav} ${isDarkMode ? "dark" : ""}`}>
        <ul className={Styles.list}>
          <NavItem
            to="/Memoboard"
            icon={<AiOutlineDashboard size={50} />}
            text={"Memo'board🤖"}
          />
          <NavItem to="/" icon={<BiBrain size={50} />} text={"Memʘωʘ😊"} />
        </ul>
        {/* route spec operations eg sorting */}
        <ul
          className={`${Styles.routeActions} ${
            isSearching ? "scale-0" : "scale-100"
          }`}
        >
          {currentLocation === "/" ? <MemowoActions /> : ""}
        </ul>
        {/* Not classy, not at all  */}
      </nav>
      {/*--- main */}
      <main className={`${Styles.main} ${isDarkMode ? "dark" : ""}`}>
        {/*---- search bar */}
        <div className={`${Styles.header} ${isDarkMode ? "dark" : ""}`}>
          <input
            type="text"
            placeholder="🔎search memos.."
            className={`${Styles.searchBar} peer`}
            onFocus={() => {
              toggleSearching();
            }}
            onBlur={() => {
              toggleSearching();
            }}
          />
          {/*---- dark mode toggle */}
          <span
            onClick={() => {
              toggleDarkMode();
            }}
            className={`${Styles.darkModeToggle} peer-focus:hidden`}
          >
            {isDarkMode ? (
              <MdOutlineDarkMode size={30} />
            ) : (
              <MdDarkMode size={30} />
            )}
          </span>
        </div>

        <Outlet context={{ isSearching }} />
      </main>
    </>
  );
}

// nav item component
function NavItem({
  to,
  icon,
  text = "Default Text",
}: {
  to: string;
  icon: any;
  text: string;
}) {
  const currentLocation = window.location.pathname;

  return (
    <div
      className={`${
        currentLocation === to ? Styles.itemActive : Styles.itemNav
      } group`}
    >
      <Link to={to}>{icon}</Link>
      <span className={`${Styles.tooltip}  group-hover:scale-100`}>{text}</span>
    </div>
  );
}
