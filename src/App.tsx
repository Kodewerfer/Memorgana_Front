import React from "react";
import {
  Routes,
  Route,
  useLocation,
  useMatch,
  useResolvedPath,
} from "react-router-dom";
// app routes
import Memowo from "./routes/Memowo";
import Memoboard from "./routes/Memoboard";
import Layout from "./routes/Layout";
import SearchModal from "./routes/Search";
import SearchResult from "./routes/SearchResults";
import NotFound from "./routes/NotFound";
// helpers
import Logger, { LoggerEnvs } from "./helpers/SimpleLogger";
import { setQueryURI } from "./helpers/URIHelper";
import useToggle from "./hooks/useToggle";
import usePathNameOB from "./hooks/usePathNameOB";
import { useEffect } from "react";

const URI = "";
const URI_DEV = "http://localhost:3004/memo";

let fetchURI = URI;

if (window?.location?.hostname === "localhost") {
  Logger.currentEnv = LoggerEnvs.dev;
  fetchURI = URI_DEV;
  setQueryURI(fetchURI);
  Logger.dev("Enviroment is set to dev");
}

function App() {
  Logger.dev("APP rendering.");

  let location = useLocation();
  let lState = location.state as { bgLocation?: Location };

  const [isSearching, toggleAppSearch] = useToggle(false);

  const searchPath = useResolvedPath("/search");
  let isCurrentlySearching = useMatch({ path: searchPath.pathname, end: true });
  useEffect(() => {
    if (isCurrentlySearching) {
      return toggleAppSearch(true);
    }
    return toggleAppSearch(false);
  });

  return (
    <>
      <Routes location={lState?.bgLocation || location}>
        {/* ---layout route */}
        <Route path="/" element={<Layout appSearchStatus={isSearching} />}>
          {/* default child component for <Outlet/> in  <Layout/> */}
          <Route index element={<Memowo />} />
          <Route path="memoboard" element={<Memoboard />} />
          {/* search/search modal */}
          <Route path="search" element={<SearchResult />}>
            <Route path=":params" element={<SearchResult />} />
          </Route>
          {/* detail view for each memo */}
          <Route path=":memoId" element={<Memowo />} />
          {/* catch all route as fallback*/}
          <Route path="*" element={<NotFound />} />
        </Route>
        {/* ---layout route ends */}
      </Routes>

      {/* Modal for memo detail */}
      {lState?.bgLocation && (
        <Routes>
          <Route
            path="search"
            element={<SearchModal appSearchStatus={isSearching} />}
          >
            <Route
              path=":params"
              element={<SearchModal appSearchStatus={isSearching} />}
            />
          </Route>
        </Routes>
      )}
    </>
  );
}

export default App;
