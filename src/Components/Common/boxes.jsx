import firstBox from "media/firstBox.png";
import secondBox from "media/secondBox.png";
import thirdBox from "media/thirdBox.png";
import fourthBox from "media/fourthBox.png";

export const Boxes = ({ onBoxClick }) => {
  const boxes = [
    { id: 1, title: "პროდუქტები", image: firstBox },
    { id: 2, title: "სერვისები", image: secondBox },
    { id: 3, title: "პორტფოლიო", image: thirdBox },
    { id: 4, title: "ჩვენ შესახებ", image: fourthBox },
  ];

  return (
    <div className="boxes">
      {boxes.map((box) => (
        <div
          key={box.id}
          className={`boxContainer boxContainer${box.id}`}
          onClick={() => onBoxClick(box.id, box.title)}
        >
          <img className={`box box${box.id}`} src={box.image} alt={box.title} />
          <p className={`boxParagraph boxParagraph${box.id}`}>{box.title}</p>
        </div>
      ))}
    </div>
  );
};