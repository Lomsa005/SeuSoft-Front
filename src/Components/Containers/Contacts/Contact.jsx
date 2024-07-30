import  { useState } from 'react';
import { ContactBorder } from "./ContactBorder";
import btnclose from "media/close.png";
import email from "media/email.svg";
import location from "media/location.svg";
import number from "media/number.svg";
import "./Contact.scss";
import PropTypes from "prop-types";

export const Contact = ({ isVisible, onClose }) => {
  const [inputStates, setInputStates] = useState({
    FirstName: false,
    LastName: false,
    Email: false,
    Phone: false,
    serviceName: false,
    CompanyName: false,
    Comment: false
  });
  if (!isVisible) return null;

 

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setInputStates(prevState => ({
      ...prevState,
      [id]: value.trim() !== ''
    }));
  };

  return (
    <>
      <div className="ContactBorder">
        <ContactBorder />
        <img
          src={btnclose}
          alt="close button"
          className="CloseBtn"
          onClick={onClose}
        />

        <div className="ContactElements">
          <div className="scrollable-content">
            <div className="ContactAboutus">
              <div className="Weare">
                <div className="ws">
                  ჩვენ{" "}
                  <span style={{ fontFamily: "Tomorrow", fontWeight: "500" }}>
                    SeuSoft
                  </span>{" "}
                  ვართ
                </div>
                <div className="progress-bar-container">
                  <div className="progress-bar">
                    <div className="progress"></div>
                    <div className="glow-effect"></div>
                    <div className="handle"></div>
                  </div>
                </div>
                <div className="ws">დაგვიკავშირდით</div>
              </div>
              <div className="smCont">
                <img src={email} alt="Email" />
                <div className="fl">
                  <div>ელ:ფოსტა</div>
                  <div>Info@Seu.edu.com</div>
                </div>
              </div>
              <div className="smCont">
                <img src={number} alt="Phone" />
                <div className="fl">
                  <div>ნომერი</div>
                  <div>995 599 00 00 00</div>
                </div>
              </div>{" "}
              <div className="smCont">
                <img src={location} alt="Location" />
                <div className="fl">
                  <div>მისამართი</div>
                  <div>Tbilisi, Tsinandlis st.9</div>
                </div>
              </div>
            </div>

            <div className="FillContact">
              <div className="fill">
                <div className="label">
                  <label htmlFor="FirstName">სახელი</label>
                  <input
                    type="text"
                    id="FirstName"
                    className="p"
                    onChange={handleInputChange}
                  />
                </div>
                <div className={inputStates.FirstName ? "filled" : "notfill"}></div>
              </div>
              <div className="fill">
                <div className="label">
                  <label htmlFor="LastName">გვარი</label>
                  <input
                    type="text"
                    id="LastName"
                    className="p"
                    onChange={handleInputChange}
                  />
                </div>
                <div className={inputStates.LastName ? "filled" : "notfill"}></div>
              </div>
              <div className="fill">
                <div className="label">
                  <label htmlFor="Email">ელ:ფოსტა</label>
                  <input
                    type="email"
                    id="Email"
                    className="p"
                    onChange={handleInputChange}
                  />
                </div>
                <div className={inputStates.Email ? "filled" : "notfill"}></div>
              </div>
              <div className="fill">
                <div className="label">
                  <label htmlFor="Phone">ტელეფონის ნომერი</label>
                  <input
                    type="tel"
                    id="Phone"
                    className="p"
                    onChange={handleInputChange}
                  />
                </div>
                <div className={inputStates.Phone ? "filled" : "notfill"}></div>
              </div>
              <div className="fill">
                <div className="label">
                  <label htmlFor="serviceName">სერვისის დასახელება</label>
                  <input
                    type="text"
                    id="serviceName"
                    className="p"
                    onChange={handleInputChange}
                  />
                </div>
                <div className={inputStates.serviceName ? "filled" : "notfill"}></div>
              </div>
              <div className="fill">
                <div className="label">
                  <label htmlFor="CompanyName">კომპანიის სახელი</label>
                  <input
                    type="text"
                    id="CompanyName"
                    className="p"
                    onChange={handleInputChange}
                  />
                </div>
                <div className={inputStates.CompanyName ? "filled" : "notfill"}></div>
              </div>
              <div className="longLine fill">
                <div className="label cc">
                  <label htmlFor="Comment">დაწერეთ კომენტარი</label>
                  <textarea
                    id="Comment"
                    className="p"
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <div className={inputStates.Comment ? "filled" : "notfill"}></div>
              </div>
            </div>

            <div className="ContactBtn">
              <div>გაგზავნა</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Contact.propTypes = {
  isVisible: PropTypes.bool,
  onClose: PropTypes.func,
};