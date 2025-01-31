'use client';

const ActualComponent = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Client-Side Component</h2>
      <p className="text-gray-600">
        This component only renders on the client side.
        Window width: {window.innerWidth}px
      </p>
    </div>
  );
};

export default ActualComponent; 