"use client";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Classes from "./MobileNav.module.css";
import * as Urls from "@/utils/urls";
import { signInWithPopup } from "firebase/auth";
import axios from "axios";
import {
  auth,
  googleAuthProvider,
  facebookAuthProvider,
} from "../../firebase.js";
import PrivacyModal from "./PrivacyModal";
import CircularProgress from "@mui/material/CircularProgress";
import OtpModal from "./OtpModal";
import { useAuth } from "@/providers/auth-provider";

const LoginToggle = (props) => {
  const [activeTab, setActiveTab] = useState("tab2");
  const [open, setOpen] = useState(false);
  const [getOtpModal, setGetOtpModal] = useState(false);
  const [timer, setTimer] = useState(60);
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [emailId, setEmailId] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDesk, setIsDesk] = useState(false);
  const [countryName, setCountryName] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const { setAuth } = useAuth();

  useEffect(() => {
    const countryName = localStorage.getItem("country_name");
    setCountryName(countryName);
  });

  useEffect(() => {
    setIsDesk(window?.innerWidth >= 300 && window?.innerWidth <= 575);

    const handleResize = () => {
      setIsDesk(window?.innerWidth >= 300 && window?.innerWidth <= 575);
    };

    window?.addEventListener("resize", handleResize);

    return () => {
      window?.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleOtpModalOpen = () => setGetOtpModal(true);
  const handleOtpModalClose = () => setGetOtpModal(false);

  const handleOpen = (event) => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleTabClick = (tab) => {
    if (countryName === "India") {
      setActiveTab(tab);
    } else {
      alert("Mobile login only available in India");
    }
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

  const notRegisteredMessage =
    "No account found with this email or phone number.";

  const handleSignInWithGoogle = async () => {
    try {
      const response = await signInWithPopup(auth, googleAuthProvider);

      if (response && response.user) {
        const user = response.user;
        const loginBody = {
          username: user.email,
          login_type: "GOOGLE",
        };

        const loginResponse = await axios.post(Urls.Login, loginBody);

        if (loginResponse && loginResponse.data.results.status_code === 200) {
          setAuth(loginResponse.data.results.token, {
            userName: loginResponse.data.results.data.name,
            userProfile: loginResponse.data.results.data.image,
            phoneNumber: loginResponse.data.results.data.phone_number,
            userEmail: loginResponse.data.results.data.email,
          });
          setGetOtpModal(false);
          setTimeout(() => {
            props.onClose();
          }, 500);
        } else if (
          loginResponse &&
          loginResponse.data.results.status_code === 401
        ) {
          setValidationErrors({ username: notRegisteredMessage });
        } else {
          setValidationErrors({ otp: "Failed to login. Please try again." });
        }
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      if (error.code === "auth/popup-closed-by-user") {
        alert("Sign-in popup was closed before completing the process.");
      } else {
        alert("An error occurred during Google sign-in. Please try again.");
      }
    }
  };

  const handleSignInWithFb = async () => {
    try {
      const response = await signInWithPopup(auth, facebookAuthProvider);

      if (response && response.user) {
        const user = response.user;
        const loginBody = {
          username: user.email,
          login_type: "FACEBOOK",
        };

        const loginResponse = await axios.post(Urls.Login, loginBody);

        if (loginResponse && loginResponse.data.results.status_code === 200) {
          localStorage.setItem("swaToken", loginResponse.data.results.token);
          setAuth(loginResponse.data.results.token, {
            userName: loginResponse.data.results.data.name,
            userProfile: loginResponse.data.results.data.image,
            phoneNumber: loginResponse.data.results.data.phone_number,
            userEmail: loginResponse.data.results.data.email,
          });
          setGetOtpModal(false);
          setTimeout(() => {
            props.onClose();
          }, 500);
        } else if (
          loginResponse &&
          loginResponse.data.results.status_code === 401
        ) {
          setValidationErrors({ username: notRegisteredMessage });
        } else {
          setValidationErrors({ otp: "Failed to login. Please try again." });
        }
      }
    } catch (error) {
      console.error("Facebook Sign-In Error:", error);
      if (error.code === "auth/popup-closed-by-user") {
        alert("Sign-in popup was closed before completing the process.");
      } else {
        alert("An error occurred during Facebook sign-in. Please try again.");
      }
    }
  };

  const sendOtp = async (phone = mobileNumber) => {
    const body = {
      phone_code: "+91",
      phone: phone,
      email: "",
      createuser: "False",
      forgotuser: "False",
    };
    const mobileNumberRegex = /^\d{10}$/;
    if (!phone) {
      setValidationErrors({
        username: "Mobile number is required",
      });
      return false;
    }

    if (!mobileNumberRegex.test(phone)) {
      setValidationErrors({
        username: "Mobile number must be 10 digits",
      });
      return false;
    }
    setIsLoading(true);
    try {
      const response = await axios.post(Urls.sentOtp, body);
      if (response.data[0] === "Otp send Successfully") {
        handleOtpModalOpen();
        setTimer(60);
      } else if (
        response.data.results.message ===
        "CustomUser matching query does not exist."
      ) {
        setValidationErrors({
          username: notRegisteredMessage,
        });
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const sendOtpEmail = async (email = emailId) => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!email.trim()) {
      setValidationErrors({
        username: "Email must not be empty",
      });
      return false;
    }
    if (!emailRegex.test(email)) {
      setValidationErrors({
        username: "Invalid email address",
      });
      return false;
    }

    try {
      const body = {
        phone_code: "",
        phone: "",
        email: email,
        createuser: "False",
        forgotuser: "False",
      };
      setIsLoading(true);
      const response = await axios.post(Urls.sentOtp, body);

      if (response.data[0] === "Otp send Successfully") {
        handleOtpModalOpen();
      } else if (
        response.data.results.message ===
        "CustomUser matching query does not exist."
      ) {
        setValidationErrors({
          username: notRegisteredMessage,
        });
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const loginHandler = () => {
    const body = {
      username: mobileNumber ? mobileNumber : emailId,
    };
    axios
      .post(Urls.Login, body)
      .then((response) => {
        if (response.data.results.status_code === 200) {
          setAuth(response.data.results.token, {
            userName: response.data.results.data.name,
            userProfile: response.data.results.data.image,
            phoneNumber: response.data.results.data.phone_number,
            userEmail: response.data.results.data.email,
          });
          setGetOtpModal(false);
          setTimeout(() => {
            props.onClose();
          }, 500);
        } else if (response.data.results.status_code === 401) {
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
      if (response.data.results.message === "Otp verified successfully!") {
        props.setText("Logged In");

        props.setShowSuccessModal(true);
        setTimeout(() => {
          props.setShowSuccessModal(false);
        }, 3000);
      } else {
        setOtpError("Invalid otp");
      }
    } catch (error) {}
  };

  const verifyOtpEmail = async () => {
    if (!otp) {
      setOtpError("Please enter OTP");
      return;
    }
    const body = {
      email: emailId,
      phone: "",
      phone_code: "",
      otp: otp,
    };
    try {
      const response = await axios.post(Urls.verifyOTP, body);
      if (response.data.results.status_code === 200) {
        props.setText("Logged In");
        props.setShowSuccessModal(true);
        setTimeout(() => {
          props.setShowSuccessModal(false);
        }, 3000);
        loginHandler();
      } else {
        setOtpError("Invalid otp");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handelLoginForm = (e) => {
    e.preventDefault();
    if (!username) {
      setValidationErrors({
        username: "Email or Phone Number is required",
      });
      return;
    }
    let emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let mobileNumberRegex = /^\d{10}$/;
    if (emailRegex.test(username)) {
      setEmailId(username);
      setMobileNumber("");
      setValidationErrors({});
      sendOtpEmail(username);
    } else if (mobileNumberRegex.test(username)) {
      setMobileNumber(username);
      setEmailId("");
      setValidationErrors({});
      sendOtp(username);
    } else {
      setValidationErrors({
        username: "Invalid email or phone number",
      });
    }
  };

  const handleOtpForm = (e) => {
    e.preventDefault();
    if (mobileNumber) {
      verifyOtp();
    } else {
      verifyOtpEmail();
    }
  };

  useEffect(() => {
    let countdown;
    if (getOtpModal && timer > 0) {
      countdown = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
    }
    return () => clearTimeout(countdown);
  }, [timer, getOtpModal]);

  useEffect(() => {
    if (getOtpModal) {
      setTimer(60);
    }
  }, [getOtpModal]);

  return (
    <div className={`${Classes.loginToffle}`}>
      <div className={Classes.Wrapper}>
        <form onSubmit={handelLoginForm}>
          <div className={Classes.SlideButton}>
            <div className={Classes.LoginContainer}>
              <div className={Classes.title}>
                <div style={{}}>
                  {!props.text && !props.loginText ? (
                    <h3 className={Classes.titleh}>Welcome Back</h3>
                  ) : (
                    <h3 className={Classes.titleh}>
                      {props.text}
                      {props.loginText}
                    </h3>
                  )}
                </div>
                <div className={Classes.signupTitleText}>
                  <p className={Classes.titlep}>
                    Please enter your Email or Phone Number we will
                    <br />
                    send you OTP
                  </p>
                </div>
              </div>
              <div className={`${Classes.tabContent} mt-6`}>
                <label className={Classes.labelStyle} htmlFor="email">
                  Email or Phone Number
                </label>
                <input
                  name="username"
                  type="text"
                  placeholder="Enter Email or Phone Number"
                  className={Classes.allInputTextStyle}
                  value={username || ""}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <p className={Classes.ErrorText}>
                  {validationErrors.username && validationErrors.username}
                </p>
              </div>
            </div>
            <div>
              {activeTab === "tab1" ? (
                <>
                  <button
                    type="submit"
                    className={Classes.LoginButton}
                    name="phone"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <CircularProgress
                            size={20}
                            sx={{
                              color: "#fff",
                            }}
                          />
                        </Box>
                      </>
                    ) : (
                      <>Login</>
                    )}
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="submit"
                    name="mail"
                    className={Classes.LoginButton}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        {" "}
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <CircularProgress
                            size={20}
                            sx={{
                              color: "#fff",
                            }}
                          />
                        </Box>
                      </>
                    ) : (
                      <>Login</>
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </form>
        <div className={Classes.SlideTp}>
          {getOtpModal ? (
            <>
              <OtpModal
                getOtpModal={getOtpModal}
                handleOtpModalClose={handleOtpModalClose}
                isDesk={isDesk}
                customTabOtpModalStyle={customTabOtpModalStyle}
                customDestOtpModalStyle={customDestOtpModalStyle}
                handleOtpForm={handleOtpForm}
                otpError={otpError}
                handelLoginForm={handelLoginForm}
                timer={timer}
                mobileNumber={mobileNumber}
                emailId={emailId}
                otp={otp}
                setOtp={setOtp}
              />
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
                  <div
                    sx={{ p: 2 }}
                    style={{
                      textAlign: "center",
                      padding: "5px",
                    }}
                  >
                    <div>
                      <span
                        style={{
                          textAlign: "center",
                          fontSize: "14px",
                          fontWeight: "400",
                        }}
                      >
                        By login you are agreed to all privacy policy and terms
                        and conditions
                      </span>
                    </div>
                    <PrivacyModal />
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <button className={Classes.acceptT} onClick={handleOpen}>
                        Agree & login
                      </button>
                    </div>
                  </div>
                </Box>
              </Modal>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginToggle;
