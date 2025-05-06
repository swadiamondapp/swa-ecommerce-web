"use client";
import React, { useState, useEffect } from "react";
import Classes from "./SuccesPage.module.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useIsMobile } from "@/hooks/useIsMobile";
import Image from "next/image";

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
  const isMobileView = useIsMobile();

  return (
    <div>
      <Modal open={props.open} onClose={props.handleClose}>
        <Box
          sx={successM}
          style={
            isMobileView ? { width: "90%" } : { width: "30%", height: "auto" }
          }
        >
          <div className={Classes.successModalContainer}>
            <div className={Classes.imageContianer}>
              <Image
                className={Classes.tick}
                src={`/Assets/invertedTick.png`}
                alt="InvertedTick"
                width={100}
                height={100}
              />
            </div>
            <div style={{ textAlign: "center", margin: "12px 0px" }}>
              <span className={Classes.titlesuccesModal}>
                Thank you your cancellation <br />
                has been approved
              </span>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default SuccessPage;
