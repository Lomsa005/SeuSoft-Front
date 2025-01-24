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
  const [formData, setFormData] = useState({
    FirstName: '',
    LastName: '',
    Email: '',
    Phone: '',
    serviceName: '',
    CompanyName: '',
    Comment: ''
  });

  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const [isFocused, setIsFocused] = useState(isVisible);
  const contactBorderRef = useRef(null);
  const [progress, setProgress] = useState(0);

  // Load saved form data from localStorage on component mount
  useEffect(() => {
    const savedFormData = JSON.parse(localStorage.getItem('formData'));
    if (savedFormData) {
      setFormData(savedFormData);
    }
  }, []);

  useEffect(() => {
    const contactBorder = contactBorderRef.current;
    if (isVisible) {
      setIsFocused(isVisible);
      setTimeout(() => {
        contactBorder?.classList?.add('visible');
      }, 10);
    } else {
      if(contactBorder){
        setTimeout(() => {
          contactBorder.classList.remove('visible');
        }, 10);
      }
      setTimeout(() => {
        setIsFocused(isVisible);
      }, 500)
    }
  }, [isFocused, isVisible]);

  const calculateProgress = () => {
    let filledCount = 0;
    for (const key in formData) {
      if (formData[key] !== '') {
        filledCount++;
      }
    }
    return (filledCount / Object.keys(formData).length) * 100;
  };

  useEffect(() => {
    setProgress(calculateProgress());
  }, [formData]);

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
    if (formData[inputId] === '' && labelRefs[inputId].current) {
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
    setErrors({});
    setErrorMessage('');

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/contacts`, {
        name: formData.FirstName,
        last_name: formData.LastName,
        email: formData.Email,
        company: formData.CompanyName,
        service: formData.serviceName,
        number: formData.Phone,
        message: formData.Comment
      });
      console.log('Response from server:', response.data);

      // Clear form data from localStorage after successful submission
      localStorage.removeItem('formData');
      setFormData({
        FirstName: '',
        LastName: '',
        Email: '',
        Phone: '',
        serviceName: '',
        CompanyName: '',
        Comment: ''
      });

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
        if (error.response.data.errors) {
          setErrors(error.response.data.errors);
        }
        if (error.response.data.message) {
          setErrorMessage(error.response.data.message);
        }
      }
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    const newFormData = {
      ...formData,
      [id]: value
    };
    setFormData(newFormData);
    localStorage.setItem('formData', JSON.stringify(newFormData));
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
                    <label ref={labelRefs.FirstName} htmlFor="FirstName" className={formData.FirstName !== '' ? 'focused' : ''}>{isGeo ? 'სახელი' : 'First Name'}</label>
                    <input
                      ref={inputRefs.FirstName}
                      type="text"
                      id="FirstName"
                      className="p"
                      onChange={handleInputChange}
                      onFocus={() => handleInputFocus('FirstName')}
                      onBlur={() => handleInputBlur('FirstName')}
                      value={formData.FirstName}
                    />
                  </div>
                  <div className={formData.FirstName !== '' ? "filled" : "notfill"}></div>
                  {errors.name && <div className="error fier">{errors.name[0]}</div>}
                </div>
                <div className="fill" onClick={() => handleLineClick('LastName')}>
                  <div className="label">
                    <label ref={labelRefs.LastName} htmlFor="LastName" className={formData.LastName !== '' ? 'focused' : ''}>{isGeo ? 'გვარი' : 'Last Name'}</label>
                    <input
                      ref={inputRefs.LastName}
                      type="text"
                      id="LastName"
                      className="p"
                      onChange={handleInputChange}
                      onFocus={() => handleInputFocus('LastName')}
                      onBlur={() => handleInputBlur('LastName')}
                      value={formData.LastName}
                    />
                  </div>
                  <div className={formData.LastName !== '' ? "filled" : "notfill"}></div>
                  {errors.last_name && <div className="error fier" >{errors.last_name[0]}</div>}
                </div>
                <div className="fill" onClick={() => handleLineClick('Email')}>
                  <div className="label">
                    <label ref={labelRefs.Email} htmlFor="Email" className={formData.Email !== '' ? 'focused' : ''}>{isGeo ? 'ელ:ფოსტა' : 'Email'}</label>
                    <input
                      ref={inputRefs.Email}
                      type="email"
                      id="Email"
                      className="p"
                      onChange={handleInputChange}
                      onFocus={() => handleInputFocus('Email')}
                      onBlur={() => handleInputBlur('Email')}
                      value={formData.Email}
                    />
                  </div>
                  <div className={formData.Email !== '' ? "filled" : "notfill"}></div>
                  {errors.email && <div className="error fier" >{errors.email[0]}</div>}
                </div>
                <div className="fill" onClick={() => handleLineClick('Phone')}>
                  <div className="label">
                    <label ref={labelRefs.Phone} htmlFor="Phone" className={formData.Phone !== '' ? 'focused' : ''}>{isGeo ? 'ტელეფონის ნომერი' : 'Phone Number'}</label>
                    <input
                      ref={inputRefs.Phone}
                      type="number"
                      id="Phone"
                      className="p"
                      onChange={handleInputChange}
                      onFocus={() => handleInputFocus('Phone')}
                      onBlur={() => handleInputBlur('Phone')}
                      value={formData.Phone}
                    />
                  </div>
                  <div className={formData.Phone !== '' ? "filled" : "notfill"}></div>
                  {errors.phone && <div className="error fier" >{errors.phone[0]}</div>}
                </div>
                <div className="fill" onClick={() => handleLineClick('serviceName')}>
                  <div className="label">
                    <label ref={labelRefs.serviceName} htmlFor="serviceName" className={formData.serviceName !== '' ? 'focused' : ''}>{isGeo ? 'სერვისის დასახელება' : 'Service Name'}</label>
                    <input
                      ref={inputRefs.serviceName}
                      type="text"
                      id="serviceName"
                      className="p"
                      onChange={handleInputChange}
                      onFocus={() => handleInputFocus('serviceName')}
                      onBlur={() => handleInputBlur('serviceName')}
                      value={formData.serviceName}
                    />
                  </div>
                  <div className={formData.serviceName !== '' ? "filled" : "notfill"}></div>
                  {errors.service && <div className="error fier" >{errors.service[0]}</div>}
                </div>
                <div className="fill" onClick={() => handleLineClick('CompanyName')}>
                  <div className="label">
                    <label ref={labelRefs.CompanyName} htmlFor="CompanyName" className={formData.CompanyName !== '' ? 'focused' : ''}>{isGeo ? 'კომპანიის სახელი' : 'Company Name'}</label>
                    <input
                      ref={inputRefs.CompanyName}
                      type="text"
                      id="CompanyName"
                      className="p"
                      onChange={handleInputChange}
                      onFocus={() => handleInputFocus('CompanyName')}
                      onBlur={() => handleInputBlur('CompanyName')}
                      value={formData.CompanyName}
                    />
                  </div>
                  <div className={formData.CompanyName !== '' ? "filled" : "notfill"}></div>
                  {errors.company && <div className="error fier" >{errors.company[0]}</div>}
                </div>
                <div className="longLine fill" onClick={() => handleLineClick('Comment')}>
                  <div className="label cc">
                    <label ref={labelRefs.Comment} htmlFor="Comment" className={formData.Comment !== '' ? 'focused' : ''}>{isGeo ? 'დაწერეთ კომენტარი' : 'Message'}</label>
                    <textarea
                      ref={inputRefs.Comment}
                      id="Comment"
                      className="p"
                      onChange={handleInputChange}
                      onFocus={() => handleInputFocus('Comment')}
                      onBlur={() => handleInputBlur('Comment')}
                      value={formData.Comment}
                    ></textarea>
                  </div>
                  <div className={formData.Comment !== '' ? "filled" : "notfill"}></div>
                  {errors.message && <div className="error fier" >{errors.message[0]}</div>}
                </div>
              </div>
              {errorMessage && (
                  <div className="error-message" style={{ marginBottom: '10px', color: "#fb00fa", fontSize: "13px" }}>
                    {errorMessage}
                  </div>
                )}
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