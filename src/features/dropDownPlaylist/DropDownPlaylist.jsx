 // PlaylistDropdown.js

import React, { useState } from 'react';
import PlaylistForm from './PlaylistForm';

const PlaylistDropdown = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleToggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  const handleSavePlaylist = (playlistName) => {
    // Add logic to save the playlist (e.g., API call, state update)
    console.log('Playlist Name:', playlistName);
  };

  return (
    <div className="playlist-dropdown">
      <button onClick={handleToggleForm}>Create Playlist</button>
      {isFormOpen && (
        <PlaylistForm onClose={handleToggleForm} onSave={handleSavePlaylist} />
      )}
    </div>
  );
};

export default PlaylistDropdown;

