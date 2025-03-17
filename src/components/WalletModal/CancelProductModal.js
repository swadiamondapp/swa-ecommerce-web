"use client";
import React, { useState, useEffect } from "react";
import Classes from "./WalletModal.module.css";
import { Dropdown } from "primereact/dropdown";
import Box from "@mui/material/Box";
import { IoClose } from "react-icons/io5";
import Modal from "@mui/material/Modal";
import { useIsMobile } from "@/hooks/useIsMobile";

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
  const [selectedReason, setSelectedReason] = useState(null);
  const [notes, setNotes] = useState("");
  // const token = localStorage.getItem("swaToken");

  const [selectedCity, setSelectedCity] = useState(null);
  // const [error, setError] = useState("");
  const isMobileView = useIsMobile();

  const reasons = [
    { name: "Ordered by Mistake", code: "ORDERED_BY_MISTAKE" },
    { name: "Item No Longer Needed", code: "ITEM_NO_LONGER_NEEDED" },
    { name: "Better Price Available", code: "BETTER_PRICE_AVAILABLE" },
    {
      name: "Received as a Gift Elsewhere",
      code: "RECEIVED_AS_GIFT_ELSEWHERE",
    },
    {
      name: "Changed Mind About Size or Style",
      code: "CHANGED_MIND_SIZE_OR_STYLE",
    },
    { name: "Other", code: "OTHER" },
  ];

  const handleCancel = () => {
    if (!selectedReason) {
      props.setError("Please select a reason for cancellation."); // Set error if reason is not selected
      return;
    }
    props.setError(""); // Clear error if reason is selected
    props.cancelProduct(selectedReason, notes);
  };

  console.log("cancelButtonTrack1", props.cancelButtonTrack);
  const isShipped = props.cancelButtonTrack == "Shipped";

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
              <div className={Classes.CancelModalHeader}>
                <h3>Cancel this product</h3>
                <IoClose
                  className={Classes.Close}
                  onClick={props.handleClose}
                />
              </div>
              {isShipped ? (
                <div
                  className={Classes.ShippedMessage}
                  style={{ margin: "30px 0px" }}
                >
                  <div variant="body2" color="textSecondary">
                    The product has been shipped. You can return it after
                    delivery.
                  </div>
                </div>
              ) : (
                <>
                  <div className="dropContainer">
                    <Dropdown
                      value={selectedReason}
                      onChange={(e) => setSelectedReason(e.value)}
                      options={reasons}
                      optionLabel="name"
                      placeholder="Select Reason"
                    />
                  </div>
                  <textarea
                    placeholder="Any thing to tell us"
                    cols={50}
                    rows={8}
                    className={Classes.TextArea}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  ></textarea>
                  <div
                    className={Classes.CancelButton}
                    style={{
                      justifyContent: props.error ? "space-between" : "end",
                    }}
                  >
                    {props.error && (
                      <div className={Classes.ErrorMessage}>{props.error}</div>
                    )}
                    <button onClick={handleCancel}>Cancel Product</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default CancelProductModal;
