import { MainVideo } from "../Common/Video";
import { ContactButton } from "../Common/contactButton";

export const HomePage = () => {
  return (
    <div className="mainContainer">
      <div className="main">
        <MainVideo />
        <ContactButton />
      </div>
    </div>
  );
};
