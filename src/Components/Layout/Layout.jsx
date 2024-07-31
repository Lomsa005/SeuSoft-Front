import PropTypes from "prop-types";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import "./Layout.scss";
import { AppProvider } from './AppContext';

export const Layout = ({ children }) => {
  return (
    <>
    <AppProvider>
      <div>
        <Navbar />
        {children}
      </div>
      <Footer />
      </AppProvider>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};
