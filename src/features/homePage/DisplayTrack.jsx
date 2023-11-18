import PropTypes from "prop-types";
import React,  { useEffect } from "react";
import { BsMusicNoteBeamed } from "react-icons/bs";
import "../../styles/customize-progress-bar.css";
import "../../styles/index.css";
import { useSelector } from "react-redux";
const SERVER_URL = "http://localhost:3500/song/";

const DisplayTrack = ({
  currentTrack,
  audioRef,
  setDuration,
  progressBarRef,
  handleNext,

}) => {
  // Create a selector to get the selected song from Redux store
  const onLoadedMetadata = () => {
    const seconds = audioRef.current.duration;
    setDuration(seconds);
    progressBarRef.current.max = seconds;
  };


//   useEffect(() => {
//     // You can perform any additional actions when the selected song changes here
//     // For example, you can update the state or perform other side effects.
//     console.log(currentTrack.id)
//   }, [rerender]);
 if (currentTrack == undefined) {
    return(<div></div>)
 }

  return (
    <div>
      {currentTrack !== undefined || currentTrack !== "http://localhost:3500/song/play/null" ? (
      <>
      <audio
        src={currentTrack.src}
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={handleNext}
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
      </>
      ) : null}
    </div>
  );
};

DisplayTrack.propTypes = {
  currentTrack: PropTypes.object,
  audioRef: PropTypes.object,
  setDuration: PropTypes.func,
  progressBarRef: PropTypes.object,
  handleNext: PropTypes.func
};

export default DisplayTrack;
