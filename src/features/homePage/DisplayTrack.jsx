import PropTypes from "prop-types";
import React,  { useEffect } from "react";
import { BsMusicNoteBeamed } from "react-icons/bs";
import "../../styles/customize-progress-bar.css";
import "../../styles/index.css";

const DisplayTrack = ({
  currentTrack,
  audioRef,
  setDuration,
  progressBarRef,
  // handleNext,
}) => {
  const onLoadedMetadata = () => {
    const seconds = audioRef.current.duration;
    setDuration(seconds);
    progressBarRef.current.max = seconds;
  };

  return (
    <div>
      <audio
        src={currentTrack.src}
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
        // onEnded={handleNext}
      />
      <div className="audio-info">
        <div className="audio-image">
          {currentTrack.thumbnail ? (
            <img src={currentTrack.thumbnail} alt="audio avatar" />
          ) : (
            <div className="icon-wrapper">
              <span className="audio-icon">
                <BsMusicNoteBeamed />
              </span>
            </div>
          )}
        </div>
        <div className="text">
          <p className="title">{currentTrack.title}</p>
          <p>{currentTrack.author}</p>
        </div>
      </div>
    </div>
  );
};

DisplayTrack.propTypes = {
  currentTrack: PropTypes.object,
  audioRef: PropTypes.object,
  setDuration: PropTypes.func,
  progressBarRef: PropTypes.object,
};

export default DisplayTrack;
