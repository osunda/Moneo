'use client';

import useIsClient from './hooks/useIsClient';

const Page = () => {
  const isClient = useIsClient();

  // Replace direct window usage with conditional rendering
  return (
    <div>
      {isClient && (
        // Your component content that needs window
        // ... existing code ...
      )}
    </div>
  );
};

export default Page; 