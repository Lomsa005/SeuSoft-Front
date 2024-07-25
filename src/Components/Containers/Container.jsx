import btnclose from "media/close.png";
import "./Container.scss";

export const Container = ({ title, content, isVisible, onClose }) => {
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
          <div className="scrollable-content" style={{color:"white"}}>
            {content}
          </div>
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
