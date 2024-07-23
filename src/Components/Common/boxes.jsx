// import { firstBox, secondBox, thirdBox, fourthBox } from "media";
import firstBox from "media/firstBox.png";
import secondBox from "media/secondBox.png";
import thirdBox from "media/thirdBox.png";
import fourthBox from "media/fourthBox.png";

export const Boxes = () => {
  return (
    <div className="boxes">
      <div className="boxContainer boxContainer1">
        <img className="box box1" src={firstBox}></img>
        <p className="boxParagraph boxParagraph1">პროდუქტები</p>
      </div>
      <div className="boxContainer boxContainer2">
        <img className="box box2" src={secondBox}></img>
        <p className="boxParagraph boxParagraph2">სერვისები</p>
      </div>
      <div className="boxContainer boxContainer3">
        <img className="box box3" src={thirdBox}></img>
        <p className="boxParagraph boxParagraph3">პორტფოლიო</p>
      </div>
      <div className="boxContainer boxContainer4">
        <img className="box box4" src={fourthBox}></img>
        <p className="boxParagraph boxParagraph4">ჩვენ შესახებ</p>
      </div>   
    </div>
  );
};
