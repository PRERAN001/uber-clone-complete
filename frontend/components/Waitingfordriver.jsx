import React, { useEffect, useState } from "react";

const Waitingfordriver = () => {
  const taglines = [
    "Affordable rides, anytime, anywhere.",
    "Your ride is on the way – hang tight!",
    "Moving cities, one ride at a time.",
    "Fast, safe, and reliable trips.",
    "Sit back and relax — we'll handle the rest.",
    "Your journey matters. We make it smooth.",
  ];

  const [currentTagline, setCurrentTagline] = useState(taglines[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const random = Math.floor(Math.random() * taglines.length);
      setCurrentTagline(taglines[random]);
    }, 2000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-md w-full max-w-md mx-auto">
      
      <img
        src="https://cdn.dribbble.com/userupload/42246898/file/original-be3426dd5e13b0f1995fbab0cdd86ba8.gif"
        alt="loading"
        className="w-56 h-56 object-contain"
      />

      <p className="mt-4 text-gray-800 text-lg font-semibold text-center">
        Waiting for driver to accept your ride...
      </p>

      <p className="mt-2 text-gray-500 text-sm italic text-center transition-opacity duration-300">
        {currentTagline}
      </p>
    </div>
  );
};

export default Waitingfordriver;
