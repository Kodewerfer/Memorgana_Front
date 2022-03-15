import React from "react";
import { Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
// app routes
import Memowo from "./routes/Memowo";
import MemoDetail from "./routes/MemoDetail";
import Memoboard from "./routes/Memoboard";
import Layout from "./routes/Layout";
import SearchModal from "./routes/Search";
import SearchResult from "./routes/SearchResults";
import NotFound from "./routes/NotFound";
// helpers
import Logger, { LoggerEnvs } from "./helpers/SimpleLogger";
import { setQueryURI } from "./helpers/URIHelper";
import useToggle from "./hooks/useToggle";

const URI = "";
const URI_DEV = "http://localhost:3004/memo";

let fetchURI = URI;

function App() {
  if (window?.location?.hostname === "localhost") {
    Logger.currentEnv = LoggerEnvs.dev;
    fetchURI = URI_DEV;
    setQueryURI(fetchURI);
    Logger.dev("Enviroment is set to dev");
  }

  Logger.dev("APP rendering.");

  let location = useLocation();
  let lState = location.state as { bgLocation?: Location };

  const [isSearching, toggleSearching] = useToggle(false);

  // for modal

  return (
    <>
      <Routes location={lState?.bgLocation || location}>
        {/* ---layout route */}
        <Route
          path="/"
          element={<Layout appSearch={[isSearching, toggleSearching]} />}
        >
          {/* default child component for <Outlet/> in  <Layout/> */}
          <Route index element={<Memowo />} />
          {/* detail view for each memo */}
          <Route path="search" element={<SearchResult />}>
            <Route path=":params" element={<SearchResult />} />
          </Route>
          <Route path=":memoId" element={<MemoDetail />} />
          <Route path="memoboard" element={<Memoboard />} />
          <Route path="*" element={<NotFound />} />
          {/* catch all route as fallback*/}
        </Route>
        {/* ---layout route ends */}
      </Routes>

      {/* Modal for memo detail */}
      {lState?.bgLocation && (
        <Routes>
          <Route
            path="search"
            element={<SearchModal appSearch={[isSearching, toggleSearching]} />}
          >
            <Route
              path=":params"
              element={
                <SearchModal appSearch={[isSearching, toggleSearching]} />
              }
            />
          </Route>
        </Routes>
      )}
    </>
  );
}

export default App;
