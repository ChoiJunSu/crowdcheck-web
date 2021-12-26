import React, { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import OauthCallbackPage from "@pages/oauth/callback";

const App = () => {
  const { pathname } = useLocation();

  const Page = lazy(() => {
    return import(`./pages${pathname}`).catch((error) => {
      return import("./pages/error");
    });
  });

  return (
    <Routes>
      <Route
        path="/*"
        element={
          <Suspense fallback={<div>로딩중..</div>}>
            <Page />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default App;
