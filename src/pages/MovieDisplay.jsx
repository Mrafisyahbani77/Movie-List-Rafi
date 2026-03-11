import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MovieCarousel from '@/components/ui/MovieCarousel';
import MovieCard from '@/components/ui/MovieCard';
import Spinner from '@/components/ui/Spinner';
import { useFetch } from '@/hooks/useFetch';
import {
  getDiscoverMovies,
  getPlayingMovies,
  getTrendingMovies,
} from '@/api/tmdbApi';
import { Link } from 'react-router-dom';

const HeroBanner = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!movies || movies.length === 0) return;
    
    // Auto-slide every 5 seconds
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.min(movies.length, 5));
    }, 5000);

    return () => clearInterval(intervalId);
  }, [movies]);

  if (!movies || movies.length === 0) return null;

  const currentMovie = movies[currentIndex];

  return (
    <div className="relative mb-20 h-[70vh] w-full lg:h-[90vh] overflow-hidden bg-surface-900">
      
      {/* Background Images with Crossfade */}
      {movies.slice(0, 5).map((movie, index) => (
         <img
           key={movie.id}
           src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
           alt={movie.title}
           className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
             index === currentIndex ? 'opacity-100' : 'opacity-0'
           }`}
           loading={index === 0 ? "eager" : "lazy"} 
         />
      ))}
      
      {/* Dynamic Overlay Gradient for Light Theme (So text is readable but image pops) */}
      <div className="absolute inset-0 bg-gradient-to-t from-surface-50 via-surface-50/60 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-surface-50 via-surface-50/30 to-transparent"></div>
      
      <div className="absolute bottom-0 left-0 max-w-4xl p-8 md:p-16 lg:w-2/3 xl:p-24 z-10">
        <div className="mb-4 inline-block rounded-full bg-brand-100 px-4 py-1 border border-brand-200">
          <span className="font-display text-xs font-bold uppercase tracking-widest text-brand-700">🔥 Top Trending</span>
        </div>
        
        {/* Title with key to force re-animation on change */}
        <h1 key={currentMovie.id} className="mb-6 font-display text-5xl font-black tracking-tight text-slate-900 md:text-7xl lg:text-8xl animate-[slideUp_0.5s_ease-out]">
          {currentMovie.title}
        </h1>
        
        <div className="mb-6 flex items-center space-x-4 text-sm font-bold text-amber-500">
          <span className="flex items-center bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="mr-1 h-5 w-5 drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            {currentMovie.vote_average?.toFixed(1)}/10
          </span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-600 font-semibold">{currentMovie.release_date?.substring(0, 4)}</span>
        </div>
        
        <p key={`${currentMovie.id}-desc`} className="mb-10 max-w-2xl text-lg text-slate-700 line-clamp-3 md:text-xl md:leading-relaxed font-medium animate-[fadeIn_0.8s_ease-out]">
          {currentMovie.overview}
        </p>
        
        <Link
          to={`/movie/${currentMovie.id}`}
          className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-brand-600 to-brand-500 px-8 py-4 font-display font-bold text-white shadow-[0_10px_20px_rgba(99,102,241,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_15px_30px_rgba(99,102,241,0.5)]"
        >
          <div className="absolute inset-0 w-full translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-[100%]"></div>
          <span className="relative">View Details</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1">
            <path d="M10.05 16.94v-4h8.92l.03-2.01h-8.95V6.94l-5 5Z" transform="scale(-1, 1) translate(-24, 0)" />
          </svg>
        </Link>
      </div>

      
    </div>
  );
};

const MovieSection = ({ id, title, fetcher, isCarousel = true }) => {
  const { data, loading, error } = useFetch(fetcher);

  if (loading)
    return (
      <div id={id} className="py-12 scroll-mt-24">
        <h2 className="mb-8 px-4 font-display text-3xl font-bold text-slate-900">{title}</h2>
        <div className="flex h-64 items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-t-4 border-brand-600"></div>
        </div>
      </div>
    );

  if (error || !data?.results?.length) return null;

  const movies = data.results;

  return (
    <div id={id} className="mb-16 scroll-mt-24 px-4 md:px-8">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="font-display text-3xl font-bold text-slate-900 relative group inline-block">
          {title}
          <div className="absolute -bottom-2 left-0 w-1/3 h-1.5 bg-gradient-to-r from-brand-500 to-transparent rounded-full transition-all duration-500 group-hover:w-full"></div>
        </h2>
      </div>

      {isCarousel ? (
        <MovieCarousel>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </MovieCarousel>
      ) : (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

const MovieDisplay = () => {
  useEffect(() => {
    document.title = 'Rafi Movies – Discover Trending & Top-Rated Films';
  }, []);

  const { data: trendingData, loading: initLoading } = useFetch(
    getTrendingMovies,
    1
  );

  if (initLoading) return <Spinner />;

  const heroMovies = trendingData?.results ?? [];

  return (
    <div className="min-h-screen bg-surface-50 font-sans text-slate-600 selection:bg-brand-200">
      <Navbar />
      <main id="main-content">
        <HeroBanner movies={heroMovies} />
        <div className="container mx-auto max-w-[1600px]">
          <MovieSection id="trending" title="Trending This Week" fetcher={getTrendingMovies} />
          <MovieSection id="movies" title="Discover New Magic" fetcher={getDiscoverMovies} />
          <MovieSection title="Now Playing" fetcher={getPlayingMovies} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MovieDisplay;
