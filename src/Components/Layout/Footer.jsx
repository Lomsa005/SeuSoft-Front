import flag from "media/GE.svg";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { useAppContext } from './AppContext';
import { useData } from '../Api/Api';
import { useLanguage } from '../Common/LanguageContext';

export const Footer = () => {
  const { setActiveLink } = useAppContext();
  const { contactData, boxesData } = useData();
  const { isGeo, toggleLanguage } = useLanguage();

  const handleLinkClick = (linkTitle) => {
    setActiveLink(linkTitle);
    window.scrollTo({
      top: 0,
      behavior: 'smooth' 
    });
  };

  return (
    <>
      <div className="footerContainer">
        <div style={{ width: "100%", marginTop: "-32px" }}>
          <div className="diamond-container">
            <div className="diamond"></div>
          </div>
          <div className="lines-container">
            <div className="lines first-line">
              <div className="l-line"></div>
              <div className="r-line"></div>
            </div>
            <div className="lines">
              <div className="l-line"></div>
              <div className="r-line"></div>
            </div>
          </div>
        </div>
        <div className="footer">
          <div className="description">
            <h3 className="descriptionHeader">
              SeuSoft<span className="descriptionHeaderDot">.</span>
            </h3>
            <p className="descriptionParagraph">
              {contactData.title}
            </p>
          </div>
          <div className="contactsAndLinks">
            <div className="links">
              <h4 className="linksHeader">
                {isGeo ? 'ლინკები' : 'Link'}<span className="linksHeaderDot" style={isGeo ? {} : { marginTop: "2px" }}></span>
              </h4>
              <ul className="linksList">
                {boxesData.map((link, index) => (
                  <li 
                    key={index}
                    onClick={() => handleLinkClick(isGeo ? link.titleGe : link.titleEn)} 
                    style={{cursor: "pointer"}}
                  >
                    {isGeo ? link.titleGe : link.titleEn}
                  </li>
                ))}
              </ul>
            </div>
            <div className="contacts">
              <h4 className="linksHeader">
                {isGeo ? 'დაგვიკავშირდი' : 'Contact us'}<span className="contactsHeaderDot" style={isGeo ? {} : { marginTop: "2px" }}></span>
              </h4>
              <ul className="contactsList">
                <li>{contactData.address}</li>
                <li>{contactData.email}</li>
                <li>
                  <a style={{textDecoration:"underline"}}>{contactData.number}</a>
                </li>
                <li className="ge" onClick={toggleLanguage}>
                  <img src={flag} alt="geo flag" />
                  <span className="geSpan" style={isGeo ? {} : { marginBottom: "-1px" }}>{isGeo ? 'GE' : 'EN'}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="social-icons">
          {contactData.in && (
            <div className="soc">
              <a href={contactData.in} target="_blank" rel="noopener noreferrer">
                <FaLinkedinIn />
              </a>
            </div>
          )}
          {contactData.twitter && (
            <div className="soc">
              <a href={contactData.twitter} target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
            </div>
          )}
          {contactData.ig && (
            <div className="soc">
              <a href={contactData.ig} target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
            </div>
          )}
          {contactData.fb && (
            <div className="soc">
              <a href={contactData.fb} target="_blank" rel="noopener noreferrer">
                <FaFacebookF />
              </a>
            </div>
          )}
        </div>
        <div className="footerlines" style={{ transform: "translateY(-5px)" }}>
          <div className="footer-line line-color"></div>
          <div className="footer-line line-color-middle"></div>
          <div className="footer-line line-color"></div>
        </div>
        <div className="footerlines">
          <div className="footer-line firstline"></div>
          <div className="footer-line middleline"></div>
          <div className="footer-line thirdline"></div>
        </div>
        <div className="copyright">
          {" "}
          <span style={{ fontFamily: "Tomorrow" }}>©</span> {contactData.copyright}
        </div>
      </div>
    </>
  );
};
