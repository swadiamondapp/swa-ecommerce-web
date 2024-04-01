import React, { useState, useEffect, useRef } from "react";
// import Modal from "react-bootstrap/Modal";
import { BsPerson, BsEye, BsEyeSlash } from "react-icons/bs";
import Classes from "../Header/Header.module.css";
import BlueLogo from "../../Assets/SwaBlue.png";
import * as urls from "../../Urls";
import axios from "axios";
import * as country from "../../countryList";
import ReactFlagsSelect from "react-flags-select";
import { useHistory } from "react-router-dom";
import Success from "../../Assets/sucesLarge.png";
import LoginToggle from "../Navbar/LoginToggle.js";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import logedimg from "../../Assets/loged.png";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";

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

const LoginModal = (props) => {
  const userDetailsRef = useRef(null);
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
  const username = localStorage.getItem("name");

  const [error, setError] = useState("");
  const history = useHistory();
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
  useEffect(() => {
    if (props.isLog) {
      setShow(true);
      setLogin(true);
    }
  }, [props.isLog]);

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
                localStorage.setItem("swaToken", response.data.results.token);
                localStorage.setItem("name", response.data.results.data.name);
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
        console.log(response2);
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
        console.log(response3);
        if (response3.data.results.status_code === 200) {
          setError("");
          handleNewPassword();
        } else if (response3.data.results.status_code === 400) {
          setOtpError("Please enter a valid 6-digit OTP.");
        }
      })
      .catch((error) => {
        console.log(error.response.data.results);
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
    setShow(false);
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
    setShow(true);
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
    if (localStorage.getItem("swaToken") === null) {
      handleShow();
      handleModal();
      setLogCond(false);
    } else {
      setLogCond(!logCond);
    }
  };
  const myOrderHandler = () => {
    history.push("/my_orders");
    setLogCond(false);
  };
  const logoutHandler = () => {
    localStorage.removeItem("swaToken");
    history.push("/");
    setLogCond(false);
  };
  const handleLogOut = () => {
    // Clear localStorage
    localStorage.removeItem("swaToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("phoneNumber");

    // Hide the LogedUserDetails div
    setShowUserDetails(false);
    // Redirect to home page or login page
    history.push("/"); // Redirect to home page
    setLogCond(false); // Close user details dropdown
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

  const userName = localStorage.getItem("userName");
  const phone = localStorage.getItem("phoneNumber");

  const handleLogedUserClick = () => {
    setShowUserDetails(!showUserDetails);
  };

  return (
    <>
      {/* <div className={Classes.LogList}>
        <p variant="primary" onClick={loginClickHandler}>
          <BsPerson className={Classes.PersonIcon} color="#ffffff" size={30} />
        </p>

        <div
          className={Classes.LogListCont}
          style={{ display: logCond ? "block" : "none" }}
        >
          <div className={Classes.info_container}>
            <p className={Classes.user_info_name}>{userName}</p>
            <p className={Classes.user_info_phone}>{phone}</p>
          </div>
          <div className={Classes.detail_container}>
            <p className={Classes.LogItem} onClick={myOrderHandler}>
              My Order
            </p>
            <p className={Classes.LogItem} onClick={logoutHandler}>
              Logout
            </p>
          </div>
        </div>
      </div> */}
  {userName ? (
  <div onClick={handleLogedUserClick} className={Classes.LogedUser}>
    <img src={logedimg} />
    <p>{userName}</p>
    <IoIosArrowDown />
  </div>
) : (
  <div className={Classes.LoginSignup}>
    <div className={Classes.dLogin} onClick={props.handleOpenLogin}>
      Login
    </div>
    <div className={Classes.LineArrow}></div>
    <div className={Classes.DSignup} onClick={props.handleOpenLogin}>
      Sign up
    </div>
  </div>
)}
      {/* <div className={Classes.LoginSignup}>
        <div className={Classes.dLogin} onClick={props.handleOpenLogin}>
          Login
        </div>
        <div className={Classes.LineArrow}></div>
        <div className={Classes.DSignup} onClick={props.handleOpenLogin}>
          Sign up
        </div>
      </div>
      <div onClick={handleLogedUserClick} className={Classes.LogedUser}>
        <img src={logedimg} />
        <p>{userName}</p>
        <IoIosArrowDown />
      </div> */}
      {/* modal */}

      {showUserDetails && (
        <div ref={userDetailsRef} className={Classes.LogedUserDetails}>
          <div className={Classes.Name_phoneLog}>
            <p>{userName}</p>
            <p className={Classes.Name_phoneLoged}>{phone}</p>
          </div>
          <div className={Classes.LogedDetails_list}>
            <p>Account</p>
            <Link to="/my_orders">
              <p style={{ fontSize: "16px" }}>Order history</p>
            </Link>

            <Link to="/addaddress">
              <p style={{ fontSize: "16px" }}>Add Address</p>
            </Link>
            <Link>
              <p style={{ fontSize: "16px" }}>Track Order</p>
            </Link>
            <Link to="/rate&review">
              <p style={{ fontSize: "16px" }}>Write review</p>
            </Link>
            <Link to="">
              <p style={{ fontSize: "16px" }}>Swa wallet</p>
            </Link>
            <p>Swa exchange</p>
            <p onClick={handleLogOut}>Log Out</p>
          </div>
        </div>
      )}

      <Modal
        open={show}
        onClose={handleClose}
        animation={false}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography>
            <div>
              <LoginToggle onClose={handleClose} />
            </div>
          </Typography>
        </Box>
      </Modal>
    </>
  );
};
export default LoginModal;
