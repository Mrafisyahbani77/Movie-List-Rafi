import React, { useEffect, useState } from 'react';
import { fetchMovieTop } from '../Api';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';
import { RiStarSFill } from "react-icons/ri";

const TopRated = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovieTopRated = async () => {
      const response = await fetchMovieTop();
      setMovies(response.results);
    };

    fetchMovieTopRated();
  }, []);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  if (!movies) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-6 py-10">
      <Carousel
        responsive={responsive}
        swipeable={true}
        draggable={true}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={4500}
        transitionDuration={500}
        containerClass="carousel-container"
      >
        {movies.map((movie) => (
          <div key={movie.id} className="p-2">
            <Link to={`/movie/${movie.id}`}>
              <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition duration-500 hover:scale-105">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-full h-60 object-cover rounded-t-lg" />
                <div className="p-4 bg-gray-900 bg-opacity-75">
                  <h1 className="font-semibold text-lg mb-2 text-yellow-500">{movie.title}</h1>
                  <div className="flex items-center mb-2">
                  <RiStarSFill className='w-6 h-6 text-yellow-500'/>
                    <h1 className="font-semibold text-lg ml-2 text-yellow-500">{movie.vote_average}/10</h1>
                  </div>
                  <p className="text-sm text-gray-300">{movie.overview.substring(0, 90)}...</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default TopRated;
