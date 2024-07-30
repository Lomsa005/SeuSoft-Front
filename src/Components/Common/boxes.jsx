import firstBox from "media/firstBox.png";
import secondBox from "media/secondBox.png";
import thirdBox from "media/thirdBox.png";
import fourthBox from "media/fourthBox.png";
import PropTypes from "prop-types"

export const Boxes = ({ onBoxClick }) => {
  const boxes = [
    { id: 1, title: "პროდუქტები", image: firstBox, isimage: false  },
    { id: 2, title: "სერვისები", image: secondBox, isimage: false  },
    { id: 3, title: "პორტფოლიო", image: thirdBox, isimage: true },
    { id: 4, title: "ჩვენ შესახებ", image: fourthBox, isimage: false  },
  ];

  return (
    <div className="boxes">
      {boxes.map((box) => (
        <div
          key={box.id}
          className={`boxContainer boxContainer${box.id}`}
          onClick={() => onBoxClick(box.id, box.title, box.isimage)}
        >
          <img className={`box box${box.id}`} src={box.image} alt={box.title} />
          <p className={`boxParagraph boxParagraph${box.id}`}>{box.title}</p>
        </div>
      ))}
    </div>
  );
};

Boxes.propTypes = {
  onBoxClick: PropTypes.func
};