import React, { useState, useEffect } from "react";

import Classes from "../SwaWallet/SwaWallet.module.css";
import certificate from "../../Assets/certificate2.png";
import tryicon from "../../Assets/tryicon.png";
import tryimg from "../../Assets/try.png";
import trycloseimg from "../../Assets/tryclose.png";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import adddesignimg from "../../Assets/adddesign.png";
import axios from "axios";
import * as Urls from "../../Urls";

const TryAtHome = () => {
  const [tryCartResults, setTryCartResults] = useState();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const countryId = localStorage.getItem("id");
  const token = localStorage.getItem("swaToken");
  const history = useHistory();

  useEffect(() => {
    fechTryAtHomeCart();
  }, []);
  const fechTryAtHomeCart = () => {
    axios
      .get(`${Urls.tryathome}?country=${countryId}`, {
        headers: { Authorization: "Token " + token },
      })
      .then((response1) => {
        if (response1.data.results.status === 200) {
          setTryCartResults(response1.data.results.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
  const addDesigns = (cartid) => {
    console.log("idcart", cartid);
    axios
      .delete(`${Urls.tryatcartdelete}/${cartid}/?country=${countryId}`, {
        headers: { Authorization: "Token " + token },
      })
      .then((response1) => {
        if (response1.data.results.status_code === 200) {
          fechTryAtHomeCart();
        }
      })
      .catch((error) => {
        console.log(error);
      });
    // history.push("/new_arrivel");
  };
  const handleTimeSlotClick = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };
  const handleDateClick = (date) => {
    setSelectedDate(date);
  };
  const AddDesigns = () => {
    history.push("/new_arrivel");
  };

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
                      <div
                        key={item.date}
                        className={
                          selectedDate === item.date
                            ? `${Classes.TryDate1} ${Classes.TryDateActive}`
                            : Classes.TryDate1
                        }
                        onClick={() => handleDateClick(item.date)}
                      >
                        <p className={Classes.datetext}>{item.day}</p>
                        <h3>{item.date}</h3>
                        <div
                          className={
                            selectedDate === item.date
                              ? `${Classes.TryDesign1} ${Classes.TryDesign1Active}`
                              : Classes.TryDesign1
                          }
                        >
                          <p>{item.design}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className={Classes.SelectTimeSlot}>
                    <h3>Select time slot</h3>
                    <div className={Classes.TryTimeSlots}>
                      {[
                        "10:00 AM",
                        "11:00 AM",
                        "12:00 PM",
                        "1:00 PM",
                        "2:00 PM",
                        "3:00 PM",
                      ].map((time) => (
                        <button
                          key={time}
                          className={
                            selectedTimeSlot === time
                              ? Classes.TryTimeSlotsActive
                              : Classes.TryTimeSlotsDefault
                          }
                          onClick={() => handleTimeSlotClick(time)}
                        >
                          {time}
                        </button>
                      ))}
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
                <div className={Classes.ParentCardItems}>
                  {Array(5)
                    .fill(null)
                    .map((_, index) => {
                      const cartItem =
                        tryCartResults &&
                        tryCartResults.cart_item &&
                        tryCartResults.cart_item[index];

                      const product =
                        tryCartResults && tryCartResults.cart_item[0];

                      console.log("product", product);

                      if (cartItem && cartItem.thumbnail_image) {
                        return (
                          <div
                            key={index}
                            className={Classes.CardCartItemsUpload}
                          >
                            <img
                              className={Classes.Tryclosebtns}
                              src={trycloseimg}
                              onClick={() =>
                                addDesigns(cartItem ? cartItem.id : null)
                              }
                              alt="Close"
                            />
                            <img
                              style={{ height: "110px" }}
                              src={cartItem.thumbnail_image}
                              alt="Cart Item"
                            />

                            <p className={Classes.ProceedAmountT}>
                              ₹{" "}
                              {cartItem.product &&
                                cartItem.product.country_total_price}
                              {cartItem.product.country_discount_price && (
                                <span
                                  style={{ textDecoration: "line-through" }}
                                >
                                  ₹ {cartItem.product.country_discount_price}
                                </span>
                              )}
                            </p>
                          </div>
                        );
                      } else {
                        return (
                          <div
                            key={index}
                            className={Classes.CardCartItems}
                            onClick={AddDesigns}
                          >
                            <img src={tryicon} alt="Add Design" />
                            <p>ADD DESIGN</p>
                          </div>
                        );
                      }
                    })}
                </div>
                {/* <div className={Classes.ParentCardItems}>
                  {tryCartResults &&
                    tryCartResults.cart_item &&
                    tryCartResults.cart_item.map((cartItem, index) => {
                      const product = cartItem.product;

                      return cartItem.thumbnail_image ? (
                        <div
                          key={index}
                          className={Classes.CardCartItemsUpload}
                        >
                          <img
                            className={Classes.Tryclosebtns}
                            src={trycloseimg}
                            onClick={() => addDesigns(cartItem.id)}
                            alt="Close"
                          />
                          <img
                            style={{ height: "110px" }}
                            src={cartItem.thumbnail_image}
                            alt="Cart Item"
                          />

                          <p className={Classes.ProceedAmountT}>
                            ₹ {product.country_total_price}
                            {product.is_on_discount && (
                              <span style={{ textDecoration: "line-through" }}>
                                ₹ {product.country_discount_price}
                              </span>
                            )}
                          </p>
                        </div>
                      ) : (
                        <div key={index} className={Classes.CardCartItems}>
                          <img src={adddesignimg} alt="Add Design" />
                        </div>
                      );
                    })}
                </div> */}

                <div className={Classes.Proceedbutns}>
                  <Link to="/tryathomeform">
                    <button>PROCEED TO CONFIRM</button>
                  </Link>
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
