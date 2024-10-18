import React from "react";
import ReactPlayer from "react-player";
import "./App.css";

import { Container } from "@mui/material";
import { useState } from "react";
import { useRef } from "react";
import Control from "./Components/Control";

import useVideoPlayer from "./hooks/useVideoPlayer"; // This should work
import useNetworkType from "./hooks/useNectworkType";
// import useFetchOnNetworkChange from "./hooks/useFetchOnNetworkChange";

const actionTypes = {
  TOGGLE_PLAY: "TOGGLE_PLAY",
  SET_QUALITY: "SET_QUALITY",
  SEEK: "SEEK",
  MUTE: "MUTE",
  FAST_FORWARD: "FAST_FORWARD",
  REWIND: "REWIND",
  VOLUME_CHANGE: "VOLUME_CHANGE",
};

function App() {
  const videoPlayerRef = useRef(null); // Reference to ReactPlayer
  const controlRef = useRef(null);
  const countRef = useRef(0); // Use a ref for count

  // Use the network detection hook to update the quality

  const { state, dispatch } = useVideoPlayer();
  const [videoState, setVideoState] = useState({
    played: 0,
    seeking: false,
  });

  useNetworkType(dispatch, videoPlayerRef);

  const progressHandler = (state) => {
    // Hide controls after 3 seconds of inactivity
    if (countRef.current > 1) {
      if (controlRef.current) {
        controlRef.current.style.visibility = "hidden"; // Hide controls
      }
    } else {
      countRef.current += 1; // Increment inactivity counter
    }

    // Continue with existing progress update logic
    if (!videoState.seeking) {
      setVideoState({
        ...videoState,
        played: state.played, // Update the fraction of the video played
        playedSeconds: state.playedSeconds, // Update the current time in seconds
      });
    }
  };

  const seekHandler = (e, value) => {
    setVideoState({ ...videoState, played: parseFloat(value) / 100 });
  };

  const seekMouseUpHandler = (e, value) => {
    setVideoState({ ...videoState, seeking: false });
    videoPlayerRef.current.seekTo(value / 100); // Seek to the desired time
  };

  const mouseMoveHandler = () => {
    if (controlRef.current) {
      controlRef.current.style.visibility = "visible"; // Show controls
    }
    countRef.current = 0; // Reset inactivity counter
  };

  const volumeChangeHandler = (e, value) => {
    const newVolume = parseFloat(value) / 100; // Convert value to decimal (0-1)
    dispatch({
      type: actionTypes.VOLUME_CHANGE,
      payload: newVolume,
    });
  };

  const volumeSeekUpHandler = (e, value) => {
    const newVolume = parseFloat(value) / 100;
    dispatch({
      type: actionTypes.VOLUME_SEEK_UP,
      payload: newVolume,
    });
  };

  return (
    <div className="video_container">
      <div>
        <h2>React player</h2>
      </div>
      <Container maxWidth="md" justify="center">
        <div className="player__wrapper" onMouseMove={mouseMoveHandler}>
            {/* //{console.log("selected quality" + state.selectedQuality)} */}
          <ReactPlayer
            ref={videoPlayerRef} // Attach the reference
            className="player"
            url={`https://files.ca1.vpsie.net/videos/1728550126/${state.selectedQuality}.webm`}
            width="100%"
            height="100%"
            playing={state.isPlaying}
            muted={state.muted}
            volume={state.volume}
            onStart={() => {
              // console.log("iam here in the on start" + state.playedSeconds);
              videoPlayerRef.current.seekTo(
                state.playedSeconds || 0,
                "seconds"
              ); // Seek to the saved time from global state
            }}
            loop={true}
            onProgress={progressHandler}
          />

          <Control
            state={state}
            controlRef={controlRef}
            videoState={videoState}
            videoPlayerRef={videoPlayerRef}
            actionTypes={actionTypes}
            seekHandler={seekHandler}
            seekMouseUpHandler={seekMouseUpHandler}
            onVolumeChangeHandler={volumeChangeHandler}
            onVolumeSeekUp={volumeSeekUpHandler}
            dispatch={dispatch}
          />
        </div>
      </Container>
    </div>
  );
}

export default App;
