import React, { useState, useEffect } from 'react';
import axios from 'axios';
import flag from "media/GE.svg";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

export const Footer = () => {
  const [contactData, setContactData] = useState({
    title: '',
    address: '',
    email: '',
    number: '',
    fb: '',
    ig: '',
    twitter: '',
    in: '',
    copyright: '',
  });

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/contacts');
        console.log('API Response:', response.data); // Add this line to see the actual response
        if (response.data && response.data.data && response.data.data.length > 0) {
          setContactData(response.data.data[0]);
        } else {
          console.error('No contact data received');
        }
      } catch (error) {
        console.error('Error fetching contact data:', error);
      }
    };
  
    fetchContactData();
  }, []);

  return (
    <>
      <div className="footerContainer">
        <div style={{ width: "100%", marginTop: "-32px" }}>
          <div className="diamond-container">
            <div className="diamond"></div>
          </div>
          <div className="lines-container">
            <div className="lines first-line">
              <div className="l-line"></div>
              <div className="r-line"></div>
            </div>
            <div className="lines">
              <div className="l-line"></div>
              <div className="r-line"></div>
            </div>
          </div>
        </div>
        <div className="footer">
          <div className="description">
            <h3 className="descriptionHeader">
              SeuSoft
            </h3>
            <p className="descriptionParagraph">
            {contactData.title}<span className="descriptionHeaderDot">.</span>
            </p>
          </div>
          <div className="contactsAndLinks">
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
                <li>{contactData.address}</li>
                <li>{contactData.email}</li>
                <li>
                  <a style={{textDecoration:"underline"}}>{contactData.number}</a>
                </li>
                <li className="ge">
                  <img src={flag} alt="geo flag" />
                  <span className="geSpan">GE</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="social-icons">
          {contactData.in && (
            <div className="soc">
              <a href={contactData.in} target="_blank" rel="noopener noreferrer">
                <FaLinkedinIn />
              </a>
            </div>
          )}
          {contactData.twitter && (
            <div className="soc">
              <a href={contactData.twitter} target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
            </div>
          )}
          {contactData.ig && (
            <div className="soc">
              <a href={contactData.ig} target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
            </div>
          )}
          {contactData.fb && (
            <div className="soc">
              <a href={contactData.fb} target="_blank" rel="noopener noreferrer">
                <FaFacebookF />
              </a>
            </div>
          )}
        </div>
        <div className="footerlines" style={{ transform: "translateY(-5px)" }}>
          <div className="footer-line line-color"></div>
          <div className="footer-line line-color-middle"></div>
          <div className="footer-line line-color"></div>
        </div>
        <div className="footerlines">
          <div className="footer-line firstline"></div>
          <div className="footer-line middleline"></div>
          <div className="footer-line thirdline"></div>
        </div>
        <div className="copyright">
          {" "}
          <span style={{ fontFamily: "Tomorrow" }}>©</span> {contactData.copyright}
        </div>
      </div>
    </>
  );
};