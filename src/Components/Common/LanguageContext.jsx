import { createContext, useState, useContext, useEffect } from 'react';

const fontSettings = {
  eng: {
    family: "'Tomorrow', sans-serif",
    weights: {
      normal: 600,
      medium: 700,
      small: 500,
    }
  },
  geo: {
    family: "'BPG ExtraSquare Mtavruli', sans-serif",
    weights: {
      normal: 400,
      medium: 400,
      small: 400,
    }
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [isGeo, setIsGeo] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    const newIsGeo = savedLanguage === 'geo';
    setIsGeo(newIsGeo);
    updateFontSettings(newIsGeo);
  }, []);

  const toggleLanguage = () => {
    const newIsGeo = !isGeo;
    setIsGeo(newIsGeo);
    updateFontSettings(newIsGeo);
    localStorage.setItem('language', newIsGeo ? 'geo' : 'eng');
  };

  const updateFontSettings = (isGeorgian) => {
    const settings = isGeorgian ? fontSettings.geo : fontSettings.eng;
    document.documentElement.style.setProperty('--font-family', settings.family);
    document.documentElement.style.setProperty('--font-weight-normal', settings.weights.normal);
    document.documentElement.style.setProperty('--font-weight-medium', settings.weights.medium);
    document.documentElement.style.setProperty('--font-weight-small', settings.weights.small);
  };

  return (
    <LanguageContext.Provider value={{ isGeo, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
