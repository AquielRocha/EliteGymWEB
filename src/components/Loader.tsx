import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-white-500"></div>
      <p className="mt-4">Carregando </p>
    </div>
  );
};

export default Loader;
