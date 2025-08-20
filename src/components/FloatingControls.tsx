import React from 'react';

interface FloatingControlsProps {
  visible: boolean;
  canGoBack: boolean;
  canGoForward: boolean;
  onBack: () => void;
  onForward: () => void;
  onExit: () => void;
  onOpenExternal: () => void;
}

export const FloatingControls: React.FC<FloatingControlsProps> = ({
  visible,
  canGoBack,
  canGoForward,
  onBack,
  onForward,
  onExit,
  onOpenExternal
}) => {
  return (
    <div className={`floating-controls ${visible ? 'visible' : ''}`}>
      <button 
        onClick={onBack} 
        disabled={!canGoBack}
        className="float-button"
        title="Go Back"
      >
        ←
      </button>
      <button 
        onClick={onForward} 
        disabled={!canGoForward}
        className="float-button"
        title="Go Forward"
      >
        →
      </button>
      <button 
        onClick={onExit} 
        className="float-button"
        title="Exit Fullscreen"
      >
        ✕
      </button>
      <button 
        onClick={onOpenExternal} 
        className="float-button"
        title="Open in New Tab"
      >
        ↗
      </button>
    </div>
  );
};