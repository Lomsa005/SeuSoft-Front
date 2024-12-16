import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useData } from "../Api/Api";
import { useLanguage } from "./LanguageContext";
import "./Boxes.scss";

export const Boxes = ({ onBoxClick, activeBoxId }) => {
  const { boxesData } = useData();
  const { isGeo } = useLanguage();
  const [visibleBoxes, setVisibleBoxes] = useState(false);
  const [Closeanimation, setCloseanimation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleBoxes(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Reset Closeanimation when activeBoxId changes
    if (activeBoxId === null) {
      setCloseanimation(false);
    }
  }, [activeBoxId]);

  const handleBoxClick = (box) => {
    onBoxClick(
      box.id,
      box.titleEn,
      box.titleGe,
      box.bodyEn,
      box.bodyGe,
      box.isimage,
      box.images,
      box.titlesEn,
      box.titlesGe,
      box.href
    );
    setCloseanimation(true);
  };

  return (
    <div className="boxes" style={Closeanimation ? { transform: 'translate(-50%, -17%)' } : { transform: 'translate(-50%, -50%)' }}>
      {boxesData.map((box, index) => (
        <div
          key={box.id || index}
          className={`
            boxContainer 
            ${visibleBoxes ? "visible" : ""} 
            ${activeBoxId === box.id.toString() ? "active" : "nonactive"} 
            ${index === 0 || index === boxesData.length - 1 ? "edgeBox" : ""}
          `}
          style={{ transitionDelay: `${index * 0.2}s` }}
          onClick={() => handleBoxClick(box)}
        >
          <img
            className={`box box${Math.min(index + 1, 4)}`}
            src={box.image}
            alt={box.titleEn}
          />
          <p className={`boxParagraph boxParagraph${Math.min(index + 1, 4)}`}>
            {!isGeo ? box.titleEn : box.titleGe}
          </p>
        </div>
      ))}
    </div>
  );
};

Boxes.propTypes = {
  onBoxClick: PropTypes.func.isRequired,
  activeBoxId: PropTypes.string,
};