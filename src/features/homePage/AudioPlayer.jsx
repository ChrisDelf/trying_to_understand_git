import React, { useEffect, useRef, useState } from "react";
import { ThemeProvider } from "@mui/material";
import ReactAudioPlayer from "react-audio-player";
import mainTheme from "../../app/themes";
import { useSelector } from "react-redux";

const AudioPlayer = () => {
  const selectedSong = useSelector((state) => state.user.selectedSong); // Create a selector to get the selected song from Redux store
  const audioPlayerRef = useRef(null);
  const [ song, setSong] = useState(selectedSong)
  useEffect(() => {
    // You can perform any additional actions when the selected song changes here
    // For example, you can update the state or perform other side effects.
    setSong(selectedSong)
      console.log(selectedSong)
  }, [selectedSong]);

  const handleProgressBarClick = (e) => {
    const audio = audioPlayerRef.current.audioEl;
    const progressBar = audioPlayerRef.current.progressEl;

    const clickX = e.pageX - progressBar.getBoundingClientRect().left;
    const percentClicked = (clickX / progressBar.offsetWidth) * 100;
    const duration = audio.duration;

    const seekTime = (duration * percentClicked) / 100;
    audio.currentTime = seekTime;
  };

  return (
    <ThemeProvider theme={mainTheme}>
      <ReactAudioPlayer
        src={song}
        controls
        onLoadedMetadata={() => {
          // You can do something when the audio is loaded, if needed
        }}
        onClick={(e) => {
          // Handle clicks on the progress bar
          handleProgressBarClick(e);
        }}
      />
    </ThemeProvider>
  );
};

export default AudioPlayer;
