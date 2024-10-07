import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import InvertedTick from "../../Assets/invertedTick.png";
import Classes from "./RefundInitiated.module.css";

const successM = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "rgba(48, 147, 58, 1)",
  border: "none",
  boxShadow: 24,
  borderRadius: "4px",
  p: 4,
};

const SuccessPage = () => {
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
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
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>open RefundInitiated Modal</Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={successM}
          style={
            isMobileView ? { width: "90%" } : { width: "30%", height: "auto" }
          }
        >
          <Typography className={Classes.successModalContainer}>
            <div>
              <img src={InvertedTick} alt="InvertedTick" />
            </div>
            <div
              style={{
                textAlign: "center",
                margin: "12px 0px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span className={Classes.title}>Refund initiated</span>
              <span className={Classes.titlesuccesModal}>
                Thank you your cancelation <br />
                has been approved
              </span>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default SuccessPage;
