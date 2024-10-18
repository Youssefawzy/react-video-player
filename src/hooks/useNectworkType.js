import { useEffect } from "react";

const useNetworkType = (dispatch, videoPlayerRef) => {
  const detectNetworkSpeed = async () => {
    // Fetch sample file to test network speed
    const startTime = new Date().getTime(); // Start timer

    try {
      const response = await fetch("http://localhost:8000/download");
      await response.blob(); // Get the file as a Blob (we won't use it, but it ensures the download completes)
      const endTime = new Date().getTime(); // End timer

      const duration = (endTime - startTime) / 1000; // Time in seconds
      const fileSizeKB = 500; // The size of the file in KB

      // Calculate speed (KB/s)
      const speed = fileSizeKB / duration;
      console.log(`Downloaded in ${duration} seconds with speed: ${speed.toFixed(2)} KB/s`);

      // Determine quality based on download speed
      let quality = "360p"; // Default quality
      if (speed > 2000) { // Speed threshold for 1080p
        quality = "1080p";
      } else if (speed > 5000) { // Speed threshold for 720p
        quality = "720p";
      }

      // Safely access videoPlayerRef and dispatch quality update
      const currentPlayedTime = videoPlayerRef.current ? videoPlayerRef.current.getCurrentTime() : 0;
      dispatch({
        type: "SET_QUALITY",
        payload: quality,
        playedSeconds: currentPlayedTime,
      });
    } catch (error) {
      console.error("Error downloading file", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(detectNetworkSpeed, 5000); // Check every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [dispatch]);

  return;
};

export default useNetworkType;
