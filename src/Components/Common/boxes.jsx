import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import { useData } from '../Api/Api';
import { useLanguage } from "./LanguageContext";
import './Boxes.scss';

export const Boxes = ({ onBoxClick, activeBoxId }) => {
  const { boxesData } = useData();
  const { isGeo } = useLanguage();
  const [visibleBoxes, setVisibleBoxes] = useState([]);

  useEffect(() => {
    const showBoxesOneByOne = () => {
      boxesData.forEach((_, index) => {
        setTimeout(() => {
          setVisibleBoxes(prev => [...prev, index]);
        }, 3000 + index * 500);
      });
    };

    showBoxesOneByOne();

    return () => {
      boxesData.forEach((_, index) => {
        clearTimeout(3000 + index * 500);
      });
    };
  }, [boxesData]);

  const handleBoxClick = (box) => {
    onBoxClick(box.id, box.titleEn, box.titleGe, box.bodyEn, box.bodyGe, box.isimage, box.images, box.titlesEn, box.titlesGe, box.href);
  };

  return (
    <div className="boxes">
      {boxesData.map((box, index) => (
        <div
          key={box.id || index}
          className={`
            boxContainer 
            boxContainer${Math.min(index + 1, 4)} 
            ${visibleBoxes.includes(index) ? 'visible' : ''} 
            ${activeBoxId === box.id.toString() ? 'active' : ''} 
          `}
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
  activeBoxId: PropTypes.string
};