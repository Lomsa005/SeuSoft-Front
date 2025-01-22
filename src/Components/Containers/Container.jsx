import btnclose from "media/close.png";
import "./Container.scss";
import PropTypes from "prop-types";
import backdrop from "media/backdrop.png";
import { CgDanger } from "react-icons/cg";
import { useState, useEffect } from "react";

export const Container = ({
  title,
  content,
  isVisible,
  onClose,
  images,
  titles,
  href,
  type,
  about
}) => {
  const [showAbout, setShowAbout] = useState([]);

  useEffect(() => {
    setShowAbout(Array(images ? images.length : 0).fill(false));
  }, [images]);

  const handleAboutClick = (index) => {
    setShowAbout((prevShowAbout) => {
      const newShowAbout = [...prevShowAbout];
      newShowAbout[index] = !newShowAbout[index];
      return newShowAbout;
    });
  };

  if (!isVisible) return null;
  return (
    <div className={`container ${isVisible ? "visible" : ""}`}>
      <div
        className="backdrop"
        style={{ backgroundImage: `url(${backdrop})` }}
      >
        <div className="Tflex">
          <div className="Theader">{title}</div>
          <img src={btnclose} alt="close button" onClick={onClose} />
        </div>
        <div className="Tline-circle"></div>
        <div className="Tline"></div>

        <div className="content-wrapper">
          {type === 1 && (
            <div
              className="scrollable-content Backcontent mt"
              style={{ color: "white" }}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}

          {type === 2 && (
            <div className="scrollable-content scrollable-content-img mt">
              {images.map((image, index) => (
                <div key={index} className="portf">
                  <a href={href[index]} target="_blank" rel="noopener noreferrer">
                    <img
                      src={`https://seusoft.demo-instaymate.com/public${image}`}
                      alt={`img-${index}`}
                    />
                  </a>
                  <div className="title-about-wrapper">
                    <a
                      href={href[index]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="title"
                    >
                      {titles[index]}
                    </a>
                    <div
                      className="title-about"
                      onClick={() => handleAboutClick(index)}
                    >
                      About <CgDanger />
                    </div>
                  </div>

                  <div className={`about ${showAbout[index] ? "active" : ""}`}>
                    <div className="about-header">
                      {titles[index]}
                      <img
                        src={btnclose}
                        alt="close button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAboutClick(index);
                        }}
                      />
                    </div>
                    <div className="about-content">
                      {about[index]}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {type === 3 && (
            <div className="scrollable-content type3-content">
              {images.map((image, index) => (
                <div key={index} className="type3-item">
                  <div className="type3-row">
                    {about[index] && (
                      <div className="type3-text" style={image ? {} : { width: "95%", maxWidth: "95%" }}>
                        <div className="title-3" >{titles[index]}</div>
                        {about[index]}
                      </div>
                    )}
                    {image && (
                      <img
                        className="type3-image"
                        src={`https://seusoft.demo-instaymate.com/public${image}`}
                        alt={`img-${index}`}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="border"></div>
      <div className="inner-border"></div>
      <div className="outer-border"></div>
      <div className="tabs">
        <div className="tab tab1"></div>
        <div className="tab tab2"></div>
        <div className="tab tab3"></div>
        <div className="tab tab4"></div>
      </div>
      <div className="tab tab5"></div>
    </div>
  );
};

Container.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  isVisible: PropTypes.bool,
  onClose: PropTypes.func,
  isimage: PropTypes.bool,
  images: PropTypes.arrayOf(PropTypes.string),
  titles: PropTypes.arrayOf(PropTypes.string),
  href: PropTypes.arrayOf(PropTypes.string),
  type: PropTypes.number,
  about: PropTypes.arrayOf(PropTypes.string),
};