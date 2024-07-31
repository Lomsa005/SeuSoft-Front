import { useState, useEffect } from "react";
import { MainVideo } from "../Common/Video";
import { ContactButton } from "../Common/contactButton";
import { Boxes } from "../Common/boxes";
import { Container } from "../Containers/Container";
import { Contact } from "../Containers/Contacts/Contact";
import { useAppContext } from '../Layout/AppContext';

export const HomePage = () => {
  const [activeContainer, setActiveContainer] = useState(null);
  const [isContactVisible, setIsContactVisible] = useState(false);
  const { activeLink, setActiveLink } = useAppContext();
  const boxes = [
    { id: 1, title: "პროდუქტები",  isimage: false },
    { id: 2, title: "სერვისები", isimage: false },
    { id: 3, title: "პორტფოლიო",  isimage: true },
    { id: 4, title: "ჩვენ შესახებ",  isimage: false },
  ];
  useEffect(() => {
    if (activeLink) {
      const boxId = boxes.find(box => box.title === activeLink)?.id;
      if (boxId) {
        handleBoxClick(boxId, activeLink, boxes.find(box => box.id === boxId).isimage);
      }
      setActiveLink(null); // Reset the active link
    }
  }, [activeLink]);
  const handleBoxClick = (id, title, isimage) => {
    setActiveContainer({ id, title, isimage });
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
        isimage={activeContainer?.isimage}
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