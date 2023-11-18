// PlaylistForm.js

import React, { useState } from 'react';

const PlaylistForm = ({ onClose, onSave }) => {
  const [playlistName, setPlaylistName] = useState('');

  const handleInputChange = (e) => {
    setPlaylistName(e.target.value);
  };

  const handleSave = () => {
    onSave(playlistName);
    setPlaylistName(''); // Clear the input after saving
    onClose();
  };

  return (
    <div className="playlist-form">
      <h2>Create Playlist</h2>
      <label htmlFor="playlistName">Playlist Name:</label>
      <input
        type="text"
        id="playlistName"
        value={playlistName}
        onChange={handleInputChange}
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default PlaylistForm;

