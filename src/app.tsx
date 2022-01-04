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
          <Suspense fallback={<Loading />}>
            <Header />
            <Page />
            <Footer />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default App;
