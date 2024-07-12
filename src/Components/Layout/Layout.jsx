import PropTypes from "prop-types";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import "./Layout.scss";
export const Layout = ({ children }) => {
  return (
    <>
      <div>
        <Navbar />
        {children}
      </div>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};
