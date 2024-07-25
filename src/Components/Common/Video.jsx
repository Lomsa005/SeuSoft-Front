import { useEffect, useRef } from 'react'
import video from "media/mainVideo.mp4";

export const MainVideo = () => {
  const videoRef = useRef(null);
  
  useEffect(() => {
    const videoElement = videoRef.current;

    const attemptPlay = () => {
      videoElement.play().catch(error => {
        console.error('Error attempting to play the video:', error)
      })
    }

    if (videoElement) {
      
      videoElement.load()

      attemptPlay()

      const intervalId = setInterval(() => {
        if (videoElement.paused) {
          attemptPlay()
        } else {
          clearInterval(intervalId)
        }
      }, 1000)

      return () => clearInterval(intervalId)
    }
  }, [])
  
  return (
    <video
    ref={videoRef}
    src={video}
    autoPlay
    muted
    loop
    playsInline
    // controlsList="nodownload"
    className="main-video"
    preload="auto"
    />
  );
};
