import React from "react";
import ErrorBoundary from "../Components/error-boundary/error-boundary";
import Hero from "../Components/hero/hero";
import RowMovies from "../Components/row-movies/row-movies";

const HomePage = () => {
  return (
    <>
      <ErrorBoundary>
        <Hero />
      </ErrorBoundary>
      <ErrorBoundary>
        <RowMovies />
      </ErrorBoundary>
    </>
  );
};

export default HomePage;
