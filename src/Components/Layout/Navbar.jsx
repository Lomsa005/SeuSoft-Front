import { useData } from '../Api/Api';


export const Navbar = () => {

  const { contactData } = useData();

  return (
    <nav className="font-tomorrow">
      <div className="nav-container">
        <div className="nav-title">
          SEUSOFT<span className="nav-highlight">.</span>
        </div>
        <div className="underline-decoration">
          <div className="line-container">
            <div className="line-primary"> </div>
            <div className="line-secondary"> </div>
          </div>
          <div className="blur-effect"></div>
        </div>
      </div>
    </nav>
  );
};
