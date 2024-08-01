import btnclose from "media/close.png";
import "./Container.scss";
import PropTypes from "prop-types";

export const Container = ({ title, content, isVisible, onClose, isimage, images, titles }) => {
  if (!isVisible) return null;

  return (
    <div className="container">
      <div className="backdrop">
        <div className="Tflex">
          <div className="Theader">{title}</div>
          <img src={btnclose} alt="close button" onClick={onClose} />
        </div>
        <div className="Tline-circle"></div>
        <div className="Tline"></div>

        <div className="content-wrapper">
          {!isimage ? (
            <div className="scrollable-content" style={{ color: "white" }} dangerouslySetInnerHTML={{ __html: content }}/>

          ) : (
            <div
              className="scrollable-content scrollable-content-img"
              style={{ color: "white" }}
            >
              {images.map((image, index) => (
                <div key={index} className="portf">
                  <img src={`${import.meta.env.VITE_API_BACK}${image}`} alt="" />
                  <div className="title">{titles[index]}</div>
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
  titles: PropTypes.arrayOf(PropTypes.string)
};
