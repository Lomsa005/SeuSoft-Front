import { useState } from "react";
import { MainVideo } from "../Common/Video";
import { ContactButton } from "../Common/contactButton";
import { Boxes } from "../Common/boxes";
import { Container } from "../Containers/Container";
import { Contact } from "../Containers/Contacts/Contact";

export const HomePage = () => {
  const [activeContainer, setActiveContainer] = useState(null);
  const [isContactVisible, setIsContactVisible] = useState(false);

  const handleBoxClick = (id, title) => {
    setActiveContainer({ id, title });
    setIsContactVisible(false);
  };

  const handleCloseContainer = () => {
    setActiveContainer(null);
  };

  const handleContactClick = () => {
    setIsContactVisible(true);
    setActiveContainer(null);
  };

  const handleCloseContact = () => {
    setIsContactVisible(false);
  };

  const getContainerContent = (id) => {
    return `შექმნას საერთაშორისოდ ცნობადი, სტუდენტსა და მის წარმატებაზე ორიენტირებული, თანამედროვე სტანდარტების მქონე აკადემიური გარემო,
            რომელიც სტიმულს აძლევს სწავლას, სწავლებასა და კვლევას, შესაბამისად,
            ყველას უქმნის საკუთარი პოტენციალის სრული რეალიზების შესაძლებლობას და
            ამზადებს მაღალი კვალიფიკაციის მქონე კონკურენტუნარიან სპეციალისტებს
            შრომის ბაზრისათვის. ევროპის უმაღლესი საგანმანათლებლო სივრცის
            ღირებულებებსა და პრინციპებზე დაფუძნებული განათლების უზრუნველყოფა,
            ინოვაციური და მოქნილი მიდგომების გამოყენება სტუდენტებისა და
            საზოგადოების სხვადასხვა საჭიროებისა და მოთხოვნის საპასუხოდ, მომავალი
            ტენდენციების განჭვრეტა და ხარისხის გაუმჯობესებაზე ფოკუსირება, სეუ-ს
            მუდმივი მიზანია.`;
  };

  return (
    <div className="mainContainer">
      <Boxes onBoxClick={handleBoxClick} />
      <Container
        title={activeContainer?.title}
        content={activeContainer ? getContainerContent(activeContainer.id) : ""}
        isVisible={!!activeContainer}
        onClose={handleCloseContainer}
      />
      <Contact 
        isVisible={isContactVisible}
        onClose={handleCloseContact}
      />
      <div className="main">
        <MainVideo />
        <ContactButton onClick={handleContactClick} />
      </div>
    </div>
  );
};