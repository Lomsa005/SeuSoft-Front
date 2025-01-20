import { useState, useEffect } from "react";
import { MainVideo } from "../Common/Video";
import { ContactButton } from "../Common/contactButton";
import { Boxes } from "../Common/boxes";
import { Container } from "../Containers/Container";
import { Contact } from "../Containers/Contacts/Contact";
import { useAppContext } from '../Layout/AppContext';
import { useData } from '../Api/Api';
import { useLanguage } from "../Common/LanguageContext";
import bg from "media/bg.png"

export const HomePage = () => {
  const [activeContainer, setActiveContainer] = useState(null);
  const [isContactVisible, setIsContactVisible] = useState(false);
  const [showBoxes, setShowBoxes] = useState(false);
  const [activeBoxId, setActiveBoxId] = useState(null);
  const [isScaled, setIsScaled] = useState(false);
  const [containerVisible, setContainerVisible] = useState(false);
  const { activeLink, setActiveLink } = useAppContext();
  const { boxesData, loading } = useData();
  const { isGeo } = useLanguage();
  const [showBg, setShowBg] = useState(false);
  const [videoOpacity, setVideoOpacity] = useState(1); 

  useEffect(() => {
    const bgTimer = setTimeout(() => {
      setShowBg(true);
    }, 2000);

    const boxesTimer = setTimeout(() => {
      setShowBoxes(true);
    }, 800);

    return () => {
      clearTimeout(bgTimer);
      clearTimeout(boxesTimer);
    };
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

  useEffect(() => {
    let timer;
    if (isScaled) {
      setVideoOpacity(0.2);
    } else {
      timer = setTimeout(() => {
        setVideoOpacity(1);
      }, 380);
    }
    return () => clearTimeout(timer);
  }, [isScaled]);

  const handleBoxClick = (id, titleEn, titleGe, bodyEn, bodyGe, isimage, images, titlesEn, titlesGe, href) => {
    setActiveBoxId(id.toString());
    setActiveContainer({ id, titleEn, titleGe, bodyEn, bodyGe, isimage, images, titlesEn, titlesGe, href });
    setIsContactVisible(false);
    setIsScaled(true);
    
    setTimeout(() => {
      setContainerVisible(true);
    }, 100); 
  };

  const handleCloseContainer = () => {
    setTimeout(() => {
      setContainerVisible(false);
      setActiveContainer(null);

    }, 350); 
    setActiveBoxId(null);
    setIsScaled(false);
  };

  const handleContactClick = () => {
  
    if (isContactVisible) {
      setIsContactVisible(false);
    }else{
      setIsContactVisible(true);
      setActiveBoxId(null);
      setIsScaled(false); // Ensure the main content is not scaled when contact is opened
      
      setTimeout(() => {
        setActiveContainer(null);
        setContainerVisible(false);
      }, 350); 
    }
    
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
    <div className="mainContainer" style={{backgroundImage: showBg ? `url(${bg})` : 'none'}}>
      <Container
        title={!isGeo ? activeContainer?.titleEn : activeContainer?.titleGe}
        isimage={activeContainer?.isimage}
        content={activeContainer ? getContainerContent(activeContainer.id) : ""}
        isVisible={!!activeContainer && containerVisible}
        onClose={handleCloseContainer}
        titles={!isGeo ? activeContainer?.titlesEn : activeContainer?.titlesGe}
        href={activeContainer?.href}
        images={activeContainer?.images}
      />
      <Contact
        isVisible={isContactVisible}
        onClose={handleCloseContact}
      />
      <div className={`main ${isScaled ? "scaled" : ""}`}>
        <MainVideo videoOpacity={videoOpacity} />
        {showBoxes && <Boxes onBoxClick={handleBoxClick} activeBoxId={activeBoxId}/>}
      </div>
      <ContactButton onClick={handleContactClick} />
    </div>
  );
};
