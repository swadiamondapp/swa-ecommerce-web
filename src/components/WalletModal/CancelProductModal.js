import React, { useState, useEffect } from "react";
import Classes from "./WalletModal.module.css";
import axios from "axios";
import * as Urls from "../../Urls";
import { Dropdown } from "primereact/dropdown";
import Box from "@mui/material/Box";
import { IoClose } from "react-icons/io5";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "41%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  border: "none",
  borderRadius: "6px",
  p: 2,
  width: "650px",
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

const CancelProductModal = (props) => {
  const token = localStorage.getItem("swaToken");
  const [selectedCity, setSelectedCity] = useState(null);
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

  const cities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];

  const cancelProduct = async () => {
    try {
      const body = {
        product_id: props.orderDet[0].product.product_id,
        order_id: props.orderId,
        shipment_id: props.orderDet[0].id,
        total_amount: props.total,
        payment_mode: props.payMode,
      };
      const response = await axios.post(Urls.CancelOrder, body, {
        headers: { Authorization: "Token " + token },
      });
      if (response.data.results.message === "Admin Approval Pending") {
        console.log("Modal show ");
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log("props.proDet--->", props.orderDet[0]);

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={isMobileView ? mobileStyle : style}>
          <Typography>
            <div>
              <div className={Classes.CancelModalHeader}>
                <h3>Cancel this product</h3>
                <IoClose
                  className={Classes.Close}
                  onClick={props.handleClose}
                />
              </div>
              <div className="dropContainer">
                <Dropdown
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.value)}
                  options={cities}
                  optionLabel="name"
                  placeholder="Select Reason"
                />
              </div>
              <textarea
                placeholder="Any think to tell to us"
                cols={50}
                rows={8}
                className={Classes.TextArea}
              ></textarea>
              <div className={Classes.CancelButton}>
                <button onClick={cancelProduct}>Cancel Product</button>
              </div>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default CancelProductModal;
