import useHttp from "../hooks/use-http";

const useMovieService = () => {
  const _apiBase = "https://api.themoviedb.org/3";
  const _language = "language=en-US";
  const _apiKey = "api_key=628d25e6e75c1a65b09bfffb39468281";
  const _apiImage = "https://image.tmdb.org/t/p/original";
  const _apiPage = 1;
  const { request, loading, error, clearError } = useHttp();

  const getPopularMovies = async (pageId = _apiPage) => {
    const response = await request(
      `${_apiBase}/movie/popular?${_language}&page=${pageId}&${_apiKey}`
    );
    const movies = response.results;
    return movies && movies.map((movie) => _transformMovie(movie));
  };
  const getTrandingMovies = async (pageId = _apiPage) => {
    const response = await request(
      `${_apiBase}/movie/top_rated?${_language}&page=${pageId}&${_apiKey}`
    );
    const movies = response.results;
    return movies && movies.map((movie) => _transformMovie(movie));
  };

  const getDetailedMovie = async (id) => {
    const movie = await request(
      `${_apiBase}/movie/${id}?${_language}&${_apiKey}`
    );
    return _transformMovie(movie);
  };

  const getRandomMovie = async () => {
    const res = await getPopularMovies();
    return res[Math.floor(Math.random() * res.length)];
  };

  const _transformMovie = (movie) => {
    return {
      name: movie.title,
      description: movie.overview,
      thumbnail: `${_apiImage}${movie.poster_path}`,
      id: movie.id,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
    };
  };
  return {
    getPopularMovies,
    getTrandingMovies,
    getDetailedMovie,
    getRandomMovie,
    clearError,
    loading,
    error,
  };
};
export default useMovieService;
