import React, { useState,useEffect } from "react";
import Classes from "./BuyBackRequiest.module.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Dropdown } from "primereact/dropdown";
import CloseButton from "../../Assets/closeModal.png";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  height: "85%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  border: "none",
  p: 2,
};

const BuyBackRequiest = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [isMobileView, setIsMobileView] = useState(
    window.innerWidth >= 300 && window.innerWidth <= 575
  );


  const cities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];
  const mobileStyle = {
    position: "absolute",
    bottom: 0,
    transition: "transform 0.3s ease-in-out",
    bgcolor: "background.paper",
    border: "none",
    boxShadow: 24,
    borderRadius: "0px",
    p: 2,
    overflow: "auto",
    maxHeight: "auto",
    width: "100%",
    height:'100%'
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


  return (
    <div>
      <Button onClick={handleOpen}>BuyBackRequiest</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={isMobileView? mobileStyle : style}>
          <Typography>
            <div>
              <Button
                onClick={handleClose}
                style={{ position: "absolute", top: "10px", right: 0 }}
              >
                <img src={CloseButton} />
              </Button>
              <div className={Classes.BuyBackContainer}>
                <span className={Classes.Title}>
                  Return / lifetime exchange/
                  <br /> lifetime buyback this product
                </span>

                <div>
                  <label className={Classes.labelStyle}>Mobile Number</label>
                  <input
                    placeholder="98909499999"
                    className={Classes.alllInputFeilds}
                  />
                </div>
                <div className={Classes.Pin}>
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
                <div>
                  <div className={Classes.dropDown}>
                    <Autocomplete
                      id="country-select-demo"
                      options={cities}
                      autoHighlight
                      getOptionLabel={(option) => option.label}
                      renderOption={(props, option) => (
                        <Box
                          component="li"
                          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                          {...props}
                        >
                          <img
                            loading="lazy"
                            width="20"
                            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                            alt=""
                          />
                          {option.label} ({option.code}) +{option.phone}
                        </Box>
                      )}
                      renderInput={(params) => (
                        <TextField {...params} label="Kerala" />
                      )}
                    />
                  </div>
                </div>
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
                  <div className={Classes.buttonsWIdth} >
                    <button className={Classes.confirmButton}>
                      CONFIRM BUY REQUEST
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Typography>
          <Typography></Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default BuyBackRequiest;
