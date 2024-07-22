import { MainVideo } from "../Common/Video";
import { ContactButton } from "../Common/contactButton";
import { Contact } from "../Containers/Contact";
import { Container } from "../Containers/Container";

export const HomePage = () => {
  return (
    <div className="mainContainer">
      <Container/>
      <div className="main">
        <MainVideo />
        <ContactButton />
      </div>
    </div>
  );
};
