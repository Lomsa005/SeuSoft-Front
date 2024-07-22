import video from "media/mainVideo.mp4";

export const MainVideo = () => {
  return (
    <video className="main-video" loop muted autoPlay playsInline src={video} />
  );
};
