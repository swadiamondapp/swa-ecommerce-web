"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import * as Urls from "@/utils/urls";
import Classes from "./BuyBackRequiest.module.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import ArrowDown from "../../../public/Assets/ArrowDown.png";
import FormControl from "@mui/material/FormControl";
import Image from "next/image";
import { Modal } from "@mui/material";
import { useAuth } from "@/providers/auth-provider";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "65%",
  height: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  border: "none",
  borderRadius: "6px",
  p: 2,
};

const BuyBackRequiest = (props) => {
  const { token } = useAuth;
  const [isFocused, setIsFocused] = useState(false);
  const [open, setOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const mobileStyle = {
    position: "absolute",
    bottom: 0,
    transition: "transform 0.3s ease-in-out",
    bgcolor: "background.paper",
    border: "none",
    boxShadow: 24,
    borderRadius: "0px",
    p: 3,
    overflow: "auto",
    maxHeight: "auto",
    width: "100%",
    height: "100%",
  };
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window?.innerWidth >= 300 && window?.innerWidth <= 575);
    };

    window?.addEventListener("resize", handleResize);
    return () => {
      window?.removeEventListener("resize", handleResize);
    };
  }, [isMobileView]);
  useEffect(() => {
    if (token) {
      getDefaultAddress();
    }
  }, [token]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChangeAddress = (event) => {
    const { name, value } = event.target;
    props.setAddressData({
      ...props.addressData,
      [name]: value,
    });
  };

  const getDefaultAddress = async () => {
    try {
      const response = await axios.get(Urls.defaultAddress, {
        headers: { Authorization: "Token " + token },
      });
      if (response.data.results.status === 200) {
        props.setAddressData({
          ...props.addressData,
          sEmail: response.data.results.data.email,
          sPhone: response.data.results.data.phone_number,
          fullName: response.data.results.data.name,
          honorific_name: response.data.results.data.honorific_name,
          country: response.data.results.data.country,
          mobile: response.data.results.data.phone_number,
          pincode: response.data.results.data.pincode,
          city: response.data.results.data.city,
          state: response.data.results.data.state,
          hNumber_Bname: response.data.results.data.house,
          streetColony: response.data.results.data.area,
          landMark: response.data.results.data.landmark,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={isMobileView ? mobileStyle : style}>
          <div>
            <div>
              <Button
                onClick={props.handleClose}
                style={{ position: "absolute", top: "10px", right: 0 }}
              >
                <Image src={`/Assets/closeModal.png`} alt="closebutton" />
              </Button>
              <form>
                <div className={Classes.BuyBackContainer}>
                  <span className={Classes.Title}>
                    Return / lifetime exchange/
                    <br /> lifetime buyback this product
                  </span>

                  <div className={Classes.inputContainer}>
                    <label className={Classes.labelStyle}>Mobile Number</label>
                    <input
                      placeholder="+91 9995200657"
                      className={Classes.alllInputFeilds}
                      name="mobile"
                      value={props.addressData.phone_number}
                      onChange={handleChangeAddress}
                    />
                  </div>

                  <div className={Classes.Pin}>
                    <div
                      style={{ display: "flex", gap: "10px", width: "100%" }}
                    >
                      <div className={Classes.quatorInput}>
                        <label className={Classes.labelStyle}>Pincode</label>

                        <input
                          placeholder="674602"
                          className={Classes.alllInputFeilds}
                          name="pincode"
                          value={props.addressData.pincode}
                          onChange={handleChangeAddress}
                        />
                      </div>

                      <div className={Classes.quatorInput}>
                        <label className={Classes.labelStyle}>City</label>
                        <input
                          placeholder="Calicut"
                          className={Classes.alllInputFeilds}
                          name="city"
                          value={props.addressData.city}
                          onChange={handleChangeAddress}
                        />
                      </div>
                    </div>
                    <div className={Classes.dropDown}>
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        // options={states}
                        className={Classes.auto}
                        autoHighlight
                        getOptionLabel={(option) => option.name}
                        value={props.addressData.state} // Set the value of Autocomplete
                        onChange={(event, newValue) => {
                          props.setAddressData({
                            ...props.addressData,
                            state: newValue,
                          }); // Update selected state
                        }}
                        renderOption={(props, option) => (
                          <Box
                            component="li"
                            sx={{ mr: 2, flexShrink: 0 }}
                            {...props}
                          >
                            <p>{option.name}</p>
                          </Box>
                        )}
                        renderInput={(params) => (
                          <FormControl
                            variant="outlined"
                            focused={isFocused}
                            sx={{ width: "100%" }}
                          >
                            <label className={Classes.labelStyle}>State</label>
                            <TextField
                              {...params}
                              label={
                                props.addressData.state
                                  ? null
                                  : isFocused
                                    ? null
                                    : "Kerala"
                              }
                              onFocus={handleFocus}
                              onBlur={handleBlur}
                              className={Classes.textField}
                              sx={{
                                padding: "0px 0px", // Your padding here
                                "& input": {
                                  padding: 0,
                                  margin: 0, // Remove internal padding of the input
                                },

                                "& .MuiOutlinedInput-root": {
                                  width: "100%", // Set the width to 100%
                                  // backgroundColor: "rgba(232, 233, 234, 1)",
                                  padding: "5px 0px 5px 0px !important",
                                  borderColor:
                                    "1px solid rgba(232, 233, 234, 1)",
                                  paddingRight: "15px",
                                  "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                    {
                                      border: "1px solid #026F7F", // Change border color when focused
                                    },
                                },
                                "& .MuiAutocomplete-input": {
                                  padding: "4px 8px 4px 8px !important",
                                },
                                ".MuiOutlinedInput-root": {
                                  paddingRight: "15px !important",
                                },
                              }}
                              InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                  <img
                                    src={isFocused ? ArrowDown : ArrowDown}
                                    alt="ArrowDown"
                                    style={{
                                      transform: isFocused
                                        ? "rotate(180deg)"
                                        : "none",
                                    }}
                                  />
                                ),
                                sx: { padding: "7px" }, // Change the padding here
                              }}
                              InputLabelProps={{
                                shrink: null, // Prevent placeholder from moving up
                                style: {
                                  textAlign: "center",

                                  fontSize: "11px",
                                  opacity: "0.8",
                                }, // Center placeholder vertically
                              }}
                              inputProps={{
                                ...params.inputProps,
                                autoComplete: "new-password", // disable autocomplete and autofill
                              }}
                            />
                          </FormControl>
                        )}
                      />
                    </div>
                  </div>
                  <div></div>
                  <div className={Classes.Location}>
                    <div className={Classes.halfInput}>
                      <label className={Classes.labelStyle}>
                        House number / building name
                      </label>
                      <input
                        placeholder="Skyline 12B"
                        className={Classes.alllInputFeilds}
                        name="hNumber_Bname"
                        value={props.addressData.hNumber_Bname}
                        onChange={handleChangeAddress}
                      />
                    </div>
                    <div className={Classes.halfInput}>
                      <label className={Classes.labelStyle}>
                        Street colony name
                      </label>
                      <input
                        placeholder="Palazhi"
                        className={Classes.alllInputFeilds}
                        name="streetColony"
                        value={props.addressData.streetColony}
                        onChange={handleChangeAddress}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={Classes.labelStyle}>
                      Land mark ( optional )
                    </label>
                    <input
                      placeholder="Near edu city"
                      className={Classes.alllInputFeilds}
                      name="landMark"
                      value={props.addressData.landMark}
                      onChange={handleChangeAddress}
                    />
                  </div>
                  <div className={Classes.confirmButtonContianer}>
                    <div className={Classes.buttonsWIdth}>
                      <button
                        type="button"
                        className={Classes.confirmButton}
                        onClick={props.cancellationProceedWith}
                      >
                        CONFIRM BUYBACK REQUEST
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default BuyBackRequiest;
