import { MainVideo } from "../Common/Video";
import { ContactButton } from "../Common/contactButton";
import { Boxes } from "../Common/boxes";

export const HomePage = () => {
  return (
    <div className="mainContainer">
      <div className="main">
        <MainVideo />
        <Boxes />
        <ContactButton />
      </div>
    </div>
  );
};
