"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import { BsArrowRight } from "react-icons/bs";
import CircularProgress from "@mui/material/CircularProgress";
import { useWindowResize } from "@/hooks/useWindowResize";
import { pincodeCheck } from "@/utils/urls";
import { useQuery } from "@tanstack/react-query";
import Classes from "./check-delivery.module.css";
import { Modal } from "@mui/material";

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

const CheckDelivery = ({ show, handleClose }) => {
  const [pinCode, setPinCode] = useState("");
  const [validationError, setValidationError] = useState("");

  const checkPincode = async (pinCode) => {
    const response = await fetch(pincodeCheck + pinCode);
    const data = await response.json();

    if (data.IsSuccess) {
      const receivedPincode = data.pincode || data.Pincode || null;
      if (receivedPincode) {
        localStorage.setItem("pincode", receivedPincode);
        return receivedPincode;
      } else {
        throw new Error("Pincode data unavailable");
      }
    } else {
      throw new Error("Pincode is not serviceable!");
    }
  };

  const {
    data,
    refetch: fetchPincodeStatus,
    isLoading: pincodeStatusLoading,
    error,
  } = useQuery({
    queryKey: ["pincode", pinCode],
    queryFn: () => checkPincode(pinCode),
    enabled: false,
  });

  const active = data ? true : false;

  useEffect(() => {
    const pincode = localStorage.getItem("pincode");
    if (pincode) {
      setPinCode(pincode);
    }
  }, []);

  const pinCodeChangeHandler = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setPinCode(value);
    }
  };

  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      handleFetchPincodeStatus();
    }
  };

  const handleFetchPincodeStatus = () => {
    if (!pinCode) {
      setValidationError("Please enter a pincode.");
      return;
    }
    if (pinCode.length !== 6) {
      setValidationError("Pincode must be 6 digits.");
      return;
    }
    setValidationError(""); // Clear any previous error
    fetchPincodeStatus(); // Proceed with the API call
  };

  const getLocationData = async () => {
    try {
      const pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, () => {
          reject(new Error("Location access denied"));
        });
      });

      const { latitude, longitude } = pos.coords;
      let _url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

      const response = await fetch(_url);
      const data = await response.json();

      if (!data.address?.postcode) {
        throw new Error("Location data unavailable");
      }
      return data.address.postcode;
    } catch (error) {
      throw new Error("Location data unavailable");
    }
  };

  const {
    data: locationPincode,
    error: locationError,
    refetch: getLocation,
    isLoading: locationLoading,
  } = useQuery({
    queryKey: ["location"],
    queryFn: getLocationData,
    enabled: false,
    retry: false,
  });

  useEffect(() => {
    if (locationPincode) {
      setPinCode(locationPincode);
      localStorage.setItem("pincode", locationPincode);
    }
  }, [locationPincode, locationError]);

  const { isMobile } = useWindowResize();

  return (
    <>
      <Modal
        open={show}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={isMobile ? style : styleDesk}>
          <div component="div">
            <div>
              <div className={Classes.LocationDetails}>
                <Image
                  src={`/Assets/locationicon.png`}
                  alt="locationimg"
                  width={33}
                  height={44}
                />
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
                  className="font-gilroy"
                  type="text"
                  placeholder="******"
                  value={pinCode}
                  onChange={pinCodeChangeHandler}
                  maxLength={6}
                  onKeyDown={handleEnterKeyPress}
                />
                {pincodeStatusLoading ? (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <CircularProgress
                      size={20}
                      sx={{ color: "#000", ml: 1 }}
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "14px",
                      }}
                    />
                  </Box>
                ) : (
                  <BsArrowRight
                    className={Classes.LocationIconarrow}
                    onClick={handleFetchPincodeStatus}
                  />
                )}
              </div>
              <div style={{ color: "#ff0000cc", marginTop: "10px" }}>
                {validationError && <p>{validationError}</p>}
                {error?.message && <p>{error.message}</p>}
              </div>
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
                      <Image
                        className={Classes.Stroke}
                        src={`/Assets/Stroke.png`}
                        alt="Stroke"
                        width={20}
                        height={20}
                      />
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
                      <Image
                        className={Classes.Stroke}
                        src={`/Assets/Stroke.png`}
                        alt="Stroke"
                        width={20}
                        height={20}
                      />
                      <p className={Classes.StrokeText}>
                        Standard delivery available
                      </p>
                    </div>
                  </>
                ) : null}
                {active === false && data === null ? (
                  <p style={{ paddingTop: "0px" }} className="errrMsg">
                    Standard delivery not available
                  </p>
                ) : null}
              </div>
              <div className={Classes.DeliveryBtns}>
                <button
                  onClick={() => {
                    getLocation();
                  }}
                >
                  {locationLoading ? (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <CircularProgress
                        size={20}
                        sx={{ color: "#000", ml: 1 }}
                      />
                    </Box>
                  ) : (
                    <>
                      <Image
                        src={`/Assets/locations.png`}
                        alt="locationsimg"
                        width={15}
                        height={14}
                      />{" "}
                      Use your current location {locationPincode}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};
export default CheckDelivery;
