'use client';

import dynamic from 'next/dynamic';

const ActualComponent = dynamic(() => import('./ActualComponent'), {
  ssr: false,
  loading: () => (
    <div className="p-4">
      <p className="text-gray-600">Loading component...</p>
    </div>
  )
});

export default ActualComponent; 