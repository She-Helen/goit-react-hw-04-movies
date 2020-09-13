import axios from 'axios';

const apiKey = '2fef3c375370b39dd4f616e8142bd22f';

axios.defaults.baseURL = 'https://api.themoviedb.org';

export const fetchTrendingMovies = () => {
  return axios
    .get(`/3/trending/all/day?api_key=${apiKey}`)
    .then(res => res.data.results);
};
export const fetchMoviesWithQuery = query => {
  return axios
    .get(
      `/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=1&include_adult=false`,
    )
    .then(res => res.data.results);
};
export const fetchMovieDetails = movieId => {
  return axios
    .get(`/3/movie/${movieId}?api_key=${apiKey}&language=en-US`)
    .then(res => res.data);
};
export const fetchMovieCast = movieId => {
  return axios
    .get(`/3/movie/${movieId}/credits?api_key=${apiKey}`)
    .then(res => res.data.cast);
};
export const fetchMovieReviews = movieId => {
  return axios
    .get(`/3/movie/${movieId}/reviews?api_key=${apiKey}&language=en-US&page=1`)
    .then(res => res.data.results);
};
