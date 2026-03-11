import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  return (
    <div className="p-3 h-full">
      <Link to={`/movie/${movie.id}`} className="block h-full">
        <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-surface-white shadow-md ring-1 ring-surface-200 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(99,102,241,0.2)] hover:ring-brand-400">
          
          {/* Image Section */}
          <div className="relative aspect-[2/3] w-full overflow-hidden bg-surface-100">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Title Area Below Image */}
          <div className="flex flex-1 flex-col justify-center p-4">
            <h2 className="mb-2 font-display text-lg font-bold leading-tight text-slate-900 transition-colors duration-300 group-hover:text-brand-600 line-clamp-1">
              {movie.title}
            </h2>
            <div className="flex items-center text-sm font-bold text-amber-500">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="mr-1.5 h-4 w-4 drop-shadow-[0_0_3px_rgba(245,158,11,0.3)]">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <span>{movie.vote_average?.toFixed(1) || '0.0'}/10</span>
            </div>
          </div>
          
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
