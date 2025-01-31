'use client';

import dynamic from 'next/dynamic';

const ClientComponent = dynamic(() => import('./ActualComponent'), {
  ssr: false // This will only render the component on the client side
});

export default ClientComponent; 