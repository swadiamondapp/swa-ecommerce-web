"use client";
import React, { useEffect } from "react";
import Classes from "./CheckOut.module.css";
import { useState } from "react";
import axios from "axios";
import * as Urls from "@/utils/urls";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import Joi from "joi";
import { FaRegTrashAlt } from "react-icons/fa";
import { Country, State } from "country-state-city";
import { useAuth } from "@/providers/auth-provider";
import Image from "next/image";
function AddAddress(props) {
  // debugger;
  const { token } = useAuth();
  const [showAddAddress, setShowAddAddress] = useState(true);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [statesList, setStatesList] = useState([]);
  // const pincodes = localStorage.getItem("pincode");
  const [pincodes, setPincodes] = useState("");
  const [addressData, setAddressData] = useState({
    fullName: "",
    mobile: "",
    pincode: pincodes,
    city: "",
    state: "kerala",
    hNumber_Bname: "",
    streetColony: "",
    landMark: "",
    country: "",
  });
  const [errors, setErrors] = useState({
    fullName: "",
    mobile: "",
    pincode: "",
    city: "",
    hNumber_Bname: "",
    streetColony: "",
    country: "",
  });

  useEffect(() => {
    setPincodes(localStorage.getItem("pincode"));
  }, []);

  // const [showDeleteButtons, setShowDeleteButtons] = useState([]);

  // const handleToggleOptions = (index) => {
  //   const newShowDeleteButtons = [...showDeleteButtons];
  //   newShowDeleteButtons[index] = !newShowDeleteButtons[index];
  //   setShowDeleteButtons(newShowDeleteButtons);
  // };

  // const handleDeleteAddress = async (id) => {
  //   try {
  //     const response = await axios.delete(Urls.addAdress + id + "/", {
  //       headers: { Authorization: "Token " + token },
  //     });
  //     if (response.data.results.status_code === 200) {
  //       setShowDeleteButtons(false);
  //       props.fetchAddress();
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const [openDeleteIndex, setOpenDeleteIndex] = useState(-1);

  const handleToggleOptions = (index) => {
    setOpenDeleteIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };

  const handleDeleteAddress = async (id, index) => {
    try {
      const response = await axios.delete(Urls.addAdress + id + "/", {
        headers: { Authorization: "Token " + token },
      });
      if (response.data.results.status_code === 200) {
        setOpenDeleteIndex(-1); // Close the delete button
        props.fetchAddress(); // Refresh the address list
      }
    } catch (error) {
      console.log(error);
    }
  };
  // const staticCountries = [
  //   { name: { common: "India" } },
  //   { name: { common: "United States" } },
  //   { name: { common: "Australia" } },
  //   { name: { common: "Canada" } },
  //   { name: { common: "United Kingdom" } },
  //   { name: { common: "Germany" } },
  //   { name: { common: "France" } },
  //   { name: { common: "Japan" } },
  //   { name: { common: "Brazil" } },
  //   { name: { common: "South Africa" } },
  // ];
  // const [countriesList, setCountriesList] = useState(staticCountries);

  useEffect(() => {
    const mainAddress = props.addressArray.find((address) => address.is_main);
    console.log(mainAddress);
    if (mainAddress) {
      setSelectedAddressId(mainAddress.id);
    }
  }, [props.addressArray]);

  const handleAddNewAddressClick = () => {
    setShowAddAddress(false);
    setShowNewAddressForm(true);
  };

  const handleCancelNewAddress = () => {
    setShowAddAddress(true);
    setShowNewAddressForm(false);
  };

  // const validateForm = () => {
  const schema = Joi.object({
    fullName: Joi.string().required().messages({
      "any.required": "Full name is required",
      "string.empty": "please provide the necessary details",
    }),
    mobile: Joi.string()
      .pattern(/^\d{10}$/)
      .required()
      .messages({
        "any.required": "Mobile number is required",
        "string.empty": "please provide the necessary details",
        "string.pattern.base": "Mobile number must be 10 digits",
      }),
    pincode: Joi.string()
      .pattern(/^\d{6}$/)
      .required()
      .messages({
        "any.required": "Pincode is required",
        "string.empty": "Pincode must not be empty",
        "string.pattern.base": "Pincode must be 6 digits",
      }),
    city: Joi.string()

      .required()
      .messages({
        "any.required": "City is required",
        "string.empty": "City must not be empty",
      }),
    country: Joi.string().required().messages({
      "string.empty": "Country must not be empty",
    }),

    hNumber_Bname: Joi.string().required().messages({
      "any.required": "House number / Building name is required",
      "string.empty": "House number / Building name must not be empty",
    }),
    streetColony: Joi.string().required().messages({
      "any.required": "Street / Colony is required",
      "string.empty": "Street / please provide the necessary details",
    }),
    landMark: Joi.string().allow("").messages({ "string.empty": `` }),
    state: Joi.string().required().messages({
      "any.required": "State is required",
      "string.empty": "State must not be empty",
    }),
  });

  // const { error } = schema.validate(addressData, { abortEarly: false });
  // if (error) {
  //   const newErrors = {};
  //   error.details.forEach((item) => {
  //     newErrors[item.path[0]] = item.message;
  //   });
  //   setErrors(newErrors);
  //   return false;
  // }
  // return true;
  // };

  // debugger;
  console.log("hhhh");

  const addAaddress = async () => {
    // if (!validateForm()) return;
    console.log("llllll");
    // debugger;
    const { error } = schema.validate(addressData, { abortEarly: false });
    if (error) {
      console.log("clicked,,,", error);
      const newErrors = {};
      error.details.forEach((item) => {
        newErrors[item.path[0]] = item.message;
      });
      setErrors(newErrors);
      return;
    }

    window?.scrollTo(0, 0);
    const body = {
      name: addressData.fullName,
      phone_code: "+91",
      phone_number: addressData.mobile,
      pincode: addressData.pincode,
      state: addressData.state,
      city: addressData.city,
      house: addressData.hNumber_Bname,
      country: addressData.country,
      area: addressData.streetColony,
      landmark: addressData.landMark,
      type: "HOME",
    };
    try {
      const response = await axios.post(Urls.addAdress, body, {
        headers: { Authorization: "Token " + token },
      });
      if (response.data.status === 200) {
        handleAddressSelection(response.data.data.id);
        console.log(
          "addressDataggggggggggggggggggg--->",
          response.data.data.id
        );

        setAddressData({
          fullName: "",
          mobile: "",
          pincode: "",
          city: "",
          state: "kerala",
          hNumber_Bname: "",
          country: "",
          streetColony: "",
          landMark: "",
        });
        setShowAddAddress(true);
        setShowNewAddressForm(false);
      } else {
        // Handle other response statuses if necessary
        console.log("API request failed:", response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeAddress = (event) => {
    const { name, value } = event.target;
    if (name === "country") {
      const selectedOption =
        event &&
        event.target &&
        event.target.options[event.target.selectedIndex];
      const isoCode =
        selectedOption && selectedOption.getAttribute("data-isocode");
      setStatesList(State.getAllStates && State.getStatesOfCountry(isoCode));
    }
    // console.log("event.target---->", isoCode);
    setAddressData({
      ...addressData,
      [name]: value,
    });
    // Clear error when user starts typing
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  console.log("addressData--->", addressData);

  const handleAddressSelection = async (id) => {
    setSelectedAddressId(id);
    console.log("addressData--->", id);

    try {
      const response = await axios.post(
        Urls.defaultAddress,
        {
          address_id: id,
          is_main: true,
        },
        {
          headers: { Authorization: "Token " + token },
        }
      );
      if (response.data.results.status === 200) {
        props.fetchAddress();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window?.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    console.log("=================================================");
  });

  return (
    <div>
      <div className={`containe ${Classes.AddresMobCont}`}>
        <div className={`containe ${Classes.AddresMobCont}`}>
          <div className={Classes.Main}>
            <h1 className={Classes.Title}>Add Address</h1>
            <div className={Classes.SubText}>
              <p className={`${Classes.Home} ${Classes.HomeNew}`}>HOME /</p>
              <p
                className={`${Classes.Home} ${Classes.HomeNew}`}
                style={{ color: "#01B3C5" }}
              >
                ADD ADDRESS
              </p>
            </div>
          </div>
          {/* address location */}
          <div
            className={
              props.name === "payment"
                ? Classes.parentLocationsPayment
                : Classes.parentLocations
            }
          >
            <div className={Classes.leftAddres11}>
              {/* {props.addressArray.map((item, index) => (
                <div className={Classes.LocationHead} key={index}>
                  <div className={Classes.FirstLocationHead1}>
                    <input
                      type="radio"
                      name="addressSelection"
                      checked={selectedAddressId === item.id}
                      onChange={() => handleAddressSelection(item.id)}
                    />
                    <div className={Classes.AddressHead15}>
                      <p className={Classes.Headh31}>{item.name}</p>

                      <p className={Classes.Para31}>
                        {item.house} (house) {item.city}, {item.area},{" "}
                        {item.landmark}, {item.state}, {item.pincode}
                        <span className={Classes.HeadAddressDesc1}>
                          phone number: {item.phone_number}
                        </span>
                      </p>

                      <p className={Classes.HeadAddressDesc}>
                        phone number: {item.phone_number}
                      </p>
                    </div>
                  </div>
                  <div
                    className={Classes.Delete}
                    style={{
                      display: showDeleteButtons[index] ? "block" : "none",
                    }}
                  >
                    <FaRegTrashAlt
                      onClick={() => handleDeleteAddress(item.id)}
                    />
                  </div>
                  <div
                    className={Classes.secondDots}
                    onClick={() => handleToggleOptions(index)}
                  >
                    <BsThreeDotsVertical />
                  </div>
                </div>
              ))} */}
              {props.addressArray.map((item, index) => (
                <div className={Classes.LocationHead} key={index}>
                  <div className={Classes.FirstLocationHead1}>
                    <input
                      type="radio"
                      name="addressSelection"
                      checked={selectedAddressId === item.id}
                      onChange={() => handleAddressSelection(item.id)}
                    />
                    <div className={Classes.AddressHead15}>
                      <p className={Classes.Headh31}>{item.name}</p>

                      <p className={Classes.Para31}>
                        {item.house} (house) {item.city}, {item.area},{" "}
                        {item.landmark}, {item.state}, {item.pincode}
                        <span className={Classes.HeadAddressDesc1}>
                          phone number: {item.phone_number}
                        </span>
                      </p>

                      <p className={Classes.HeadAddressDesc}>
                        phone number: {item.phone_number}
                      </p>
                    </div>
                  </div>
                  <div
                    className={Classes.Delete}
                    style={{
                      display: openDeleteIndex === index ? "block" : "none",
                    }}
                  >
                    <FaRegTrashAlt
                      onClick={() => handleDeleteAddress(item.id, index)}
                    />
                  </div>
                  <div
                    className={Classes.secondDots}
                    onClick={() => handleToggleOptions(index)}
                  >
                    <BsThreeDotsVertical />
                  </div>
                </div>
              ))}
              {showAddAddress && (
                <div className={Classes.AddNewAddress1}>
                  <button onClick={handleAddNewAddressClick}>
                    {/* <AiOutlineHome style={{ color: "#0997E7" }} /> */}
                    <Image
                      src={`/Assets/home1.png`}
                      alt="home1"
                      width={20}
                      height={20}
                    />
                    Add new address
                  </button>
                </div>
              )}
              {/* add new address */}
              {showNewAddressForm && (
                <div className={Classes.AddnEWaDDRESS}>
                  <div className={Classes.AddressBar}>
                    <p>Add new address</p>
                    <IoMdClose
                      style={{ cursor: "pointer" }}
                      onClick={handleCancelNewAddress}
                    />
                  </div>
                  {/* Add new address form content */}
                  <div className={Classes.ParentAddressForm}>
                    <div className={Classes.EmailMobileNew}>
                      <div>
                        <label>Name</label>
                        <input
                          className={Classes.PlaceInput}
                          type="text"
                          // placeholder="Jameel muhammed"
                          value={addressData.fullName || ""}
                          name="fullName"
                          onChange={handleChangeAddress}
                        />
                        {errors.fullName && (
                          <span className={Classes.Error}>
                            {errors.fullName}
                          </span>
                        )}
                      </div>
                      <div>
                        <label>Mobile number</label>
                        <input
                          className={Classes.PlaceInput}
                          type="text"
                          // placeholder="+91 98975656785"
                          value={addressData.mobile || ""}
                          name="mobile"
                          onChange={handleChangeAddress}
                        />
                        {errors.mobile && (
                          <span className={Classes.Error}>{errors.mobile}</span>
                        )}
                      </div>
                    </div>
                    <div className={Classes.ParentF3}>
                      <div className={Classes.Parentfsmall}>
                        <div>
                          <label>Pincode</label>
                          <input
                            className={Classes.PlaceInput}
                            type="text"
                            // placeholder="Pincode*"
                            value={addressData.pincode || ""}
                            name="pincode"
                            onChange={handleChangeAddress}
                          />
                          {pincodes && (
                            <p
                              style={{
                                color: "#006e7f",
                                fontWeight: "500",
                                fontSize: "12px",
                              }}
                            >
                              Delivery in 3-5 days
                            </p>
                          )}
                          {errors.pincode && (
                            <span className={Classes.Error}>
                              {errors.pincode}
                            </span>
                          )}
                        </div>
                        <div>
                          <label>City</label>
                          <input
                            className={Classes.PlaceInput}
                            type="text"
                            // placeholder="City*"
                            value={addressData.city || ""}
                            name="city"
                            onChange={handleChangeAddress}
                          />
                          {errors.city && (
                            <span className={Classes.Error}>{errors.city}</span>
                          )}
                        </div>
                      </div>
                      <div>
                        <label>Country*</label>

                        <select
                          className={Classes.PlaceInput}
                          value={addressData.country}
                          name="country"
                          onChange={handleChangeAddress}
                        >
                          <option value="">Select Country</option>
                          {Country &&
                            Country.getAllCountries() &&
                            Country.getAllCountries().map((country, index) => (
                              <option
                                key={index}
                                value={country.name}
                                data-isocode={country.isoCode}
                              >
                                {country.name}
                              </option>
                            ))}
                        </select>
                        {errors.country && (
                          <div className={Classes.Error}>{errors.country}</div>
                        )}
                      </div>
                    </div>
                    <div className="Parant_Relative">
                      <label>State</label>
                      <select
                        className={Classes.PlaceInput}
                        name="state"
                        value={addressData.state}
                        onChange={handleChangeAddress}
                      >
                        {/* <option value="none" disabled hidden> */}
                        <option value="none">Select state</option>
                        {statesList &&
                          statesList.map((state, index) => (
                            <option key={index} value={state.name}>
                              {state.name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className={Classes.ParentStreetColony}>
                      <div className={Classes.House1NN}>
                        <label>House number / building name</label>
                        <input
                          className={Classes.PlaceInput || ""}
                          type="text"
                          // placeholder="house number/ building name*"
                          value={addressData.hNumber_Bname}
                          name="hNumber_Bname"
                          onChange={handleChangeAddress}
                        />
                        {errors.hNumber_Bname && (
                          <span className={Classes.Error}>
                            {errors.hNumber_Bname}
                          </span>
                        )}
                      </div>
                      <div className={Classes.ColonyForm}>
                        <label>Street colony name</label>
                        <input
                          className={Classes.PlaceInput}
                          type="text"
                          // placeholder="road name, area colony*"
                          value={addressData.streetColony || ""}
                          name="streetColony"
                          onChange={handleChangeAddress}
                        />
                        {errors.streetColony && (
                          <span className={Classes.Error}>
                            {errors.streetColony}
                          </span>
                        )}
                      </div>
                    </div>
                    <div>
                      <label>Land mark ( optional )</label>
                      <input
                        className={Classes.PlaceInput}
                        type="text"
                        // placeholder="Near edu city"
                        value={addressData.landMark || ""}
                        name="landMark"
                        onChange={handleChangeAddress}
                      />
                    </div>
                    <div className={Classes.ADDAnotherBtn}>
                      <button onClick={addAaddress}>Add Address</button>
                    </div>
                  </div>
                  {/* ... */}
                </div>
              )}

              {/* <div className={Classes.AddnEWaDDRESS}>
                <div className={Classes.AddressBar}>
                  <p>Add new address</p>
                  <IoMdClose />
                </div>
              </div> */}
            </div>
            {/* <div className={Classes.rightAddres11}></div> */}
          </div>

          {/* address location */}
        </div>
      </div>
    </div>
  );
}

export default AddAddress;
