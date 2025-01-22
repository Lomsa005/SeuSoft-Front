import { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import { useData } from "../Api/Api";
import { useLanguage } from "./LanguageContext";
import "./Boxes.scss";

export const Boxes = ({ onBoxClick, activeBoxId }) => {
  const { boxesData } = useData();
  const { isGeo } = useLanguage();
  const [visibleBoxes, setVisibleBoxes] = useState(false);
  const [Closeanimation, setCloseanimation] = useState(false);
  const [duplicatedBoxes, setDuplicatedBoxes] = useState([]);
  const boxesRef = useRef(null);
  const [isMobileWidth, setIsMobileWidth] = useState(window.innerWidth <= 554.1);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileWidth(window.innerWidth <= 554.1);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (boxesData.length > 0 && isMobileWidth) {
      setDuplicatedBoxes([...boxesData, ...boxesData]);
    } else {
      setDuplicatedBoxes(boxesData);
    }
  }, [boxesData, isMobileWidth]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleBoxes(true);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setCloseanimation(activeBoxId !== null);
  }, [activeBoxId]);

  const handleScroll = useCallback(() => {
    if (!isMobileWidth) return;

    const container = boxesRef.current;
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    const boxWidth = container.offsetWidth / 3; // Now accurate due to CSS fix
    const totalBoxesWidth = boxWidth * boxesData.length;

    // Reset to the middle of duplicated content when reaching edges
    if (scrollLeft <= 0) {
      container.scrollLeft = totalBoxesWidth;
    } else if (scrollLeft >= totalBoxesWidth * 2 - container.offsetWidth) {
      container.scrollLeft = totalBoxesWidth - container.offsetWidth;
    }
  }, [isMobileWidth, boxesData.length]);

  useEffect(() => {
    if (isMobileWidth) {
      const container = boxesRef.current;
      container?.addEventListener('scroll', handleScroll);
      return () => container?.removeEventListener('scroll', handleScroll);
    }
  }, [isMobileWidth, handleScroll]);

  useEffect(() => {
    if (isMobileWidth && boxesRef.current && duplicatedBoxes.length > 0) {
      // Start at the beginning of the first duplicated set for seamless scroll
      boxesRef.current.scrollLeft = boxesRef.current.offsetWidth;
    }
  }, [isMobileWidth, duplicatedBoxes]);

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
      box.href,
      box.type,
      box.aboutEn,
      box.aboutGe
    );
  };

  return (
    <div
      className="boxes"
      ref={boxesRef}
      style={Closeanimation ? { transform: 'translate(-50%, -17%)' } : { transform: 'translate(-50%, -50%)' }}
    >
      {duplicatedBoxes.map((box, index) => {
        const originalIndex = index % boxesData.length;
        return (
          <div
            key={`${box.id}-${index}`}
            className={`
              boxContainer
              ${visibleBoxes ? "visible" : ""}
              ${activeBoxId === box.id.toString() ? "active" : Closeanimation ? "nonactive" : ""}
            `}
            style={{ transitionDelay: `${originalIndex * 0.2}s` }}
            onClick={() => handleBoxClick(box)}
          >
            <img
              className={`box box${Math.min(originalIndex + 1, 4)}`}
              src={box.image}
              alt={isGeo ? box.titleGe : box.titleEn}
            />
            <p className={`boxParagraph boxParagraph${Math.min(originalIndex + 1, 4)}`}>
              {!isGeo ? box.titleEn : box.titleGe}
            </p>
          </div>
        );
      })}
    </div>
  );
};

Boxes.propTypes = {
  onBoxClick: PropTypes.func.isRequired,
  activeBoxId: PropTypes.string,
};