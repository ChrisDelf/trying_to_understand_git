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

const AudioPlayer = ({ tracks, rerender }) => {
  const selectedTrack = useSelector((state) => state.user); // Create a selector to get the selected song from Redux store
  const [trackIndex, setTrackIndex] = useState(null);
  const [currentTrack, setCurrentTrack] = useState();
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [nextSong, setNextSong] = useState({
    src: null,
    title: null,
    index: null,
  });
  // const dispatch = useDispatch();
  // reference
  const audioRef = useRef();
  const progressBarRef = useRef();

  useEffect(() => {
    // You can perform any additional actions when the selected song changes here
    // For example, you can update the state or perform other side effects.
    // setTrackIndex(selectedTrack.index);
    // setCurrentTrack(tracks[trackIndex]);
    setCurrentTrack(selectedTrack.selectedSong)
    setTrackIndex(selectedTrack.index);
  }, [selectedTrack.selectedSong]);


  const handleNext = () => {
    if (trackIndex >= tracks.length - 1) {
      setTrackIndex(0);
      setCurrentTrack(tracks[0]);
      // setNextSong({
      //   src: tracks[0].id,
      //   title: tracks[0].name,
      //   index: 0,
      // });
      // dispatch(nextSong);
    } else {
      setTrackIndex((prev) => prev + 1);
      setCurrentTrack(tracks[trackIndex + 1]);
      // setNextSong({
      //   src: tracks[trackIndex + 1].id,
      //   title: tracks[trackIndex + 1].name,
      //   index: trackIndex + 1,
      // });
      // dispatch(nextSong);
    }
  };
  return (
    <>
      <div>
        {trackIndex !== null || currentTrack !== undefined ? (
          <div className="audio-player">
            <div className="inner">
            <DisplayTrack
                {...{
                  rerender,
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
