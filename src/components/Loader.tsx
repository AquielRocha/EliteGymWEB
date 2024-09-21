import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white-500"></div>
      <p className="mt-4">Carregando porra...</p>
    </div>
  );
};

export default Loader;
