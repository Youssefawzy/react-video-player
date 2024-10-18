import {
  FastForward,
  FastRewind,
  Pause,
  PlayArrow,
  SkipNext,
  VolumeUp,
  VolumeOff,
  Settings,
} from "@mui/icons-material";
import "./Control.css";

import {
  ControlContainer,
  IconButton,
  PrettoSlider,
  VolumeSlider,
  QualityOptions,
  Option,
} from "./Control.styles";

const Control = ({
  controlRef,
  videoPlayerRef,
  videoState,
  seekMouseUpHandler,
  seekHandler,
  onVolumeChangeHandler,
  onVolumeSeekUp,
  state,
  dispatch,
  actionTypes,
}) => {
  // Format the time in MM:SS format
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const changeQuality = (newQuality) => {
    // console.log("new quality" + newQuality);
    const currentPlayedTime = videoPlayerRef.current.getCurrentTime(); // Save current time

    // Dispatch the quality change along with the played time
    dispatch({
      type: actionTypes.SET_QUALITY,
      payload: newQuality,
      playedSeconds: currentPlayedTime, // Pass the played seconds to the reducer
    });
  };

  const handleFastForward = () => {
    const videoDuration = videoPlayerRef.current.getDuration(); // Get video duration
    const newTime = Math.min(state.playedSeconds + 2, videoDuration); // Move forward 2 seconds
    dispatch({ type: actionTypes.FAST_FORWARD, payload: newTime });
    videoPlayerRef.current.seekTo(newTime, "seconds");
  };

  const handleRewind = () => {
    const newTime = Math.max(state.playedSeconds - 2, 0); // Move backward 2 seconds
    dispatch({ type: actionTypes.REWIND, payload: newTime });
    videoPlayerRef.current.seekTo(newTime, "seconds");
  };

  return (
    <ControlContainer className="control_Container" ref={controlRef}>
      <div className="top_container">
        <h2>Video PLayer</h2>
      </div>

      <div className="mid__container">
        <IconButton className="icon__btn" onClick={handleRewind}>
          <FastRewind
            sx={{ fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" } }} // Responsive font sizes
          />
        </IconButton>
        <IconButton
          className="icon__btn"
          onClick={() => dispatch({ type: actionTypes.TOGGLE_PLAY })}
        >
          {state.isPlaying ? (
            <Pause
              sx={{ fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" } }} // Responsive font sizes
            />
          ) : (
            <PlayArrow
              sx={{ fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" } }} // Responsive font sizes
            />
          )}
        </IconButton>

        <IconButton className="icon__btn" onClick={handleFastForward}>
          <FastForward
            sx={{ fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" } }} // Responsive font sizes
          />
        </IconButton>
      </div>

      <div className="bottom__container">
        <div className="slider__container">
          <PrettoSlider
            min={0}
            max={100}
            value={videoState.played * 100} // Converts the played fraction into percentage
            onChange={seekHandler} // Handles when the slider is dragged
            onChangeCommitted={seekMouseUpHandler} // Handles when the slider is released
          />
          <span>{formatTime(videoState.playedSeconds)}</span>
        </div>

        <div className="control__box">
          <IconButton className="icon__btn">
            <Settings fontSize="medium" />
            <QualityOptions className="quality-options">
              {["360p", "720p", "1080p"].map((quality) => (
                <Option
                  key={quality}
                  isSelected={state.selectedQuality === quality} // Check if this option is selected
                  onClick={() => {
                    changeQuality(quality);
                  }} // Handle click
                >
                  {quality}
                </Option>
              ))}
            </QualityOptions>
          </IconButton>

          <div className="inner__controls">
            <IconButton
              className="icon__btn"
              onClick={() => dispatch({ type: actionTypes.TOGGLE_PLAY })}
            >
              {state.isPlaying ? (
                <Pause fontSize="medium" />
              ) : (
                <PlayArrow fontSize="medium" />
              )}
            </IconButton>
            <IconButton className="icon__btn">
              <SkipNext fontSize="medium" />
            </IconButton>

            <IconButton
              className="icon__btn"
              onClick={() => dispatch({ type: actionTypes.MUTE })}
            >
              {state.muted ? (
                <VolumeOff fontSize="medium" /> // Show mute icon
              ) : (
                <VolumeUp fontSize="medium" /> // Show volume-up icon
              )}
            </IconButton>
          </div>

          <div className="volume__control">
            <VolumeSlider
              min={0}
              max={100}
              value={state.volume * 100} // Convert volume to percentage
              onChange={onVolumeChangeHandler}
              onChangeCommitted={onVolumeSeekUp}
            />
            <span>{`${Math.floor(state.volume * 100)}%`}</span>
          </div>
        </div>
      </div>
    </ControlContainer>
  );
};

export default Control;
