// import { Link } from "react-router-dom"
import { MainVideo } from "./Video"
import { ContactButton } from "./contactButton"
import { Footer } from "./Footer"

export const HomePage = () => {
  return (
    <div className="mainContainer">
      <div className="main">
        <MainVideo />
        <ContactButton />
      </div>
      <div className="footerContainer">
        <Footer />
      </div>
    </div>

  )
}
