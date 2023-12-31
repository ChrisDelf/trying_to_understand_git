import React, { useEffect, useState, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import "../../styles/customize-progress-bar.css";
import "../../styles/index.css";
// icons
import {
  IoPlayBackSharp,
  IoPlayForwardSharp,
  IoPlaySkipBackSharp,
  IoPlaySkipForwardSharp,
  IoPlaySharp,
  IoPauseSharp,
} from "react-icons/io5";

import { IoMdVolumeHigh, IoMdVolumeOff, IoMdVolumeLow } from "react-icons/io";
import { useDispatch } from "react-redux";
import { setSelectedSong } from "./userSlice";

const Controls = ({
  audioRef,
  progressBarRef,
  duration,
  setTimeProgress,
  tracks,
  trackIndex,
  setTrackIndex,
  setCurrentTrack,
  handleNext,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(60);
  const [muteVolume, setMuteVolume] = useState(false);

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const dispatch = useDispatch();

  const playAnimationRef = useRef();

  const repeat = useCallback(() => {
    const currentTime = audioRef.current.currentTime;
    setTimeProgress(currentTime);
    progressBarRef.current.value = currentTime;
    progressBarRef.current.style.setProperty(
      "--range-progress",
      `${(progressBarRef.current.value / duration) * 100}%`,
    );

    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [audioRef, duration, progressBarRef, setTimeProgress]);

  useEffect(() => {
    if (audioRef.current != undefined) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
      playAnimationRef.current = requestAnimationFrame(repeat);
    }
  }, [isPlaying, audioRef, repeat]);

  const skipForward = () => {
    audioRef.current.currentTime += 15;
  };

  const skipBackward = () => {
    audioRef.current.currentTime -= 15;
  };

  const handlePrevious = () => {
    if (trackIndex === 0) {
      let lastTrackIndex = tracks.length - 1;
      setTrackIndex(lastTrackIndex);
      setCurrentTrack({
        src: tracks[lastTrackIndex].id,
        title: tracks[lastTrackIndex].name,
        index: lastTrackIndex,
      });
      let prevTrack = {
        src: tracks[lastTrackIndex].id,
        title: tracks[lastTrackIndex].name,
        index: lastTrackIndex,
      };

      dispatch(setSelectedSong(prevTrack));
    } else {
      setTrackIndex((prev) => prev - 1);
      setCurrentTrack({
        src: tracks[trackIndex - 1].id,
        title: tracks[trackIndex - 1].name,
        index: trackIndex,
      });
      let prevTrack = {
        src: tracks[trackIndex - 1].id,
        title: tracks[trackIndex - 1].name,
        index: trackIndex,
      }
      dispatch(setSelectedSong(prevTrack));
    }
  };

  useEffect(() => {
    if (audioRef.current != undefined) {
      if (audioRef) {
        audioRef.current.volume = volume / 100;
        audioRef.current.muted = muteVolume;
      }
    }
  }, [volume, audioRef, muteVolume]);

  return (
    <div className="controls-wrapper">
      {audioRef !== undefined ? (
        <>
          <div className="controls">
            <button onClick={handlePrevious}>
              <IoPlaySkipBackSharp />
            </button>
            <button onClick={skipBackward}>
              <IoPlayBackSharp />
            </button>

            <button onClick={togglePlayPause}>
              {isPlaying ? <IoPauseSharp /> : <IoPlaySharp />}
            </button>
            <button onClick={skipForward}>
              <IoPlayForwardSharp />
            </button>
            <button onClick={handleNext}>
              <IoPlaySkipForwardSharp />
            </button>
          </div>
          <div className="volume">
            <button onClick={() => setMuteVolume((prev) => !prev)}>
              {muteVolume || volume < 5 ? (
                <IoMdVolumeOff />
              ) : volume < 40 ? (
                <IoMdVolumeLow />
              ) : (
                <IoMdVolumeHigh />
              )}
            </button>
            <input
              type="range"
              min={0}
              max={100}
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              style={{
                background: `linear-gradient(to right, #f50 ${volume}%, #ccc ${volume}%)`,
              }}
            />
          </div>
        </>
      ) : null}
    </div>
  );
};

Controls.propTypes = {
  audioRef: PropTypes.object,
  setTimeProgress: PropTypes.func,
  duration: PropTypes.number,
  progressBarRef: PropTypes.object,
};

export default Controls;
