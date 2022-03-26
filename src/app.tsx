import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "@components/base/Header";
import Footer from "@components/base/Footer";
import Loading from "@components/base/Loading";

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
          <div className="flex flex-col h-screen px-4 sm:px-6 lg:px-8">
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
