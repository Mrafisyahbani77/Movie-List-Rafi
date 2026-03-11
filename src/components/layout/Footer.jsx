import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-surface-200 bg-surface-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-12 md:flex-row md:items-start md:justify-between">
          {/* Brand Col */}
          <div className="flex max-w-sm flex-col items-center text-center md:items-start md:text-left">
            <Link to="/" className="group mb-4 inline-block">
              <span className="font-display bg-gradient-to-r from-brand-600 to-accent-500 bg-clip-text text-3xl font-black text-transparent transition-all duration-300 group-hover:drop-shadow-[0_0_10px_rgba(99,102,241,0.3)]">
                RAFI MOVIES
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-600">
              Discover the latest trending movies, top-rated hits, and your all-time favorites.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="mb-4 font-display text-lg font-bold text-slate-900">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="flex items-center gap-2 text-slate-600 transition-colors hover:text-brand-600">
                  <span className="h-1 w-4 rounded-full bg-brand-300"></span>Home
                </Link>
              </li>
              <li>
                <a href="#trending" className="flex items-center gap-2 text-slate-600 transition-colors hover:text-brand-600">
                  <span className="h-1 w-4 rounded-full bg-brand-300"></span>Trending
                </a>
              </li>
              <li>
                <a href="#movies" className="flex items-center gap-2 text-slate-600 transition-colors hover:text-brand-600">
                  <span className="h-1 w-4 rounded-full bg-brand-300"></span>All Movies
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between border-t border-surface-200 pt-8 sm:flex-row">
          <p className="text-sm text-slate-500">
            &copy; {currentYear} Rafi Movies. All rights reserved.
          </p>
          <p className="mt-4 text-xs text-slate-500 sm:mt-0 items-center flex">
            Data provided by <span className="font-bold ml-1 text-brand-600">TMDB</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
