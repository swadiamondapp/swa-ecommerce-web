import React from "react";

import Classes from "../SwaWallet/SwaWallet.module.css";
import certificate from "../../Assets/certificate2.png";
import tryicon from "../../Assets/tryicon.png";

const TryAtHome = () => {
  const Datepickers = [
    {
      day: "MON",
      date: "02",
      design: "1 Design",
    },
    {
      day: "TUE",
      date: "03",
      design: "1 Design",
    },
    {
      day: "WED",
      date: "04",
      design: "1 Design",
    },
    {
      day: "THU",
      date: "05",
      design: "1 Design",
    },
    {
      day: "FRI",
      date: "06",
      design: "1 Design",
    },
    {
      day: "SAT",
      date: "07",
      design: "1 Design",
    },
  ];
  return (
    <div>
      <div className={Classes.mainContianerProfile}>
        <div className="container">
          <div className={Classes.TryAtHomeParent}>
            <h3 className={Classes.TryAtHomeHead}>Try at Home</h3>
            <p className={Classes.TryathomePara}>
              Our representative will visit your home to show your liked jewles
              with your convenient time <br /> and date. so choose your date and
              time
            </p>
            <div className={Classes.T1parent}>
              <div className={Classes.TryLeftsec}>
                <div className={Classes.TryatHomeCard}>
                  <h3 className={Classes.TryatHomeCardh3}>Try at Home</h3>
                  <div className={Classes.TryHomeDate}>
                    {Datepickers.map((item) => (
                      <div className={Classes.TryDate1}>
                        <p>{item.day}</p>
                        <h3>{item.date}</h3>
                        <div className={Classes.TryDesign1}>
                          <p>{item.design}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className={Classes.SelectTimeSlot}>
                    <h3>Select time slot</h3>
                    <div className={Classes.TryTimeSlots}>
                      <button>10:OO AM</button>
                      <button>11:OO AM</button>
                      <button>12:OO PM</button>
                      <button>1:OO PM</button>
                      <button>2:OO PM</button>
                      <button>3:OO PM</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className={Classes.TryRightsec}>
                <img src={certificate} />
              </div>
            </div>
            <div className={Classes.YourTrialCartItems}>
              <div className={Classes.LeftYourTrialCartItems}>
                <h3>Your trail cart items</h3>
                <div className={Classes.CardCartItems}>
                  <img src={tryicon} />
                  <p>ADD DESIGN</p>
                </div>
                <div className={Classes.CardCartItems}>
                  <img src={tryicon} />
                  <p>ADD DESIGN</p>
                </div>
                <div className={Classes.CardCartItems}>
                  <img src={tryicon} />
                  <p>ADD DESIGN</p>
                </div>
                <div className={Classes.CardCartItems}>
                  <img src={tryicon} />
                  <p>ADD DESIGN</p>
                </div>
                <div className={Classes.CardCartItems}>
                  <img src={tryicon} />
                  <p>ADD DESIGN</p>
                </div>
              </div>
              <div className={Classes.RightYourTrialCartItems}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TryAtHome;
