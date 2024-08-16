import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useData } from "../Api/Api";
import { useLanguage } from "./LanguageContext";
import "./Boxes.scss";
import sphereee from "media/sphereee.gif";

export const Boxes = ({ onBoxClick, activeBoxId }) => {
  const { boxesData } = useData();
  const { isGeo } = useLanguage();
  const [visibleBoxes, setVisibleBoxes] = useState(false);
  const [Closeanimation, setCloseanimation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleBoxes(true);
    }, 2700);

    return () => clearTimeout(timer);
  }, []);

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
    setCloseanimation(true)
  };

  return (
    <div className="boxes">
      <img src={sphereee} alt="" />
      <img src={sphereee} alt="" />
      <img src={sphereee} alt="" />
      <img src={sphereee} alt="" />

      {boxesData.map((box, index) => (
        <div
          key={box.id || index}
          className={`
            boxContainer 
            boxContainer${Math.min(index + 1, 4)} 
            ${visibleBoxes ? "visible" : ""} 
            ${activeBoxId === box.id.toString() ? "active" : Closeanimation ? "nonactive" : " "} 
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
          {/* <p className={`boxParagraph boxParagraph${Math.min(index + 1, 4)}`}>
            {!isGeo ? box.titleEn : box.titleGe}
          </p> */}
        </div>
      ))}
    </div>
  );
};

Boxes.propTypes = {
  onBoxClick: PropTypes.func.isRequired,
  activeBoxId: PropTypes.string,
};
