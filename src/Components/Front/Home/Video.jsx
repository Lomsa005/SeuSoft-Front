import video from '../../../assets/mainVideo.mp4'

export const MainVideo = () => {
    return (
          <video autoPlay muted loop>
            <source src={video} type="video/mp4" />
          </video>
      );
}
