// import React, { useEffect, useState } from "react";
// import { Modal } from "react-responsive-modal";
// import "react-responsive-modal/styles.css";
// import useMovieService from "../../serveices/movie-service";
// import Error from "../error/error";
// import MovieInfo from "../movie-info/movie-info";
// import RowMoviesItem from "../row-movies-item/row-movies-item";
// import Spinner from "../spinner/spinner";
// import "./row-movies.scss";

// const RowMovies = () => {
//   let [open, setOpen] = useState(false);
//   let [movies, setMovies] = useState([]);
//   let [movieId, setMovieId] = useState(null);
//   let [pageId, setPageId] = useState(2);
//   let [newItemLoading, setNewItemLoading] = useState(false);

//   const { getTrandingMovies, error, loading } = useMovieService();

//   useEffect(() => getTrendingMovies(), []);

//   const onClose = () => setOpen(false);
//   const onOpen = (id) => {
//     setOpen(true);
//     setMovieId(id);
//   };

//   const getTrendingMovies = (page) => {
//     getTrandingMovies(page)
//       .then((res) => setMovies(res))
//       .finally(() => setNewItemLoading(false));
//   };
//   const increasePage = () => {
//     setNewItemLoading(true);
//     setPageId((state) => ++state);
//     getTrendingMovies(pageId);
//   };
//   const decreasePage = () => {
//     setNewItemLoading(true);
//     if (pageId === 2) {
//       setPageId(487);
//     }
//     setPageId((state) => --state);
//     getTrendingMovies(pageId);
//   };

//   const loadingContent = loading ? (
//     <div className="spinner-wrapper">
//       <Spinner />
//     </div>
//   ) : null;

//   const errorContent = error ? (
//     <div className="error-wrapper">
//       <Error />
//     </div>
//   ) : null;

//   const movieContent = !(loading || error)
//     ? movies.map((movie) => (
//         <RowMoviesItem key={movie.id} movie={movie} onToggleOpen={onOpen} />
//       ))
//     : null;

//   return (
//     <div className="app__rowmovie">
//       <div className="app__rowmovie-top">
//         <div className="app__rowmovie-top__title">
//           <img src="/tranding.svg" alt="" />
//           <h1>Trending</h1>
//         </div>
//         <div className="hr" />
//         <a href="#">See more</a>
//       </div>

//       <div className="app__rowmovie-lists">
//         {loadingContent}
//         {errorContent}
//         {movieContent}
//       </div>
//       <div className="page">
//         <button
//           disabled={newItemLoading}
//           className="btn btn__primary"
//           onClick={decreasePage}
//         >
//           {"<-"}
//         </button>
//         <button disabled={newItemLoading} className="btn btn__secondary">
//           {pageId - 1}
//         </button>
//         <button
//           disabled={newItemLoading}
//           className="btn btn__primary"
//           onClick={increasePage}
//         >
//           {"->"}
//         </button>
//       </div>
//       <Modal open={open && "open"} onClose={onClose}>
//         <MovieInfo movieId={movieId} />
//       </Modal>
//     </div>
//   );
// };

// export default RowMovies;

import { useEffect, useState } from "react";
import "react-responsive-modal/styles.css";
import useMovieService from "../../services/movie-service";
import Error from "../error/error";
import RowMoviesItem from "../row-movies-item/row-movies-item";
import Spinner from "../spinner/spinner";
import "./row-movies.scss";
import { useLocation } from "react-router-dom";
import { Modal } from "react-responsive-modal";
import MovieInfo from "../movie-info/movie-info";

const RowMovies = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(2);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [movieId, setMovieId] = useState(null);

  const onClose = () => setOpen(false);
  const onToggleOpen = (movieId) => {
    setOpen(true);
    setMovieId(movieId);
  };

  const { pathname } = useLocation();

  const { getTrandingMovies, getPopularMovies, loading, error, clearError } =
    useMovieService();

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = (page) => {
    clearError();
    if (pathname === "/popular") {
      getPopularMovies(page)
        .then((res) => setMovies((movies) => [...movies, ...res]))
        .finally(() => setNewItemLoading(false));
    } else {
      getTrandingMovies(page)
        .then((res) => setMovies((movies) => [...movies, ...res]))
        .finally(() => setNewItemLoading(false));
    }
  };

  const getMoreMovies = () => {
    setNewItemLoading(true);
    setPage((page) => page + 1);
    getMovies(page);
  };

  const errorContent = error ? <Error /> : null;
  const loadingContent = loading ? <Spinner /> : null;

  return (
    <div className="rowmovies">
      <div className="rowmovies__top">
        <div className="rowmovies__top-title">
          <img src="/tranding.svg" alt="" />
          <h1>{pathname === "/popular" ? "Popular" : "Tranding"}</h1>
        </div>
        <div className="hr" />
        <a href="#">See more</a>
      </div>
      {errorContent}
      {loadingContent}

      <Content movies={movies} onToggleOpen={onToggleOpen} />

      <div className="rowmovies__loadmore">
        <button
          className="btn btn-secondary"
          onClick={getMoreMovies}
          disabled={newItemLoading}
        >
          Load More
        </button>
      </div>
      <Modal open={open} onClose={onClose}>
        <MovieInfo movieId={movieId} />
      </Modal>
    </div>
  );
};

export default RowMovies;

const Content = ({ movies, onToggleOpen }) => {
  return (
    <div className="rowmovies__lists">
      {movies.map((movie) => (
        <RowMoviesItem
          key={movie.id}
          movie={movie}
          onToggleOpen={onToggleOpen}
        />
      ))}
    </div>
  );
};
