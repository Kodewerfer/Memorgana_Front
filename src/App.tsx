import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
// app routes
import Memowo from "./routes/Memowo";
import Memoboard from "./routes/Memoboard";
import Layout from "./routes/Layout";
import NotFound from "./routes/NotFound";
// helpers
import Logger, { LoggerEnvs } from "./helpers/SimpleLogger";
import { setQueryURI } from "./helpers/URIHelper";

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

  return (
    <BrowserRouter>
      <Routes>
        {/* ---layout route */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Memowo />} />{" "}
          {/* default child component for <Outlet/> in  <Layout/> */}
          <Route path="/memoboard" element={<Memoboard />} />
          <Route path="*" element={<NotFound />} />{" "}
          {/* catch all route as fallback*/}
        </Route>
        {/* ---layout route ends */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
