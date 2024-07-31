import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [activeLink, setActiveLink] = useState(null);

  return (
    <AppContext.Provider value={{ activeLink, setActiveLink }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);