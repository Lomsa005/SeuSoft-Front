import video from "media/mainVideo.mp4";

export const MainVideo = () => {
  return (
    <video autoPlay muted loop className="main-video">
      <source src={video} type="video/mp4"/>
    </video>
  );
};
