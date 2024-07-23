import flag from "media/GE.svg";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

export const Footer = () => {
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
              კომპანია რომელიც ორიენტირებულია
              ხარისხის ზრდაზე, განვითარებაზე
              და წარმატებაზე
            </p>
          </div>
          <div className="contactsAndLinks">
            <div className="links">
              <h4 className="linksHeader">
                ლინკები<span className="linksHeaderDot"></span>
              </h4>
              <ul className="linksList">
                <li>სერვისები</li>
                <li>პროდუქტები</li>
                <li>პორტფოლიო</li>
                <li>ჩვენს შესახებ</li>
              </ul>
            </div>
            <div className="contacts">
              <h4 className="linksHeader">
                დაგვიკავშირდი<span className="contactsHeaderDot"></span>
              </h4>
              <ul className="contactsList">
                <li>თბილისი,წინანდლის N9</li>
                <li>Info@Seu.edu.com</li>
                <li>
                  <a style={{textDecoration:"underline"}}>032 2 90 00 00</a>
                </li>
                <li className="ge">
                    <img src={flag} alt="geo flag" />
                    <span className="geSpan">GE</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="social-icons">
          <div className="soc">
            <FaLinkedinIn />
          </div>
          <div className="soc">
            <FaTwitter />
          </div>
          <div className="soc">
            <FaInstagram />
          </div>
          <div className="soc">
            <FaFacebookF />
          </div>
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
          <span style={{ fontFamily: "Tomorrow" }}>©</span> 2023 ყველა უფლება
          დაცულია
        </div>
      </div>
    </>
  );
};
