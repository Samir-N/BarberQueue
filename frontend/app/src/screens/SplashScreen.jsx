import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto redirect after 3 seconds
    const timer = setTimeout(() => {
      navigate('/welcome');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-base to-surface-l2 flex flex-col items-center justify-center px-6">
      {/* Crown Logo */}
      <div className="mb-8 text-gold-decorative">
        <svg
          width="64"
          height="64"
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Crown */}
          <path d="M8 32h48" />
          <path d="M12 32v-8h8v8M32 32v-12h0M44 32v-8h8v8" />
          <path d="M10 32c-1.5 4 -1 10 6 10h32c7 0 7.5 -6 6 -10" />
          {/* Decorative */}
          <circle cx="16" cy="24" r="2" fill="currentColor" />
          <circle cx="32" cy="16" r="2" fill="currentColor" />
          <circle cx="48" cy="24" r="2" fill="currentColor" />
        </svg>
      </div>

      {/* App Name */}
      <h1 className="font-display text-h1 text-text-high mb-4 text-center">
        BarberQueue
      </h1>

      {/* Tagline */}
      <p className="font-ui text-text-medium text-body text-center max-w-xs mb-12">
        Royal barbering at your fingertips. Book premium grooming experiences.
      </p>

      {/* Loading Indicator */}
      <div className="flex gap-2 mb-8">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 bg-gold-functional rounded-full animate-pulse"
            style={{ animationDelay: `${i * 100}ms` }}
          />
        ))}
      </div>

      {/* Skip Button */}
      <button
        onClick={() => navigate('/welcome')}
        className="absolute top-8 right-6 text-text-disabled hover:text-text-medium transition-colors text-caption"
      >
        Skip
      </button>
    </div>
  );
};

export default SplashScreen;
