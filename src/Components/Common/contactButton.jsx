import "./common.scss";
import Proptypes from "prop-types";
import { useLanguage } from "./LanguageContext";

export const ContactButton = ({ onClick }) => {
  const { isGeo } = useLanguage();

  return (
    <div className="btnContainer" >
      <svg width="192" height="64" viewBox="0 0 192 64" fill="none" className="svg-small" xmlns="http://www.w3.org/2000/svg" onClick={onClick}>
        <defs>
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


      <svg xmlns="http://www.w3.org/2000/svg" width="280" height="50" viewBox="0 0 280 50" fill="none" className="svg-large" onClick={onClick}>
      <linearGradient xmlns="http://www.w3.org/2000/svg" id="contact-gradients" x1="448.062" y1="-12.1094" x2="94.062" y2="171.575" gradientUnits="userSpaceOnUse">
        <stop stopColor="#56F1FF"/>
        <stop offset="1"/>
        </linearGradient>
      <path d="M0.5 6C0.5 2.96243 2.96243 0.5 6 0.5H245.988C246.714 0.5 247.433 0.643791 248.103 0.923076L276.115 12.595C278.165 13.4489 279.5 15.4515 279.5 17.6719V44C279.5 47.0376 277.038 49.5 274 49.5H253.854C253.267 49.5 252.792 49.0243 252.792 48.4375C252.792 47.2984 251.868 46.375 250.729 46.375H217.396C216.257 46.375 215.333 47.2984 215.333 48.4375C215.333 49.0243 214.858 49.5 214.271 49.5H31.2365C30.4272 49.5 29.6278 49.3214 28.8955 48.9769L3.65895 37.1061C1.73079 36.1991 0.5 34.26 0.5 32.1292V6Z" stroke="#56F1FF" className="svg-path"/>
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
