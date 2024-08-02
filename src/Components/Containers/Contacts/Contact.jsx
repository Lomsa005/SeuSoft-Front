// src/components/Contact.js
import React, { useState } from 'react';
import { ContactBorder } from "./ContactBorder";
import btnclose from "media/close.png";
import email from "media/email.svg";
import location from "media/location.svg";
import axios from 'axios';
import number from "media/number.svg";
import "./Contact.scss";
import PropTypes from "prop-types";
import { useData } from '../../Api/Api';
import { useLanguage } from '../../Common/LanguageContext';

export const Contact = ({ isVisible, onClose }) => {
  const { contactData } = useData();
  const { isGeo } = useLanguage();
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
      const response = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/contacts`, formData);
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
                    {isGeo ? 'ჩვენ' : 'We'}{" "}
                    <span style={{ fontFamily: "Tomorrow", fontWeight: "500" }}>
                      SeuSoft
                    </span>{" "}
                    {isGeo ? 'ვართ' : 'are'}
                  </div>
                  <div className="progress-bar-container">
                    <div className="progress-bar">
                      <div className="progress"></div>
                      <div className="glow-effect"></div>
                      <div className="handle"></div>
                    </div>
                  </div>
                  <div className="ws">{isGeo ? 'დაგვიკავშირდით' : 'Contact Us'}</div>
                </div>
                <div className="smCont">
                  <img src={email} alt="Email" />
                  <div className="fl">
                    <div>{isGeo ? 'ელ:ფოსტა' : 'Email'}</div>
                    <div>{contactData.email}</div>
                  </div>
                </div>
                <div className="smCont">
                  <img src={number} alt="Phone" />
                  <div className="fl">
                    <div>{isGeo ? 'ნომერი' : 'Phone'}</div>
                    <div>{contactData.number}</div>
                  </div>
                </div>
                <div className="smCont">
                  <img src={location} alt="Location" />
                  <div className="fl">
                    <div>{isGeo ? 'მისამართი' : 'Address'}</div>
                    <div>{contactData.address}</div>
                  </div>
                </div>
              </div>
              <div className="FillContact">
                <div className="fill">
                  <div className="label">
                    <label htmlFor="FirstName">{isGeo ? 'სახელი' : 'First Name'}</label>
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
                    <label htmlFor="LastName">{isGeo ? 'გვარი' : 'Last Name'}</label>
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
                    <label htmlFor="Email">{isGeo ? 'ელ:ფოსტა' : 'Email'}</label>
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
                    <label htmlFor="Phone">{isGeo ? 'ტელეფონის ნომერი' : 'Phone Number'}</label>
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
                    <label htmlFor="serviceName">{isGeo ? 'სერვისის დასახელება' : 'Service Name'}</label>
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
                    <label htmlFor="CompanyName">{isGeo ? 'კომპანიის სახელი' : 'Company Name'}</label>
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
                    <label htmlFor="Comment">{isGeo ? 'დაწერეთ კომენტარი' : 'Write a Comment'}</label>
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
                <div>{isGeo ? 'გაგზავნა' : 'Send'}</div>
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
