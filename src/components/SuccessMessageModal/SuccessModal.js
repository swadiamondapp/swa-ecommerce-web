import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import div from "@mui/material/div";
import Modal from "@mui/material/Modal";
import SuccessTick from "../../Assets/successTick.png";
import Classes from "./SuccesModal.module.css";

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

const SuccessPage = (props) => {
  const [open, setOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    // This code will only run on the client side
    setIsMobileView(window?.innerWidth >= 300 && window?.innerWidth <= 575);

    const handleResize = () => {
      setIsMobileView(window?.innerWidth >= 300 && window?.innerWidth <= 575);
    };

    window?.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener when component unmounts
    return () => {
      window?.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window?.innerWidth >= 300 && window?.innerWidth <= 575);
    };

    window?.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener when component unmounts
    return () => {
      window?.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>SUCESS MESSAGE AFTER SUBMIT REVIEW</Button>
      <Modal
        // open={props.successModalOpen}
        open={open}
        // onClose={props.handleClose}
        onClose={handleClose}
      >
        <Box
          sx={successM}
          style={
            isMobileView ? { width: "90%" } : { width: "30%", height: "auto" }
          }
        >
          <div className={Classes.successModalContainer}>
            <div>
              <Image
                src={`/Assets/successTick.png`}
                alt="SuccessTick"
                width={50}
                height={50}
              />
            </div>
            <div
              style={{
                textAlign: "center",
                margin: "12px 0px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span className={Classes.titlesuccesModal}>
                Thank you very much your
                <br /> review has been saved
              </span>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default SuccessPage;
