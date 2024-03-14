import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Classes from "../CheckDelivery/CheckDelivery.module.css";

import * as urls from "../../Urls";
import axios from "axios";

import { useHistory } from "react-router-dom";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 375,
    height: "auto",
    bgcolor: "background.paper",
    border: "none",
    boxShadow: 24,
    borderRadius: "4px",
    p: 2,
    outline: "none",
  };

const CheckDelivery = (props) => {

    const [show, setShow] = useState(false);
    const handleShow =() => {
        setShow(true)
    }

    const handleClose = () => {
        setShow(false)
    }
    const loginClickHandler = () => {
       
          handleShow();
        
       
      };

  return (
    <>
      <div className={Classes.LogList}>
        <div className={Classes.DeliveryPin} onClick={loginClickHandler}>
        <span className={Classes.checkDeliveryTitle}>CHECK DELIVERY</span>
        <span className={Classes.EnterPinTitle}>Enter PinCode</span>
        </div>
        
      </div>

      <Modal
        open={show}
        onClose={handleClose}
        animation={false}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography>
          <p>a;lskdjf</p>
          </Typography>
        </Box>
      </Modal>
    </>
  );
};
export default CheckDelivery;
