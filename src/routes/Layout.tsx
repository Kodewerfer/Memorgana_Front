/**
 * The overall-layout component
 * using <Outlet> from React Router
 * App level state isSearching is passed down to child component via <Outlet> context
 */

import React, { useState } from "react";
// custom hooks
import useToggle from "../hooks/useToggle";
import usePathNameOB from "../hooks/usePathNameOB";
// sidebar operators
import { RouteActions as MemowoActions } from "./Memowo";

import Styles from "./Layout.module.css";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { BiBrain } from "react-icons/bi";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";

type LayoutProps = {
  appSearch: [Boolean, () => void];
};

export default function Layout({ appSearch }: LayoutProps) {
  const [currentPathname, SetCurrentLocation] = useState(
    window.location.pathname
  );
  const [isDarkMode, toggleDarkMode] = useToggle(false);
  const [isSearching, toggleSearching] = appSearch;

  const Navigation = useNavigate();
  const Location = useLocation();

  // nav tracking
  // for rendering the correct sidebar actions
  usePathNameOB(() => {
    SetCurrentLocation((prev) => {
      const pathName = window.location.pathname;
      if (pathName === "/search") return prev; //on search modal
      return pathName;
    });
  });

  return (
    <>
      {/*--- sidebar navigations */}
      <nav className={`${Styles.nav} ${isDarkMode ? "dark" : ""}`}>
        <ul className={Styles.list}>
          <NavItem
            to="/Memoboard"
            icon={<AiOutlineDashboard size={50} />}
            text={"Memo'board🤖"}
            CurrentPathname={currentPathname}
          />
          <NavItem
            to="/"
            icon={<BiBrain size={50} />}
            text={"Memʘωʘ😊"}
            CurrentPathname={currentPathname}
          />
        </ul>
        {/* route spec operations eg sorting */}
        <ul className={Styles.routeActions}>
          {currentPathname === "/" && <MemowoActions />}
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
              toggleSearching();
              Navigation("/search", { state: { bgLocation: Location } });
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

type NavItemProps = {
  to: string;
  icon: any;
  text: string;
  CurrentPathname: string; // to make sure the search modal don't interfere with active state.
};

// nav item component
function NavItem({
  to,
  icon,
  text = "Default Text",
  CurrentPathname,
}: NavItemProps) {
  // let resolved = useResolvedPath(to);
  // let match = useMatch({ path: resolved.pathname, end: true });

  const isActive = CurrentPathname === to;

  return (
    <div className={`${Styles.itemNav} ${isActive && Styles.active} group`}>
      <Link to={to}>{icon}</Link>
      <span className={`${Styles.tooltip}  group-hover:scale-100`}>{text}</span>
    </div>
  );
}
