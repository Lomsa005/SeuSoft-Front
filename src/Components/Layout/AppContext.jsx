import { createContext, useState, useContext } from 'react';
import PropTypes from "prop-types"

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

AppProvider.propTypes = {
  children: PropTypes.node,
};
