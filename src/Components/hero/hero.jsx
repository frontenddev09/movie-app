import { useState, useEffect } from "react";
import useMovieService from "../../services/movie-service";
import Error from "../error/error";
import { useNavigate } from "react-router-dom";

import Spinner from "../spinner/spinner";
import "./hero.scss";
const Hero = () => {
  const [movie, setMovie] = useState(null);
  const { getRandomMovie, loading, error, clearError } = useMovieService();
  useEffect(() => {
    getMovie();
  }, []);

  function getMovie() {
    clearError();
    getRandomMovie().then((res) => setMovie(res));
  }
  let errorContent = error ? <Error /> : null;
  let loadingContent = loading ? <Spinner /> : null;
  let content =
    !(loading || error) && movie ? (
      <Content movie={movie && movie} getMovie={getMovie} />
    ) : null;

  return (
    <div className="hero">
      <div className="hero__info">
        <h2>FIND MOVIES</h2>
        <h1>TV shows and more</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem sit
          sint officiis ipsa pariatur, vel sapiente ut! Quod aliquam ut, quis
          magni illo nesciunt odio dignissimos illum cupiditate, molestiae
          similique.
        </p>
        <button onClick={getMovie} className="btn btn__primary">
          Random Movie
        </button>
      </div>
      <div className="hero__movie">
        {errorContent}
        {loadingContent}
        {content}
      </div>
    </div>
  );
};

export default Hero;

const Content = ({ movie, getMovie }) => {
  const navigate = useNavigate();

  return (
    <>
      <img src={movie.thumbnail && movie.thumbnail} alt="img" />
      <div className="hero__movie-descr">
        <h2>{movie.name}</h2>
        <p>
          {movie.description && movie.description.length > 250
            ? `${movie.description.slice(0, 250)}...`
            : movie.description}
        </p>
        <div>
          <button onClick={getMovie} className="btn btn__secondary">
            Random Movie
          </button>
          <button
            onClick={() => navigate(`movie/${movie.id}`)}
            className="btn btn__primary"
          >
            Deatil Movie
          </button>
        </div>
      </div>
    </>
  );
};
