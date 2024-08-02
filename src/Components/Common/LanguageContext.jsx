import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [isGeo, setIsGeo] = useState(true);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    setIsGeo(savedLanguage === 'geo');
  }, []);

  const toggleLanguage = () => {
    const newLanguage = isGeo ? 'eng' : 'geo';
    setIsGeo(!isGeo);
    localStorage.setItem('language', newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ isGeo, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
