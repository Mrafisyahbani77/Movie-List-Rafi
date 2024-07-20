import React, { useEffect, useState } from 'react';
import { fetchAllMovie, FetchMoviesQuery } from '../Api';
import { Link } from 'react-router-dom';
import { RiStarSFill } from "react-icons/ri";

const AllMovie = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      if (query === '') {
        const response = await fetchAllMovie(currentPage);
        setMovies(response.results);
      } else {
        const response = await FetchMoviesQuery(query);
        setMovies(response.results);
      }
    };
    fetchMovies();
  }, [currentPage, query]);

  const fetchNextPage = async () => {
    setCurrentPage(currentPage + 1);
  };

  const fetchPrevPage = async () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to the first page on new search
    if (query === '') {
      const response = await fetchAllMovie(1);
      setMovies(response.results);
    } else {
      const response = await FetchMoviesQuery(query);
      setMovies(response.results);
    }
  };

  return (
    <div className="container mx-auto px-6 py-10">
      <form className="max-w-md mx-auto my-10" onSubmit={handleSubmit}>
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search By Film Name"
            required
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>

      <div className="flex justify-center mt-4">
        <button className="px-4 py-2 mr-2 bg-blue-500 text-white rounded-lg" onClick={fetchPrevPage} disabled={currentPage === 1}>
          Prev
        </button>
        <h1 className="text-white px-5 flex items-center text-2xl">{currentPage}</h1>
        <button className="px-4 py-2 ml-2 bg-blue-500 text-white rounded-lg" onClick={fetchNextPage}>
          Next
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 m-8">
        {movies.map((movie) => (
          <div key={movie.id}>
            <Link to={`/movie/${movie.id}`}>
              <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition duration-500 hover:scale-105">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-full h-60 object-cover rounded-t-lg" />
                <div className="p-4 bg-gray-900 bg-opacity-75">
                  <h1 className="font-semibold text-lg mb-2 text-yellow-500">{movie.title}</h1>
                  <div className="flex items-center mb-2">
                    <RiStarSFill className='w-6 h-6 text-yellow-500' />
                    <h1 className="font-semibold text-lg ml-2 text-yellow-500">{movie.vote_average}/10</h1>
                  </div>
                  <p className="text-sm text-gray-400 font-sans">{movie.release_date}</p>
                  <p className="text-sm text-gray-300">{movie.overview.substring(0, 90)}...</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllMovie;
