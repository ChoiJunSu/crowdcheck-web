import { lazy, Suspense, useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "@components/base/Header";
import Footer from "@components/base/Footer";
import Loading from "@components/base/Loading";
import ReactGA from "react-ga";

const App = () => {
  const { pathname, search } = useLocation();
  const [gaInitialized, setGaInitialized] = useState<boolean>(false);

  const Page = lazy(() => {
    return import(`./pages${pathname}`).catch((error) => {
      return import("./pages/error");
    });
  });

  // Google Analytics
  useEffect(() => {
    if (!window.location.href.includes("localhost"))
      ReactGA.initialize(
        process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID as string
      );
    setGaInitialized(true);
  }, []);

  useEffect(() => {
    if (gaInitialized) ReactGA.pageview(pathname + search);
  }, [gaInitialized, pathname, search]);

  return (
    <Routes>
      <Route
        path="/*"
        element={
          <div className="flex flex-col h-screen px-4 sm:px-6 lg:px-16">
            <div className="mb-4 sm:mb-6 lg:mb-10">
              <Header />
            </div>
            <div className="flex-grow">
              <Suspense fallback={<Loading />}>
                <Page />
              </Suspense>
            </div>
            <div className="mt-20">
              <Footer />
            </div>
          </div>
        }
      />
    </Routes>
  );
};

export default App;
