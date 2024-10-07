import React, { useState, useEffect } from "react";
import Classes from "./SuccesPage.module.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import InvertedTick from "../../Assets/invertedTick.png";

const successM = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "rgba(48, 147, 58, 1)",
  outline: "none",
  border: "none",
  boxShadow: 24,
  borderRadius: "4px",
  p: 4,
};

const SuccessPage = (props) => {
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

  return (
    <div>
      <Modal open={props.open} onClose={props.handleClose}>
        <Box
          sx={successM}
          style={
            isMobileView ? { width: "90%" } : { width: "30%", height: "auto" }
          }
        >
          <Typography className={Classes.successModalContainer}>
            <div className={Classes.imageContianer}>
              <img
                className={Classes.tick}
                src={InvertedTick}
                alt="InvertedTick"
              />
            </div>
            <div style={{ textAlign: "center", margin: "12px 0px" }}>
              <span className={Classes.titlesuccesModal}>
                Thank you your cancellation <br />
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
