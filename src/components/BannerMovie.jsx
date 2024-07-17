import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { fetchMoviePlaying } from "../Api";
import { Link } from "react-router-dom";

const BannerMovie = () => {
  const [moviePlay, setMoviePlay] = useState([]);

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await fetchMoviePlaying();
      setMoviePlay(response.results);
    };
    fetchMovie();
  }, []);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  if (moviePlay.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative">
      <Carousel
        responsive={responsive}
        swipeable={true}
        draggable={true}
        infinite={true}
        // showDots={true}
        autoPlay={true}
        autoPlaySpeed={2500}
        transitionDuration={500}
        containerClass="carousel-container"
      >
        {moviePlay.map((movie) => (
          <div key={movie.id} className="carousel-item relative">
            <div className="w-full h-[60vh] lg:h-[110vh]">
              <img
                src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                alt={movie.title}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-black opacity-70 flex items-center justify-center">
                <div className="text-white text-center px-4">
                  <h2 className="text-4xl font-semibold mb-4">{movie.title}</h2>
                  <h4 className="text-xl font-semibold mb-6">
                    Upcoming Movies
                  </h4>
                  <Link to={`/movie/${movie.id}`}>
                    <button className="px-4 py-2  bg-yellow-500 rounded-md font-semibold hover:bg-yellow-600 hover:text-black transition duration-300 ease-in-out">
                      Detail
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default BannerMovie;
