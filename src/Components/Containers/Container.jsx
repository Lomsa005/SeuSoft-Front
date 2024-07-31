import btnclose from "media/close.png";
import "./Container.scss";
import PropTypes from "prop-types";

export const Container = ({ title, content, isVisible, onClose, isimage }) => {
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
            <div className="scrollable-content" style={{ color: "white" }}>
              {content}
            </div>
          ) : (
            <div
              className="scrollable-content scrollable-content-img"
              style={{ color: "white" }}
            >
              <div className="portf">
                <img
                  src="https://www.wilmarinc.com/hs-fs/hubfs/AdobeStock_177874292-1.jpeg?width=1200&height=744&name=AdobeStock_177874292-1.jpeg"
                  alt=""
                />

                <div className="title">Apple.com</div>
              </div>
              <div className="portf">

                <img
                  src="https://www.hpcwire.com/wp-content/uploads/2018/11/shutterstock_1095831830-675x380.jpg"
                  alt=""
                />
                <div className="title">Apple.com</div>
              </div>
              <div className="portf">

                <img
                  src="https://www.hpcwire.com/wp-content/uploads/2018/11/shutterstock_1095831830-675x380.jpg"
                  alt=""
                />
                <div className="title">Apple.com</div>
              </div>
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
};
