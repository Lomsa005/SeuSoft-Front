// import { firstBox, secondBox, thirdBox, fourthBox } from "media";
import firstBox from "media/firstBox.png";
import secondBox from "media/secondBox.png";
import thirdBox from "media/thirdBox.png";
import fourthBox from "media/fourthBox.png";

export const Boxes = () => {
  return (
    <div className="boxContainer">
      <img className="box box1" src={firstBox}>
        {/* <p className="boxParagraph"></p> */}
      </img>
      <img className="box box2" src={secondBox}></img>
      <img className="box box3" src={thirdBox}></img>
      <img className="box box4" src={fourthBox}></img>
    </div>
  );
};
