"use client";
import React, { useState, useEffect } from "react";
import Classes from "./MobileNav.module.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const OtpModal = (props) => {
  return (
    <div>
      <Modal
        open={props.getOtpModal}
        onClose={props.handleOtpModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={
            props.isDesk
              ? props.customTabOtpModalStyle
              : props.customDestOtpModalStyle
          }
        >
          <div className={Classes.otpContainer}>
            <form onSubmit={(e) => props.handleOtpForm(e)}>
              <div style={{ textAlign: "center" }}>
                <div>
                  <h3
                    className={Classes.titleh}
                    style={{ paddingBottom: "10px" }}
                  >
                    OTP
                  </h3>
                </div>
                <div>
                  <p className={Classes.titlep}>
                    Please enter 6 digit OTP that send to your
                    <br />
                    {props.emailId ? props.emailId : props.mobileNumber}
                  </p>
                </div>
              </div>
              <div>
                <label className={Classes.labelStyle}>OTP</label>
                <input
                  placeholder="* * * * *"
                  className={Classes.allInputTextStyle}
                  value={props.otp}
                  onChange={(e) => props.setOtp(e.target.value)}
                />
              </div>
              <p className={Classes.ErrorText}>
                {props.otpError && props.otpError}
              </p>
              <div>
                <button
                  type="submit"
                  // onClick={verifyOtp}
                  className={Classes.accept}
                >
                  Continue
                </button>
              </div>
            </form>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div className={Classes.Signup} style={{ cursor: "pointer" }}>
                <span className={Classes.bottomText}>
                  Don’t recived the code?
                </span>
                {/* <span
                  className={Classes.signupAnchor}
                  onClick={props.handleSignupModalOpen}
                >
                  Resend
                </span> */}
                {props.timer > 0 ? (
                  <span className={Classes.bottomText}>
                    &nbsp;{props.timer}s
                  </span>
                ) : (
                  <span
                    className={Classes.signupAnchor}
                    onClick={props.handelLoginForm}
                  >
                    Resend
                  </span>
                )}
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default OtpModal;
