import React from 'react';

interface BlockedOverlayProps {
  visible: boolean;
  onOpenExternal: () => void;
  onClose: () => void;
}

export const BlockedOverlay: React.FC<BlockedOverlayProps> = ({
  visible,
  onOpenExternal,
  onClose
}) => {
  if (!visible) return null;

  return (
    <div className="blocked-overlay">
      <div className="blocked-content">
        <h3>Embedding Blocked</h3>
        <p>This page cannot be displayed in an iframe. Open it in a new tab instead.</p>
        <div className="blocked-buttons">
          <button onClick={onOpenExternal} className="primary-button">
            Open in New Tab
          </button>
          <button onClick={onClose} className="secondary-button">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};