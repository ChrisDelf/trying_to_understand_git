import React, { useEffect, useRef, useState } from "react";
import { ThemeProvider } from "@mui/material";
import mainTheme from "../../app/themes";
import { useSelector } from "react-redux";
import DisplayTrack from "./DisplayTrack";
import Controls from "./Controls";
import ProgressBar from "./ProgressBar";
import "../../styles/customize-progress-bar.css";
import "../../styles/index.css";
import PropTypes from "prop-types";

const AudioPlayer = ({ tracks }) => {
  const selectedTrack = useSelector((state) => state.user.index); // Create a selector to get the selected song from Redux store
  const [trackIndex, setTrackIndex] = useState(selectedTrack);
  const [currentTrack, setCurrentTrack] = useState(tracks[trackIndex]);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  // reference
  const audioRef = useRef();
  const progressBarRef = useRef();

  useEffect(() => {
    // You can perform any additional actions when the selected song changes here
    // For example, you can update the state or perform other side effects.
    setCurrentTrack(tracks[trackIndex]);
    console.log(currentTrack)
  }, [selectedTrack]);

  const handleNext = () => {
    if (trackIndex >= tracks.length - 1) {
      setTrackIndex(0);
      setCurrentTrack(tracks[0]);
    } else {
      setTrackIndex((prev) => prev + 1);
      setCurrentTrack(tracks[trackIndex + 1]);
    }
  };

  return (
    <>
      <div>
        {currentTrack !== "undefined" ? (
          <div className="audio-player">
            <div className="inner">
              <DisplayTrack
                {...{
                  currentTrack,
                  audioRef,
                  setDuration,
                  progressBarRef,
                  handleNext,
                }}
              />
              <Controls
                {...{
                  audioRef,
                  progressBarRef,
                  duration,
                  setTimeProgress,
                  tracks,
                  trackIndex,
                  setTrackIndex,
                  setCurrentTrack,
                  handleNext,
                }}
              />
              <ProgressBar
                {...{ progressBarRef, audioRef, timeProgress, duration }}
              />
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

AudioPlayer.prototype = {
  tracks: PropTypes.array,
};

export default AudioPlayer;
