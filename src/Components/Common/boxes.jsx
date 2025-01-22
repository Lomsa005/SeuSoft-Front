import { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import { useData } from "../Api/Api";
import { useLanguage } from "./LanguageContext";
import "./Boxes.scss";

export const Boxes = ({ onBoxClick, activeBoxId }) => {
  const { boxesData } = useData();
  const { isGeo } = useLanguage();
  const [visibleBoxes, setVisibleBoxes] = useState(false);
  const [closeAnimation, setCloseAnimation] = useState(false);
  const boxesRef = useRef(null);
  const [isMobileWidth, setIsMobileWidth] = useState(
    window.innerWidth <= 554.1
  );
  const [isLargeWidth, setIsLargeWidth] = useState(window.innerWidth > 554.1);

  const scrollPosition = useRef(0);
  const boxWidth = useRef(0);
  const isScrolling = useRef(false);

  const [extendedBoxesData, setExtendedBoxesData] = useState(() => [
    ...boxesData,
    ...boxesData,
    ...boxesData,
    ...boxesData,
    ...boxesData,
    ...boxesData,
    ...boxesData,
  ]);

  useEffect(() => {
    setExtendedBoxesData([
      ...boxesData,
      ...boxesData,
      ...boxesData,
      ...boxesData,
      ...boxesData,
      ...boxesData,
      ...boxesData,
    ]);
  }, [boxesData]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileWidth(window.innerWidth <= 554.1);
      setIsLargeWidth(window.innerWidth > 554.1);
      if (boxesRef.current?.children?.[0]) {
        boxWidth.current = boxesRef.current.children[0].offsetWidth;
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [boxesData]);

  useEffect(() => {
    const timer = setTimeout(() => setVisibleBoxes(true), 3500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setCloseAnimation(activeBoxId !== null);
  }, [activeBoxId]);

  const handleScroll = useCallback(() => {
    if (!boxesRef.current || !isMobileWidth || isScrolling.current) return;

    const { scrollLeft, clientWidth, scrollWidth } = boxesRef.current;
    const buffer = 100;
    const scrollDelta = scrollLeft - scrollPosition.current;

    if (
      scrollLeft + clientWidth >= scrollWidth - buffer &&
      scrollDelta > 0
    ) {
      isScrolling.current = true;
      setExtendedBoxesData((prev) => [...prev, ...boxesData, ...boxesData]);
    }

    if (scrollLeft <= buffer && scrollDelta < 0) {
      isScrolling.current = true;
      setExtendedBoxesData((prev) => [...prev, ...boxesData, ...boxesData]);
    }

    scrollPosition.current = scrollLeft;
  }, [isMobileWidth, boxesData]);

  useEffect(() => {
    if (isScrolling.current) {
      isScrolling.current = false;
    }
  }, [extendedBoxesData]);

  useEffect(() => {
    if (isMobileWidth && boxesRef.current) {
      // Calculate the index of the box to be centered
      const centerBoxIndex = Math.floor(boxesData.length * 3.5); // Center of the 4th set

      // Scroll to the center box
      const middlePosition = centerBoxIndex * boxWidth.current;
      boxesRef.current.scrollLeft = middlePosition;
      scrollPosition.current = middlePosition;
    }
  }, [isMobileWidth, boxesData]);

  useEffect(() => {
    const boxesElement = boxesRef.current;
    if (!boxesElement) return;

    boxesElement.addEventListener("scroll", handleScroll);
    return () => boxesElement.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleBoxClick = (box) => {
    const originalBox = boxesData.find((b) => b.id === box.id);
    onBoxClick(
      originalBox.id,
      originalBox.titleEn,
      originalBox.titleGe,
      originalBox.bodyEn,
      originalBox.bodyGe,
      originalBox.isimage,
      originalBox.images,
      originalBox.titlesEn,
      originalBox.titlesGe,
      originalBox.href,
      originalBox.type,
      originalBox.aboutEn,
      originalBox.aboutGe
    );
  };

  return (
    <div
      className="boxes"
      ref={boxesRef}
      style={
        closeAnimation && !isLargeWidth
          ? { transform: "translate(-50%, -17%)" }
          : { transform: "translate(-50%, -50%)" }
      }
    >
      {isLargeWidth
        ? boxesData.map((box, index) => (
            <div
              key={`${box.id}-${index}`}
              className={`boxContainer ${visibleBoxes ? "visible" : ""} ${
                activeBoxId === box.id.toString()
                  ? "active"
                  : closeAnimation
                  ? "nonactive"
                  : ""
              }`}
              style={{
                transitionDelay: `${(index % boxesData.length) * 0.2}s`,
              }}
              onClick={() => handleBoxClick(box)}
            >
              <img
                className={`box box${Math.min(
                  (index % boxesData.length) + 1,
                  4
                )}`}
                src={box.image}
                alt={isGeo ? box.titleGe : box.titleEn}
              />
              <p
                className={`boxParagraph boxParagraph${Math.min(
                  (index % boxesData.length) + 1,
                  4
                )}`}
              >
                {!isGeo ? box.titleEn : box.titleGe}
              </p>
            </div>
          ))
        : extendedBoxesData.map((box, index) => (
            <div
              key={`${box.id}-${index}`}
              className={`boxContainer ${visibleBoxes ? "visible" : ""} ${
                activeBoxId === box.id.toString()
                  ? "active"
                  : closeAnimation
                  ? "nonactive"
                  : ""
              }`}
              style={{
                transitionDelay: `${(index % boxesData.length) * 0.2}s`,
              }}
              onClick={() => handleBoxClick(box)}
            >
              <img
                className={`box box${Math.min(
                  (index % boxesData.length) + 1,
                  4
                )}`}
                src={box.image}
                alt={isGeo ? box.titleGe : box.titleEn}
              />
              <p
                className={`boxParagraph boxParagraph${Math.min(
                  (index % boxesData.length) + 1,
                  4
                )}`}
              >
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