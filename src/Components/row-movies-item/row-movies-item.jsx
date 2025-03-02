import "./row-movies-item.scss";
import { useNavigate } from "react-router-dom";

const RowMoviesItem = ({ movie, onToggleOpen }) => {
  const navigate = useNavigate();

  return (
    <div className="list__item" onClick={() => onToggleOpen(movie.id)}>
      <img src={movie.thumbnail} alt={movie.name} />
      <h2>
        {movie.name.length > 20 ? `${movie.name.slice(0, 20)}...` : movie.name}
      </h2>
      <div className="list__item-descr">
        <img src="/date.svg" alt="" />
        <p>{movie.release_date}</p>
        <div className="dot" />
        <p>{movie.vote_average.toFixed(1)}</p>
        <img src="/star.svg" alt="" />
      </div>
    </div>
  );
};

export default RowMoviesItem;
