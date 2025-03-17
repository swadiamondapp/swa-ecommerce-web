"use client";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Classes from "../SuccessMessageModal/SuccesModal.module.css";
import Image from "next/image";

const successModal = {
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
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    setIsMobileView(window?.innerWidth >= 300 && window?.innerWidth <= 575);

    const handleResize = () => {
      setIsMobileView(window?.innerWidth >= 300 && window?.innerWidth <= 575);
    };

    window?.addEventListener("resize", handleResize);

    return () => {
      window?.removeEventListener("resize", handleResize);
    };
  }, []);

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
          sx={successModal}
          style={
            isMobileView ? { width: "90%" } : { width: "30%", height: "auto" }
          }
        >
          <div className={Classes.successModalContainer}>
            <div>
              <Image
                src={`/Assets/successTick.png`}
                alt="SuccessTick"
                width={100}
                height={100}
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
                You are Successfully
                <br /> {props.text}
              </span>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default LoginSuccessModal;
