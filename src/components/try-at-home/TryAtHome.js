"use client";
import React, { useState, useEffect } from "react";
import Classes from "../SwaWallet/SwaWallet.module.css";
import { CgDollar } from "react-icons/cg";
import { BiRupee } from "react-icons/bi";
import axios from "axios";
import * as Urls from "@/utils/urls";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useTrial } from "@/providers/trial-provider";
import Link from "next/link";
import { useAuth } from "@/providers/auth-provider";

const TryAtHome = () => {
  const [tryCartResults, setTryCartResults] = useState();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [countryId, setCountryId] = useState("");
  const { token } = useAuth();
  const { setTrialState, setOctnState, octnState } = useTrial();
  const router = useRouter();
  const pathname = usePathname();
  const [dates, setDates] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [Contryname, setContryname] = useState(null);
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    console.log("octnState updated:", octnState);
  }, [octnState]);

  useEffect(() => {
    console.log("tryCartResults:", tryCartResults);
  }, [tryCartResults]);

  useEffect(() => {
    const savedTimeSlot = localStorage.getItem("selectedTimeSlot");
    const savedDate = localStorage.getItem("selectedDate");

    if (savedTimeSlot) {
      setSelectedTimeSlot(savedTimeSlot);
    }
    if (savedDate) {
      setSelectedDate(savedDate);
    }
  }, []);

  useEffect(() => {
    const Contryname = localStorage.getItem("country_name");
    const countryId = localStorage.getItem("id");
    setContryname(Contryname);
    setCountryId(countryId);
  }, []);

  useEffect(() => {
    if (!token || !countryId) {
      return;
    }
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
    currentDate.setDate(currentDate.getDate() + 1);
    const tempDates = [];
    for (let i = 0; i < 6; i++) {
      const nextDate = new Date();
      nextDate.setDate(currentDate.getDate() + i);
      tempDates.push(nextDate);
    }
    setDates(tempDates);
  }, [token, countryId]);

  const fechTryAtHomeCart = () => {
    if (!token || !countryId) {
      return;
    }
    axios
      .get(`${Urls.tryathome}?country=${countryId}`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((response1) => {
        console.log("response1--->", response1);

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

  const formatDate = (dateString) => {
    const options = { weekday: "short", day: "2-digit" };
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", options).split(" ");
    return [formattedDate[0], formattedDate[1]];
  };

  const formatSelectedDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toDateString();
  };

  const addDesigns = (cartid) => {
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
  };

  const handleTimeSlotClick = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
    setErrorMessage("");
  };

  const handleDateClick = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    setSelectedDate(formattedDate);
    setErrorMessage("");
  };

  useEffect(() => {
    if (selectedTimeSlot) {
      localStorage.setItem("selectedTimeSlot", selectedTimeSlot);
    }
  }, [selectedTimeSlot]);

  useEffect(() => {
    if (selectedDate) {
      localStorage.setItem("selectedDate", selectedDate);
    }
  }, [selectedDate]);

  const AddDesigns = () => {
    setOctnState({
      octnId: "",
      data: "",
      product_category: "",
    });
    router.push("/new-arrivals");
  };

  useEffect(() => {
    if (tryCartResults && tryCartResults.cart_item) {
      setItemCount(tryCartResults.cart_item.length);
    }
  }, [tryCartResults]);
  const handleProceedClick = () => {
    // Validate selected date
    if (!selectedDate) {
      setErrorMessage("Please select a date.");
      return;
    }

    if (!selectedTimeSlot) {
      setErrorMessage("Please select a time slot.");
      return;
    }

    if (
      !tryCartResults ||
      !tryCartResults.cart_item ||
      tryCartResults.cart_item.length === 0
    ) {
      setErrorMessage("Please add at least one trial cart item.");
      return;
    }
    setTrialState({
      selectedTimeSlot,
      selectedDate: selectedDate ? formatSelectedDate(selectedDate) : null,
      tryAtHomeCount: itemCount,
    });
    router.push("/trial/form");
  };

  const now = new Date();
  const currentDate = now.toISOString().split("T")[0];
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
            </div>
            <div className={Classes.T1parent}>
              <div className={Classes.TryLeftsec}>
                <div className={Classes.TryatHomeCard}>
                  <h3 className={Classes.TryatHomeCardh3}>Trial at Home</h3>
                  <div className={Classes.TryHomeDate}>
                    {dates.length > 0 ? (
                      dates.map((dateString, index) => {
                        const [day, date] = formatDate(dateString);
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
                              <div>{itemCount} Design</div>
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
                        return null;
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div className={Classes.TryRightsec}>
                <Image
                  src={`/Assets/Certificate.png`}
                  alt="certificate"
                  width={1000}
                  height={1000}
                />
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

                      if (cartItem && cartItem.thumbnail_image) {
                        return (
                          <div
                            key={index}
                            className={Classes.CardCartItemsUpload}
                          >
                            <Image
                              className={Classes.Tryclosebtns}
                              src={`/Assets/tryclose.png`}
                              onClick={() =>
                                addDesigns(cartItem ? cartItem.id : null)
                              }
                              width={30}
                              height={30}
                              alt="Close"
                            />
                            <img
                              style={{ height: "110px" }}
                              src={cartItem ? cartItem.thumbnail_image : ""}
                              alt="Cart Item"
                            />
                            <div className={Classes.ProceedAmountT}>
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
                            </div>
                          </div>
                        );
                      } else {
                        return (
                          <div
                            key={index}
                            className={Classes.CardCartItems}
                            onClick={AddDesigns}
                          >
                            <Image
                              src={`/Assets/tryicon.png`}
                              width={30}
                              height={30}
                              alt="Add Design"
                            />
                            <p>ADD DESIGN</p>
                          </div>
                        );
                      }
                    })}
                </div>
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
                  <button onClick={handleProceedClick}>
                    PROCEED TO CONFIRM
                  </button>
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
