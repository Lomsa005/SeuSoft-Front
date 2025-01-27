import { useState, useEffect } from 'react';
import { useData } from '../Api/Api';

export const Navbar = () => {
  const { contactData } = useData();
  const [showUnderline, setShowUnderline] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowUnderline(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <nav className="font-tomorrow">
      <div className="nav-container">
        <div className="nav-title">
        {contactData?.name}<span className="nav-highlight">.</span>
        </div>
        <div className="underline-decoration">
          <div className="line-container">
            <div className={`line-primary ${showUnderline ? 'active' : ''}`}></div>
            <div className={`line-secondary ${showUnderline ? 'active' : ''}`}></div>
          </div>
          <div className={`blur-effect ${showUnderline ? 'active' : ''}`}></div>
        </div>
      </div>
    </nav>
  );
};
