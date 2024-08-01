import  { useState, useEffect } from "react";
import { MainVideo } from "../Common/Video";
import { ContactButton } from "../Common/contactButton";
import { Boxes } from "../Common/boxes";
import { Container } from "../Containers/Container";
import { Contact } from "../Containers/Contacts/Contact";
import { useAppContext } from '../Layout/AppContext';
import { useData } from '../Api/Api';

export const HomePage = () => {
  const [activeContainer, setActiveContainer] = useState(null);
  const [isContactVisible, setIsContactVisible] = useState(false);
  const { activeLink, setActiveLink } = useAppContext();
  const { boxesData, loading } = useData();

  useEffect(() => {
    if (activeLink && boxesData.length > 0) {
      const box = boxesData.find(box => box.title === activeLink);
      if (box) {
        handleBoxClick(box.id, box.title, box.isimage, box.images, box.titles);
      }
      setActiveLink(null);
    }
  }, [activeLink, boxesData, setActiveLink]);

  const handleBoxClick = (id, title, isimage, images, titles) => {
    setActiveContainer({ id, title, isimage, images, titles });
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
    const box = boxesData.find(box => box.id === id);
    return box ? box.body : "";
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mainContainer">
      <Boxes onBoxClick={handleBoxClick} />
      <Container
        title={activeContainer?.title}
        isimage={activeContainer?.isimage}
        content={activeContainer ? getContainerContent(activeContainer.id) : ""}
        isVisible={!!activeContainer}
        onClose={handleCloseContainer}
        titles={activeContainer?.titles}
        images={activeContainer?.images}
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
