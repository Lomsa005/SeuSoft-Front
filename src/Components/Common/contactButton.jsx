import "./common.scss";
import Proptypes from "prop-types"
import { useLanguage } from "./LanguageContext";

export const ContactButton = ({ onClick }) => {
  const { isGeo } = useLanguage();

  return (
    <div className="btnContainer">
      <button className="btnContact" onClick={onClick} style={isGeo ? {} : { letterSpacing: "3.2px" }}>{isGeo ? "კონტაქტი" : "Contact"}</button>
      <div className="little-rectangle"></div>
    </div>
  );
};

ContactButton.propTypes = {
  onClick: Proptypes.func
};
