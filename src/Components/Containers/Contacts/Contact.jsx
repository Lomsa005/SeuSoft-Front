import  { useState } from 'react';
import { ContactBorder } from "./ContactBorder";
import btnclose from "media/close.png";
import email from "media/email.svg";
import location from "media/location.svg";
import axios from 'axios';
import number from "media/number.svg";
import "./Contact.scss";
import PropTypes from "prop-types";
import {useData} from '../../Api/Api';

export const Contact = ({ isVisible, onClose }) => {
  
  const {contactData} = useData();

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

 
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = {
      name: document.getElementById('FirstName').value,
      last_name: document.getElementById('LastName').value,
      email: document.getElementById('Email').value,
      number: document.getElementById('Phone').value,
      service: document.getElementById('serviceName').value,
      company: document.getElementById('CompanyName').value,
      message: document.getElementById('Comment').value
    };
  
    try {
      const response = await axios.post(import.meta.env.VITE_API_ENDPOINT, formData);
      console.log('Response from server:', response.data);
    } catch (error) {
      console.error('Error sending data:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      }
    }
  };

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
          <form onSubmit={handleSubmit} className="scrollable-content">
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
                  <div>{contactData.email}</div>
                </div>
              </div>
              <div className="smCont">
                <img src={number} alt="Phone" />
                <div className="fl">
                  <div>ნომერი</div>
                  <div>{contactData.number}</div>
                </div>
              </div>{" "}
              <div className="smCont">
                <img src={location} alt="Location" />
                <div className="fl">
                  <div>მისამართი</div>
                  <div>{contactData.address}</div>
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

            <div className="ContactBtn" onClick={handleSubmit}>
              <div>გაგზავნა</div>
            </div>
            </form>
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
