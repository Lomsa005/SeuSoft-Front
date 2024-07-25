import { MainVideo } from "../Common/Video";
import { ContactButton } from "../Common/contactButton";
import { Boxes } from "../Common/boxes";
import { Contact } from "../Containers/Contacts/Contact";
import { Container } from "../Containers/Container";

export const HomePage = () => {
  return (
    <div className="mainContainer">
      <Boxes />
      <Contact/>
     <Container/>
      <div className="main">
        <MainVideo />
        <ContactButton />
      </div>
    </div>
  );
};
