import "./common.scss";

export const ContactButton = ({ onClick }) => {
  return (
    <div className="btnContainer">
      <button className="btnContact" onClick={onClick}>კონტაქტი</button>
      <div className="little-rectangle"></div>
    </div>
  );
};
