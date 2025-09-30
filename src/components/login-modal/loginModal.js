"use client";
import React, { useState, useEffect, useRef } from "react";
import Classes from "./loginmodal.module.css";
import * as urls from "@/utils/urls";
import axios from "axios";
import * as country from "../../../src/countryList";
import LoginToggle from "../Navbar/LoginToggle.js";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/providers/auth-provider";
import { BsPerson } from "react-icons/bs";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 375,
  height: "auto",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  borderRadius: "4px",
  p: 2,
  outline: "none",
};

const styleDesk = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  width: 375,
  height: "auto",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 2,
  outline: "none",
};

const LoginModal = (props) => {
  const { user, logout } = useAuth();
  const userDetailsRef = useRef(null);
  const nameRef = useRef(null);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [show, setShow] = useState(false);
  const [register, setRegister] = useState(false);
  const [login, setLogin] = useState(false);
  const [logCond, setLogCond] = useState(null);
  const [forgot, setForgot] = useState(false);
  const [forgotPhoneNumber, setForgotPhoneNumber] = useState("");
  const [verifyForgotOtp, setVeifyForgot] = useState(false);
  const [forgotOtp, setForgotOtp] = useState("");
  const [forgotOtpError, setForgotOptError] = useState("");
  const [changePas, setChangePas] = useState(false);
  const [chagePasError, setChangePasError] = useState("");
  const [newChangePas, setNewChangPas] = useState("");
  const [confirMNewPas, setConfNewPas] = useState("");

  const [verifyOtp, setVerifyOtp] = useState(false);
  const [newPassword, setNewPassword] = useState(false);
  const [selected, setSelected] = useState("IN");
  const [loginError, setLoginError] = useState("");
  const [changeSuc, setChangeSuc] = useState(false);
  const [userId, setUserId] = useState("");
  const [forgotToken, setForgotToken] = useState("");
  const [forgotError, setForfotError] = useState("");
  const [createError, setCreateError] = useState("");
  const [isSignpuLogin, setIsSignpuLogin] = useState(false);
  const [username, setUsername] = useState(null);
  const [isDesk, setIsDesk] = useState(false);

  const [error, setError] = useState("");
  const router = useRouter();
  // const loginHandler = () => {
  //   const body = {
  //     username: phoneNumber,
  //     password: loginPassword,
  //   };
  //   axios
  //     .post(urls.Login, body)
  //     .then((response) => {
  //       if (response.data.results.status_code === 200) {
  //         localStorage.setItem("swaToken", response.data.results.token);
  //         localStorage.setItem("userName", response.data.results.data.name);
  //         localStorage.setItem(
  //           "phoneNumber",
  //           response.data.results.data.phone_number
  //         );
  //         localStorage.setItem("UserEmail", response.data.results.data.email);

  //         props.logAct(response.data.results.token);
  //         handleClose();
  //       } else if (response.data.results.status_code === 401) {
  //         setLoginError("Incorrect username or password!");
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  // useEffect(() => {
  //   if (props.isLog) {
  //     setShow(true);
  //     setLogin(true);
  //   }
  // }, [props.isLog]);
  const registerHandler = () => {
    let selObj = country.arrayCountryList.find(
      (item) => item.name === selected
    );
    const body = {
      name: name,
      password: password,
      phone_number: regPhoneNumber,
      phone_code: selObj.code,
    };

    axios
      .post(urls.register, body)
      .then((response1) => {
        if (response1.data.results.status_code === 200) {
          setError("");
          const bodyLog = {
            username: regPhoneNumber,
            password: password,
          };
          axios
            .post(urls.Login, bodyLog)
            .then((response) => {
              if (response.data.results.status_code === 200) {
                // Move localStorage operations inside useEffect or event handlers
                if (typeof window !== "undefined") {
                  localStorage.setItem("swaToken", response.data.results.token);
                  localStorage.setItem("name", response.data.results.data.name);
                }
                props.logAct(response.data.results.token);
                handleClose();
              } else if (response.data.results.status_code === 401) {
                setLoginError("Incorrect username or password!");
              }
            })
            .catch((error) => {
              console.log(error);
            });
          handleClose();
        } else console.log("registration failed");
      })
      .catch((error) => {
        if (error.response.data.results.status === 400) {
          setError(error.response.data.results.message);
        }
      });
  };

  useEffect(() => {
    const handleResize = () => {
      setIsDesk(window?.innerWidth >= 300 && window?.innerWidth <= 575);
    };
    handleResize();
    // Add event listener to listen for window resize
    window?.addEventListener("resize", handleResize);

    // Remove event listener on component unmount
    return () => {
      window?.removeEventListener("resize", handleResize);
    };
  }, []);

  const sentOtpHandler = () => {
    let selObj = country.arrayCountryList.find(
      (item) => item.name === selected
    );
    const body = {
      phone_code: selObj.code,
      phone: regPhoneNumber,
      createuser: "True",
      forgotuser: "False",
    };
    axios
      .post(urls.sentOtp, body)
      .then((response2) => {
    
        if (response2.data.user_exists === true) {
          setCreateError("This phone number is already registerd");
        } else if (response2.data[0] === "Otp send Successfully") {
          handleVerification();
          setCreateError("");
        } else {
          handleRegister();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const verifyOtpHandler = () => {
    let selObj = country.arrayCountryList.find(
      (item) => item.name === selected
    );
    const body = {
      phone: regPhoneNumber,
      phone_code: selObj.code,
      otp: otp,
    };

    axios
      .post(urls.verifyOTP, body)
      .then((response3) => {
      
        if (response3.data.results.status_code === 200) {
          setError("");
          handleNewPassword();
        } else if (response3.data.results.status_code === 400) {
          setOtpError("Please enter a valid 6-digit OTP.");
        }
      })
      .catch((error) => {
        if (error.response.data.results.status_code === 400) {
          setError(error.response.data.results.message);
        }
      });
  };
  const [phoneNumber, setPhoneNumber] = useState("9946787586");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const validatePhoneNumber = (number) => {
    const phoneRegex = /^\d{10}$/; // regex to match 10-digit phone number
    if (!phoneRegex.test(number)) {
      setPhoneNumberError("Please enter a valid 10-digit phone number.");
    } else if (number.trim() === "") {
      setPhoneNumberError("Please enter your phone number.");
    } else {
      setPhoneNumberError("");
    }
  };
  const [regPhoneNumber, setRegPhoneNumber] = useState("");
  const [regPhoneNumberError, setRegPhoneNumberError] = useState("");
  const validateRegPhoneNumber = () => {
    const phoneRegex = /^\d{10}$/; // regex to match 10-digit phone number
    if (!phoneRegex.test(regPhoneNumber)) {
      setRegPhoneNumberError("Please enter a valid 10-digit phone number.");
    } else if (regPhoneNumber.trim() === "") {
      setRegPhoneNumberError("Please enter your phone number.");
    } else {
      setRegPhoneNumberError("");
      sentOtpHandler();
    }
  };

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/; // regex to match password criteria
  const validatePassword = () => {
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number."
      );
    } else if (password.trim() === "") {
      setPasswordError("Please enter password.");
    } else {
      setPasswordError("");
    }
  };
  const validateConfirmPassword = () => {
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
    } else if (confirmPassword.trim() === "") {
      setConfirmPasswordError("Please enter password.");
    } else {
      setConfirmPasswordError("");
    }
  };

  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const validateOtp = () => {
    const otpRegex = /^\d{6}$/; // regex to match 6-digit OTP
    if (!otpRegex.test(otp)) {
      setOtpError("Please enter a valid 6-digit OTP.");
    } else if (otp.trim() === "") {
      setOtpError("Please enter OTP.");
    } else {
      setOtpError("");
      verifyOtpHandler();
    }
  };

  const [loginPassword, setLoginPassword] = useState("Theja@123");
  const [loginPasswordError, setLoginPasswordError] = useState("");
  const validateLoginPassword = () => {
    if (loginPassword.length < 8) {
      setLoginPasswordError("Wrong password.");
    } else if (loginPassword.trim() === "") {
      setLoginPasswordError("Please enter password.");
    } else {
      setLoginPasswordError("");
    }
  };
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const validateName = () => {
    if (name.trim() === "") {
      setNameError("Please enter your name.");
    } else {
      setNameError("");
    }
  };
  const handleClose = () => {
    props.close(false);
    // props.cartClose();
    setLogin(false);
    setRegister(false);
    setVerifyOtp(false);
    setNewPassword(false);
    if (props.handleOpenLogin === "profile") {
      return;
    } else {
      props.handleOpenLogin();
    }
    setChangePas(false);
    setForgot(false);
    setVeifyForgot(false);
    setChangeSuc(false);

    setPhoneNumber("");
    setPhoneNumberError("");
    setPassword("");
    setPasswordError("");
    setConfirmPassword("");
    setConfirmPasswordError("");
    setName("");
    setNameError("");
    setLoginPassword("");
    setLoginPasswordError("");
    setOtp("");
    setOtpError("");
    setForgotOtp("");
    setForgotOptError("");
    setChangePasError("");
    setNewChangPas("");
    setConfNewPas("");
  };
  const handleShow = () => {
    props.handleOpenLogin();
    setSelected("IN");
    setRegPhoneNumber("");
  };
  const handleNewPassword = () => {
    setRegister(false);
    setLogin(false);
    setVerifyOtp(false);
    setNewPassword(true);
    setChangePas(false);
    setForgot(false);
    setVeifyForgot(false);
    setChangeSuc(false);
  };
  const handleRegister = () => {
    setRegister(true);
    setLogin(false);
    setVerifyOtp(false);
    setNewPassword(false);
    setForgot(false);
    setChangePas(false);
    setForgot(false);
    setVeifyForgot(false);
    setChangeSuc(false);
  };
  const handleVerification = () => {
    setRegister(false);
    setLogin(false);
    setVerifyOtp(true);
    setNewPassword(false);
    setForgot(false);
    setChangePas(false);
    setForgot(false);
    setVeifyForgot(false);
    setChangeSuc(false);
  };
  const handleModal = () => {
    setRegister(false);
    setLogin(true);
    setChangeSuc(false);
    setVerifyOtp(false);
    setNewPassword(false);
    setForgot(false);
    setChangePas(false);
    setForgot(false);
    setVeifyForgot(false);
    setChangeSuc(false);
  };
  const loginClickHandler = () => {
    // Check for browser environment before accessing localStorage
    const token =
      typeof window !== "undefined" ? localStorage.getItem("swaToken") : null;
    if (!token) {
      handleShow();
      handleModal();
      setLogCond(false);
    } else {
      setLogCond(!logCond);
    }
  };

  const myOrderHandler = () => {
    router.push("/my/orders");
    setLogCond(false);
  };

  const handleLogOut = () => {
    logout();
    router.push("/");
  };

  const forgotHandlerShow = () => {
    setPhoneNumberError("");
    setForgot(true);
    setRegister(false);
    setLogin(false);
    setVerifyOtp(false);
    setNewPassword(false);
    setChangePas(false);
    setChangeSuc(false);
  };
  const forgotHandler = () => {
    const body = {
      phone_code: "+91",
      phone: forgotPhoneNumber,
      createuser: "False",
      forgotuser: "True",
    };
    axios
      .post(urls.sentOtp, body)
      .then((response2) => {
        if (response2.data.user_exists === false) {
          setForfotError("Please Enter Registered Phone Number");
        } else if (response2.data[0] === "Otp send Successfully") {
          setVeifyForgot(true);
          setForgot(false);
          setForfotError("");
        } else {
          forgotHandlerShow();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const fotOtpVerify = () => {
    const body = {
      phone: forgotPhoneNumber,
      phone_code: "+91",
      otp: forgotOtp,
    };

    axios
      .post(urls.verifyOTP, body)
      .then((response3) => {
        if (response3.data.results.status_code === 200) {
          setError("");
          setChangePas(true);
          setVeifyForgot(false);
          setUserId(response3.data.results.user_id);
          setForgotToken(response3.data.results.token);
        } else if (response3.data.results.status_code === 400) {
          setOtpError("Please enter a valid 6-digit OTP.");
        }
      })
      .catch((error) => {
        if (error.response.data.results.status_code === 400) {
          setError(error.response.data.results.message);
        }
      });
  };
  const changepasswordHandler = () => {
    if (
      !passwordRegex.test(newChangePas) ||
      !passwordRegex.test(confirMNewPas)
    ) {
      setChangePasError(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number."
      );
    } else if (newChangePas !== confirMNewPas) {
      setChangePasError("Password does not match");
    } else {
      setChangePasError("");
      const body = {
        password: newChangePas,
      };
      axios
        .put(urls.updatePas + userId + "/", body, {
          headers: { Authorization: "Token " + forgotToken },
        })
        .then((response3) => {
          if (response3.data.message === "Customer updated") {
            setChangeSuc(true);
            setChangePas(false);
          }
        })
        .catch((error) => {
          console.log(error.response.data.results);
        });
    }
  };
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  useEffect(() => {
    const userName = localStorage.getItem("userName");
    const phone = localStorage.getItem("phoneNumber");
    setUserName(userName);
    setPhone(phone);
  });

  const handleLogedUserClick = () => { 
    setShowUserDetails((prev) => !prev);
 
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showUserDetails &&
        userDetailsRef.current &&
        !userDetailsRef.current.contains(event.target) &&
        !nameRef.current.contains(event.target)
      ) {
        setShowUserDetails(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUserDetails]);

  const handleSignupClick = () => {
    props.handleOpenLogin();
    setIsSignpuLogin(true);
  };

  return (
    <>
      {user ? (
        <div
          className="flex  items-center pl-1"
          style={{ cursor: "pointer" }}
          ref={nameRef}
          onClick={handleLogedUserClick}
        >
          <Image
            src={`/try/avatar.svg`}
            alt="avatar"
            className="mr-3"
            width={16}
            height={16}
          />
          <p className="text-black">{user.userName}</p>
          <IoIosArrowDown className="text-black" />
        </div>
      ) : (
        <div className="ml-4" style={{ cursor: "pointer" }}>
          <div
            className={`${Classes.dLogin} ${Classes.headerElement}`}
            onClick={() => {
              props.handleOpenLogin();
              setIsSignpuLogin(false);
              props.setLoginText("Welcome Back");
            }}
          >
             <Image src="/try/avatar.svg" width={15} height={20} alt="avatar" />
          </div>

        </div>
      )}

      {user && showUserDetails && (
        <div
          ref={userDetailsRef}
          className="absolute top-20 bg-white rounded-md shadow-md"
          style={{ userSelect: "none" }}
        >
          <div className={Classes.Name_phoneLog}>
            <p>{user.userName || "guest"}</p>
            <p className={Classes.Name_phoneLoged}>
              {user.phoneNumber || "N/A"}
            </p>
          </div>
          <div className={Classes.LogedDetails_list}>
            <Link href="/my/profile" className={Classes.MobProfileLinks}>
              <p style={{ fontSize: "16px" }}>Profile</p>
            </Link>
            <Link href="/my/orders" className={Classes.LogedDetails_Item}>
              <p style={{ fontSize: "16px" }}>Order history</p>
            </Link>
            <Link href="/add/address" className={Classes.LogedDetails_Item}>
              <p style={{ fontSize: "16px" }}>Add Address</p>
            </Link>
            <Link href="/rate&/review" className={Classes.LogedDetails_Item}>
              <p style={{ fontSize: "16px" }}>Write review</p>
            </Link>
            <Link href="/swa/wallet" className={Classes.LogedDetails_Item}>
              <p style={{ fontSize: "16px" }}>Swa wallet</p>
            </Link>
            <Link
              href="/swa/exchange"
              style={{ fontSize: "16px" }}
              className={Classes.LogedDetails_Item}
            >
              <p style={{ fontSize: "16px" }}>Swa exchange</p>
            </Link>
            <p
              style={{ cursor: "pointer", width: "100%" }}
              onClick={(e) => {
                e.stopPropagation(); // Stop event propagation
                handleLogOut();
              }}
              className={Classes.ListPTag}
            >
              Log Out
            </p>
          </div>
        </div>
      )}

      <Modal
        open={props.isLog}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={isDesk ? style : styleDesk}>
          <div>
            <div>
              <LoginToggle
                onClose={handleClose}
                signupClick={handleSignupClick}
                LoginSignupToggle={isSignpuLogin}
                text={props.text}
                loginText={props.loginText}
                setShowSuccessModal={props.setShowSuccessModal}
                setText={props.setText}
              />
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};
export default LoginModal;
