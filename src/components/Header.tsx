import React from 'react';

interface HeaderProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onToggleBackground: () => void;
  onToggleFullscreen: () => void;
  isFullscreen: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  isDarkMode,
  onToggleDarkMode,
  onToggleBackground,
  onToggleFullscreen,
  isFullscreen
}) => {
  return (
    <header className="header">
      <div className="brand">
        <div className="logo">
          <svg viewBox="0 0 64 64" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 6c8 6 8 16 0 22M52 58c-8-6-8-16 0-22" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M52 6c-8 6-8 16 0 22M12 58c8-6 8-16 0-22" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="brand-text">
          <h1>Bioinformatics.Sync</h1>
          <p className="tagline">Distraction-free search for bioinformatics</p>
        </div>
      </div>

      <div className="controls">
        <button 
          onClick={onToggleDarkMode} 
          className="control-button"
          title="Toggle Dark Mode (D)"
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
        <button 
          onClick={onToggleBackground} 
          className="control-button"
          title="Toggle Background"
        >
          BG
        </button>
        <button 
          onClick={onToggleFullscreen} 
          className="control-button"
          title="Toggle Fullscreen"
        >
          {isFullscreen ? '⛶' : '⛶'}
        </button>
      </div>
    </header>
  );
};