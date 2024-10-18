import { useReducer } from "react";

// Initial state
const initialState = {
  isPlaying: false,
  selectedQuality: "360p",
  muted: false,
  playedSeconds: 0,
  volume: 0.8,
};

// Action types
const actionTypes = {
  TOGGLE_PLAY: "TOGGLE_PLAY",
  SET_QUALITY: "SET_QUALITY",
  SEEK: "SEEK",
  MUTE: "MUTE",
  FAST_FORWARD: "FAST_FORWARD",
  REWIND: "REWIND",
  VOLUME_CHANGE: "VOLUME_CHANGE",
};

// Reducer function
const videoReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_PLAY:
      return {
        ...state,
        isPlaying: !state.isPlaying,
      };
    case actionTypes.SET_QUALITY:
      return {
        ...state,
        selectedQuality: action.payload,
        playedSeconds: action.playedSeconds, // Save the played time
      };
    case actionTypes.SEEK:
      return {
        ...state,
        playedSeconds: action.payload.playedSeconds,
      };
    case actionTypes.FAST_FORWARD:
      return {
        ...state,
        playedSeconds: action.payload,
      };
    case actionTypes.REWIND:
      return {
        ...state,
        playedSeconds: action.payload,
      };
    case actionTypes.MUTE:
      return {
        ...state,
        muted: !state.muted,
        volume: state.muted ? 0.5 : 0.0,
      };
    case actionTypes.VOLUME_CHANGE:
    case actionTypes.VOLUME_SEEK_UP:
      return {
        ...state,
        volume: action.payload,
        muted: action.payload === 0 ? true : false,
      };

    default:
      return state;
  }
};

// Custom hook that returns only state and dispatch
const useVideoPlayer = () => {
  const [state, dispatch] = useReducer(videoReducer, initialState);
  return { state, dispatch };
};

export default useVideoPlayer;
