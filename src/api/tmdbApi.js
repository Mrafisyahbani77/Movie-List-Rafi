import axios from 'axios';

const TMDB_API_KEY = 'a98292df884f804c7aaff54aa96d5c6d';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export const tmdbApi = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
});

export const getDiscoverMovies = async (page = 1) => {
  const { data } = await tmdbApi.get('/discover/movie', { params: { page } });
  return data;
};

export const getPlayingMovies = async (page = 1) => {
  const { data } = await tmdbApi.get('/discover/movie', {
    params: { page, with_genres: 16 }, // Animated movies
  });
  return data;
};

export const getUpcomingMovies = async () => {
  const { data } = await tmdbApi.get('/movie/upcoming');
  return data;
};

export const getTrendingMovies = async (page = 1) => {
  const { data } = await tmdbApi.get('/trending/movie/week', { params: { page } });
  return data;
};

export const getMovieDetails = async (id) => {
  const { data } = await tmdbApi.get(`/movie/${id}`);
  return data;
};

export const getMovieCast = async (id) => {
  const { data } = await tmdbApi.get(`/movie/${id}/credits`);
  return data?.cast || [];
};

export const getMovieTrailer = async (id) => {
  const { data } = await tmdbApi.get(`/movie/${id}/videos`);
  const trailer = data?.results?.find((video) => video.type === 'Trailer');
  return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
};

export const searchMovies = async (query) => {
  const { data } = await tmdbApi.get('/search/movie', { params: { query } });
  return data;
};
