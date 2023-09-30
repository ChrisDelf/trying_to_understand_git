import React, { useEffect, useRef, useState } from "react";
import { ThemeProvider } from "@mui/material";
import mainTheme from "../../app/themes";
import { useDispatch, useSelector } from "react-redux";
import DisplayTrack from "./DisplayTrack";
import Controls from "./Controls";
import ProgressBar from "./ProgressBar";
import "../../styles/customize-progress-bar.css";
import "../../styles/index.css";
import PropTypes from "prop-types";
import { setSelectedSong } from "./userSlice";

const AudioPlayer = ({ tracks }) => {
  const selectedTrack = useSelector((state) => state.user); // Create a selector to get the selected song from Redux store
  const [trackIndex, setTrackIndex] = useState(null);
  const [currentTrack, setCurrentTrack] = useState();
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const dispatch = useDispatch();
  // reference
  const audioRef = useRef();
  const progressBarRef = useRef();

  useEffect(() => {
    // You can perform any additional actions when the selected song changes here
    // For example, you can update the state or perform other side effects.
    setCurrentTrack(selectedTrack.selectedSong);
    setTrackIndex(selectedTrack.index);
    console.log(currentTrack);
  }, [selectedTrack.selectedSong]);

  const handleNext = async () => {
    if (trackIndex >= tracks.length - 1) {
      setTrackIndex(0);
      setCurrentTrack({ src: tracks[0].id, title: tracks[0].name, index: 0 });
      let nextTrack = {
        src: tracks[0].id,
        title: tracks[0].name,
        index: 0,
      };
      dispatch(setSelectedSong(nextTrack));
    } else {
      setTrackIndex((prev) => prev + 1);
      setCurrentTrack({
        src: tracks[trackIndex + 1].id,
        title: tracks[trackIndex + 1].name,
        index: trackIndex + 1,
      });
      let nextTrack = {
        src: tracks[trackIndex + 1].id,
        title: tracks[trackIndex + 1].name,
        index: trackIndex + 1,
      };
      dispatch(setSelectedSong(nextTrack));
    }
  };
  if (currentTrack == undefined) {
    return <div></div>;
  }

  return (
    <>
      <div>
        {trackIndex !== null ||
        currentTrack.src !== null ||
        currentTrack.src !== undefined ||
        currentTrack !== undefined ||
        currentTrack !== null ? (
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
