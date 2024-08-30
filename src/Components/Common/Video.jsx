import { useEffect, useRef, useState } from 'react';
import video from "media/mainVideo.mp4";

export const MainVideo = ({ videoOpacity }) => {
  const videoRef = useRef(null);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handlePlay = () => {
      if (hasPlayedOnce) {
        videoElement.currentTime = 3.6;
      } else {
        videoElement.currentTime = 0;
        setHasPlayedOnce(true);
      }
    };

    const handleTimeUpdate = () => {
      if (videoElement.currentTime >= 13.8) {
        videoElement.currentTime = 3.6;
      }
    };

    videoElement.addEventListener('play', handlePlay);
    videoElement.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      videoElement.removeEventListener('play', handlePlay);
      videoElement.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [hasPlayedOnce]);

  return (
    <video
      ref={videoRef}
      src={video}
      autoPlay
      muted
      loop
      playsInline
      className={`main-video ${videoOpacity === 0 ? 'fade-out' : ''}`}
      style={{ opacity: videoOpacity, transition: 'opacity 0.1s ease-in-out' }}
      preload="auto"
    />
  );
};