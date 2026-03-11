import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Spinner from '@/components/ui/Spinner';

// Lazy load the pages for code splitting
const MovieDisplay = lazy(() => import('@/pages/MovieDisplay'));
const DetailMovie = lazy(() => import('@/pages/DetailMovie'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route exact path="/" element={<MovieDisplay />} />
        <Route path="/movie/:id" element={<DetailMovie />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
