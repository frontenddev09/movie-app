import Navbar from "../navbar/navbar";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Spinner from "../spinner/spinner";

const NotFoundPage = lazy(() => import("../../page/not-found-page"));
const HomePage = lazy(() => import("../../page/home-page"));
const DetailedPage = lazy(() => import("../../page/detailed-page"));
const TrandingPage = lazy(() => import("../../page/tranding-page"));
const PopularPage = lazy(() => import("../../page/popular-page"));

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tranding" element={<TrandingPage />} />
          <Route path="/popular" element={<PopularPage />} />
          <Route path="/movie/:movieId" element={<DetailedPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
