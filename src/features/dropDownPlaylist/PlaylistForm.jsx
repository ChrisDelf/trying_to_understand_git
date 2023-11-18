// PlaylistForm.js

import React, { useState } from "react";
import { postForPlaylist } from "../homePage/userSlice";

const PlaylistForm = ({ onClose, onSave }) => {
  const [playlistName, setPlaylistName] = useState("");

  const handleInputChange = (e) => {
    setPlaylistName(e.target.value);
  };

  const handleSave = () => {
    onSave(playlistName);
    postForPlaylist(playlistName)
    setPlaylistName(""); // Clear the input after saving
    onClose();
  };


  return (
    <div className="playlist-card">
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
      <div className= "available-playlists">
 
      </div>
    </div>
  );
};

export default PlaylistForm;
