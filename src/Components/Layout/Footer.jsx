import flag from "media/GE.svg"
export const Footer = () => {
  return (
    <>
      <div className="footerContainer">
        <div style={{ width: "100%", marginTop: "-32px" }}>
          <div className="diamond-container">
            <div className="diamond"></div>
          </div>
          <div className="lines first-line">
            <div className="l-line"></div>
            <div className="r-line"></div>
          </div>
          <div className="lines">
            <div className="l-line"></div>
            <div className="r-line"></div>
          </div>
        </div>
        <div className="footer">
          <div className="description">
            <h3 className="descriptionHeader">
              SeuSoft<span className="descriptionHeaderDot">.</span>
            </h3>
            <p className="descriptionParagraph">
              კომპანია რომელიც ორიენტირებულია<br /> ხარისხის ზრდაზე, განვითარებაზე<br />  და
              წარმატებაზე
            </p>
          </div>
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
                <a>032 2 90 00 00</a>
              </li>
              <li className="ge"><div>
                <img src={flag} alt="geo flag"/></div><div className="geSpan"><span className="geSpan">GE</span></div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
