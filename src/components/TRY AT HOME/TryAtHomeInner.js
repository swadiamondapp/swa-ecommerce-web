import React, { useState } from "react";
import Classes from "../SwaWallet/SwaWallet.module.css";
import edit from "../../Assets/edit.png";
import { Calendar } from "primereact/calendar";
import { FaCalendarAlt } from "react-icons/fa";
import timeimgs from "../../Assets/times.png";
import { TimePicker } from "antd";
import dateimg from "../../Assets/datepicker.png";
import { Link } from "react-router-dom";

const TryAtHomeInner = () => {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);

  const handleChange = (time, timeString) => {
    setTime(time);
  };
  return (
    <div>
      {" "}
      <div className={Classes.mainContianerProfile}>
        <div className="container">
          <div className={Classes.BookingParentForm}>
            <div className={Classes.BokkingLeft}>
              <div className={Classes.BookingInformation}>
                <div className={Classes.BookingHead}>
                  <h3 className={Classes.TryBookInner}>Booking Information</h3>
                  <p className={Classes.TryHomeEdits}>
                    <Link to="/tryathome">
                      <img src={edit} /> Edit
                    </Link>
                  </p>
                </div>
                <div className={Classes.BookDateTime}>
                  <div className={Classes.Datepickes}>
                    <img src={dateimg} /> Fri,12th May 2024
                  </div>
                  <div className={Classes.Datepickes}>
                    <img src={timeimgs} /> 12:00 PM
                  </div>
                </div>
                <p className={Classes.DesignFormPara}>1 DESIGN</p>
              </div>
              <div className={Classes.BookingForm}>
                <div className={Classes.BookEmailNumber}>
                  <div className={Classes.Bookemail}>
                    <label>Email</label>
                    <input type="" />
                  </div>
                  <div className={Classes.Bookemail}>
                    <label>Mobile number</label>
                    <input type="" />
                  </div>
                </div>
                <h3 className={Classes.TryYourAddress}>Your Address</h3>
                <div className={Classes.BookingName}>
                  <label>Full Name</label>
                  <input type="" placeholder="Jameel" />
                </div>
                <div className={Classes.BookpincodeCity}>
                  <div className={Classes.PincodeCitys}>
                    <div className={Classes.BookPincodee}>
                      <label>Pincode</label>
                      <input type="" placeholder="673456" />
                    </div>
                    <div className={Classes.BookCity}>
                      <label>City</label>
                      <input type="" placeholder="Calicut" />
                    </div>
                  </div>
                  <div className={Classes.BookingState}>
                    <label>City</label>
                    <select name="cars" id="cars">
                      <option value="volvo">Volvo</option>
                      <option value="saab">Saab</option>
                      <option value="opel">Opel</option>
                      <option value="audi">Audi</option>
                    </select>
                  </div>
                </div>
                <div className={Classes.HouseStreet}>
                  <div className={Classes.BookingHouse}>
                    <label>House number / building name</label>
                    <input type="" placeholder="Skyline 12B" />
                  </div>
                  <div className={Classes.BookingStreet}>
                    <label>Street colony name</label>
                    <input type="" placeholder="Palazhi" />
                  </div>
                </div>
                <div className={Classes.Landmarck}>
                  <label>Land mark ( optional )</label>
                  <input type="" placeholder="Near edu city" />
                </div>
                <div className={Classes.BookAppoinmentbtn}>
                  <button>BOOK APOINMENT</button>
                </div>
              </div>
            </div>
            <div className={Classes.BokkingRight}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TryAtHomeInner;
