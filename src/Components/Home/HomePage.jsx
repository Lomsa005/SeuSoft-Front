import { MainVideo } from "./Video";
import { ContactButton } from "./contactButton";

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
