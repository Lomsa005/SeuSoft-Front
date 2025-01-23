import { useState, useRef, useEffect } from 'react';
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
  const [isFocused, setIsFocused] = useState(isVisible);
  const contactBorderRef = useRef(null);
  const [progress, setProgress] = useState(0);

  // Load saved form data from localStorage on component mount
  useEffect(() => {
    const savedFormData = JSON.parse(localStorage.getItem('formData'));
    if (savedFormData) {
      setInputStates(savedFormData);
    }
  }, []);

  const calculateProgress = () => {
    let filledCount = 0;
    for (const key in inputStates) {
      if (inputStates[key]) {
        filledCount++;
      }
    }
    return (filledCount / Object.keys(inputStates).length) * 100;
  };

  useEffect(() => {
    const contactBorder = contactBorderRef.current;
    if (isVisible) {
      setIsFocused(isVisible);
      setTimeout(() => {
        contactBorder.classList.add('visible');
      }, 1);
    } else {
      if(contactBorder){
        setTimeout(() => {
          contactBorder.classList.remove('visible');
        }, 1);
      }
      setTimeout(() => {
        setIsFocused(isVisible);
      }, 500)
    }
    
  }, [isFocused, isVisible]);

  useEffect(() => {
    setProgress(calculateProgress());
  }, [inputStates]);

  const inputRefs = {
    FirstName: useRef(null),
    LastName: useRef(null),
    Email: useRef(null),
    Phone: useRef(null),
    serviceName: useRef(null),
    CompanyName: useRef(null),
    Comment: useRef(null)
  };

  const labelRefs = {
    FirstName: useRef(null),
    LastName: useRef(null),
    Email: useRef(null),
    Phone: useRef(null),
    serviceName: useRef(null),
    CompanyName: useRef(null),
    Comment: useRef(null)
  };

  const handleInputFocus = (inputId) => {
    if (labelRefs[inputId].current) {
      labelRefs[inputId].current.classList.add('focused');
    }
  };

  const handleInputBlur = (inputId) => {
    if (!inputStates[inputId] && labelRefs[inputId].current) {
      labelRefs[inputId].current.classList.remove('focused');
    }
  };

  const handleLineClick = (inputId) => {
    if (inputRefs[inputId].current) {
      inputRefs[inputId].current.focus();
    }
  };

  if (!isFocused) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: inputRefs.FirstName.current.value,
      last_name: inputRefs.LastName.current.value,
      email: inputRefs.Email.current.value,
      number: inputRefs.Phone.current.value,
      service: inputRefs.serviceName.current.value,
      company: inputRefs.CompanyName.current.value,
      message: inputRefs.Comment.current.value
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/contacts`, formData);
      console.log('Response from server:', response.data);

      // Clear form data from localStorage after successful submission
      localStorage.removeItem('formData');
      setInputStates({
        FirstName: false,
        LastName: false,
        Email: false,
        Phone: false,
        serviceName: false,
        CompanyName: false,
        Comment: false
      });
      // Resetting the form fields to empty
      for (const key in inputRefs) {
        inputRefs[key].current.value = '';
      }

      // Resetting labels
      for (const key in labelRefs) {
        if (labelRefs[key].current) {
          labelRefs[key].current.classList.remove('focused');
        }
      }

      // Reset progress bar
      setProgress(0);

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
    const newStates = {
      ...inputStates,
      [id]: value
    };
    setInputStates(newStates);
    localStorage.setItem('formData', JSON.stringify(newStates));
  };

  return (
    <>
      <div className="ContactBorder" ref={contactBorderRef}>
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
                    {isGeo ? 'ჩვენ' : 'We are'}{" "}
                    <span style={{ fontFamily: "Tomorrow", fontWeight: "500" }}>
                      SeuSoft
                    </span>{" "}
                    {isGeo ? 'ვართ' : null}
                  </div>
                  <div className="progress-bar-container">
                    <div className="progress-bar">
                      <div className="progress" style={{ width: `${progress}%` }}></div>
                      <div className="glow-effect" style={{ left: `calc(${progress}% - 13px)` }}></div>
                      <div className="handle" style={{ left: `calc(${progress}% - 8px)` }}></div>
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
                    <div>{isGeo ? contactData.addressGe : contactData.addressEn}</div>
                  </div>
                </div>
              </div>
              <div className="FillContact">
                <div className="fill" onClick={() => handleLineClick('FirstName')}>
                  <div className="label">
                    <label ref={labelRefs.FirstName} htmlFor="FirstName">{isGeo ? 'სახელი' : 'First Name'}</label>
                    <input
                      ref={inputRefs.FirstName}
                      type="text"
                      id="FirstName"
                      className="p"
                      onChange={handleInputChange}
                      onFocus={() => handleInputFocus('FirstName')}
                      onBlur={() => handleInputBlur('FirstName')}
                      value={inputRefs.FirstName.current?.value || JSON.parse(localStorage.getItem('formData'))?.FirstName || ''}
                    />
                  </div>
                  <div className={inputStates.FirstName ? "filled" : "notfill"}></div>
                </div>
                <div className="fill" onClick={() => handleLineClick('LastName')}>
                  <div className="label">
                    <label ref={labelRefs.LastName} htmlFor="LastName">{isGeo ? 'გვარი' : 'Last Name'}</label>
                    <input
                      ref={inputRefs.LastName}
                      type="text"
                      id="LastName"
                      className="p"
                      onChange={handleInputChange}
                      onFocus={() => handleInputFocus('LastName')}
                      onBlur={() => handleInputBlur('LastName')}
                      value={inputRefs.LastName.current?.value || JSON.parse(localStorage.getItem('formData'))?.LastName || ''}
                    />
                  </div>
                  <div className={inputStates.LastName ? "filled" : "notfill"}></div>
                </div>
                <div className="fill" onClick={() => handleLineClick('Email')}>
                  <div className="label">
                    <label ref={labelRefs.Email} htmlFor="Email">{isGeo ? 'ელ:ფოსტა' : 'Email'}</label>
                    <input
                      ref={inputRefs.Email}
                      type="email"
                      id="Email"
                      className="p"
                      onChange={handleInputChange}
                      onFocus={() => handleInputFocus('Email')}
                      onBlur={() => handleInputBlur('Email')}
                      value={inputRefs.Email.current?.value || JSON.parse(localStorage.getItem('formData'))?.Email || ''}
                    />
                  </div>
                  <div className={inputStates.Email ? "filled" : "notfill"}></div>
                </div>
                <div className="fill" onClick={() => handleLineClick('Phone')}>
                  <div className="label">
                    <label ref={labelRefs.Phone} htmlFor="Phone">{isGeo ? 'ტელეფონის ნომერი' : 'Phone Number'}</label>
                    <input
                      ref={inputRefs.Phone}
                      type="tel"
                      id="Phone"
                      className="p"
                      onChange={handleInputChange}
                      onFocus={() => handleInputFocus('Phone')}
                      onBlur={() => handleInputBlur('Phone')}
                      value={inputRefs.Phone.current?.value || JSON.parse(localStorage.getItem('formData'))?.Phone || ''}
                    />
                  </div>
                  <div className={inputStates.Phone ? "filled" : "notfill"}></div>
                </div>
                <div className="fill" onClick={() => handleLineClick('serviceName')}>
                  <div className="label">
                    <label ref={labelRefs.serviceName} htmlFor="serviceName">{isGeo ? 'სერვისის დასახელება' : 'Service Name'}</label>
                    <input
                      ref={inputRefs.serviceName}
                      type="text"
                      id="serviceName"
                      className="p"
                      onChange={handleInputChange}
                      onFocus={() => handleInputFocus('serviceName')}
                      onBlur={() => handleInputBlur('serviceName')}
                      value={inputRefs.serviceName.current?.value || JSON.parse(localStorage.getItem('formData'))?.serviceName || ''}
                    />
                  </div>
                  <div className={inputStates.serviceName ? "filled" : "notfill"}></div>
                </div>
                <div className="fill" onClick={() => handleLineClick('CompanyName')}>
                  <div className="label">
                    <label ref={labelRefs.CompanyName} htmlFor="CompanyName">{isGeo ? 'კომპანიის სახელი' : 'Company Name'}</label>
                    <input
                      ref={inputRefs.CompanyName}
                      type="text"
                      id="CompanyName"
                      className="p"
                      onChange={handleInputChange}
                      onFocus={() => handleInputFocus('CompanyName')}
                      onBlur={() => handleInputBlur('CompanyName')}
                      value={inputRefs.CompanyName.current?.value || JSON.parse(localStorage.getItem('formData'))?.CompanyName || ''}
                    />
                  </div>
                  <div className={inputStates.CompanyName ? "filled" : "notfill"}></div>
                </div>
                <div className="longLine fill" onClick={() => handleLineClick('Comment')}>
                  <div className="label cc">
                    <label ref={labelRefs.Comment} htmlFor="Comment">{isGeo ? 'დაწერეთ კომენტარი' : 'Message'}</label>
                    <textarea
                      ref={inputRefs.Comment}
                      id="Comment"
                      className="p"
                      onChange={handleInputChange}
                      onFocus={() => handleInputFocus('Comment')}
                      onBlur={() => handleInputBlur('Comment')}
                      value={inputRefs.Comment.current?.value || JSON.parse(localStorage.getItem('formData'))?.Comment || ''}
                    ></textarea>
                  </div>
                  <div className={inputStates.Comment ? "filled" : "notfill"}></div>
                </div>
              </div>
              <div className="ContactBtn" onClick={handleSubmit}>
                <div>{isGeo ? 'გაგზავნა' : 'Send Message'}</div>
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