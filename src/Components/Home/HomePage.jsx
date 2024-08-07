import { useState, useEffect } from "react";
import { MainVideo } from "../Common/Video";
import { ContactButton } from "../Common/contactButton";
import { Boxes } from "../Common/boxes";
import { Container } from "../Containers/Container";
import { Contact } from "../Containers/Contacts/Contact";
import { useAppContext } from '../Layout/AppContext';
import { useData } from '../Api/Api';
import { useLanguage } from "../Common/LanguageContext";

export const HomePage = () => {
  const [activeContainer, setActiveContainer] = useState(null);
  const [isContactVisible, setIsContactVisible] = useState(false);
  const [showBoxes, setShowBoxes] = useState(false);
  const [activeBoxId, setActiveBoxId] = useState(null); // No change needed here
  const { activeLink, setActiveLink } = useAppContext();
  const { boxesData, loading } = useData();
  const { isGeo } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBoxes(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (activeLink && boxesData.length > 0) {
      const box = boxesData.find(box => (isGeo ? box.titleGe : box.titleEn) === activeLink);
      if (box) {
        handleBoxClick(box.id, box.titleEn, box.titleGe, box.bodyEn, box.bodyGe, box.isimage, box.images, box.titlesEn, box.titlesGe, box.href);
      }
      setActiveLink(null);
    }
  }, [activeLink, boxesData, setActiveLink, isGeo]);

  const handleBoxClick = (id, titleEn, titleGe, bodyEn, bodyGe, isimage, images, titlesEn, titlesGe, href) => {
    setActiveBoxId(id.toString());
    setActiveContainer({ id, titleEn, titleGe, bodyEn, bodyGe, isimage, images, titlesEn, titlesGe, href });
    setIsContactVisible(false);
  };

  const handleCloseContainer = () => {
    setActiveContainer(null);
    setActiveBoxId(null);
  };

  const handleContactClick = () => {
    setIsContactVisible(true);
    setActiveContainer(null);
    setActiveBoxId(null);
  };

  const handleCloseContact = () => {
    setIsContactVisible(false);
  };

  const getContainerContent = (id) => {
    const box = boxesData.find(box => box.id === id);
    return box ? (!isGeo ? box.bodyEn : box.bodyGe) : "";
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mainContainer">
      {showBoxes && <Boxes onBoxClick={handleBoxClick} activeBoxId={activeBoxId} />}
      <Container
        title={!isGeo ? activeContainer?.titleEn : activeContainer?.titleGe}
        isimage={activeContainer?.isimage}
        content={activeContainer ? getContainerContent(activeContainer.id) : ""}
        isVisible={!!activeContainer}
        onClose={handleCloseContainer}
        titles={!isGeo ? activeContainer?.titlesEn : activeContainer?.titlesGe}
        href={activeContainer?.href}
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
