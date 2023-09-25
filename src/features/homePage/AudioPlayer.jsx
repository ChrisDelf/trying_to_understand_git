import React, { useEffect, useRef, useState } from "react";
import { ThemeProvider } from "@mui/material";
import mainTheme from "../../app/themes";
import { useSelector } from "react-redux";
import DisplayTrack from "./DisplayTrack";
import Controls from "./Controls";
import ProgressBar from "./ProgressBar";

const AudioPlayer = () => {
  const selectedSong = useSelector((state) => state.user.selectedSong); // Create a selector to get the selected song from Redux store
  const [currentTrack, setCurrentTrack] = useState(selectedSong);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  // reference
  const audioRef = useRef();
  const progressBarRef = useRef();

  useEffect(() => {
    // You can perform any additional actions when the selected song changes here
    // For example, you can update the state or perform other side effects.
    setCurrentTrack(selectedSong);
  }, [selectedSong]);

  return (
    <ThemeProvider theme={mainTheme}>
      {currentTrack.src !== "http://localhost:3500/song/play/undefined" ? (
        <>
          <DisplayTrack currentTrack={currentTrack} setDuration={setDuration} audioRef={audioRef} progressBarRef={progressBarRef} />
          <Controls audioRef={audioRef} setTimeProgress = {setTimeProgress} duration={duration} progressBarRef={progressBarRef} />
          <ProgressBar timeProgress={timeProgress} duration={duration} progressBarRef={progressBarRef} audioRef={audioRef} />
        </>
      ) : null}
    </ThemeProvider>
  );
};

export default AudioPlayer;
