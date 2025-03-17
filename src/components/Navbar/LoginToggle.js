"use client";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Classes from "./MobileNav.module.css";
import * as Urls from "@/utils/urls";
import { signInWithPopup } from "firebase/auth";
import axios from "axios";
// import { Auth, GoogleAuthProvider } from "firebase/auth";
import {
  auth,
  googleAuthProvider,
  facebookAuthProvider,
} from "../../firebase.js";
import Joi from "joi";
import PrivacyModal from "./PrivacyModal";
import CircularProgress from "@mui/material/CircularProgress";
import LoginSuccessModal from "@/components/loginSuccessModal/loginsuccessmodal";
import OtpModal from "./OtpModal";
import Image from "next/image";
import { useAuth } from "@/providers/auth-provider";

const signUpSchema = Joi.object({
  username: Joi.string()
    .trim()
    // .regex(/^[a-zA-Z]+$/)
    .regex(/^[a-zA-Z\s]+$/)
    .required()
    .messages({
      "string.base": `"" should be a type of string`,
      "string.empty": `Name required`,
      "string.pattern.base": `Should be an albhabet`,
      "any.required": `"" is a required field`,
    }),
  mobile: Joi.string()
    .trim()
    .regex(/^[6-9]\d{9}$/)
    .required()
    .messages({
      "string.base": `should be a type of string`,
      "string.empty": `Phone number required`,
      "string.pattern.base": `must be 10 digit number`,
      "any.required": `is a required field`,
    }),
  email: Joi.string()
    .trim()
    .regex(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    .required()
    .messages({
      "string.base": `should be a type of string`,
      "string.empty": `Email must not be empty`,
      "string.pattern.base": `Enter your email@gmail.com`,
      "any.required": `is a required field`,
    }),
  honorific_name: Joi.string()
    .valid("Mr", "Mrs", "Others")
    .required()
    .messages({
      "any.only": `Honorific name must be one of Mr, Mrs, or Others`,
      "any.required": `Honorific name is a required field`,
    }),
});

const LoginToggle = (props) => {
  const [activeTab, setActiveTab] = useState("tab2");
  const [open, setOpen] = useState(false);
  const [signUpModal, setSignupModal] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [getOtpModal, setGetOtpModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [timer, setTimer] = useState(60);
  const [AlreadyExistText, setAlreadyExistText] = useState("");
  const { token } = useAuth();
  const [showRegisterSuccessModal, setShowRegisterSuccessModal] =
    useState(false);
  const [text, setText] = useState("");
  const [signUpData, setSignUpData] = useState({
    username: "",
    mobile: "",
    email: "",
    honorific_name: "",
  });
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [emailId, setEmailId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDesk, setIsDesk] = useState(false);
  // const Contryname = localStorage.getItem("country_name");
  const [countryName, setCountryName] = useState("");
  useEffect(() => {
    const countryName = localStorage.getItem("country_name");
    setCountryName(countryName);
  });
  const { setAuth } = useAuth();
  useEffect(() => {
    // This code will only run on the client side
    setIsDesk(window?.innerWidth >= 300 && window?.innerWidth <= 575);

    const handleResize = () => {
      setIsDesk(window?.innerWidth >= 300 && window?.innerWidth <= 575);
    };

    window?.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener when component unmounts
    return () => {
      window?.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSignupModalOpen = () => {
    setSignUpData({
      ...signUpData,
      mobile: mobileNumber && mobileNumber,
      email: emailId && emailId,
    });
    setSignupModal(true);
    setIsSignup(true);
  };
  useEffect(() => {
    // Check if props.LoginSignupToggle is true
    if (props.LoginSignupToggle || props.isSignpuMobile) {
      // If true, set isSignup to true
      setIsSignup(true);
    }
  }, [props.LoginSignupToggle]);
  const handleLoginModalOpen = () => {
    setIsSignup(false);
  };
  const handleGetOtp = () => {
    setGetOtpModal(true);
  };

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

  const customTabOne = {
    backgroundColor: activeTab === "tab1" ? "#fff" : "#F0F0F2",
    width: "50%",
  };
  const customTabtwo = {
    backgroundColor: activeTab === "tab2" ? "#fff" : "#F0F0F2",
    width: "50%",
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
      console.log("Google Sign-In Response:", response);

      if (response && response.user) {
        const user = response.user;
        const loginBody = {
          username: user.email,
          login_type: "GOOGLE",
        };

        // Call Login API
        const loginResponse = await axios.post(Urls.Login, loginBody);
        console.log("Login API Response:", loginResponse);

        if (loginResponse && loginResponse.data.results.status_code === 200) {
          // Successful login
          // localStorage.setItem("swaToken", loginResponse.data.results.token);
          // ... other localStorage set items
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
          // User not registered
          console.log("User not registered. Attempting registration...");
          await attemptRegistration(user, loginBody);
        } else {
          setValidationErrors({ otp: "Failed to login. Please try again." });
        }
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      // Handle specific errors
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
      console.log("Facebook Sign-In Response:", response);

      if (response && response.user) {
        const user = response.user;
        const loginBody = {
          username: user.email,
          login_type: "FACEBOOK",
        };

        // Call Login API
        const loginResponse = await axios.post(Urls.Login, loginBody);
        console.log("Login API Response:", loginResponse);

        if (loginResponse && loginResponse.data.results.status_code === 200) {
          // Successful login
          localStorage.setItem("swaToken", loginResponse.data.results.token);
          setAuth(loginResponse.data.results.token, {
            userName: loginResponse.data.results.data.name,
            userProfile: loginResponse.data.results.data.image,
            phoneNumber: loginResponse.data.results.data.phone_number,
            userEmail: loginResponse.data.results.data.email,
          });
          // ... other localStorage set items
          setGetOtpModal(false);
          setTimeout(() => {
            props.onClose();
          }, 500);
        } else if (
          loginResponse &&
          loginResponse.data.results.status_code === 401
        ) {
          // User not registered
          console.log("User not registered. Attempting registration...");
          await attemptRegistration(user, loginBody);
        } else {
          setValidationErrors({ otp: "Failed to login. Please try again." });
        }
      }
    } catch (error) {
      console.error("Facebook Sign-In Error:", error);
      // Handle specific errors
      if (error.code === "auth/popup-closed-by-user") {
        alert("Sign-in popup was closed before completing the process.");
      } else {
        alert("An error occurred during Facebook sign-in. Please try again.");
      }
    }
  };

  const attemptRegistration = async (user, loginBody) => {
    try {
      // Prepare the registration data
      const signUpData = {
        name: user.userName || user.userEmail, // Use displayName or email as username
        phone_code: "+91", // Assuming phone code is always India (+91), adjust if needed
        phone_number: "", // You can leave this blank for Google users or provide a default
        email: user.email, // Use the email from the Google user
        login_type: "GOOGLE", // Google login type
        honorific_name: "", // You can leave this empty or get this from the user, if needed
      };

      // Call the register API
      const response = await axios.post(Urls.register, signUpData);

      if (
        response &&
        response.data &&
        response.data.results &&
        response.data.results.status_code === 200
      ) {
        localStorage.setItem("registerMobile", signUpData.phone_number);
        setText("Registered");
        props.setText("Registered");
        props.setShowSuccessModal(true);
        setShowRegisterSuccessModal(true);
        setTimeout(() => {
          props.setShowSuccessModal(false);
          setShowRegisterSuccessModal(false);
          handleLoginModalOpen(); // Open login modal after registration
        }, 3000);
        // Call the login API after registration is successful
        attemptLogin(loginBody); // Pass the loginBody to the login API function
      } else {
        console.log("Registration failed:", response.data.results.message);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.results &&
        error.response.data.results.message ===
          "user with this email or phone number already exists!!!"
      ) {
        setAlreadyExistText("User already exists with this email!");
        setTimeout(() => {
          setAlreadyExistText(""); // Clear the already exists message
        }, 3500);
        sendOtp(); // Send OTP if the user already exists
      } else {
        console.error("Registration error:", error);
      }
    }
  };

  // Function to handle login after registration
  const attemptLogin = async (loginBody) => {
    try {
      user;
      const loginResponse = await axios.post(Urls.Login, loginBody);

      console.log("Login API Response:", loginResponse);

      if (loginResponse && loginResponse.data.results.status_code === 200) {
        setAuth(loginResponse.data.results.token, {
          userName: loginResponse.data.results.data.name,
          userProfile: loginResponse.data.results.data.image,
          phoneNumber: loginResponse.data.results.data.phone_number,
          userEmail: loginResponse.data.results.data.email,
        });

        setGetOtpModal(false); // Close OTP modal if open
        setTimeout(() => {
          props.onClose(); // Close the main modal after a brief delay
        }, 500);
      } else {
        // Handle other error conditions
        setValidationErrors({
          otp: "Failed to login. Please try again.",
        });
      }
    } catch (error) {
      console.error("Login API Error:", error);
    }
  };

  // const handleSignInWithFb = async () => {
  //   try {
  //     const response = await signInWithPopup(auth, facebookAuthProvider);
  //     console.log("responsefacebook", response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // setEmailId(event.target);
    if (name === "email") {
      setEmailId(value);
    }
    setSignUpData({
      ...signUpData,
      [name]: value,
    });
  };
  console.log(props.setText, "setText==>");
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
          honorific_name: signUpData.honorific_name,
        };
        const response = await axios.post(Urls.register, body);
        if (
          response &&
          response.data &&
          response.data.results &&
          response.data.results.status_code === 200
        ) {
          localStorage.setItem("registerMobile", signUpData.mobile);
          setText("Registered");
          // alert("Successfully Registered");
          props.setText("Registered");
          props.setShowSuccessModal(true);
          setShowRegisterSuccessModal(true);
          setTimeout(() => {
            props.setShowSuccessModal(false);
            setShowRegisterSuccessModal(false);
            handleLoginModalOpen();
          }, 3000);

          if (activeTab === "tab1") {
            setEmailId("");
          } else if (activeTab === "tab2") {
            setMobileNumber("");
          }
        }
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.results &&
          error.response.data.results.message ===
            "user with this email or phone number already exists!!!"
        ) {
          setAlreadyExistText("UserName already exist");
          setTimeout(() => {
            setAlreadyExistText([]);
          }, 3500);
          sendOtp();
        }
      }
    } else {
      console.log("Not valid");
    }
  };

  console.log("emailId...", emailId);
  const sendOtp = async () => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const body = {
      phone_code: "+91",
      phone: mobileNumber ? mobileNumber : signUpData.mobile,
      // phone: "",
      email: signUpData.email,
      createuser: "False",
      forgotuser: "False",
    };
    const mobileNumberRegex = /^\d{10}$/;
    if (!mobileNumber && !signUpData.mobile) {
      setValidationErrors({
        mobileNumber: "Mobile number is required",
      });
      return false;
    }

    if (
      !mobileNumberRegex.test(mobileNumber) &&
      !mobileNumberRegex.test(signUpData.mobile)
    ) {
      setValidationErrors({
        mobileNumber: "Mobile number must be 10 digits",
      });
      return false;
    }
    setIsLoading(true);
    try {
      const response = await axios.post(Urls.sentOtp, body);
      if (response.data[0] === "Otp send Successfully") {
        setIsSignup(false);
        handleOtpModalOpen();
        setTimer(60);
      } else if (
        response.data.results.message ===
        "CustomUser matching query does not exist."
      ) {
        // Display error message below the input field
        // setValidationErrors({
        //   mobileNumber:
        //     "You are not a registered user. Please register to login.",
        // });
        handleSignupModalOpen();
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const sendOtpEmail = async () => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!emailId.trim()) {
      setValidationErrors({
        emailId: "Email must not be empty",
      });
      return false;
    }
    if (!emailRegex.test(emailId)) {
      setValidationErrors({
        emailId: "Invalid email address",
      });
      return false;
    }

    try {
      const body = {
        phone_code: "",
        phone: "",
        email: emailId,
        createuser: "False",
        forgotuser: "False",
      };
      setIsLoading(true);
      const response = await axios.post(Urls.sentOtp, body);
      console.log(response.data);

      if (response.data[0] === "Otp send Successfully") {
        handleOtpModalOpen();
      } else if (
        response.data.results.message ===
        "CustomUser matching query does not exist."
      ) {
        handleSignupModalOpen();
      }
    } catch (error) {
      // Log any errors that occur during the process
      console.log(error);
    }
    setIsLoading(false);
  };

  const loginHandler = () => {
    const body = {
      username: mobileNumber
        ? mobileNumber
        : emailId
          ? emailId
          : signUpData.mobile,
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
      phone: mobileNumber ? mobileNumber : signUpData.mobile,
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
        console.log("else entered");
        setOtpError("Invalid otp");
        // setValidationErrors({
        //   mobileNumber:
        //     "You are not a registered user. Please register to login.",
        // });
      }
    } catch (error) {
      console.log("anas", error);
    }
  };
  const verifyOtpEmail = async () => {
    if (!otp) {
      // Check if the OTP is empty
      setOtpError("Please enter OTP");
      return; // Exit the function early if OTP is empty
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
  const handleSubmitButtons = (e) => {
    e.preventDefault();
    handleSignUp();
  };
  const handelLoginForm = (e) => {
    e.preventDefault();
    if (activeTab === "tab1") {
      sendOtp();
    } else if (activeTab === "tab2") {
      sendOtpEmail();
    }
  };
  const handleOtpForm = (e) => {
    e.preventDefault();
    if (activeTab === "tab1") {
      verifyOtp();
    } else if (activeTab === "tab2") {
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
      setTimer(60); // Reset timer to 60 seconds when the modal is opened
    }
  }, [getOtpModal]);

  console.log("mobileNumber-->", mobileNumber);

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
                <form onSubmit={handleSubmitButtons}>
                  <div className={Classes.signupInputFields}>
                    <div className={Classes.formgap}>
                      <div>
                        <label className={Classes.labelStyle}>Name</label>
                        <input
                          placeholder="Your Name"
                          className={Classes.allInputTextStyle}
                          value={signUpData.username || ""}
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
                          value={signUpData.mobile || ""}
                          name="mobile"
                          onChange={handleInputChange}
                        />
                        {/* <p className={Classes.ErrorText}>
                          {validationErrors.mobile && validationErrors.mobile}
                        </p> */}
                      </div>
                      <div>
                        <label className={Classes.labelStyle}>Email</label>
                        <input
                          placeholder="Email Address"
                          className={Classes.allInputTextStyle}
                          value={signUpData.email || ""}
                          name="email"
                          onChange={handleInputChange}
                        />
                        <p className={Classes.ErrorText}>
                          {validationErrors.email && validationErrors.email}
                        </p>
                      </div>
                      <div>
                        <div className={Classes.honor}>
                          <label>
                            <input
                              type="radio"
                              value="Mr"
                              name="honorific_name"
                              checked={signUpData.honorific_name === "Mr"}
                              onChange={handleInputChange}
                            />
                            Mr.
                          </label>
                          <label>
                            <input
                              type="radio"
                              value="Mrs"
                              name="honorific_name"
                              checked={signUpData.honorific_name === "Mrs"}
                              onChange={handleInputChange}
                            />
                            Mrs.
                          </label>
                          <label>
                            <input
                              type="radio"
                              value="Others"
                              name="honorific_name"
                              checked={signUpData.honorific_name === "Others"}
                              onChange={handleInputChange}
                            />
                            Others
                          </label>
                        </div>
                        <p className={Classes.ErrorText}>
                          {validationErrors.honorific_name &&
                            validationErrors.honorific_name}
                        </p>
                        <p className={Classes.ErrorText}>
                          {AlreadyExistText && AlreadyExistText}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                    }}
                  >
                    <button
                      type="submit"
                      className={Classes.accept}
                      style={{
                        marginTop: "15px",
                      }}
                      onClick={handleSignUp}
                    >
                      SIGNUP
                    </button>
                  </div>
                </form>

                <div className={Classes.SignupTextWrapper}>
                  <div className={Classes.Signup}>
                    <span className={Classes.bottomText}>
                      Already have account?
                    </span>
                    <span
                      style={{
                        cursor: "pointer",
                      }}
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
                    <PrivacyModal />
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    marginBottom: "0.5rem",
                  }}
                >
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
                    style={{
                      marginBottom: "1rem",
                    }}
                  >
                    <div className={Classes.googleButton}>
                      <button
                        className={`${Classes.buttonSocial} flex items-center`}
                        onClick={handleSignInWithGoogle}
                      >
                        <Image
                          src={`/Assets/google.png`}
                          alt="GOOGLE"
                          width={25}
                          height={25}
                        />{" "}
                        Sign Up with Google
                      </button>
                    </div>
                    <div className={Classes.facebookButton}>
                      <button
                        className={`${Classes.buttonSocial} flex items-center`}
                        onClick={handleSignInWithFb}
                      >
                        <Image
                          src={`/Assets/fb.png`}
                          alt="FB"
                          width={25}
                          height={25}
                        />{" "}
                        Login with facebook
                      </button>
                    </div>
                  </div>
                  <div style={{ display: "flex" }}>
                    <button
                      className={`${Classes.buttonSocial} flex items-center`}
                    >
                      <Image
                        src={`/Assets/apple.png`}
                        alt="APPLE"
                        width={25}
                        height={25}
                      />{" "}
                      Login with Apple
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
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
                      <div className={Classes.active} style={customTabtwo}>
                        <div
                          className={`Classes.tab-item ${
                            activeTab === "tab2" && "active"
                          }`}
                          onClick={() => handleTabClick("tab2")}
                        >
                          {activeTab === "tab1" ? (
                            <div className={Classes.tabTitleOne}>
                              <span
                                style={{
                                  fontWeight: "600",
                                }}
                              >
                                {/* Phone Number */}
                                Email
                              </span>
                            </div>
                          ) : (
                            <div className={Classes.tabTitleOne}>
                              {/* <span>Phone Number</span> */}
                              <span>Email</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className={Classes.active}>
                        <div
                          className={`Classes.tab-item ${
                            activeTab === "tab1" && "active"
                          }`}
                          onClick={() => handleTabClick("tab1")}
                        >
                          {activeTab === "tab1" ? (
                            <div
                              className={Classes.tabTitleOne}
                              style={{
                                backgroundColor: "#FFF",
                                borderRadius: "4px",
                              }}
                            >
                              {/* <span>Email</span> */}
                              <span>Phone number</span>
                            </div>
                          ) : (
                            <div className={Classes.tabTitleOne}>
                              {/* <span style={{ fontWeight: "600" }}>Email</span> */}
                              <span
                                style={{
                                  fontWeight: "600",
                                }}
                              >
                                Phone number
                              </span>
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
                          <label className={Classes.labelStyle}>
                            Mobile Number
                          </label>
                          <input
                            type="number"
                            placeholder="Enter Mobile Number"
                            className={Classes.allInputTextStyle}
                            value={mobileNumber || ""}
                            onChange={(e) => setMobileNumber(e.target.value)}
                          />
                          <p className={Classes.ErrorText}>
                            {validationErrors.mobileNumber &&
                              validationErrors.mobileNumber}
                          </p>
                        </div>
                      </div>
                    )}
                    {activeTab === "tab2" && (
                      <div>
                        <div>
                          <label className={Classes.labelStyle}>Email</label>
                          <input
                            type="email"
                            placeholder="Enter Email address"
                            className={Classes.allInputTextStyle}
                            value={emailId || ""}
                            onChange={(e) => setEmailId(e.target.value)}
                          />
                          <p className={Classes.ErrorText}>
                            {validationErrors.emailId &&
                              validationErrors.emailId}
                          </p>
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
                        type="submit"
                        className={Classes.LoginButton}
                        name="phone"
                        disabled={isLoading}
                        // onClick={loginHandler}
                        // onClick={sendOtp}
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
                        // onClick={sendOtp}
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
            <div className={Classes.line}>
              <div
                style={{
                  borderBottom: "1px solid #585F67",
                  opacity: "0.3",
                }}
              ></div>
              <div className={Classes.orText}>OR</div>
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
                    className={`${Classes.buttonSocial} flex items-center`}
                    onClick={handleSignInWithGoogle}
                  >
                    <Image
                      src={`/Assets/google.png`}
                      alt="GOOGLE"
                      width={20}
                      height={20}
                    />{" "}
                    Login with Google
                  </button>
                </div>
                <div className={Classes.facebookButton}>
                  <button
                    className={`${Classes.buttonSocial} flex items-center`}
                    onClick={handleSignInWithFb}
                  >
                    <Image
                      src={`/Assets/fb.png`}
                      alt="FB"
                      width={20}
                      height={20}
                    />{" "}
                    Login with facebook
                  </button>
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <button
                  style={{
                    paddingBottom: "4px",
                  }}
                  className={`${Classes.buttonSocial} flex items-center`}
                >
                  <Image
                    src={`/Assets/apple.png`}
                    alt="APPLE"
                    width={20}
                    height={20}
                  />{" "}
                  Login with Apple
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
                    handleSignupModalOpen={handleSignupModalOpen}
                  />
                  {/* <Modal
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
                        <form onSubmit={handleOtpForm}>
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
                                {mobileNumber}
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
                  </Modal> */}
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
                      {/* <div id="modal-modal-title" variant="h6" component="h2">
          Text in a modal
        </div> */}
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
                            By login you are agreed to all privacy policy and
                            terms and conditions
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
                          <button
                            className={Classes.acceptT}
                            onClick={handleOpen}
                          >
                            Agree & login
                          </button>
                        </div>
                      </div>
                    </Box>
                  </Modal>
                </>
              )}
            </div>
          </>
        )}
      </div>
      <Modal
        open={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            border: "2px solid #000",
          }}
        >
          Please register the form.
        </div>
      </Modal>
      <LoginSuccessModal
        openSuccessModal={showRegisterSuccessModal}
        close={() => setShowRegisterSuccessModal(false)}
        state={showRegisterSuccessModal}
        text={text}
      />
    </div>
  );
};

export default LoginToggle;
