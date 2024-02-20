import React, { useState, useEffect } from "react";
import Classes from "./BuyBackRequiest.module.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Dropdown } from "primereact/dropdown";
import CloseButton from "../../Assets/closeModal.png";
import TextField from "@mui/material/TextField";
import Autocomplete, { autocompleteClasses } from "@mui/material/Autocomplete";
import ArrowUp from "../../Assets/ArrowUp.png";
import ArrowDown from "../../Assets/ArrowDown.png";
import FormControl from "@mui/material/FormControl";
import useMediaQuery from "@mui/material/useMediaQuery";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  border: "none",
  borderRadius: "6px",
  p: 2,
};

const BuyBackRequiest = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [isMobileView, setIsMobileView] = useState(
    window.innerWidth >= 300 && window.innerWidth <= 575
  );

  // const isDesktop = useMediaQuery('(min-width:700px)') && !useMediaQuery('(max-width:1200px)');
  const states = [
    { name: "Andhra Pradesh" },
    { name: "Arunachal Pradesh" },
    { name: "Assam" },
    { name: "Bihar" },
    { name: "Chhattisgarh" },
    { name: "Goa" },
    { name: "Gujarat" },
    { name: "Haryana" },
    { name: "Himachal Pradesh" },
    { name: "Jammu and Kashmir" },
    { name: "Jharkhand" },
    { name: "Karnataka" },
    { name: "Kerala" },
    { name: "Madhya Pradesh" },
    { name: "Maharashtra" },
    { name: "Manipur" },
    { name: "Meghalaya" },
    { name: "Mizoram" },
    { name: "Nagaland" },
    { name: "Odisha" },
    { name: "Punjab" },
    { name: "Rajasthan" },
    { name: "Sikkim" },
    { name: "Tamil Nadu" },
    { name: "Telangana" },
    { name: "Tripura" },
    { name: "Uttarakhand" },
    { name: "Uttar Pradesh" },
    { name: "West Bengal" },
    { name: "Andaman and Nicobar Islands" },
    { name: "Chandigarh" },
    { name: "Dadra and Nagar Haveli" },
    { name: "Daman and Diu" },
    { name: "Delhi" },
    { name: "Lakshadweep" },
    { name: "Puducherry" },
  ];
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
      setIsMobileView(window.innerWidth >= 300 && window.innerWidth <= 575);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener when component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobileView]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div>
      {/* <Button onClick={handleOpen}>BuyBackRequiest</Button> */}
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={isMobileView ? mobileStyle : style}>
          <Typography>
            <div>
              <Button
                onClick={props.handleClose}
                style={{ position: "absolute", top: "10px", right: 0 }}
              >
                <img src={CloseButton} />
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
                      placeholder="98909499999"
                      className={Classes.alllInputFeilds}
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
                        />
                      </div>

                      <div className={Classes.quatorInput}>
                        <label className={Classes.labelStyle}>City</label>
                        <input
                          placeholder="Calicut"
                          className={Classes.alllInputFeilds}
                        />
                      </div>
                    </div>
                    <div className={Classes.dropDown}>
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={states}
                        className={Classes.auto}
                        autoHighlight
                        getOptionLabel={(option) => option.name}
                        value={selectedState} // Set the value of Autocomplete
                        onChange={(event, newValue) => {
                          setSelectedState(newValue); // Update selected state
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
                                selectedState
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
                                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "green", // Change border color when focused
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
                        placeholder="Skyline"
                        className={Classes.alllInputFeilds}
                      />
                    </div>
                    <div className={Classes.halfInput}>
                      <label className={Classes.labelStyle}>
                        Street colony name
                      </label>
                      <input
                        placeholder="Palazhi"
                        className={Classes.alllInputFeilds}
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
                    />
                  </div>
                  <div className={Classes.confirmButtonContianer}>
                    <div className={Classes.buttonsWIdth}>
                      <button type="button" className={Classes.confirmButton}>
                        CONFIRM BUY REQUEST
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default BuyBackRequiest;
