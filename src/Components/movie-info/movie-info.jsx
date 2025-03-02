import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useMovieService from "../../services/movie-service";
import Error from "../error/error";
import Spinner from "../spinner/spinner";
import "./movie-info.scss";

const MovieInfo = ({ movieId }) => {
  const [movie, setMovie] = useState(null);

  const { getDetailedMovie, loading, error } = useMovieService();

  useEffect(() => {
    updateMovie();
  }, [movieId]);

  const updateMovie = () => {
    if (!movieId) {
      return;
    }

    getDetailedMovie(movieId).then((res) => setMovie(res));
  };

  const initialContent = movie || loading || error ? null : <Spinner />;
  const errorContent = error ? <Error /> : null;
  const loadingContent = loading ? <Spinner /> : null;
  const content = !(error || loading || !movie) ? (
    <Content movie={movie} />
  ) : null;

  return (
    <div className="movieinfo">
      {initialContent}
      {errorContent}
      {loadingContent}
      {content}
    </div>
  );
};

export default MovieInfo;

const Content = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <>
      <img src={movie.thumbnail} alt="img" />

      <div className="hero__movie-descr">
        <h2>{movie.name}</h2>
        <p>{movie.description}</p>
        <button
          className="btn btn-light"
          onClick={() => navigate(`/movie/${movie.id}`)}
        >
          Details
        </button>
      </div>
    </>
  );
};
