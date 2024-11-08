import React, { useState, useEffect } from "react";

import Classes from "../SwaWallet/SwaWallet.module.css";
import certificate from "../../Assets/certificate2.png";
import tryicon from "../../Assets/tryicon.png";
import tryimg from "../../Assets/try.png";
import trycloseimg from "../../Assets/tryclose.png";
import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";
import { CgDollar } from "react-icons/cg";
import { BiRupee } from "react-icons/bi";

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
  const location = useLocation();
  const [dates, setDates] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const Contryname = localStorage.getItem("country_name");
  // const dates = location.state;
  // const dates = (location.state && location.state.dates) || [];

  console.log("dates......0", dates);
  console.log("tryCartResults", tryCartResults);

  const saveddate = localStorage.getItem("selectedDate");
  console.log("saveddate", saveddate);

  useEffect(() => {
    const savedTimeSlot = localStorage.getItem("selectedTimeSlot");
    const saveddate = localStorage.getItem("selectedDate");

    if (saveddate) {
      setSelectedDate(saveddate);
    }
    if (savedTimeSlot) {
      setSelectedTimeSlot(savedTimeSlot);
    }

    fechTryAtHomeCart();
    const currentDate = new Date();
    const tempDates = [currentDate];
    for (let i = 1; i < 6; i++) {
      const nextDate = new Date();
      nextDate.setDate(currentDate.getDate() + i);
      tempDates.push(nextDate);
    }
    setDates(tempDates);
  }, []);

  const fechTryAtHomeCart = () => {
    axios
      .get(`${Urls.tryathome}?country=${countryId}`, {
        headers: { Authorization: "Token " + token },
      })
      .then((response1) => {
        if (response1.data.results.status === 200) {
          setTryCartResults(response1.data.results.data);
        } else if (response1.data.results.message === "cart is empty") {
          setTryCartResults();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log("selectedTimeSlot", selectedTimeSlot);
  const formatDate = (dateString) => {
    const options = { weekday: "short", day: "2-digit" };
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", options).split(" ");
    return [formattedDate[0], formattedDate[1]];
  };

  const formatSelectedDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toDateString(); // e.g., Fri Jun 14 2024
  };

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
    localStorage.setItem("selectedTimeSlot", timeSlot);
    setErrorMessage("");
  };
  const handleDateClick = (date) => {
    // setSelectedDate(date);
    // localStorage.setItem("selectedDate", date);
    const formattedDate = date.toISOString().split("T")[0];
    setSelectedDate(formattedDate);
    localStorage.setItem("selectedDate", formattedDate);

    setErrorMessage("");
  };
  const AddDesigns = () => {
    // history.push("/new_arrivel");
    history.push({
      pathname: "/new_arrivel",
      state: {
        octnId: "",
        data: "",
        product_category: "",
      },
    });
  };
  const [itemCount, setItemCount] = useState(0);
  useEffect(() => {
    if (tryCartResults && tryCartResults.cart_item) {
      setItemCount(tryCartResults.cart_item.length);
    }
  }, [tryCartResults]);
  console.log(itemCount, "itemsTryCOunt");
  const handleProceedClick = () => {
    if (!selectedDate || !selectedTimeSlot) {
      setErrorMessage("Please select both a date and a time slot.");
      return;
    }
    if (!tryCartResults) {
      setErrorMessage("Please select at least one trial cart item.");
      return;
    }
    history.push({
      pathname: "/tryathomeform",
      state: {
        selectedTimeSlot,
        selectedDate: selectedDate ? formatSelectedDate(selectedDate) : null,
        tryAtHomeCount: itemCount,
      },
    });
  };
  const now = new Date();
  const currentDate = now.toISOString().split("T")[0]; // Get current date in "YYYY-MM-DD" format
  const currentTime = now.getHours() * 60 + now.getMinutes();
  const availableTimes = [
    { time: "10:00 AM", minutes: 10 * 60 },
    { time: "11:00 AM", minutes: 11 * 60 },
    { time: "12:00 PM", minutes: 12 * 60 },
    { time: "1:00 PM", minutes: 13 * 60 },
    { time: "2:00 PM", minutes: 14 * 60 },
    { time: "3:00 PM", minutes: 15 * 60 },
  ];
  return (
    <div>
      <div className={Classes.mainContianerProfile}>
        <div className="container">
          <div className={Classes.TryAtHomeParent}>
            <h3 className={Classes.TryAtHomeHead}>Trial at Home</h3>
            <div className={Classes.trailathomeParent}>
              <p className={Classes.TryathomePara}>
                Our representative will visit your home to show your liked
                jewels with your convenient time and date. so choose your date
                and time
              </p>
              <p></p>
            </div>
            <div className={Classes.T1parent}>
              {/* <div className={Classes.TryLeftsec}>
                <div className={Classes.TryatHomeCard}>
                  <h3 className={Classes.TryatHomeCardh3}>Try at Home</h3>
                  <div className={Classes.TryHomeDate}>
                    {dates.length > 0 ? (
                      dates.map((dateString, index) => {
                        const [day, date] = formatDate(dateString);
                        const formattedDateString = dateString
                          .toISOString()
                          .split("T")[0];
                        return (
                          <div
                            key={index}
                            className={
                              selectedDate === formattedDateString
                                ? `${Classes.TryDate1} ${Classes.TryDateActive}`
                                : Classes.TryDate1
                            }
                            onClick={() => handleDateClick(dateString)}
                          >
                            <p className={Classes.datetext}>{date}</p>
                            <h3>{day}</h3>
                            <div
                              className={
                                selectedDate === formattedDateString
                                  ? `${Classes.TryDesign1} ${Classes.TryDesign1Active}`
                                  : Classes.TryDesign1
                              }
                            >
                              <p>{itemCount} Design</p>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <p>No dates available</p>
                    )}
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
              </div> */}
              <div className={Classes.TryLeftsec}>
                <div className={Classes.TryatHomeCard}>
                  <h3 className={Classes.TryatHomeCardh3}>Trial at Home</h3>
                  <div className={Classes.TryHomeDate}>
                    {dates.length > 0 ? (
                      dates.map((dateString, index) => {
                        const [day, date] = formatDate(dateString); // Assume formatDate returns [day, date]
                        const formattedDateString = dateString
                          .toISOString()
                          .split("T")[0];
                        const isToday = formattedDateString === currentDate;

                        return (
                          <div
                            key={index}
                            className={
                              selectedDate === formattedDateString
                                ? `${Classes.TryDate1} ${Classes.TryDateActive}`
                                : Classes.TryDate1
                            }
                            onClick={() => handleDateClick(dateString)}
                          >
                            <p className={Classes.datetext}>{date}</p>
                            <h3>{day}</h3>
                            <div
                              className={
                                selectedDate === formattedDateString
                                  ? `${Classes.TryDesign1} ${Classes.TryDesign1Active}`
                                  : Classes.TryDesign1
                              }
                            >
                              <p>{itemCount} Design</p>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <p>No dates available</p>
                    )}
                  </div>
                  <div className={Classes.SelectTimeSlot}>
                    <h3>Select time slot</h3>
                    <div className={Classes.TryTimeSlots}>
                      {availableTimes.map(({ time, minutes }) => {
                        // Only show future times for today's date or show all times for other dates
                        if (
                          selectedDate !== currentDate ||
                          minutes > currentTime
                        ) {
                          return (
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
                          );
                        }
                        return null; // Hide the button for past times on today's date
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div className={Classes.TryRightsec}>
                <img src={certificate} alt="certificate" />
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
                              src={cartItem ? cartItem.thumbnail_image : ""}
                              alt="Cart Item"
                            />

                            <p className={Classes.ProceedAmountT}>
                              {Contryname === "India" && (
                                <BiRupee className={Classes.Rupee} />
                              )}
                              {Contryname === "United States" && (
                                <CgDollar className={Classes.Rupee} />
                              )}
                              {Contryname === "United Arab Emirates" && (
                                <span style={{ paddingRight: "5px" }}>AED</span>
                              )}
                              {cartItem.product &&
                                cartItem.product.country_total_price}
                              {cartItem.product.country_discount_price && (
                                <span
                                  style={{ textDecoration: "line-through" }}
                                >
                                  {Contryname === "India" && (
                                    <BiRupee className={Classes.Rupee} />
                                  )}
                                  {Contryname === "United States" && (
                                    <CgDollar className={Classes.Rupee} />
                                  )}
                                  {Contryname === "United Arab Emirates" && (
                                    <span style={{ paddingRight: "5px" }}>
                                      AED
                                    </span>
                                  )}{" "}
                                  {cartItem.product.country_discount_price}
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
                {errorMessage && (
                  <div
                    style={{
                      color: "#ff0000c4",
                    }}
                    className={Classes.errorMessage}
                  >
                    {errorMessage}
                  </div>
                )}

                <div className={Classes.Proceedbutns}>
                  {/* <Link
                    to={{
                      pathname: "/tryathomeform",
                      state: {
                        selectedTimeSlot,
                        
                        selectedDate: selectedDate
                          ? formatSelectedDate(selectedDate)
                          : null,
                      },
                    }}
                  > */}

                  <button onClick={handleProceedClick}>
                    PROCEED TO CONFIRM
                  </button>
                  {/* </Link> */}
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
