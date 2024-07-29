import { ContactBorder } from "./ContactBorder";
import btnclose from "media/close.png";
import email from "media/email.svg";
import location from "media/location.svg";
import number from "media/number.svg";
import "./Contact.scss";

export const Contact = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <>
    <div className="ContactBorder">
      <ContactBorder />
      <img src={btnclose} alt="close button" className="CloseBtn" onClick={onClose} />

        <div className="ContactElements">
          <div className="scrollable-content">
            <div className="ContactAboutus">
              <div className="Weare">
                <div className="ws">
                  ჩვენ{" "}
                  <span style={{ fontFamily: "Tomorrow", fontWeight: "500" }}>
                    SeuSoft
                  </span>{" "}
                  ვართ
                </div>
                <div className="progress-bar-container">
                  <div className="progress-bar">
                    <div className="progress"></div>
                    <div className="glow-effect"></div>
                    <div className="handle"></div>
                  </div>
                </div>
                <div className="ws">დაგვიკავშირდით</div>
              </div>
              
              <div className="smCont">
                <img src={email} />
                <div className="fl">
                  <div>ელ:ფოსტა</div>
                  <div>Info@Seu.edu.com</div>
                </div>
              </div>
              <div className="smCont">
                <img src={number} />
                <div className="fl">
                  <div>ნომერი</div>
                  <div>995 599 00 00 00</div>
                </div>
              </div>{" "}
              <div className="smCont">
                <img src={location} />
                <div className="fl">
                  <div>მისამართი</div>
                  <div>Tbilisi, Tsinandlis st.9</div>
                </div>
              </div>
            </div>

            <div className="FillContact">
              <div className="fill">
                <div className="label">
                  <label htmlFor="FirstName">სახელი</label>
                  <p>LUKA</p>
                </div>
                <div className="filled"></div>
              </div>
              <div className="fill">
                <div className="label">
                  <label htmlFor="LastName">გვარი</label>
                </div>
                <div className="notfill"></div>
              </div>
              <div className="fill">
                <div className="label">
                  <label htmlFor="Email">ელ:ფოსტა</label>
                </div>
                <div className="notfill"></div>
              </div>
              <div className="fill">
                <div className="label">
                  <label htmlFor="Phone">ტელეფონის ნომერი</label>
                </div>
                <div className="notfill"></div>
              </div>
              <div className="fill">
                <div className="label">
                  <label htmlFor="serviceName">სერვისის დასახელება</label>
                </div>
                <div className="notfill"></div>
              </div>
              <div className="fill">
                <div className="label">
                  <label htmlFor="CompanyName">კომპანიის სახელი</label>
                </div>
                <div className="notfill"></div>
              </div>
              <div className="longLine fill">
                <div className="label">
                  <label htmlFor="Comment">დაწერეთ კომენტარი</label>
                </div>
                <div className="notfill"></div>
              </div>
            </div>

            <div className="ContactBtn">
              <div>გაგზავნა</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
