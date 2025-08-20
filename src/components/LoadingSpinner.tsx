import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="loading-spinner">
      <svg viewBox="0 0 100 100" width="60" height="60" className="dna-spinner">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#31f47c" />
            <stop offset="100%" stopColor="#7df9ff" />
          </linearGradient>
        </defs>
        <g transform="translate(50,50)">
          <g className="dna-rotate">
            <path 
              d="M-22 -35 C -6 -20, 6 -20, 22 -35" 
              stroke="url(#gradient)" 
              strokeWidth="3" 
              fill="none" 
              strokeLinecap="round"
            />
            <path 
              d="M-22 35 C -6 20, 6 20, 22 35" 
              stroke="url(#gradient)" 
              strokeWidth="3" 
              fill="none" 
              strokeLinecap="round"
            />
            <g transform="rotate(90)">
              <path 
                d="M-18 -28 C -6 -18, 6 -18, 18 -28" 
                stroke="url(#gradient)" 
                strokeWidth="2.6" 
                fill="none" 
                strokeLinecap="round"
              />
              <path 
                d="M-18 28 C -6 18, 6 18, 18 28" 
                stroke="url(#gradient)" 
                strokeWidth="2.6" 
                fill="none" 
                strokeLinecap="round"
              />
            </g>
            <g stroke="url(#gradient)" strokeWidth="2" strokeLinecap="round">
              <line x1="-8" y1="-18" x2="8" y2="-12" />
              <line x1="-10" y1="0" x2="10" y2="0" />
              <line x1="-8" y1="18" x2="8" y2="12" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};