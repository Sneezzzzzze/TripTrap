"use client"

import React, { useEffect, useState } from 'react';

/**
 * * @param {Object} props
 * @param {function} props.onFinish 
 */
export default function SplashScreen({ onFinish }) {
  const [isVisible, setIsVisible] = useState(true);


  const DISPLAY_DURATION_MS = 3000; // 3 seconds visible
  const FADE_OUT_DURATION_MS = 500; // 0.5 seconds for the transition


  useEffect(() => {

    const displayTimer = setTimeout(() => {
      // Start the fade-out process by changing the visibility state
      setIsVisible(false);

      // 2. Start the fade-out completion timer
      // This waits for the CSS transition (FADE_OUT_DURATION_MS) before hiding the element completely
      const fadeTimer = setTimeout(() => {
        if (onFinish) {
          onFinish(); // Notify parent component that loading is complete
        }
      }, FADE_OUT_DURATION_MS);

      // Cleanup function for fadeTimer
      return () => clearTimeout(fadeTimer);

    }, DISPLAY_DURATION_MS);

    // Cleanup function for displayTimer
    return () => clearTimeout(displayTimer);
  }, [onFinish]); // Dependency array ensures the effect runs only once

  // Determine the transition class based on visibility state
  const transitionClass = isVisible
    ? 'opacity-100' // Fully visible
    : 'opacity-0 pointer-events-none'; // Fully transparent and non-interactive

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center 
                  bg-[#106681] text-white transition-opacity duration-500 ease-in-out ${transitionClass}`}
      aria-hidden={!isVisible}
    >

      {/* App Name with Gradient Text */}
      <h1 className="text-7xl font-extrabold text-[#F6FAFD] pacifico-regular">
        TripTrap
      </h1>

      {/* Tagline */}
      <p className="mt-6 text-base font-light italic text-gray-300">
        วางแผนการเดินทางของคุณ...
      </p>
      
      {/* Powered By */}
      <div className="absolute bottom-10 text-sm text-white">
          Powered by <span className="font-semibold text-gray-100">Next.js</span>
      </div>
    </div>
  );
}
