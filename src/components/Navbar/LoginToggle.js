import React, { useState, useEffect } from "react";
import FB from "../../Assets/fb.png";
import GOOGLE from "../../Assets/google.png";
import APPLE from "../../Assets/apple.png";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button } from "antd";
import Classes from "./MobileNav.module.css";
import * as Urls from "../../Urls";
import { LoginSocialGoogle } from "reactjs-social-login";
import { signInWithPopup } from "firebase/auth";
import axios from "axios";
import * as urls from "../../Urls";
// import { Auth, GoogleAuthProvider } from "firebase/auth";
import { auth, googleAuthProvider, facebookAuthProvider } from "../../firebase";
import { Link } from "react-router-dom";
import Joi from "joi";
import PrivacyModal from "./PrivacyModal";

const signUpSchema = Joi.object({
  username: Joi.string()
    .trim()
    .regex(/^[a-zA-Z]+$/)
    .required()
    .messages({
      "string.base": `"" should be a type of string`,
      "string.empty": `Name required`,
      "string.pattern.base": `Should be a albhabet`,
      "any.required": `"" is a required field`,
    }),
  mobile: Joi.string()
    .trim()
    .regex(/^[6-9]\d{9}$/)
    .required()
    .messages({
      "string.base": `"" should be a type of string`,
      "string.empty": `Phone number required`,
      "string.pattern.base": `"" must be 10 digit number`,
      "any.required": `"" is a required field`,
    }),
  email: Joi.string()
    .trim()
    .regex(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    .required()
    .messages({
      "string.base": `"" should be a type of string`,
      "string.empty": `Email required`,
      "string.pattern.base": `youremail@gmail.com`,
      "any.required": `"" is a required field`,
    }),
});

const LoginToggle = (props) => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [open, setOpen] = useState(false);
  const [signUpModal, setSignupModal] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [getOtpModal, setGetOtpModal] = useState(false);
  const [signUpData, setSignUpData] = useState({
    username: "",
    mobile: "",
    email: "",
  });
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isDesk, setIsDesk] = useState(
    window.innerWidth >= 300 && window.innerWidth <= 575
  );

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
  const handleLoginModalOpen = () => {
    setIsSignup(false);
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
    bottom: 0,
    width: "100%",
    height: "auto",
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    p: 2,
    outline: "none",
  };
  const styleDesk = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    width: "25%",
    height: "auto",
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    p: 2,
    outline: "none",
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
    outline: "none",
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
    p: 2,
    outline: "none",
  };

  const customTabOne = {
    backgroundColor: activeTab === "tab1" ? "#fff" : "#F0F0F2",
    width:'50%',
  };
  const customTabtwo = {
    backgroundColor: activeTab === "tab2" ? "#fff" : "#F0F0F2",
    width:"50%"
  };

  const [validationErrors, setValidationErrors] = useState({});
  const validateForm = () => {
    const validation = signUpSchema.validate(signUpData, {
      abortEarly: false,
    });

    if (validation.error) {
      const errors = {};
      validation.error.details.forEach((error) => {
        errors[error.path[0]] = error.message;
      });
      setValidationErrors(errors);
      return false;
    }

    setValidationErrors({});
    return true;
  };

  const handleSignInWithGoogle = async () => {
    try {
      const response = await signInWithPopup(auth, googleAuthProvider);
      console.log("responsegoogle", response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignInWithFb = async () => {
    try {
      const response = await signInWithPopup(auth, facebookAuthProvider);
      console.log("responsefacebook", response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSignUpData({
      ...signUpData,
      [name]: value,
    });
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        const body = {
          name: signUpData.username,
          phone_code: "+91",
          phone_number: signUpData.mobile,
          email: signUpData.email,
          login_type: "NORMAL",
        };
        const response = await axios.post(Urls.register, body);
        if (response.data.results.status_code === 200) {
          alert("Successfully Registered");
          handleLoginModalOpen();
        } else {
        }
      } catch (error) {
        alert(error.response.data.results.message);
      }
    } else {
      console.log("Not valid");
    }
  };

  const sendOtp = async () => {
    try {
      const body = {
        phone_code: "+91",
        phone: mobileNumber,
        createuser: "False",
        forgotuser: "False",
      };
      const response = await axios.post(Urls.sentOtp, body);
      console.log(response.data);
      if (response.data[0] === "Otp send Successfully") {
        handleOtpModalOpen();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loginHandler = () => {
    const body = {
      username: mobileNumber,
    };
    axios
      .post(urls.Login, body)
      .then((response) => {
        if (response.data.results.status_code === 200) {
          localStorage.setItem("swaToken", response.data.results.token);
          localStorage.setItem("userName", response.data.results.data.name);
          localStorage.setItem(
            "phoneNumber",
            response.data.results.data.phone_number
          );

          // props.logAct(response.data.results.token);
          props.onClose();
        } else if (response.data.results.status_code === 401) {
          // setLoginError("Incorrect username or password!");
          console.log("Incorrect username or password!");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const verifyOtp = async () => {
    const body = {
      phone: mobileNumber,
      phone_code: "+91",
      otp: otp,
    };
    try {
      const response = await axios.post(Urls.verifyOTP, body);
      if (response.data.results.status_code === 200) {
        loginHandler();
      }
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
                          value={signUpData.username}
                          name="username"
                          onChange={handleInputChange}
                        />
                        <p className={Classes.ErrorText}>
                          {validationErrors.username &&
                            validationErrors.username}
                        </p>
                      </div>
                      <div>
                        <label className={Classes.labelStyle}>
                          Mobile Number
                        </label>
                        <input
                          placeholder="Enter Number"
                          className={Classes.allInputTextStyle}
                          value={signUpData.mobile}
                          name="mobile"
                          onChange={handleInputChange}
                        />
                        <p className={Classes.ErrorText}>
                          {validationErrors.mobile && validationErrors.mobile}
                        </p>
                      </div>
                      <div>
                        <label className={Classes.labelStyle}>Email</label>
                        <input
                          placeholder="Email Address"
                          className={Classes.allInputTextStyle}
                          value={signUpData.email}
                          name="email"
                          onChange={handleInputChange}
                        />
                        <p className={Classes.ErrorText}>
                          {validationErrors.email && validationErrors.email}
                        </p>
                      </div>
                    </div>
                  </form>
                </div>
                <div style={{ textAlign: "center" }}>
                  <button
                    className={Classes.accept}
                    style={{ marginTop: "15px" }}
                    onClick={handleSignUp}
                    type="submit"
                  >
                    SIGNUP
                  </button>
                </div>
                <div className={Classes.SignupTextWrapper}>
                  <div className={Classes.Signup}>
                    <span className={Classes.bottomText}>
                      Already have account?
                    </span>
                    <span
                      className={Classes.signupAnchor}
                      onClick={handleLoginModalOpen}
                    >
                      Login
                    </span>
                  </div>
                 
                    <div
                      style={{
                        textAlign: "center",
                    
                      }}
                    >
                     <PrivacyModal/>
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
                    <div className={Classes.orText}>Or</div>
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
                      <button
                        className={Classes.buttonSocial}
                        onClick={handleSignInWithGoogle}
                      >
                        <img src={GOOGLE} /> Sign Up with Google
                      </button>
                    </div>
                    <div className={Classes.facebookButton}>
                      <button
                        className={Classes.buttonSocial}
                        onClick={handleSignInWithFb}
                      >
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
                  <div style={{}}>
                    <h3 className={Classes.titleh}>Welcome back</h3>
                  </div>
                  <div className={Classes.signupTitleText}>
                    {activeTab === "tab1" ? (
                      <>
                        <p className={Classes.titlep}>
                          Please enter your Phone Number we will
                          <br />
                          send you OTP
                        </p>
                      </>
                    ) : (
                      <>
                        <p className={Classes.titlep}>
                          Please enter your Email we will
                          <br />
                          send you OTP
                        </p>
                      </>
                    )}
                  </div>
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
                          <label className={Classes.labelStyle}>
                            Mobile Number
                          </label>
                          <input
                            placeholder="Enter Mobile Number"
                            className={Classes.allInputTextStyle}
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
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
                            placeholder="Enter Email address"
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
                    <button
                      className={Classes.LoginButton}
                      // onClick={loginHandler}
                      onClick={sendOtp}
                    >
                      LOGIN
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className={Classes.LoginButton}
                      onClick={handleOpen}
                    >
                      LOGIN
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className={Classes.line}>
              <div
                style={{
                  borderBottom: "1px solid #585F67",
                  opacity: "0.3",
                }}
              ></div>
              <div className={Classes.orText}>Or login with</div>
              <div
                style={{
                  borderBottom: "1px solid #585F67",
                  opacity: "0.3",
                }}
              ></div>
            </div>
            <div className={Classes.flex}>
              <div
                className={Classes.SocialButtons}
                style={{ marginBottom: "1rem" }}
              >
                <div className={Classes.googleButton}>
                  <button
                    className={Classes.buttonSocial}
                    onClick={handleSignInWithGoogle}
                  >
                    <img src={GOOGLE} /> Login with Google
                  </button>
                </div>
                <div className={Classes.facebookButton}>
                  <button
                    className={Classes.buttonSocial}
                    onClick={handleSignInWithFb}
                  >
                    <img src={FB} /> Login with facebook
                  </button>
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <button
                  style={{ paddingBottom: "4px" }}
                  className={Classes.buttonSocial}
                >
                  <img src={APPLE} /> Login with Apple
                </button>
              </div>
            </div>
            <div className={Classes.Signup} style={{ paddingTop: "10px" }}>
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
                    <Box
                      sx={
                        isDesk
                          ? customTabOtpModalStyle
                          : customDestOtpModalStyle
                      }
                    >
                      <div className={Classes.otpContainer}>
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
                              +91 9879453467
                            </p>
                          </div>
                        </div>
                        <div>
                          <label className={Classes.labelStyle}>OTP</label>
                          <input
                            placeholder="6897"
                            className={Classes.allInputTextStyle}
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                          />
                        </div>
                        <div onClick={verifyOtp}>
                          <button className={Classes.accept}>Continue</button>
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
                    <Box sx={isDesk ? style : styleDesk}>
                      {/* <Typography id="modal-modal-title" variant="h6" component="h2">
          Text in a modal
        </Typography> */}
                      <Typography
                        sx={{ p: 2 }}
                        style={{ textAlign: "center", padding: "5px" }}
                      >
                        <div>
                          <span
                            style={{
                              textAlign: "center",
                              fontSize: "14px",
                              fontWeight: "400",
                            }}
                          >
                            By login you are agreed to all privacy policy and
                            terms and conditions
                          </span>
                        </div>
                        <PrivacyModal/>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <button
                            className={Classes.acceptT}
                            onClick={handleOpen}
                          >
                            Agree & login
                          </button>
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
