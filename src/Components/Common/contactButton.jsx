import "./common.scss";
import Proptypes from "prop-types";
import { useLanguage } from "./LanguageContext";

export const ContactButton = ({ onClick }) => {
  const { isGeo } = useLanguage();

  return (
    <div className="btnContainer" onClick={onClick}>
      <svg width="192" height="64" viewBox="0 0 192 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* <linearGradient id="contact-gradient" gradientTransform="rotate(265)" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#56F1FF" />
            <stop offset="100%" stopColor="#000" />
          </linearGradient> */}
          <linearGradient xmlns="http://www.w3.org/2000/svg" id="contact-gradient"  x1="444.062" y1="-12.1094" x2="90.062" y2="171.575" gradientUnits="userSpaceOnUse">
          <stop stopColor="#56F1FF"/>
          <stop offset="1"/>
          </linearGradient>
        </defs>
        <path
          className="svg-path"
          d="M0.5 10C0.5 4.7533 4.7533 0.5 10 0.5H166.069C168.181 0.5 170.234 1.20416 171.901 2.50115L187.832 14.892C190.147 16.6918 191.5 19.4592 191.5 22.3908V54.5C191.5 59.4706 187.471 63.5 182.5 63.5H175C174.172 63.5 173.5 62.8284 173.5 62C173.5 60.6193 172.381 59.5 171 59.5H150C148.619 59.5 147.5 60.6193 147.5 62C147.5 62.8284 146.828 63.5 146 63.5H24.2672C21.9604 63.5 19.7325 62.6607 17.9991 61.1387L3.73189 48.6114C1.67765 46.8077 0.5 44.2064 0.5 41.4727V10Z"
          stroke="#56F1FF"
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="contact-text"
          style={!isGeo ? { letterSpacing: "3.2px" } : {}}
        >
          {isGeo ? "კონტაქტი" : "CONTACT"}
        </text>
      </svg>
    </div>
  );
};

ContactButton.propTypes = {
  onClick: Proptypes.func
};