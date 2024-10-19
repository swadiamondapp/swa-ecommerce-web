import React, { useState, useEffect } from "react";
import Classes from "../SwaWallet/SwaWallet.module.css";
import edit from "../../Assets/edit.png";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Calendar } from "primereact/calendar";
import { FaCalendarAlt } from "react-icons/fa";
import timeimgs from "../../Assets/times.png";
import { TimePicker } from "antd";
import { useLocation } from "react-router-dom";
import dateimg from "../../Assets/datepicker.png";
import successtry from "../../Assets/successtry.png";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import * as Urls from "../../Urls";
import Joi from "joi";

const successM = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "rgba(48, 147, 58, 1)",
  outline: "none",
  border: "none",
  boxShadow: 24,
  borderRadius: "4px",
  p: 4,
};

const TryAtHomeInner = () => {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const history = useHistory();
  const token = localStorage.getItem("swaToken");
  const countryId = localStorage.getItem("id");
  const [appointment, setAppointment] = useState();
  const [appointmentId, setAppointmentId] = useState();
  const location = useLocation();
  const { selectedTimeSlot, selectedDate, tryAtHomeCount } =
    location.state || {};
  const savedTimeSlot = localStorage.getItem("selectedTimeSlot");
  const saveddate = localStorage.getItem("selectedDate");

  const [defaultdata, setDefaultdata] = useState();
  const [addressData, setAddressData] = useState({
    fullName: "",
    mobile: "",
    sEmail: "",
    pincode: "",
    state: "",
    city: "",
    hNumber_Bname: "",
    streetColony: "",
    landMark: "",
  });
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [errors, setErrors] = useState({});
  console.log("selectedDate>", selectedDate);
  console.log("savedTimeSlot>", savedTimeSlot);

  const schema = Joi.object({
    fullName: Joi.string()
      .required()
      .messages({
        "string.empty": `"Full Name" is required`,
      }),
    mobile: Joi.string()
      .regex(/^[6-9]\d{9}$/)
      .required()
      .messages({
        "string.pattern.base": `"Mobile Number" must be a 10-digit number`,
        "string.empty": `"Mobile Number" is required`,
      }),
    sEmail: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.email": `"Email" must be a valid email`,
        "string.empty": `"Email" is required`,
      }),
    pincode: Joi.string()
      .regex(/^\d{6}$/)
      .required()
      .messages({
        "string.pattern.base": `"Pincode" must be a 6-digit number`,
        "string.empty": `"Pincode" is required`,
      }),
    state: Joi.string()
      .required()
      .messages({
        "string.empty": `"State" is required`,
      }),
    city: Joi.string()
      .required()
      .messages({
        "string.empty": `"City" is required`,
      }),
    hNumber_Bname: Joi.string()
      .required()
      .messages({
        "string.empty": `"House number / building name" is required`,
      }),
    streetColony: Joi.string()
      .required()
      .messages({
        "string.empty": `"Street colony name" is required`,
      }),
    landMark: Joi.string()
      .allow("")
      .optional(),
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAddressData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    getdefaultaddress();
  }, []);

  const getdefaultaddress = async () => {
    try {
      const response = await axios.get(Urls.defaultAddress, {
        headers: { Authorization: "Token " + token },
      });
      if (response.data.results.status === 200) {
        const data = response.data.results.data;
        // setDefaultdata(response.data.results.data);
        setAddressData({
          fullName: data.name || "",
          mobile: data.phone_number || "",
          sEmail: data.email || "",
          pincode: data.pincode || "",
          state: data.state || "",
          city: data.city || "",
          hNumber_Bname: data.house || "",
          streetColony: data.area || "",
          landMark: data.landmark || "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    const { error } = schema.validate(addressData, { abortEarly: false });
    if (error) {
      const validationErrors = {};
      error.details.forEach((detail) => {
        validationErrors[detail.path[0]] = detail.message;
      });
      setErrors(validationErrors);
      return;
    } else {
      setErrors({});
    }
    try {
      const body = {
        name: addressData.fullName,
        phone_code: "+91",
        phone_number: addressData.mobile,
        email: addressData.sEmail,
        pincode: addressData.pincode,
        state: addressData.state,
        city: addressData.city,
        house: addressData.hNumber_Bname,
        area: addressData.streetColony,
        landmark: addressData.landMark,
        type: "HOME",
      };
      const response = await axios.post(Urls.addAdress, body, {
        headers: { Authorization: "Token " + token },
      });
      console.log("1234", response.data.status);
      if (response.data.status === 200) {
        BookAppointment(response.data.data.id);
      }
      // Handle response as needed
    } catch (error) {
      console.log(error);
    }
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Adding 1 to month because it is zero-indexed
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const BookAppointment = async (bookid) => {
    console.log("appointmentId", appointmentId);

    try {
      const formattedDate = formatDate(selectedDate);
      const body = {
        scheduled_date: formattedDate,
        scheduled_time: selectedTimeSlot,
        address_id: bookid,
      };
      const response = await axios.patch(
        `${Urls.bookappointment}?country=${countryId}`,
        body,
        {
          headers: { Authorization: "Token " + token },
        }
      );
      if (response.data.results.status_code === 200) {
        setOpenSuccessModal(true);

        setTimeout(() => {
          setOpenSuccessModal(false);
          localStorage.removeItem("selectedTimeSlot");
          localStorage.removeItem("selectedDate");
          history.push("/");
        }, 3000);
      }

      // Handle response as needed
    } catch (error) {
      console.log(error);
    }
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
                    <Link to="/trialathome">
                      <img src={edit} alt="edit" /> Edit
                    </Link>
                  </p>
                </div>
                <div className={Classes.BookDateTime}>
                  <div className={Classes.Datepickes}>
                    <img src={dateimg} alt="dateimg" />{" "}
                    {selectedDate && selectedDate}
                  </div>
                  <div className={Classes.Datepickes}>
                    <img src={timeimgs} alt="timeimgs" />{" "}
                    {selectedTimeSlot && selectedTimeSlot}
                  </div>
                </div>
                <p className={Classes.DesignFormPara}>
                  {" "}
                  {tryAtHomeCount} {tryAtHomeCount === 1 ? "DESIGN" : "DESIGNS"}
                </p>
              </div>

              <div className={Classes.BookingForm}>
                <div className={Classes.BookEmailNumber}>
                  <div className={Classes.Bookemail}>
                    <label>Email</label>
                    <input
                      type="email"
                      name="sEmail"
                      value={addressData.sEmail}
                      onChange={handleChange}
                    />
                    {errors.sEmail && (
                      <p className={Classes.error}>{errors.sEmail}</p>
                    )}
                  </div>
                  <div className={Classes.Bookemail}>
                    <label>Mobile number</label>
                    <input
                      type="text"
                      name="mobile"
                      value={addressData.mobile}
                      onChange={handleChange}
                    />
                    {errors.mobile && (
                      <p className={Classes.error}>{errors.mobile}</p>
                    )}
                  </div>
                </div>
                <h3 className={Classes.TryYourAddress}>Your Address</h3>
                <div className={Classes.BookingName}>
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={addressData.fullName}
                    onChange={handleChange}
                    placeholder="Jameel"
                  />
                  {errors.fullName && (
                    <p className={Classes.error}>{errors.fullName}</p>
                  )}
                </div>
                <div className={Classes.BookpincodeCity}>
                  <div className={Classes.PincodeCitys}>
                    <div className={Classes.BookPincodee}>
                      <label>Pincode</label>
                      <input
                        type="text"
                        name="pincode"
                        value={addressData.pincode}
                        onChange={handleChange}
                        placeholder="673456"
                      />
                      {errors.pincode && (
                        <p className={Classes.error}>{errors.pincode}</p>
                      )}
                    </div>
                    <div className={Classes.BookCity}>
                      <label>City</label>
                      <input
                        type="text"
                        name="city"
                        value={addressData.city}
                        onChange={handleChange}
                        placeholder="Calicut"
                      />
                      {errors.city && (
                        <p className={Classes.error}>{errors.city}</p>
                      )}
                    </div>
                  </div>
                  <div className={Classes.BookingState}>
                    <label>State</label>
                    <select
                      name="state"
                      value={addressData.state}
                      onChange={handleChange}
                    >
                      <option value="">Select State</option>
                      <option value="andhra_pradesh">Andhra Pradesh</option>
                      <option value="arunachal_pradesh">
                        Arunachal Pradesh
                      </option>
                      <option value="assam">Assam</option>
                      <option value="bihar">Bihar</option>
                      <option value="chhattisgarh">Chhattisgarh</option>
                      <option value="goa">Goa</option>
                      <option value="gujarat">Gujarat</option>
                      <option value="haryana">Haryana</option>
                      <option value="himachal_pradesh">Himachal Pradesh</option>
                      <option value="jammu_and_kashmir">
                        Jammu and Kashmir
                      </option>
                      <option value="jharkhand">Jharkhand</option>
                      <option value="karnataka">Karnataka</option>
                      <option value="kerala">Kerala</option>
                      <option value="madhya_pradesh">Madhya Pradesh</option>
                      <option value="maharashtra">Maharashtra</option>
                      <option value="manipur">Manipur</option>
                      <option value="meghalaya">Meghalaya</option>
                      <option value="mizoram">Mizoram</option>
                      <option value="nagaland">Nagaland</option>
                      <option value="odisha">Odisha</option>
                      <option value="punjab">Punjab</option>
                      <option value="rajasthan">Rajasthan</option>
                      <option value="sikkim">Sikkim</option>
                      <option value="tamil_nadu">Tamil Nadu</option>
                      <option value="telangana">Telangana</option>
                      <option value="tripura">Tripura</option>
                      <option value="uttar_pradesh">Uttar Pradesh</option>
                      <option value="uttarakhand">Uttarakhand</option>
                      <option value="west_bengal">West Bengal</option>
                    </select>
                    {errors.state && (
                      <p className={Classes.error}>{errors.state}</p>
                    )}
                  </div>
                </div>
                <div className={Classes.HouseStreet}>
                  <div className={Classes.BookingHouse}>
                    <label>House number / building name</label>
                    <input
                      type="text"
                      name="hNumber_Bname"
                      value={addressData.hNumber_Bname}
                      onChange={handleChange}
                      placeholder="Skyline 12B"
                    />
                    {errors.hNumber_Bname && (
                      <p className={Classes.error}>{errors.hNumber_Bname}</p>
                    )}
                  </div>
                  <div className={Classes.BookingStreet}>
                    <label>Street colony name</label>
                    <input
                      type="text"
                      name="streetColony"
                      value={addressData.streetColony}
                      onChange={handleChange}
                      placeholder="Palazhi"
                    />
                    {errors.streetColony && (
                      <p className={Classes.error}>{errors.streetColony}</p>
                    )}
                  </div>
                </div>
                <div className={Classes.Landmarck}>
                  <label>Land mark ( optional )</label>
                  <input
                    type="text"
                    name="landMark"
                    value={addressData.landMark}
                    onChange={handleChange}
                    placeholder="Near edu city"
                  />
                  {errors.landMark && (
                    <p className={Classes.error}>{errors.landMark}</p>
                  )}
                </div>
                <div className={Classes.BookAppoinmentbtn}>
                  <button onClick={handleSubmit}>BOOK APPOINTMENT</button>
                </div>
              </div>
            </div>
            <div className={Classes.BokkingRight}></div>
          </div>
        </div>
      </div>
      <Modal
        // style={{ background: "#fff" }}
        open={openSuccessModal}
        onClose={() => setOpenSuccessModal(false)}
      >
        <Box
          sx={successM}
          style={{
            width: "90%",
            maxWidth: "400px",
            background: "#fff",
          }}
        >
          <Typography>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "#fff!important",
              }}
            >
              <div style={{ marginBottom: "15px" }}>
                <img
                  className={Classes.tick}
                  src={successtry}
                  alt="successtry"
                />
              </div>
              <div style={{ textAlign: "center" }}>
                Thank you <br /> Our Representative will contact you to <br />{" "}
                confirm our home visit
              </div>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default TryAtHomeInner;
