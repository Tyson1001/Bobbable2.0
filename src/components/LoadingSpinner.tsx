import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`animate-spin ${sizeClasses[size]} ${className}`}>
      <div className="w-full h-full border-4 border-purple-200 border-t-purple-600 rounded-full"></div>
    </div>
  );
}

export function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-20 h-20 mx-auto mb-8">
          <LoadingSpinner size="lg" />
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          Loading Bobabble
        </h2>
        <p className="text-gray-600">
          Preparing your bubble tea experience...
        </p>
      </div>
    </div>
  );
}