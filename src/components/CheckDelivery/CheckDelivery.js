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
import CircularProgress from "@mui/material/CircularProgress";

import Classes from "../CheckDelivery/CheckDelivery.module.css";

import * as urls from "../../Urls";
import axios from "axios";

import { useHistory } from "react-router-dom";
import * as Urls from "../../Urls";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 468,
//   height: "auto",
//   bgcolor: "background.paper",
//   border: "none",
//   boxShadow: 24,
//   borderRadius: "4px",
//   p: 2,
//   outline: "none",
// };
const style = {
  position: "absolute",
  bottom: 0,
  width: "100%",
  height: "auto",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 2,
  outline: "none",
};
const styleDesk = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  width: "34.4%",
  height: "auto",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
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
  const [isLoading, setIsLoading] = useState(false);
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
  console.log("pinCode", pinCode);

  // location

  const getLocation = async () => {
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      let _url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
      try {
        const response = await axios.get(_url);
        setPinCode(response.data.address.postcode);
        localStorage.setItem("pincode", response.data.address.postcode);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    });
  };
  // location
  // console.log("add...", add);
  const [isDesk, setIsDesk] = useState(
    window.innerWidth >= 300 && window.innerWidth <= 575
  );
  useEffect(() => {
    const handleResize = () => {
      setIsDesk(window.innerWidth >= 300 && window.innerWidth <= 575);
    };
    // Add event listener to listen for window resize
    window.addEventListener("resize", handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isDesk]);

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
        <Box sx={isDesk ? style : styleDesk}>
          <Typography>
            <div>
              <div className={Classes.LocationDetails}>
                <img src={locationimg} />
                <p className={Classes.Locationp1}>
                  Enter your Pincode to browse better
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
                <button onClick={getLocation}>
                  {isLoading ? (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <CircularProgress
                        size={20}
                        sx={{ color: "#000", ml: 1 }}
                      />
                    </Box>
                  ) : (
                    <>
                      <img src={locationsimg} /> Use your current location
                    </>
                  )}
                  {/* <img src={locationsimg} /> Use your current location
                  {isLoading && (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <CircularProgress
                        size={20}
                        sx={{ color: "#000", ml: 1 }}
                      />
                    </Box>
                  )} */}
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
