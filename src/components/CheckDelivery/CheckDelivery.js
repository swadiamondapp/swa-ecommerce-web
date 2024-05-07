import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import locationimg from "../../Assets/locationicon.png";
import timeimg from "../../Assets/time.png";
import locationsimg from "../../Assets/locations.png";
import { BsArrowRight } from "react-icons/bs";
import Stroke from "../../Assets/Stroke.png";
import { FaPen } from "react-icons/fa";

import Classes from "../CheckDelivery/CheckDelivery.module.css";

import * as urls from "../../Urls";
import axios from "axios";

import { useHistory } from "react-router-dom";
import * as Urls from "../../Urls";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 468,
  height: "auto",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  borderRadius: "4px",
  p: 2,
  outline: "none",
};

const CheckDelivery = ({ props, show, handleClose, handleShow }) => {
  // const [show, setShow] = useState(false);
  // const handleShow = () => {
  //   setShow(true);
  // };

  // const handleClose = () => {
  //   setShow(false);
  // };
  const loginClickHandler = () => {
    handleShow();
  };

  const [pinCode, setPinCode] = useState(localStorage.getItem("pincode") || "");
  const [pinCodeError, setPinCodeError] = useState("");
  const [active, setActive] = useState(null);
  const pinCodeChangeHandler = (e) => {
    setPinCode(e.target.value);
  };
  const availbilityCheck = () => {
    if (pinCode !== "") {
      axios
        .get(Urls.pincodeCheck + pinCode)
        .then((response1) => {
          console.log("pincode2", response1.data.PincodeData[0].Area);
          setActive(response1.data.IsSuccess);
          if (response1.data.IsSuccess === true) {
            localStorage.setItem("pincode", response1.data.PincodeData[0].Area);
          }

          handleClose();
        })

        .catch((error) => {
          console.log(error);
        });
    } else {
      setPinCodeError("Enter pin code");
    }
  };
  const pincode = localStorage.getItem("pincode");
  console.log("pincode1", pincode);

  return (
    <>
      {/* <div className={Classes.LogList}>
        <div
          style={{ cursor: "pointer" }}
          className={`${Classes.DeliveryPin} ${Classes.headerElement}`}
          // onClick={loginClickHandler}
          onClick={handleShow}
        >
          <span className={Classes.checkDeliveryTitle}>CHECK DELIVERY</span>
          {pincode ? null : (
            <span
              // onClick={loginClickHandler}
              onClick={handleShow}
              className={Classes.EnterPinTitle}
              style={{ cursor: "pointer" }}
            >
              Enter PinCode
            </span>
          )}
          {pincode && (
            <span
              className={Classes.EnterPinTitle}
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              {pincode} <FaPen onClick={handleShow} />
            </span>
          )}
        </div>
      </div> */}

      <Modal
        open={show}
        onClose={handleClose}
        animation={false}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography>
            <div>
              <div className={Classes.LocationDetails}>
                <img src={locationimg} />
                <p className={Classes.Locationp1}>
                  Enter your Pincode <br /> to check delivery availability
                </p>
                <p className={Classes.Locationp2}>
                  Get fastest delivery dates possible, check appointment for
                  trial at home. Find nearby stores & design availability in
                  stores
                </p>
              </div>
              <div className={Classes.LocationInp}>
                <input
                  type="text"
                  placeholder="*****"
                  value={pinCode}
                  onChange={pinCodeChangeHandler}
                />
                <BsArrowRight
                  className={Classes.LocationIconarrow}
                  onClick={availbilityCheck}
                />
              </div>
              <div className="">{pinCodeError}</div>
              <div style={{ marginBottom: "15px" }}>
                {active === true ? (
                  <>
                    <div
                      className={Classes.Flex}
                      style={{
                        marginLeft: "0px",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <img className={Classes.Stroke} src={Stroke} alt="" />
                      <p className={Classes.StrokeText}>
                        Cash / Card delivery option available
                      </p>{" "}
                    </div>
                    <div
                      className={Classes.Flex}
                      style={{
                        marginLeft: "0px",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <img className={Classes.Stroke} src={Stroke} alt="" />
                      <p className={Classes.StrokeText}>
                        Standard delivery available
                      </p>
                    </div>
                  </>
                ) : null}
                {active === false ? (
                  <p style={{ paddingTop: "0px" }} className="errrMsg">
                    Standard delivery not available
                  </p>
                ) : null}
              </div>
              <div className={Classes.DeliveryBtns}>
                <button>
                  <img src={locationsimg} /> Use your current location
                </button>
              </div>
            </div>
          </Typography>
        </Box>
      </Modal>
    </>
  );
};
export default CheckDelivery;
