import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { fetchMovieData } from "../Api";
import NavbarComponents from "../components/NavbarComponents";
import BannerMovie from "../components/BannerMovie";
import TopRated from "../components/TopRated";
import AllMovie from "../components/AllMovie";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { RiStarSFill } from "react-icons/ri";

const MovieDisplay = () => {
  document.title = "RAFI MOVIES";
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchMovieData();
      setMovies(response.results);
    };
    fetchData();
  }, []);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  if (!movies) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full border-t-4 border-blue-700 border-opacity-25 h-16 w-16"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white">
      <NavbarComponents title="RAFI MOVIES" />
      <BannerMovie />
      <div className="container mx-auto px-4 py-8">
        <h4 className="font-semibold text-2xl mb-5 text-yellow-500">
          Discover New Movies
        </h4>
        <Carousel
          responsive={responsive}
          swipeable={true}
          draggable={true}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={4500}
          transitionDuration={500}
          containerClass="carousel-container"
          itemClass="px-2"
        >
          {movies.map((movie) => (
            <div key={movie.id} className="p-2">
              <Link to={`/movie/${movie.id}`}>
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition duration-500 hover:scale-105">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-60 object-cover"
                  />
                  <div className="p-4 bg-gray-900 bg-opacity-75">
                    <h1 className="font-semibold text-lg mb-2 text-yellow-500">
                      {movie.title}
                    </h1>
                    <div className="flex items-center mb-2">
                      <RiStarSFill className="w-6 h-6 text-yellow-500" />
                      <h1 className="font-semibold text-lg ml-2 text-yellow-500">
                        {movie.vote_average}/10
                      </h1>
                    </div>
                    <p className="text-sm text-gray-300 mb-4">
                      {movie.overview.substring(0, 70)}...
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </Carousel>
      </div>
      <div className="container mx-auto px-4 py-8">
        <h4 className="font-semibold text-2xl mb-5 text-yellow-500">
          Discover Top Movies
        </h4>
        <TopRated />
      </div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-semibold text-3xl mb-5 text-center text-yellow-500">
          All Movies
        </h1>
        <AllMovie />
      </div>
      <Footer />
    </div>
  );
};

export default MovieDisplay;
