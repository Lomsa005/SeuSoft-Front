import PropTypes from "prop-types";
import { useData } from '../Api/Api';

export const Boxes = ({ onBoxClick }) => {
  const { boxesData } = useData();

  return (
    <div className="boxes">
      {boxesData.map((box, index) => (
        
        <div
          key={box.id || index}
          className={`boxContainer boxContainer${Math.min(index + 1, 4)}`}
          onClick={() => onBoxClick(box.id, box.title, box.isimage, box.images, box.titles)}
        >
          <img 
            className={`box box${Math.min(index + 1, 4)}`} 
            src={box.image} 
            alt={box.title} 
          />
          <p className={`boxParagraph boxParagraph${Math.min(index + 1, 4)}`}>{box.title}</p>
        </div>
      ))}
    </div>
  );
};

Boxes.propTypes = {
  onBoxClick: PropTypes.func.isRequired
};
