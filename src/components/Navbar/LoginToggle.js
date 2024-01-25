import React, { useState } from "react";
import FB from "../../Assets/fb.png";
import GOOGLE from "../../Assets/google.png";
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

  const handleSignupModalOpen = () => {
    setSignupModal(true);
    setIsSignup(true);
  };
  const handleSignupModalClose = () => setSignupModal(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function handleCLick() {}
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const style = {
    position: "absolute",
    bottom: "20%",
    width: "100%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,

    p: 2,
  };

  const customTabOne = {
    backgroundColor: activeTab === "tab1" ? "#fff" : "#F0F0F2",
  };
  const customTabtwo = {
    backgroundColor: activeTab === "tab2" ? "#fff" : "#F0F0F2",
  };
  return (
    <div>
      <div className={Classes.Wrapper}>
        {isSignup ? (
          <>
            <div className={Classes.SignupWrapper}>
              <div className={Classes.signupContainer}>
                <div
                  className={Classes.headerTitle}
                  style={{ marginBottom: "2rem" }}
                >
                  <p className={Classes.signuptitletext}>Sign up</p>
                  <p className={Classes.signupsecondtitle}>
                    Create your Account
                  </p>
                </div>
                <div
                  className={Classes.SocialButtons}
                  style={{ marginBottom: "1rem" }}
                >
                  <div className={Classes.googleButton}>
                    {/* <SocialButton
                      onClick={handleCLick}
                      text="Login with Google"
                      img={FB}
                    /> */}
                    <button>
                      <img src={FB} /> Login with Google
                    </button>
                  </div>
                  <div className={Classes.facebookButton}>
                    {/* <SocialButton
                      onClick={handleCLick}
                      text="Login with facebook"
                      img={GOOGLE}
                    /> */}
                    <button>
                      <img src={GOOGLE} /> Login with facebook
                    </button>
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <div className={Classes.line2}>
                    <div
                      style={{
                        borderBottom: "1px solid #585F67",
                        opacity: "0.3",
                      }}
                    ></div>
                    <div style={{ fontSize: "12px" }}>or</div>
                    <div
                      style={{
                        borderBottom: "1px solid #585F67",
                        opacity: "0.3",
                      }}
                    ></div>
                  </div>
                </div>
                <div>
                  <form
                    style={{
                      // display: "flex",
                      // flexDirection: "column",
                      // textAlign: "start",
                      // width: "21.59375rem",
                      padding: "10px",
                    }}
                    className={Classes.formInputFields}
                  >
                    <label className={Classes.labelStyle}>Name</label>
                    <input
                      placeholder="Name"
                      className={Classes.allInputTextStyle}
                    />
                    <label className={Classes.labelStyle}>Mobile Number</label>
                    <input
                      placeholder="Mobile Number"
                      className={Classes.allInputTextStyle}
                    />
                    <label className={Classes.labelStyle}>Email</label>
                    <input
                      placeholder="Email"
                      className={Classes.allInputTextStyle}
                    />
                  </form>
                </div>
                <div>
                  <Button
                    className={Classes.accept}
                    style={{ marginTop: "2rem" }}
                    onClick={handleOpen}
                  >
                    SIGN UP
                  </Button>
                  <p>already have an account?</p>
                  <a style={{ color: "#1877F2" }}>PrivacyPolicy</a>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={Classes.SlideButton}>
              <div className={Classes.LoginContainer}>
                <div className={Classes.title}>
                  <h3>Welcome back Login here</h3>
                  <p>
                    Please enter your phone number or email We will send you the
                    OTP.
                  </p>
                </div>
                <div className={Classes.SocialButtons}>
                  <div className={Classes.googleButton}>
                    {/* <SocialButton
                      onClick={handleCLick}
                      text="Login with Google"
                      img={FB}
                    /> */}
                    <button>
                      <img src={FB} /> Login with Google
                    </button>
                  </div>
                  <div className={Classes.facebookButton}>
                    {/* <SocialButton
                      onClick={handleCLick}
                      text="Login with facebook"
                      img={GOOGLE}
                    /> */}
                    <button>
                      <img src={GOOGLE} /> Login with facebook
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
                  <div style={{ fontSize: "12px" }}>or</div>
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
                          <div
                            className={Classes.phone}
                            style={{ width: "7.77419rem" }}
                          >
                            Phone Number
                          </div>
                        ) : (
                          <div
                            className={Classes.Email}
                            style={{ width: "7.77419rem" }}
                          >
                            Phone Number
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
                          <div style={{ width: "7.77419rem" }}>Email</div>
                        ) : (
                          <div style={{ width: "7.77419rem" }}>Email</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={Classes.tabContent}>
                  {activeTab === "tab1" && (
                    <div>
                      <div>
                        <form
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            textAlign: "start",
                            width: "21.59375rem",
                          }}
                        >
                          <label className={Classes.labelStyle}>Phone</label>
                          <input
                            placeholder="Phone Number"
                            style={{
                              fill: "#FFF",
                              height: "2.25rem",
                              width: "21.59375rem",
                              strokeWidth: "1px",
                              stroke: "#C1CBCD",
                              color: "#C1CBCD",

                              fontFamily: "Lato",
                              fontSize: "0.875rem",
                              fontStyle: "normal",
                              fontWeight: "400",
                              lineHeight: "normal",
                              boxShadow:
                                "0px 1px 5px 0px rgba(25, 36, 45, 0.04) inset",
                            }}
                          />
                        </form>
                      </div>
                    </div>
                  )}
                  {activeTab === "tab2" && (
                    <div>
                      <div>
                        <form
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            textAlign: "start",
                            width: "21.59375rem",
                          }}
                        >
                          <label className={Classes.labelStyle}>Email</label>
                          <input
                            placeholder="Email"
                            style={{
                              fill: "#FFF",
                              height: "2.25rem",

                              width: "21.59375rem",
                              strokeWidth: "1px",
                              stroke: "#C1CBCD",
                              color: "#C1CBCD",
                              boxShadow:
                                "0px 1px 5px 0px rgba(25, 36, 45, 0.04) inset",

                              fontFamily: "Lato",
                              fontSize: "0.875rem",
                              fontStyle: "normal",
                              fontWeight: "400",
                              lineHeight: "normal",
                            }}
                          />
                        </form>
                      </div>
                    </div>
                  )}
                  {/* Add more content for additional tabs */}
                </div>
              </div>
              <div>
                <Button className={Classes.LoginButton} onClick={handleOpen}>
                  LOGIN
                </Button>
              </div>
            </div>
            <div className={Classes.Signup}>
              <div>
                <p className={Classes.signupText}>Don’t have an account?</p>
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
            <div className={Classes.SlideTop}>
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
                      By login you are agreed to all privacy policy and tearms
                      and conditions
                    </div>
                  </Typography>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      paddingTop: "10px",
                      gap: "rem",
                    }}
                  >
                    <Button className={Classes.accept} onClick={handleOpen}>
                      Agree & login
                    </Button>
                  </div>
                </Box>
              </Modal>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginToggle;
