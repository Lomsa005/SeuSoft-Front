import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useData } from "../Api/Api";
import { useLanguage } from "./LanguageContext";
import "./Boxes.scss";
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';

export const Boxes = ({ onBoxClick, activeBoxId }) => {
  const { boxesData } = useData();
  const { isGeo } = useLanguage();
  const [visibleBoxes, setVisibleBoxes] = useState(false);
  const [closeAnimation, setCloseAnimation] = useState(false);
  const boxesRef = useRef(null);
  const swiperRef = useRef(null);
  const [isMobileWidth, setIsMobileWidth] = useState(
    window.innerWidth <= 554.1
  );
  const [isLargeWidth, setIsLargeWidth] = useState(window.innerWidth > 554.1);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileWidth(window.innerWidth <= 554.1);
      setIsLargeWidth(window.innerWidth > 554.1);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setVisibleBoxes(true), 3500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setCloseAnimation(activeBoxId !== null);
  }, [activeBoxId]);

  useEffect(() => {
    if (isMobileWidth && boxesData.length > 0) {
      swiperRef.current = new Swiper(".swiper-container", {
        centeredSlides: true,
        slidesPerView: 'auto',
        loop: true,
        spaceBetween: 0,
        grabCursor: true,
        speed: 500,
        allowTouchMove:true
      });
    } else if (swiperRef.current) {
      swiperRef.current.destroy(true, true);
      swiperRef.current = null;
    }
  }, [isMobileWidth, boxesData]);

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
      style={
        closeAnimation
          ? { transform: "translate(-50%, -17%)" }
          : { transform: "translate(-50%, -50%)" }
      }
    >
      {isLargeWidth ? (
        boxesData.map((box, index) => (
          <div
            key={`${box.id}-${index}`}
            className={`boxContainer ${visibleBoxes ? "visible" : ""} ${
              activeBoxId === box.id.toString() ? "active" : closeAnimation ? "nonactive" : ""
            }`}
            style={{
              transitionDelay: `${(index % boxesData.length) * 0.2}s`,
            }}
            onClick={() => handleBoxClick(box)}
          >
            <img
              className={`box box${Math.min((index % boxesData.length) + 1, 4)}`}
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
      ) : (
        <div className="swiper-container" >
          <div className="swiper-wrapper">
            {boxesData.map((box, index) => (
              <div
                key={`${box.id}-${index}`}
                className={`swiper-slide boxContainer ${visibleBoxes ? "visible" : ""} ${
                  activeBoxId === box.id.toString() ? "active" : closeAnimation ? "nonactive" : ""
                }`}
                style={{
                  transitionDelay: `${(index % boxesData.length) * 0.2}s`,
                }}
                onClick={() => handleBoxClick(box)}
              >
                <img
                  className={`box box${Math.min((index % boxesData.length) + 1, 4)}`}
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
        </div>
      )}
    </div>
  );
};

Boxes.propTypes = {
  onBoxClick: PropTypes.func.isRequired,
  activeBoxId: PropTypes.string,
};