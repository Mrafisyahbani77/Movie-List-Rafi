import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useMovieDetails } from '@/hooks/useMovieDetails';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MovieCarousel from '@/components/ui/MovieCarousel';
import Spinner from '@/components/ui/Spinner';

const CastCard = ({ actor }) => (
  <div className="group flex-shrink-0 w-48 p-2">
    <div className="relative overflow-hidden rounded-3xl bg-white shadow-md ring-1 ring-surface-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(99,102,241,0.2)] hover:ring-brand-300">
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden">
        {actor.profile_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
            alt={actor.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-surface-100">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-12 w-12 text-surface-300">
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
            </svg>
          </div>
        )}
        {/* Name pill overlay at bottom */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3">
          <p className="font-display text-sm font-bold leading-tight text-white line-clamp-1">{actor.name}</p>
          <p className="mt-0.5 text-xs font-medium text-brand-300 line-clamp-1">{actor.character}</p>
        </div>
      </div>
    </div>
  </div>
);

const DetailMovie = () => {
  const { id } = useParams();
  const { movie, cast, trailerUrl, loading } = useMovieDetails(id);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  if (loading || !movie) return <Spinner />;

  const ytVideoId = trailerUrl?.split('v=')[1];

  return (
    <div className="min-h-screen bg-surface-50 font-sans text-slate-600 selection:bg-brand-200">
      <Navbar />

      <main>
        {/* ─── Hero Section ───────────────────────────────────────── */}
        {/* Backdrop strip — sits below the fixed navbar (h-20 = 80px) */}
        <div className="relative h-[55vh] w-full overflow-hidden bg-surface-200 lg:h-[70vh]" style={{ marginTop: '80px' }}>
          <img
            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
            alt={movie.title}
            className="h-full w-full object-cover opacity-25 mix-blend-luminosity"
            loading="eager"
          />
          {/* Gradients so text below is readable */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface-50 via-surface-50/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-surface-50 via-transparent to-transparent" />
        </div>

        {/* ─── Poster + Info card ─────────────────────────────────── */}
        <div className="relative z-10 mx-auto -mt-28 mb-16 flex max-w-7xl flex-col items-center gap-8 px-4 sm:px-6 md:flex-row md:items-end lg:px-8">
          {/* Poster */}
          <div className="group relative flex-shrink-0">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-brand-300 to-accent-300 opacity-60 blur-lg transition duration-700 group-hover:opacity-100" />
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="relative w-44 rounded-2xl border-4 border-white shadow-[0_20px_40px_rgba(0,0,0,0.15)] sm:w-52 lg:w-64"
            />
          </div>

          {/* Info */}
          <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left md:pb-4">
            <h1 className="mb-4 font-display text-4xl font-black text-slate-900 md:text-5xl lg:text-6xl">
              {movie.title}
            </h1>
            <div className="mb-6 flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <span className="flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-sm font-bold text-amber-500 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                {movie.vote_average?.toFixed(1)}/10
              </span>
              <span className="rounded-full border border-surface-200 bg-white px-3 py-1 text-sm font-semibold text-slate-700 shadow-sm">
                {movie.release_date?.substring(0, 4)}
              </span>
              <span className="rounded-full border border-surface-200 bg-white px-3 py-1 text-sm font-semibold text-slate-700 shadow-sm">
                {movie.runtime}m
              </span>
              {movie.genres?.map((g) => (
                <span key={g.id} className="rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 shadow-sm">
                  {g.name}
                </span>
              ))}
            </div>

            {trailerUrl && (
              <button
                onClick={() => setIsTrailerOpen(true)}
                className="group relative flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 px-8 py-4 font-display font-bold text-white shadow-[0_10px_20px_rgba(99,102,241,0.25)] transition-all duration-300 hover:scale-105 hover:shadow-[0_15px_30px_rgba(99,102,241,0.4)]"
              >
                <div className="absolute inset-0 rounded-full bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch Trailer
              </button>
            )}
          </div>
        </div>

        <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
           {/* Overview & Metadata */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="mb-6 font-display text-3xl font-bold text-slate-900 relative inline-block">
                Overview
                <div className="absolute -bottom-2 left-0 w-1/2 h-1 bg-gradient-to-r from-brand-500 to-transparent rounded-full"></div>
              </h2>
              <p className="text-lg leading-relaxed text-slate-700 font-medium">
                {movie.overview}
              </p>
            </div>
            
            <div className="rounded-3xl bg-white p-8 border border-surface-200 shadow-xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-brand-50/50 rounded-full blur-3xl transition-transform duration-700 group-hover:scale-150"></div>
               <h3 className="mb-6 font-display text-2xl font-bold text-slate-900 border-b border-surface-200 pb-4">Key Facts</h3>
               <div className="space-y-6 text-base">
                   <div className="flex flex-col">
                       <span className="text-brand-600 font-bold mb-1 uppercase tracking-wider text-xs">Status</span>
                       <span className="font-semibold text-slate-800">{movie.status}</span>
                   </div>
                   <div className="flex flex-col">
                       <span className="text-brand-600 font-bold mb-1 uppercase tracking-wider text-xs">Revenue</span>
                       <span className="font-semibold text-slate-800">
                         {movie.revenue ? `$${movie.revenue.toLocaleString()}` : 'Undisclosed'}
                       </span>
                   </div>
                   <div className="flex flex-col">
                       <span className="text-brand-600 font-bold mb-1 uppercase tracking-wider text-xs">Budget</span>
                       <span className="font-semibold text-slate-800">
                         {movie.budget ? `$${movie.budget.toLocaleString()}` : 'Undisclosed'}
                       </span>
                   </div>
               </div>
            </div>
          </div>

          {/* Cast */}
          {cast?.length > 0 && (
            <div className="mt-20">
              <h2 className="mb-8 font-display text-3xl font-bold text-slate-900 relative inline-block">
                Top Cast
                <div className="absolute -bottom-2 left-0 w-1/2 h-1 bg-gradient-to-r from-accent-500 to-transparent rounded-full"></div>
              </h2>
              <MovieCarousel>
                {cast.slice(0, 15).map((actor) => (
                  <CastCard key={actor.id} actor={actor} />
                ))}
              </MovieCarousel>
            </div>
          )}
        </div>
      </main>
      <Footer />

      {/* Trailer Modal — Cinematic & Responsive */}
      {isTrailerOpen && ytVideoId && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          onClick={() => setIsTrailerOpen(false)}
        >
          {/* Dark Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

          {/* Modal Card */}
          <div
            className="relative z-10 w-full max-w-5xl animate-[fadeIn_0.25s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between rounded-t-3xl bg-white px-6 py-4">
              <div className="flex items-center gap-3">
                {/* Traffic-light style dot */}
                <span className="inline-block h-3 w-3 rounded-full bg-accent-500 animate-pulse" />
                <div>
                  <p className="font-display text-xs font-bold uppercase tracking-widest text-black">Now Playing</p>
                  <h3 className="font-display text-lg font-bold leading-tight text-black">{movie.title}</h3>
                </div>
              </div>
              <button
                onClick={() => setIsTrailerOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-black transition-all duration-300 hover:bg-white/20 hover:rotate-90"
                aria-label="Close trailer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              </button>
            </div>

            {/* Video */}
            <div className="aspect-video w-full overflow-hidden rounded-b-3xl bg-black shadow-[0_40px_80px_rgba(0,0,0,0.6)]">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${ytVideoId}?autoplay=1&rel=0`}
                title={`${movie.title} — Trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
              />
            </div>

            {/* Dismiss hint */}
            <p className="mt-4 text-center text-xs text-white/40">Click outside to close</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailMovie;
