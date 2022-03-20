/**
 * The overall-layout component
 * using <Outlet> from React Router
 * App level state isSearching is passed down to child component via <Outlet> context
 */

import React, { useState } from "react";
// custom hooks
import useToggle from "../hooks/useToggle";
// sidebar operators
import { RouteActions as MemowoActions } from "./Memowo";

import Styles from "./Layout.module.css";
import {
  Link,
  Outlet,
  useLocation,
  useMatch,
  useNavigate,
  useResolvedPath,
} from "react-router-dom";
import Logger from "../helpers/SimpleLogger";

import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";
import { AiOutlineDashboard } from "react-icons/ai";
import { BiBrain } from "react-icons/bi";

type TLayoutProps = {
  appSearchStatus: Boolean;
};

export default function Layout({ appSearchStatus: appSearch }: TLayoutProps) {
  const [isDarkMode, toggleDarkMode] = useToggle(false);
  const isSearching = appSearch;

  const Navigation = useNavigate();
  const currentLocation = useLocation();

  return (
    <>
      {/*--- sidebar navigations */}
      <nav className={`${Styles.nav} ${isDarkMode ? "dark" : ""}`}>
        <ul className={Styles.list}>
          <NavItem
            to="/Memoboard"
            icon={<AiOutlineDashboard size={50} />}
            text={"Memo'board🤖"}
          />
          <NavItem to="/memo" icon={<BiBrain size={50} />} text={"Memʘωʘ😊"} />
        </ul>
        {/* route spec operations eg sorting */}
        <ul className={Styles.routeActions}>
          {/* {currentPathname === "/" && <MemowoActions />} */}
        </ul>
      </nav>
      {/*--- main */}
      <main className={`${Styles.main} ${isDarkMode ? "dark" : ""}`}>
        {/*---- search bar */}
        <div className={`${Styles.header} ${isDarkMode ? "dark" : ""}`}>
          <input
            type="text"
            placeholder="🔎search.."
            className={`${Styles.searchBar} ${isSearching && "scale-0"}`}
            onFocus={(e) => {
              Navigation("/search", { state: { bgLocation: currentLocation } });
            }}
          />
          {/*---- dark mode toggle */}
          <span
            onClick={() => {
              toggleDarkMode();
            }}
            className={`${Styles.darkModeToggle} ${isSearching && "hidden"}`}
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

type TNavItemProps = {
  to: string;
  icon: any;
  text: string;
};

// nav item component
function NavItem({ to, icon, text = "Default Text" }: TNavItemProps) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <div className={`${Styles.itemNav} ${match && Styles.active} group`}>
      <Link to={to}>{icon}</Link>
      <span className={`${Styles.tooltip}  group-hover:scale-100`}>{text}</span>
    </div>
  );
}
