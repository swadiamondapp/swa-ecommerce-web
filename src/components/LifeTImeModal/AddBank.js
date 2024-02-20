import React, { useState, useEffect } from "react";
import classes from "./LIfeTimeModal.module.css";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IoMdClose } from "react-icons/io";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  borderRadius: "4px",
  p: 4,
};

const mobileStyle = {
  position: "absolute",
  bottom: 0,
  transition: "transform 0.3s ease-in-out",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  borderRadius: "4px",
  p: 2,
  overflow: "auto",
  maxHeight: "85%",
  width: "100%",
};
const successM = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  borderRadius: "4px",
  p: 4,
};

const AddBank = (props) => {
  // const [successModalOpen, setSuccessModalOpen] = useState(false);
  console.log(props.openSuccessModal);
  const [isMobileView, setIsMobileView] = useState(
    window.innerWidth >= 300 && window.innerWidth <= 575
  );

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

  // const handleSuccessModal = () => {
  //   setSuccessModalOpen(true);
  //   // You can close the success modal after a certain duration if needed
  //   setTimeout(() => {
  //     setSuccessModalOpen(false);
  //   }, 1000); // Close the success modal after 3 seconds (3000 milliseconds)
  // };
  // const handleCloseSuccessModal = () => {
  //   setSuccessModalOpen(false);
  // };

  return (
    <div>
      {/* <Button onClick={handleOpen}>anas</Button> */}
      <Modal open={props.open} onClose={props.handleClose}>
        <Box sx={isMobileView ? mobileStyle : style}>
          <Typography>
            <div className={classes.Container}>
              <div className={classes.LabelHead}>
                <p>Add bank A/C</p>
                <IoMdClose
                  style={{ cursor: "pointer" }}
                  onClick={props.handleClose}
                />
              </div>
              <div className={classes.FormADDbANK}>
                <div className={classes.AccountLabels}>
                  <label>Enter Account Number</label>
                  <input type="text" placeholder="Jameel" />
                </div>
                <div className={classes.AccountLabels}>
                  <label>Re Enter Account number</label>
                  <input type="text" placeholder="+91 98975656785" />
                </div>
                <div className={classes.AccountLabels}>
                  <label>Bank Name</label>
                  <select name="cars" id="cars">
                    <option value="Axis bank">Axis bank</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                  </select>
                </div>
                <div className={classes.BranchIfscParent}>
                  <div className={classes.BranchAcc}>
                    <label>Branch</label>
                    <input type="text" placeholder="City*" />
                  </div>
                  <div className={classes.BranchAcc}>
                    <label>IFSC</label>
                    <input type="text" placeholder="Pincode*" />
                  </div>
                </div>
                <div className={classes.AccountLabels}>
                  <label>Account holder Name</label>
                  <input type="text" placeholder="Muhammed Jameel" />
                </div>
                <div
                  className={classes.AddBtnACC}
                  onClick={props.openSuccessModal}
                >
                  <button>Add</button>
                </div>
              </div>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default AddBank;
