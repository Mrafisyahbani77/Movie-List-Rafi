import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = ({ title = 'RAFI MOVIES' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  // Smart anchor navigation — goes to home first if needed, then scrolls
  const handleAnchorClick = useCallback((e, sectionId) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const scrollTo = () => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(scrollTo, 400); // wait for page to render
    } else {
      scrollTo();
    }
  }, [location.pathname, navigate]);

  const navLinks = [
    { name: 'Home', path: '/', anchor: null },
    { name: 'Trending', path: '/#trending', anchor: 'trending' },
    { name: 'Movies', path: '/#movies', anchor: 'movies' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md border-b border-surface-200 shadow-md'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link to="/" className="group z-[60] relative flex items-center">
            <span className={`font-display text-3xl font-black tracking-tight transition-all duration-300 ${
              isMobileMenuOpen
                ? 'text-white drop-shadow-[0_0_10px_rgba(99,102,241,0.5)]'
                : 'bg-gradient-to-r from-brand-600 to-accent-500 bg-clip-text text-transparent'
            }`}>
              {title}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-8 md:flex">
            {navLinks.map((link) => (
              link.anchor ? (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={(e) => handleAnchorClick(e, link.anchor)}
                  className="font-sans text-sm font-semibold text-slate-600 transition-all duration-300 hover:text-brand-600 hover:-translate-y-0.5"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`font-sans text-sm font-semibold transition-all duration-300 hover:text-brand-600 hover:-translate-y-0.5 ${
                    location.pathname === '/' ? 'text-brand-600' : 'text-slate-600'
                  }`}
                >
                  {link.name}
                </Link>
              )
            ))}
          </div>

          {/* Hamburger — Modern 2-line asymmetric */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="relative z-[60] flex md:hidden h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-xl transition-all duration-300"
            aria-label="Toggle menu"
          >
            <span className={`block h-0.5 rounded-full transition-all duration-500 ${
              isMobileMenuOpen
                ? 'w-6 translate-y-2 rotate-45 bg-white'
                : 'w-6 bg-slate-700'
            }`} />
            <span className={`block h-0.5 rounded-full transition-all duration-300 ${
              isMobileMenuOpen
                ? 'w-0 opacity-0 bg-white'
                : 'w-4 bg-brand-500'
            }`} />
            <span className={`block h-0.5 rounded-full transition-all duration-500 ${
              isMobileMenuOpen
                ? 'w-6 -translate-y-2 -rotate-45 bg-white'
                : 'w-6 bg-slate-700'
            }`} />
          </button>
        </div>
      </nav>

      {/* ─── Fullscreen Mobile Menu Overlay ─────────────── */}
      <div
        className={`fixed inset-0 z-[55] flex flex-col bg-white transition-all duration-500 ease-in-out md:hidden ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Decorative gradient blob */}
        <div className="absolute right-0 top-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-100 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-1/2 translate-y-1/2 rounded-full bg-accent-500/10 blur-3xl" />

        {/* Explicit Close button */}
        <div className="relative z-10 flex items-center justify-between px-6 pt-6">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
            <span className="font-display bg-gradient-to-r from-brand-600 to-accent-500 bg-clip-text text-2xl font-black text-transparent">
              {title}
            </span>
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-2xl bg-surface-100 text-slate-700 transition-all duration-300 hover:bg-brand-50 hover:text-brand-600 hover:rotate-90"
            aria-label="Close menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        </div>
        <nav className="relative z-10 flex flex-1 flex-col justify-center px-10">
          {navLinks.map((link, index) => {
            const isActive = location.pathname === link.path;
            const Tag = link.anchor ? 'a' : Link;
            const linkProps = link.anchor
              ? { href: link.path, onClick: (e) => handleAnchorClick(e, link.anchor) }
              : { to: link.path, onClick: () => setIsMobileMenuOpen(false) };

            return (
              <Tag
                key={link.name}
                {...linkProps}
                className="group flex flex-col border-b border-surface-200 py-6 transition-all duration-300 last:border-none"
              >
                {/* Number */}
                <span className="mb-1 font-display text-xs font-bold tracking-[0.3em] text-surface-300">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {/* Link text */}
                <span className={`font-display text-5xl font-black uppercase leading-none tracking-tight transition-colors duration-300 sm:text-6xl ${
                  isActive
                    ? 'bg-gradient-to-r from-brand-600 to-accent-500 bg-clip-text text-transparent'
                    : 'text-slate-900 group-hover:bg-gradient-to-r group-hover:from-brand-600 group-hover:to-accent-500 group-hover:bg-clip-text group-hover:text-transparent'
                }`}>
                  {link.name}
                </span>
              </Tag>
            );
          })}
        </nav>

        {/* Footer strip */}
        <div className="relative z-10 border-t border-surface-200 px-10 py-6">
          <p className="text-xs font-semibold text-slate-400">© {new Date().getFullYear()} Rafi Movies</p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
