import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchMovieDetail, fetchMovieCast, fetchMovieTrailer } from '../Api';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Footer from '../components/Footer';
import NavbarComponents from '../components/NavbarComponents';
import { RiStarSFill } from "react-icons/ri";

const DetailMovie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchMovieDetail(id);
        const castResponse = await fetchMovieCast(id);
        const trailer = await fetchMovieTrailer(id);

        setMovie(response);
        setCast(castResponse);
        setTrailerUrl(trailer);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };
    fetchData();
  }, [id]);

  if (!movie) {
    return <div className="text-white">Loading...</div>;
  }

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

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <NavbarComponents />
      <div className="relative">
        <div className="relative w-full h-[60vh] lg:h-[90vh]">
          <img
            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="px-30 absolute -bottom-10 w-full h-[60vh]"></div>
          <div className="flex absolute -bottom-32 z-10 md:left-10 lg:left-28">
            <div className="max-w-[12rem] mx-5">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="rounded-xl"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold mt-5">{movie.title}</h1>
              <div className="flex items-center mt-2">
              <RiStarSFill className='w-6 h-6 text-yellow-500'/>
                <h1 className="font-sans text-gray-200  ml-1 ">{movie.vote_average}/10</h1>
              </div>
              <p className="mt-2 text-sm lg:text-base">{movie.status}</p>
              <div className="flex mt-4 space-x-4">
                <a
                  href={trailerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block py-2 px-4 bg-blue-500 text-white rounded-lg font-semibold text-xl"
                >
                  Trailer
                </a>
                <Link
                  to="/"
                  className="inline-block py-2 px-4 bg-red-500 text-white rounded-lg font-semibold text-xl"
                >
                  Back
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full bg-black opacity-60"></div>
        </div>
        <div className="mx-3 pt-10 mt-12 lg:px-32">
          <h1 className="text-xl font-bold mt-10 md:mt-20 text-yellow-500">Overview</h1>
          <p className="mt-2 text-center">{movie.overview}</p>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-5 mt-10">
            <div className="col-span-1">
              <h1 className="text-md text-yellow-500 font-bold">Popularity</h1>
              <p className="mt-2">{movie.popularity}</p>
            </div>
            <div className="col-span-1">
              <h1 className="text-md text-yellow-500 font-bold">Released Date</h1>
              <p className="mt-2">{movie.release_date}</p>
            </div>
            <div className="col-span-1">
              <h1 className="text-md text-yellow-500 font-bold">Revenue</h1>
              <p className="mt-2">${movie.revenue}</p>
            </div>
            <div className="col-span-1">
              <h1 className="text-md text-yellow-500 font-bold">Budget</h1>
              <p className="mt-2">${movie.budget}</p>
            </div>
            <div className="col-span-1">
              <h1 className="text-md text-yellow-500 font-bold">IMDB ID</h1>
              <p className="mt-2">{movie.imdb_id}</p>
            </div>
          </div>
        </div>
        <h1 className="text-3xl mt-10  font-bold mx-3 pt-10 text-yellow-500  text-center lg:px-10 mb-11">Cast</h1>
        <Carousel
          responsive={responsive}
          swipeable={true}
          draggable={true}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={4500}
          transitionDuration={500}
          className="mb-10"
        >
          {cast.map((actor) => (
            <div key={actor.id} className="px-2">
              <div className="text-center">
                <img
                  src={`https://image.tmdb.org/t/p/original${actor.profile_path}`}
                  alt={actor.name}
                  className="rounded-md mx-auto mb-2"
                  style={{ width: '170px', height: '200px' }}
                />
                <p className="text-lg font-semibold">{actor.name}</p>
              </div>
            </div>
          ))}
        </Carousel>
        <Footer />
      </div>
    </div>
  );
};

export default DetailMovie;
