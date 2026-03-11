import { useState, useEffect } from 'react';
import { getMovieDetails, getMovieCast, getMovieTrailer } from '@/api/tmdbApi';

export const useMovieDetails = (id) => {
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchAll = async () => {
      setLoading(true);
      try {
        const [movieData, castData, trailerData] = await Promise.all([
          getMovieDetails(id),
          getMovieCast(id),
          getMovieTrailer(id),
        ]);

        if (isMounted) {
          setMovie(movieData);
          setCast(castData);
          setTrailerUrl(trailerData);
        }
      } catch (err) {
        console.error('Error fetching movie details:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (id) fetchAll();

    return () => {
      isMounted = false;
    };
  }, [id]);

  return { movie, cast, trailerUrl, loading };
};
