"use client";
import React, { useState, useEffect } from "react";
import Classes from "./outlet.module.css";
import { BsSearch } from "react-icons/bs";
import { RiWhatsappFill } from "react-icons/ri";
import { IoMdCall } from "react-icons/io";
import Box from "@mui/material/Box";
import { IoClose } from "react-icons/io5";
import Modal from "@mui/material/Modal";
import * as Urls from "@/utils/urls";
import axios from "axios";
import Image from "next/image";
import locations from "../../../../public/Assets/locations.png";
import { useCountry } from "@/providers/country-provider";
const style = {
  position: "absolute",
  top: "0%",
  right: "0%",
  transform: "translate(-0%, -0%)",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  borderRadius: "4px",
  width: 450,
  maxHeight: "100%",
  overflowY: "scroll",
};
const style2 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  borderRadius: "4px",
  width: 450,
  maxHeight: "100%",
  overflowY: "scroll",
};

const mobileStyle = {
  position: "absolute",
  bottom: 0,
  transition: "transform 0.3s ease-in-out",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  borderRadius: "4px",
  p: 2,
  overflow: "auto",
  maxHeight: "78%",
  width: "100%",
};
const mobileStyle2 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  transition: "transform 0.3s ease-in-out",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  borderRadius: "4px",
  p: 2,
  overflow: "auto",
  maxHeight: "78%",
  width: "100%",
};

const Outlet = () => {
  const [opensort, setOpensort] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [outlets, setOutlets] = useState([]);
  const [loading, setLoading] = useState(false);
  const { countryId } = useCountry();
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [shopId, setShopId] = useState(null);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [selectedOutlet, setSelectedOutlet] = useState(null);
  const [errors, setErrors] = useState({});
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
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window?.innerWidth >= 300 && window?.innerWidth <= 575);
    };

    window?.addEventListener("resize", handleResize);
    return () => {
      window?.removeEventListener("resize", handleResize);
    };
  }, [isMobileView]);
  const handleOpenSort = (outlet) => {
    setOpensort(true);
    setShopId(outlet.id);
    setSelectedOutlet(outlet);
    setErrors({});
  };
  const handleCloseSort = () => {
    setOpensort(false);
    // Clear all states when the modal is closed
    setName("");
    setEmail("");
    setPhoneNumber("");
    setSelectedDate(null);
    setSelectedTimeSlot(null);
    setSelectedOutlet(null);
    setErrors({});
  };
  const handleCloseSuccessModal = () => {
    setSuccessModalOpen(false);
  };
  useEffect(() => {
    // Generate dates for the next 7 days
    const generateDates = () => {
      const datesArray = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(now.getDate() + i);
        datesArray.push(date.toISOString().split("T")[0]);
      }
      setDates(datesArray);
    };

    generateDates();
  }, []);

  const formatDate = (dateString) => {
    const options = { weekday: "short", day: "2-digit" };
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", options).split(" ");
    return [formattedDate[0], formattedDate[1]];
  };

  const handleDateClick = (dateString) => {
    setSelectedDate(dateString);
    setSelectedTimeSlot(null);
    setErrors((prev) => ({ ...prev, selectedDate: "" }));
  };

  const handleTimeSlotClick = (time) => {
    setSelectedTimeSlot(time);
    setErrors((prev) => ({ ...prev, selectedTimeSlot: "" }));
  };
  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};

    if (!name) newErrors.name = "Name is required.";
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email address.";
    }
    if (!phoneNumber) {
      newErrors.phoneNumber = "Phone number is required.";
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number.";
    }
    if (!selectedDate) newErrors.selectedDate = "Please select a date.";
    if (!selectedTimeSlot) newErrors.selectedTimeSlot = "Please select a time.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };
  const handleBookVisit = async () => {
    if (!validateForm()) return; // Stop if validation fails

    const bookingData = {
      shop_id: shopId,
      name: name,
      email: email,
      phone_number: phoneNumber,
      scheduled_date: selectedDate,
      scheduled_time: selectedTimeSlot,
    };

    try {
      const response = await axios.post(
        "https://swaecommain.swa.co/ecom/book-a-visit/",
        bookingData
      );
      if (response.status === 200) {
        // alert("Booking successful!");
        handleCloseSort();
        // Show success modal
        setSuccessModalOpen(true);

        // Clear all states
        setName("");
        setEmail("");
        setPhoneNumber("");
        setSelectedDate(null);
        setSelectedTimeSlot(null);

        // Close the success modal and form modal after 3 seconds
        setTimeout(() => {
          setSuccessModalOpen(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Error booking visit:", error);
      alert("Failed to book visit. Please try again.");
    }
  };
  useEffect(() => {
    // API call for fetching outlets
    const fetchOutlets = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${Urls.outlets}?country=${countryId}`
          // {
          //    headers: {
          //      Authorization: "Token " + localStorage.getItem("token"), // Assuming token is stored in localStorage
          //    },
          // }
        );
        setOutlets(response.data.data); // Adjust according to your API response structure

        setLoading(false);
      } catch (error) {
        console.error("Error fetching outlets:", error);
        setLoading(false);
      }
    };

    fetchOutlets();
  }, []);
  return (
    <div>
      <div className={Classes.mainContianerProfile}>
        <div className="container">
          <div className={Classes.OutletParent}>
            <div className={Classes.OutletHead}>
              <h3 className={Classes.outleth3}>Outlet</h3>
              <div className={Classes.OutletSearch}>
                <input type="" placeholder="Search location" />
                <BsSearch size={22} className={Classes.Outletsearchicon} />
              </div>

              <p className={Classes.Outletpincode}>
                <Image
                  src={locations}
                  alt={"location"}
                  width={20}
                  height={20}
                />
                Use your current location
              </p>
            </div>
            <div className={Classes.OutletCardParent}>
              {outlets &&
                outlets.map((item) => (
                  <div
                    key={item.id || item.name}
                    className={Classes.OutletCard + " relative pb-24"}
                  >
                    <div className={Classes.ParentSubOutlet + " flex justify-between"}>
                      <div className={Classes.LeftOutlets}>
                        <div className={Classes.OutletImage}>
                          <Image
                            src={`/Assets/outlet.png`}
                            alt="outletimg"
                            height={100}
                            width={100}
                          />
                        </div>
                        <div className={Classes.OutletDetails + " flex flex-col items-start"}>
                          <h3 className="font-lato font-semibold">
                            {item.name} - {item.location}
                          </h3>
                          <p
                            className={Classes.RatingOutlets}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "5px",
                            }}
                          >
                            <Image
                              src={`/Assets/Star.png`}
                              alt="starimg"
                              height={16}
                              width={15}
                            />
                            <span className="font-lato">4.9 | 978 Google reviews</span>
                          </p>

                          <p>
                            {item.address}
                            <br />
                            <span style={{ color: "#006C77" }}>
                              {item.phone_number}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className={Classes.RightOutlet + " flex justify-end gap-1 min-w-[48px]"}>
                        <Image
                          src={`/Assets/locationimgs.png`}
                          alt="locationimg"
                          height={14}
                          width={14}
                        />
                        6KM
                      </div>
                    </div>
                    <div className={Classes.OutletFooterCrad + " absolute bottom-0 left-0 right-0"}>
                      <div className={Classes.OutletFooter}>
                        <div className={Classes.outletWatsapp} onClick={() => window.open(`https://wa.me/${item.phone_number}`, '_blank')}>
                          <RiWhatsappFill size={20} />
                        </div>
                        <div className={Classes.outletWatsapp} onClick={() => window.open(`tel:${item.phone_number}`, '_blank')}>
                          <IoMdCall size={20} />
                        </div>
                        <div className={Classes.OutletBookvist}>
                          <button onClick={() => handleOpenSort(item)}>
                            Book a Vist
                          </button>
                        </div>
                      </div>
                      <p className={Classes.OutletFooters}>
                        <Image
                          style={{
                            position: "relative",
                            top: "-1px",
                          }}
                          src={`/Assets/times.png`}
                          alt="timeimg"
                          height={15}
                          width={15}
                        />
                        WORKING HOURS : 10:00AM TO 10:00PM
                      </p>
                    </div>
                  </div>
                ))}
            </div>

            {/* modal */}
            <div>
              <Modal
                // open={props.open}
                open={opensort}
                // onClose={props.handleClose}
                onClose={handleCloseSort}
              >
                <Box sx={isMobileView ? mobileStyle : style}>
                  <div>
                    <div className={Classes.OutletModalsParent}>
                      <div className={Classes.OutletModalHeader}>
                        <Image
                          src={`/Assets/outlet.png`}
                          alt="outletimg"
                          height={100}
                          width={100}
                        />

                        <div>
                          <h3>{selectedOutlet && selectedOutlet.name}</h3>
                          <p>{selectedOutlet && selectedOutlet.address}</p>
                        </div>
                        <div
                          className={Classes.Modaloutletclose}
                          onClick={handleCloseSort}
                        >
                          <IoClose className={Classes.MOdalcloseiconOutlet} />
                        </div>
                      </div>
                      <div className={Classes.BasicDetailsOutlet}>
                        <h3>Basic Details</h3>
                        <div className={Classes.OutletMform}>
                          <label>Enter Name</label>
                          <input
                            type="text"
                            placeholder="Enter Name"
                            value={name}
                            onChange={(e) => {
                              setName(e.target.value);
                              setErrors((prev) => ({ ...prev, name: "" })); // Clear error message
                            }}
                          />
                          {errors.name && (
                            <p
                              style={{
                                color: "red",
                                fontSize: "14px",
                                paddingBottom: "5px",
                              }}
                            >
                              {errors.name}
                            </p>
                          )}
                        </div>
                        <div className={Classes.OutletMform}>
                          <label>Email</label>
                          <input
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              setErrors((prev) => ({ ...prev, email: "" }));
                            }}
                          />
                          {errors.email && (
                            <p
                              style={{
                                color: "red",
                                fontSize: "14px",
                                paddingBottom: "5px",
                              }}
                            >
                              {errors.email}
                            </p>
                          )}
                        </div>
                        <div className={Classes.OutletMform}>
                          <label>Phone number</label>
                          <input
                            type="text"
                            placeholder="Enter Phone Number"
                            value={phoneNumber}
                            onChange={(e) => {
                              setPhoneNumber(e.target.value);
                              setErrors((prev) => ({
                                ...prev,
                                phoneNumber: "",
                              }));
                            }}
                          />
                          {errors.phoneNumber && (
                            <p
                              style={{
                                color: "red",
                                fontSize: "14px",
                                paddingBottom: "5px",
                              }}
                            >
                              {errors.phoneNumber}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className={Classes.SelectDateModal}>
                        <div className={Classes.selectdateMText}>
                          <h3>Select date</h3>
                        </div>
                        <div className={Classes.ParentDateModals}>
                          {dates.map((dateString, index) => {
                            const [day, date] = formatDate(dateString);
                            const formattedDateString = dateString;
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
                                <p>{day}</p>
                                <h3
                                  style={{
                                    fontWeight: "600",
                                    fontSize: "20px",
                                    padding: "3px 0px",
                                  }}
                                >
                                  {date}
                                </h3>
                              </div>
                            );
                          })}
                        </div>
                        {errors.selectedDate && (
                          <p
                            style={{
                              color: "red",
                              fontSize: "14px",
                              paddingBottom: "5px",
                            }}
                          >
                            {errors.selectedDate}
                          </p>
                        )}
                      </div>
                      <div className={Classes.outletModalTime}>
                        <div className={Classes.selectdateMText}>
                          <h3>Choose Time</h3>
                        </div>
                        <div className={Classes.outletModalTimesec}>
                          {availableTimes.map(({ time, minutes }) => {
                            if (
                              selectedDate !== currentDate ||
                              minutes > currentTime
                            ) {
                              return (
                                <div
                                  key={time}
                                  className={
                                    selectedTimeSlot === time
                                      ? `${Classes.Timesec} ${Classes.TryTimeSlotsActive}`
                                      : Classes.Timesec
                                  }
                                  onClick={() => handleTimeSlotClick(time)}
                                >
                                  {time}
                                </div>
                              );
                            }
                            return null;
                          })}
                        </div>
                        {errors.selectedTimeSlot && (
                          <p
                            style={{
                              color: "red",
                              fontSize: "14px",
                              paddingBottom: "5px",
                            }}
                          >
                            {errors.selectedTimeSlot}
                          </p>
                        )}
                      </div>
                      <div className={Classes.Bookvistbtns}>
                        <button onClick={handleBookVisit}>Book a Vist</button>
                      </div>
                    </div>
                  </div>
                </Box>
              </Modal>
            </div>
            {/* modal */}
            {/* Success Modal */}
            <div>
              <Modal open={successModalOpen} onClose={handleCloseSuccessModal}>
                <Box sx={isMobileView ? mobileStyle2 : style2}>
                  <div>
                    <div className={Classes.OutletModalsParent}>
                      <div className={Classes.OutletModalHeader}>
                        <h3>Booking Successful!</h3> <br />
                        <p>Your visit has been booked successfully.</p>
                      </div>
                    </div>
                  </div>
                </Box>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Outlet;
