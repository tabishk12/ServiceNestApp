import React, { useEffect, useState } from 'react';

const Loader = ({ text}) => {
  const [dotCount, setDotCount] = useState(0);
  const [increasing, setIncreasing] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount(prev => {
        if (prev === 3) {
          setIncreasing(false);
          return 2;
        } else if (prev === 0) {
          setIncreasing(true);
          return 1;
        } else {
          return increasing ? prev + 1 : prev - 1;
        }
      });
    }, 500); // Update every 500ms

    return () => clearInterval(interval);
  }, [increasing]);

  const dots = '.'.repeat(dotCount);

  return (
    <div className="flex flex-col items-center justify-center py-10 text-center min-h-[85vh]">
      <div className="animate-spin rounded-full h-20 w-20  border-b-4 border-gray-800 mb-4" />
      <div className="text-lg font-medium text-gray-800">
        {text}{dots}
      </div>
    </div>
  );
};

export default Loader;
