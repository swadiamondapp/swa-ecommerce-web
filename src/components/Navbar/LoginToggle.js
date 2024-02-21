import React, { useState,useEffect } from "react";
import FB from "../../Assets/fb.png";
import GOOGLE from "../../Assets/google.png";
import APPLE from "../../Assets/apple.png";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button } from "antd";
import Classes from "./MobileNav.module.css";
import { LoginSocialGoogle } from "reactjs-social-login";
import { signInWithPopup } from "firebase/auth";
// import { Auth, GoogleAuthProvider } from "firebase/auth";
import { auth, googleAuthProvider } from "../../firebase";

const LoginToggle = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [open, setOpen] = useState(false);
  const [signUpModal, setSignupModal] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [getOtpModal, setGetOtpModal] = useState(false);

  const [isDesk, setIsDesk] = useState(window.innerWidth >= 300 && window.innerWidth <= 575);

  useEffect(() => {
    const handleResize = () => {
      setIsDesk(window.innerWidth >= 300 && window.innerWidth <= 575);
  
    };


    // Add event listener to listen for window resize
    window.addEventListener("resize", handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isDesk]);




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
    bottom:  0,
    width:  "100%",
    height: "auto" ,
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    p: 1,
  };
  const styleDesk = {
    position: "absolute",
    top:'50%',
    left:"50%",
    transform: "translate(-50%,-50%)",
    width:  "25%",
    height: "auto" ,
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    p: 1,
  };
  const customTabOtpModalStyle = {
    position: "absolute",
    width: "90%",
    height: "auto",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)",
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    p: 1,
  };
  const customDestOtpModalStyle = {
    position: "absolute",
    width: "30%",
    height: "auto",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)",
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    p: 1,
  };


  const customTabOne = {
    backgroundColor: activeTab === "tab1" ? "#fff" : "#F0F0F2",
  };
  const customTabtwo = {
    backgroundColor: activeTab === "tab2" ? "#fff" : "#F0F0F2",
  };

  const handleSignInWithGoogle = async () => {
    try {
      const response = await signInWithPopup(auth, googleAuthProvider);
      console.log("responsegoogle", response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={Classes.loginToffle}>
      <div className={Classes.Wrapper}>
        {isSignup ? (
          <>
            <div className={Classes.SignupWrapper}>
              <div className={Classes.signupContainer}>
                <div
                  className={Classes.headerTitle}
                  // style={{ marginBottom: "1rem" }}
                >
                  <p className={Classes.signuptitletext}>Sign up</p>

                  <p className={Classes.titlep}>Create your Account</p>
                </div>

                <div className={Classes.signupInputFields}>
                  <form>
                    <div className={Classes.formgap}>
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
                <div className={Classes.SignupTextWrapper}>
                  <div className={Classes.Signup}>
                    <span className={Classes.bottomText}>
                      Already have account?
                    </span>
                    <span
                      className={Classes.signupAnchor}
                      onClick={handleSignupModalOpen}
                    >
                      Login
                    </span>
                  </div>
                </div>

                <div style={{ display: "flex", marginBottom: "0.5rem" }}>
                  <div className={Classes.line2}>
                    <div
                      style={{
                        borderBottom: "1px solid #585F67",
                        opacity: "0.3",
                      }}
                    ></div>
                    <div className={Classes.orText}>or</div>
                    <div
                      style={{
                        borderBottom: "1px solid #585F67",
                        opacity: "0.3",
                      }}
                    ></div>
                  </div>
                </div>

                <div className={Classes.flex}>
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
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={Classes.SlideButton}>
              <div className={Classes.LoginContainer}>
                <div className={Classes.title}>
                  <div style={{ paddingBottom: "10px" }}>
                    <h3 className={Classes.titleh}>Welcome back Login here</h3>
                  </div>
                  <div className={Classes.signupTitleText}>
                    <p className={Classes.titlep}>
                      Please enter your phone number or email
                      <br /> We will send you the OTP.
                    </p>
                  </div>
                </div>
                <div className={Classes.flex}>
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
                  <div className={Classes.orText}>or</div>
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
              <span className={Classes.bottomText}>Don’t have an account?</span>
              <span
                className={Classes.signupAnchor}
                onClick={handleSignupModalOpen}
              >
                Signup
              </span>
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
                    <Box sx={isDesk?  customTabOtpModalStyle : customDestOtpModalStyle}>
                      <div className={Classes.otpContainer}>
                        <div style={{ textAlign: "center" }}>
                          <div>
                            <h3 className={Classes.titleh}>OTP</h3>
                          </div>
                          <div>
                            <p className={Classes.titlep}>
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
                            <span className={Classes.bottomText}>
                              Don’t recived the code?
                            </span>
                            <span
                              className={Classes.signupAnchor}
                              onClick={handleSignupModalOpen}
                            >
                              Resend
                            </span>
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
                    <Box sx={isDesk? style: styleDesk }>
                      {/* <Typography id="modal-modal-title" variant="h6" component="h2">
          Text in a modal
        </Typography> */}
                      <Typography
                        sx={{ p: 2 }}
                        style={{ textAlign: "center", padding: "5px" }}
                      >
                        <div style={{ textAlign: "center", fontSize: "1rem" }}>
                          By login you are agreed to all privacy policy and
                          tearms and conditions
                        </div>
                        <div
                          style={{
                            textAlign: "center",
                       
                            padding: "5px 0px",
                          }}
                        >
                          <p style={{color:'rgba(24, 119, 242, 1)',padding:'10px 0px'}}>privacy & policy</p>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Button
                            className={Classes.acceptT}
                            onClick={handleOpen}
                          >
                            Agree & login
                          </Button>
                        </div>
                      </Typography>
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
