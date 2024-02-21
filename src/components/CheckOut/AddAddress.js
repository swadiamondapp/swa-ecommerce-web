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
  const [showAddAddress, setShowAddAddress] = useState(true);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);

  const handleAddNewAddressClick = () => {
    setShowAddAddress(false);
    setShowNewAddressForm(true);
  };

  const handleCancelNewAddress = () => {
    setShowAddAddress(true);
    setShowNewAddressForm(false);
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
              <div className={Classes.LocationHead}>
                <div className={Classes.FirstLocationHead1}>
                  <input type="radio" />
                  <div className={Classes.AddressHead15}>
                    <p className={Classes.Headh31}>Mohammed Inshad</p>

                    <p className={Classes.Para31}>
                      Kottakunnan ( house ) morayur , opposit family health
                      center malappuram district kerala 673643{" "}
                      <span className={Classes.HeadAddressDesc1}>
                        phone number : 9995200745
                      </span>
                    </p>

                    <p className={Classes.HeadAddressDesc}>
                      phone number : 9995200745
                    </p>
                  </div>
                </div>
                <div className={Classes.secondDots}>
                  <BsThreeDotsVertical />
                </div>
              </div>
              {/* 2 */}
              <div className={Classes.LocationHead}>
                <div className={Classes.FirstLocationHead1}>
                  <input type="radio" />
                  <div className={Classes.AddressHead15}>
                    <p className={Classes.Headh31}>Mohammed Inshad</p>
                    <p className={Classes.Para31}>
                      Kottakunnan ( house ) morayur , opposit family health
                      center malappuram district kerala 673643{" "}
                      <span className={Classes.HeadAddressDesc1}>
                        phone number : 9995200745
                      </span>
                    </p>

                    <p className={Classes.HeadAddressDesc}>
                      phone number : 9995200745
                    </p>
                  </div>
                </div>
                <div className={Classes.secondDots}>
                  <BsThreeDotsVertical />
                </div>
              </div>
              {/* 2 */}
              {/* 3 */}
              <div className={Classes.LocationHead}>
                <div className={Classes.FirstLocationHead1}>
                  <input type="radio" />
                  <div className={Classes.AddressHead15}>
                    <p className={Classes.Headh31}>Mohammed Inshad</p>
                    <p className={Classes.Para31}>
                      Kottakunnan ( house ) morayur , opposit family health
                      center malappuram district kerala 673643{" "}
                      <span className={Classes.HeadAddressDesc1}>
                        phone number : 9995200745
                      </span>
                    </p>

                    <p className={Classes.HeadAddressDesc}>
                      phone number : 9995200745
                    </p>
                  </div>
                </div>
                <div className={Classes.secondDots}>
                  <BsThreeDotsVertical />
                </div>
              </div>
              {/* 3 */}
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
                          name="text"
                        />
                      </div>
                      <div>
                        <label>Mobile number</label>
                        <input
                          className={Classes.PlaceInput}
                          type="text"
                          placeholder="+91 98975656785"
                          name="mobile"
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
                            name="pin"
                          />
                        </div>
                        <div>
                          <label>City</label>
                          <input
                            className={Classes.PlaceInput}
                            type="text"
                            placeholder="City*"
                            name="city"
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
                          name="building"
                        />
                      </div>
                      <div className={Classes.ColonyForm}>
                        <label>Street colony name</label>
                        <input
                          className={Classes.PlaceInput}
                          type="text"
                          placeholder="road name, area colony*"
                          name="colony"
                        />
                      </div>
                    </div>
                    <div>
                      <label>Land mark ( optional )</label>
                      <input
                        className={Classes.PlaceInput}
                        type="text"
                        placeholder="Near edu city"
                        name="landMark"
                      />
                    </div>
                    <div className={Classes.ADDAnotherBtn}>
                      <button>Add Address</button>
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
