import React, { useState } from "react";
import Styles from "./Layout.module.css";
import {
  Link,
  Outlet,
  useLocation,
  useMatch,
  useNavigate,
  useResolvedPath,
} from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { BiBrain } from "react-icons/bi";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";
// custom hooks
import useToggle from "../hooks/useToggle";
import usePathNameOB from "../hooks/usePathNameOB";
// sidebar operators
import { RouteActions as MemowoActions } from "./Memowo";

type LayoutProps = {
  appSearch: [Boolean, () => void];
};

export default function Layout({ appSearch }: LayoutProps) {
  const [currentLocation, SetCurrentLocation] = useState(
    window.location.pathname
  );
  const [isDarkMode, toggleDarkMode] = useToggle(false);
  const [isSearching, toggleSearching] = appSearch;

  const Navigation = useNavigate();
  const Location = useLocation();

  // nav tracking
  // for sidebar actions
  usePathNameOB(() => {
    SetCurrentLocation((prev) => {
      const pathName = window.location.pathname;
      console.log(pathName);
      if (pathName === "/search") return prev;
      return pathName;
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
        <ul className={Styles.routeActions}>
          {/* Not classy, not at all  */}
          {currentLocation === "/" && <MemowoActions />}
        </ul>
      </nav>
      {/*--- main */}
      <main className={`${Styles.main} ${isDarkMode ? "dark" : ""}`}>
        {/*---- search bar */}
        <div className={`${Styles.header} ${isDarkMode ? "dark" : ""}`}>
          <input
            type="text"
            placeholder="🔎search.."
            className={`${Styles.searchBar} peer`}
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
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <div className={`${Styles.itemNav} ${match && Styles.active} group`}>
      <Link to={to}>{icon}</Link>
      <span className={`${Styles.tooltip}  group-hover:scale-100`}>{text}</span>
    </div>
  );
}
