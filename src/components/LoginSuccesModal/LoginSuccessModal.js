import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import SuccessTick from "../../Assets/successTick.png";
import Classes from "../SuccessMessageModal/SuccesModal.module.css";

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

const LoginSuccessModal = (props) => {
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
      {/* <Button onClick={handleOpen}>SUCESS MESSAGE AFTER SUBMIT REVIEW</Button> */}
      <Modal
        // open={props.successModalOpen}
        open={props.state}
        // onClose={props.handleClose}
        onClose={props.closeSuccesModal}
      >
        <Box
          sx={successM}
          style={
            isMobileView ? { width: "90%" } : { width: "30%", height: "auto" }
          }
        >
          <Typography className={Classes.successModalContainer}>
            <div>
              <img src={SuccessTick} />
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
                You are Successfully 
                <br /> LoggedIn
              </span>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default LoginSuccessModal;
