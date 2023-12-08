
// PopupMenu.js
import React from 'react';
import './PopupMenu.css';

const PopupMenu = ({ onClose }) => {
  return (
    <div className="popup-menu">
      <div className="popup-content">
        {/* Your menu content goes here */}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default PopupMenu;
