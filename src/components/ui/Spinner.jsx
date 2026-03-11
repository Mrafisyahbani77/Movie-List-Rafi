import React from 'react';

const Spinner = () => (
  <div className="flex min-h-[50vh] items-center justify-center bg-surface-50">
    <div className="h-12 w-12 animate-spin rounded-full border-t-4 border-b-4 border-brand-600 bg-surface-200"></div>
  </div>
);

export default Spinner;

