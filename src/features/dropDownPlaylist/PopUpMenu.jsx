
// PopupMenu.js
import React from 'react';
import './PopUpMenu.css';

const PopUpMenu = ({ onClose }) => {
  return (
    <div className="popup-menu">
      <div className="popup-content">
        {/* Your menu content goes here */}
        GREETINGS NOOB HAH AHA AH AAHA 
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default PopUpMenu;
