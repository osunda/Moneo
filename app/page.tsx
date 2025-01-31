'use client';

import useIsClient from './hooks/useIsClient';

const Page = () => {
  const isClient = useIsClient();

  return (
    <div className="container mx-auto p-4">
      {isClient ? (
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Welcome to the App</h1>
          <p className="text-gray-600">Client-side content is now loaded</p>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      )}
    </div>
  );
};

export default Page; 