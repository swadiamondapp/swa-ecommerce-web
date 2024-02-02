import React, { useState } from "react";
import FB from "../../Assets/fb.png";
import GOOGLE from "../../Assets/google.png";
import APPLE from "../../Assets/apple.png";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button } from "antd";
import Classes from "./MobileNav.module.css";

const LoginToggle = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [open, setOpen] = React.useState(false);
  const [signUpModal, setSignupModal] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [getOtpModal, setGetOtpModal] = useState(false);

  const handleSignupModalOpen = () => {
    setSignupModal(true);
    setIsSignup(true);
  };
  const handleGetOtp = () => {
    setGetOtpModal(true);
  };
  const handleOtpModalOpen = () => setGetOtpModal(true);
  const handleOtpModalClose = () => setGetOtpModal(false);

  const handleSignupModalClose = () => setSignupModal(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function handleCLick() {}
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const style = {
    position: "absolute",
    bottom: "0%",
    width: "100%",
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    p: 2,
  };
  const customTabOtpModalStyle = {
    position: "relative",
    // bottom: "20%",
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    p: 0,
  };

  const customTabOne = {
    backgroundColor: activeTab === "tab1" ? "#fff" : "#F0F0F2",
  };
  const customTabtwo = {
    backgroundColor: activeTab === "tab2" ? "#fff" : "#F0F0F2",
  };
  return (
    <div style={{ padding: "16px" }}>
      <div className={Classes.Wrapper}>
        {isSignup ? (
          <>
            <div className={Classes.SignupWrapper}>
              <div className={Classes.signupContainer}>
                <div
                  className={Classes.headerTitle}
                  // style={{ marginBottom: "1rem" }}
                >
                  <div>
                    <p className={Classes.signuptitletext}>Sign up</p>
                  </div>
                  <div>
                    <p className={Classes.signupsecondtitle}>
                      Create your Account
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    className={Classes.SocialButtons}
                    style={{ marginBottom: "1rem" }}
                  >
                    <div className={Classes.googleButton}>
                      <button className={Classes.buttonSocial}>
                        <img src={GOOGLE} /> Login with Google
                      </button>
                    </div>
                    <div className={Classes.facebookButton}>
                      <button className={Classes.buttonSocial}>
                        <img src={FB} /> Login with facebook
                      </button>
                    </div>
                  </div>
                  <div style={{ display: "flex" }}>
                    <button className={Classes.buttonSocial}>
                      <img src={APPLE} /> Login with Apple
                    </button>
                  </div>
                </div>
                <div style={{ display: "flex",margin:'0.5rem 0rem' }}>
                  <div className={Classes.line2}>
                    <div
                      style={{
                        borderBottom: "1px solid #585F67",
                        opacity: "0.3",
                      }}
                    ></div>
                    <div className={Classes.orText}>
                      or
                    </div>
                    <div
                      style={{
                        borderBottom: "1px solid #585F67",
                        opacity: "0.3",
                      }}
                    ></div>
                  </div>
                </div>
                <div className={Classes.signupInputFields}>
                  <form style={{gap:'1rem'}}>
                    <div>
                      <label className={Classes.labelStyle}>Name</label>
                      <input
                        placeholder="Your Name"
                        className={Classes.allInputTextStyle}
                      />
                    </div>
                    <div>
                      <label className={Classes.labelStyle}>
                        Mobile Number
                      </label>
                      <input
                        placeholder="Enter Number"
                        className={Classes.allInputTextStyle}
                      />
                    </div>
                    <div>
                      <label className={Classes.labelStyle}>Email</label>
                      <input
                        placeholder="Email Address"
                        className={Classes.allInputTextStyle}
                      />
                    </div>
                  </form>
                </div>
                <div style={{ textAlign: "center" }}>
                  <Button
                    className={Classes.accept}
                    style={{ marginTop: "2rem" }}
                    onClick={handleOpen}
                  >
                    SIGNUP
                  </Button>
                </div>
                <div className={Classes.Signup}>
                  <div>
                    <p className={Classes.bottomText}>
                      Already have an account?
                    </p>
                  </div>
                  <div>
                    <p>
                      <button
                        className={Classes.signupAnchor}
                        onClick={handleSignupModalOpen}
                      >
                        Login
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={Classes.SlideButton}>
              <div className={Classes.LoginContainer}>
                <div className={Classes.title}>
                  <div t>
                    <h3 className={Classes.titleh}>Welcome back Login here</h3>
                  </div>
                  <div className={Classes.signupTitleText}>
                    <p className={Classes.titlep}>
                      Please enter your phone number or email
                      <br /> We will send you the OTP.
                    </p>
                  </div>
                </div>
                <div
               className={Classes.flex}
                >
                  <div
                    className={Classes.SocialButtons}
                    style={{ marginBottom: "1rem" }}
                  >
                    <div className={Classes.googleButton}>
                      <button className={Classes.buttonSocial}>
                        <img src={GOOGLE} /> Login with Google
                      </button>
                    </div>
                    <div className={Classes.facebookButton}>
                      <button className={Classes.buttonSocial}>
                        <img src={FB} /> Login with facebook
                      </button>
                    </div>
                  </div>
                  <div style={{ display: "flex" }}>
                    <button className={Classes.buttonSocial}>
                      <img src={APPLE} /> Login with Apple
                    </button>
                  </div>
                </div>
                <div className={Classes.line}>
                  <div
                    style={{
                      borderBottom: "1px solid #585F67",
                      opacity: "0.3",
                    }}
                  ></div>
                  <div className={Classes.orText}>
                    or
                  </div>
                  <div
                    style={{
                      borderBottom: "1px solid #585F67",
                      opacity: "0.3",
                    }}
                  ></div>
                </div>
                <div className={Classes.TabButton}>
                  <div className={Classes.tabHeader}>
                    <div className={Classes.active} style={customTabOne}>
                      <div
                        className={`Classes.tab-item ${activeTab === "tab1" &&
                          "active"}`}
                        onClick={() => handleTabClick("tab1")}
                      >
                        {activeTab === "tab1" ? (
                          <div className={Classes.tabTitleOne}>
                            <span style={{ fontWeight: "600" }}>
                              Phone Number
                            </span>
                          </div>
                        ) : (
                          <div className={Classes.tabTitleOne}>
                            <span>Phone Number</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className={Classes.active} style={customTabtwo}>
                      <div
                        className={`Classes.tab-item ${activeTab === "tab2" &&
                          "active"}`}
                        onClick={() => handleTabClick("tab2")}
                      >
                        {activeTab === "tab1" ? (
                          <div className={Classes.tabTitleTwo}>
                            <span>Email</span>
                          </div>
                        ) : (
                          <div className={Classes.tabTitleTwo}>
                            <span style={{ fontWeight: "600" }}>Email</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={Classes.tabContent}>
                  {activeTab === "tab1" && (
                    <div>
                      <div className={Classes.loginFormInput}>
                        <form style={{}}>
                          <label className={Classes.labelStyle}>Phone</label>
                          <input
                            placeholder="Phone Number"
                            className={Classes.allInputTextStyle}
                          />
                        </form>
                      </div>
                    </div>
                  )}
                  {activeTab === "tab2" && (
                    <div>
                      <div>
                        <form>
                          <label className={Classes.labelStyle}>Email</label>
                          <input
                            placeholder="Email"
                            className={Classes.allInputTextStyle}
                          />
                        </form>
                      </div>
                    </div>
                  )}
                  {/* Add more content for additional tabs */}
                </div>
              </div>
              <div>
                {activeTab === "tab1" ? (
                  <>
                    <Button
                      className={Classes.LoginButton}
                      onClick={handleOtpModalOpen}
                    >
                      LOGIN
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      className={Classes.LoginButton}
                      onClick={handleOpen}
                    >
                      LOGIN
                    </Button>
                  </>
                )}
              </div>
            </div>
            <div className={Classes.Signup}>
              <div>
                <p className={Classes.bottomText}>Don’t have an account?</p>
              </div>
              <div>
                <p>
                  <button
                    className={Classes.signupAnchor}
                    onClick={handleSignupModalOpen}
                  >
                    Signup
                  </button>
                </p>
              </div>
            </div>
            <div className={Classes.SlideTp}>
              {getOtpModal ? (
                <>
                  <Modal
                    open={getOtpModal}
                    onClose={handleOtpModalClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={customTabOtpModalStyle}>
                      <div className={Classes.otpContainer}>
                        <div style={{ textAlign: "center" }}>
                          <div>
                            <h3 className={Classes.titleh}>OTP</h3>
                          </div>
                          <div>
                            <p
                              className={Classes.titlep}
                             
                            >
                              Please enter 6 digit OTP that send to your
                              <br />
                              +91 9879453467
                            </p>
                          </div>
                        </div>
                        <div>
                          <label className={Classes.labelStyle}>OTP</label>
                          <input
                            placeholder="6897"
                            className={Classes.allInputTextStyle}
                          />
                        </div>

                        <div>
                          <Button className={Classes.accept}>Continue</Button>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <div className={Classes.Signup}>
                            <div>
                              <p className={Classes.bottomText}>
                                Don’t recived the code?
                              </p>
                            </div>
                            <div>
                              <p>
                                <button
                                  className={Classes.signupAnchor}
                                  onClick={handleSignupModalOpen}
                                >
                                  resend
                                </button>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Box>
                  </Modal>
                </>
              ) : (
                <>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      {/* <Typography id="modal-modal-title" variant="h6" component="h2">
          Text in a modal
        </Typography> */}
                      <Typography
                        id="modal-modal-description"
                        sx={{ mt: 0 }}
                        style={{ textAlign: "center", paddingBottom: "5px" }}
                      >
                        <div style={{ textAlign: "center", fontSize: "1rem" }}>
                          By login you are agreed to all privacy policy and
                          tearms and conditions
                        </div>
                      </Typography>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Button className={Classes.accept} onClick={handleOpen}>
                          Agree & login
                        </Button>
                      </div>
                    </Box>
                  </Modal>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginToggle;
