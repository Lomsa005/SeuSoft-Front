import PropTypes from "prop-types";
import { useData } from '../Api/Api';
import { useLanguage } from "./LanguageContext";

export const Boxes = ({ onBoxClick }) => {
  const { boxesData } = useData();
  const { isGeo } = useLanguage();

  return (
    <div className="boxes">
      {boxesData.map((box, index) => (
        
        <div
          key={box.id || index}
          className={`boxContainer boxContainer${Math.min(index + 1, 4)}`}
          onClick={() => onBoxClick(box.id, box.titleEn, box.titleGe, box.bodyEn, box.bodyGe, box.isimage, box.images, box.titlesEn, box.titlesGe, box.href)}
        >
          <img 
            className={`box box${Math.min(index + 1, 4)}`} 
            src={box.image} 
            alt={box.titleEn} 
          />
          <p className={`boxParagraph boxParagraph${Math.min(index + 1, 4)}`}>{!isGeo ? box.titleEn : box.titleGe}</p>
        </div>
      ))}
    </div>
  );
};

Boxes.propTypes = {
  onBoxClick: PropTypes.func.isRequired
};
