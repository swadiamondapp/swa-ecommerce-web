import React, { useEffect } from "react";
import Classes from "./CheckOut.module.css";
import { useHistory } from "react-router-dom";
import { BiRupee } from "react-icons/bi";

import { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import Warning from "../../Assets/Warning.png";
import Succes from "../../Assets/success.png";
import { AiOutlineHome } from "react-icons/ai";
import { Radio, Space } from "antd";
import axios from "axios";
import { FadeLoader } from "react-spinners";
import * as Urls from "../../Urls";
import { useFormik } from "formik";
import * as Yup from "yup";
import { BsThreeDotsVertical } from "react-icons/bs";
import { colors } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import home1 from "../../Assets/home1.png";

function AddAddress(props) {
  const token = localStorage.getItem("swaToken");
  const [showAddAddress, setShowAddAddress] = useState(true);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [addressData, setAddressData] = useState({
    fullName: "",
    mobile: "",
    pincode: "",
    city: "",
    state: "kerala",
    hNumber_Bname: "",
    streetColony: "",
    landMark: "",
  });

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

  const addAaddress = async () => {
    const body = {
      name: addressData.fullName,
      phone_code: "+91",
      phone_number: addressData.mobile,
      pincode: addressData.pincode,
      state: addressData.state,
      city: addressData.city,
      house: addressData.hNumber_Bname,
      area: addressData.streetColony,
      landmark: addressData.landMark,
      type: "HOME",
    };
    try {
      const response = await axios.post(Urls.addAdress, body, {
        headers: { Authorization: "Token " + token },
      });
      if (response.data.status === 200) {
        props.fetchAddress();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeAddress = (event) => {
    const { name, value } = event.target;
    setAddressData({
      ...addressData,
      [name]: value,
    });
  };

  const handleAddressSelection = async (id) => {
    setSelectedAddressId(id);
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className={`container ${Classes.AddresMobCont}`}>
        <div className={`container ${Classes.AddresMobCont}`}>
          <div className={Classes.Main}>
            <h1 className={Classes.Title}>Add Address</h1>
            <div className={Classes.SubText}>
              <p className={`${Classes.Home} ${Classes.HomeNew}`}>HOME /</p>
              {/* <p className={`${Classes.Home} ${Classes.HomeNew}`}>
                ADD ADDRESS
              </p> */}
              <p className={Classes.NewArrival}>ADD ADDRESS</p>
            </div>
          </div>
          {/* address location */}
          <div className={Classes.parentLocations}>
            <div className={Classes.leftAddres11}>
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
                  <div className={Classes.secondDots}>
                    <BsThreeDotsVertical />
                  </div>
                </div>
              ))}
              {showAddAddress && (
                <div className={Classes.AddNewAddress1}>
                  <button onClick={handleAddNewAddressClick}>
                    {/* <AiOutlineHome style={{ color: "#0997E7" }} /> */}
                    <img src={home1} />
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
                          placeholder="Jameel muhammed"
                          value={addressData.fullName}
                          name="fullName"
                          onChange={handleChangeAddress}
                        />
                      </div>
                      <div>
                        <label>Mobile number</label>
                        <input
                          className={Classes.PlaceInput}
                          type="text"
                          placeholder="+91 98975656785"
                          value={addressData.mobile}
                          name="mobile"
                          onChange={handleChangeAddress}
                        />
                      </div>
                    </div>
                    <div className={Classes.ParentF3}>
                      <div className={Classes.Parentfsmall}>
                        <div>
                          <label>Pincode</label>
                          <input
                            className={Classes.PlaceInput}
                            type="text"
                            placeholder="Pincode*"
                            value={addressData.pincode}
                            name="pincode"
                            onChange={handleChangeAddress}
                          />
                        </div>
                        <div>
                          <label>City</label>
                          <input
                            className={Classes.PlaceInput}
                            type="text"
                            placeholder="City*"
                            value={addressData.city}
                            name="city"
                            onChange={handleChangeAddress}
                          />
                        </div>
                      </div>
                      <div>
                        <label>State</label>
                        <select className={Classes.PlaceInput} name="state">
                          <option value="none" disabled hidden>
                            State*
                          </option>
                          <option value={"kerala"}>Kerala</option>
                          <option value={"Karnataka"}>Karnataka</option>
                          <option value={"TamilNadu"}>TamilNadu</option>
                        </select>
                      </div>
                    </div>
                    <div className={Classes.ParentStreetColony}>
                      <div className={Classes.House1NN}>
                        <label>House number / building name</label>
                        <input
                          className={Classes.PlaceInput}
                          type="text"
                          placeholder="house number/ building name*"
                          value={addressData.hNumber_Bname}
                          name="hNumber_Bname"
                          onChange={handleChangeAddress}
                        />
                      </div>
                      <div className={Classes.ColonyForm}>
                        <label>Street colony name</label>
                        <input
                          className={Classes.PlaceInput}
                          type="text"
                          placeholder="road name, area colony*"
                          value={addressData.streetColony}
                          name="streetColony"
                          onChange={handleChangeAddress}
                        />
                      </div>
                    </div>
                    <div>
                      <label>Land mark ( optional )</label>
                      <input
                        className={Classes.PlaceInput}
                        type="text"
                        placeholder="Near edu city"
                        value={addressData.landMark}
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
              <div className={Classes.Donebtn}>
                <button>Done</button>
              </div>
            </div>
            <div className={Classes.rightAddres11}></div>
          </div>

          {/* address location */}
        </div>
      </div>
    </div>
  );
}

export default AddAddress;
