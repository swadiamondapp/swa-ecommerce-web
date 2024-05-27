import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { BsPerson, BsEye, BsEyeSlash } from "react-icons/bs";
import Classes from "../Header/Header.module.css";
import BlueLogo from "../../Assets/SwaBlue.png";
import * as urls from "../../Urls";
import axios from "axios";
import * as country from "../../countryList";
import ReactFlagsSelect from "react-flags-select";
import { useHistory } from "react-router-dom";
import Success from "../../Assets/sucesLarge.png";
const LoginModal = (props) => {
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

  const [error, setError] = useState("");
  const history = useHistory();
  const loginHandler = () => {
    const body = {
      username: phoneNumber,
      password: loginPassword,
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
          localStorage.setItem("UserEmail", response.data.results.data.email);

          props.logAct(response.data.results.token);
          handleClose();
        } else if (response.data.results.status_code === 401) {
          setLoginError("Incorrect username or password!");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
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
  const [phoneNumber, setPhoneNumber] = useState("");
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

  const [loginPassword, setLoginPassword] = useState("");
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
  console.log(userName);
  console.log(phone);
  return (
    <>
      <div className={Classes.LogList}>
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
      </div>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className={Classes.modalContainer}>
          {/* login */}
          <div className={login ? [Classes.Block] : [Classes.None]}>
            <div className={Classes.LoginLogo}>
              <img src={BlueLogo} alt="" />
            </div>
            <p className={Classes.TextReg}>Login</p>

            {loginError && <p className={Classes.Validation}>{loginError}</p>}
            <p className={Classes.ContactDetails}>Phone Number</p>
            <div className={Classes.NumFlex}>
              <input
                type="text"
                className={`${Classes.Input} ${Classes.Password}`}
                value={phoneNumber}
                placeholder="Enter phone number"
                onChange={(e) => setPhoneNumber(e.target.value)}
                onBlur={(e) => validatePhoneNumber(e.target.value)}
              ></input>
            </div>
            {phoneNumberError && (
              <p className={Classes.Validation}>{phoneNumberError}</p>
            )}
            <p className={Classes.ContactDetails}>Password</p>
            <input
              type={showPassword ? "password" : "text"}
              className={`${Classes.Input} ${Classes.Password}`}
              style={{
                position: "relative",
              }}
              value={loginPassword}
              placeholder="Enter password"
              onChange={(e) => setLoginPassword(e.target.value)}
              onBlur={validateLoginPassword}
            ></input>
            {showPassword ? (
              <BsEyeSlash
                style={{
                  position: "absolute",
                  width: "20px",
                  height: "20px",
                  color: "#9D9D9D",
                  right: "10%",
                  fill: "#A49667",
                  cursor: "pointer",
                }}
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <BsEye
                style={{
                  position: "absolute",
                  width: "20px",
                  height: "20px",
                  color: "#9D9D9D",
                  right: "10%",
                  fill: "#A49667",
                  cursor: "pointer",
                }}
                onClick={() => setShowPassword(true)}
              />
            )}
            {loginPasswordError && (
              <p className={Classes.Validation}>{loginPasswordError}</p>
            )}

            <div className={Classes.Flex}>
              <div>
                <input className={Classes.CheckBox} type="checkbox" value="" />
                <label className={Classes.CheckBoxLabel} htmlFor="ship">
                  Keep me signed in{" "}
                </label>
              </div>
              <p className={Classes.CheckBoxLabel} onClick={forgotHandlerShow}>
                Forgot password?
              </p>
            </div>
            <input
              className={Classes.LoginButton}
              type="submit"
              onClick={loginHandler}
              value="LOGIN"
            />
            <div className={Classes.Flexmid}>
              <p className={Classes.CheckBoxLabel}>not a member?</p>
              <p className={Classes.Join} onClick={handleRegister}>
                {" "}
                Register now{" "}
              </p>
            </div>
          </div>
          {/* forgot password */}
          <div className={forgot ? [Classes.Block] : [Classes.None]}>
            <div className={Classes.LoginLogo}>
              <img src={BlueLogo} alt="" />
            </div>
            <p className={Classes.TextReg}>Forgot Password</p>

            {forgotError && <p className={Classes.Validation}>{forgotError}</p>}
            <p className={Classes.ContactDetails}>Phone Number</p>
            <div className={Classes.NumFlex}>
              <input
                type="text"
                className={Classes.Input}
                value={forgotPhoneNumber}
                onChange={(e) => setForgotPhoneNumber(e.target.value)}
                onBlur={(e) => validatePhoneNumber(e.target.value)}
              ></input>
            </div>
            {phoneNumberError && (
              <p className={Classes.Validation}>{phoneNumberError}</p>
            )}

            <input
              className={Classes.LoginButton}
              type="submit"
              onClick={forgotHandler}
              value="NEXT"
            />
            <div className={Classes.Flexmid}>
              <p className={Classes.CheckBoxLabel}>not a member?</p>
              <p className={Classes.Join} onClick={handleRegister}>
                {" "}
                Register now{" "}
              </p>
            </div>
          </div>
          {/* forgot otp verificatio */}
          <div className={verifyForgotOtp ? [Classes.Block] : [Classes.None]}>
            <div className={Classes.LoginLogo}>
              <img src={BlueLogo} alt="" />
            </div>
            <div>
              <p className={Classes.TextReg}>Forgot Password</p>
              <div
                className="errrMsg"
                style={{ textAlign: "center", marginTop: "-20px" }}
              >
                {error}
              </div>
              <p className={Classes.ContactDetails}>OTP</p>
              <input
                type="text"
                className={Classes.Input}
                value={forgotOtp}
                onChange={(e) => setForgotOtp(e.target.value)}
              ></input>
              {forgotOtpError && (
                <p className={Classes.Validation}>{forgotOtpError}</p>
              )}

              <input
                className={Classes.LoginButton}
                type="submit"
                value="verify"
                onClick={fotOtpVerify}
              />
              <div className={Classes.Flexmid}>
                <p className={Classes.CheckBoxLabel}>Not get OTP </p>
                <p className={Classes.Join} onClick={forgotHandler}>
                  Resend now{" "}
                </p>
              </div>
            </div>
          </div>
          {/* change password */}
          <div className={changePas ? [Classes.Block] : [Classes.None]}>
            <div className={Classes.LoginLogo}>
              <img src={BlueLogo} alt="" />
            </div>
            <p className={Classes.TextReg}>Change Password</p>

            {chagePasError && (
              <p className={Classes.Validation}>{chagePasError}</p>
            )}
            <p className={Classes.ContactDetails}>New Password</p>
            <div className={Classes.NumFlex}>
              <input
                type="password"
                className={Classes.Input}
                value={newChangePas}
                onChange={(e) => setNewChangPas(e.target.value)}
              ></input>
            </div>

            <p className={Classes.ContactDetails}>Confirm Password</p>
            <input
              type="password"
              className={Classes.Input}
              value={confirMNewPas}
              onChange={(e) => setConfNewPas(e.target.value)}
            ></input>

            <input
              className={Classes.LoginButton}
              type="submit"
              onClick={changepasswordHandler}
              value="SUBMIT"
            />
          </div>
          {/* reset success */}
          <div className={changeSuc ? [Classes.Block] : [Classes.None]}>
            <div className={Classes.LoginLogo}>
              <img src={BlueLogo} alt="" />
            </div>
            <p className={Classes.TextReg}>Change Password</p>
            <div className="d-flex justify-content-center align-items-center">
              <img src={Success} alt="success" width={130} height={130} />
            </div>
            <p
              style={{
                textAlign: "center",
                paddingTop: "20px",
                paddingBottom: "20px",
              }}
            >
              Your Password Has Been Updated Successfully
            </p>
            <input
              className={Classes.LoginButton}
              type="submit"
              onClick={handleModal}
              value="LOGIN"
            />
          </div>
          {/* register phone number */}
          <div className={register ? [Classes.Block] : [Classes.None]}>
            <div className={Classes.LoginLogo}>
              <img src={BlueLogo} alt="" />
            </div>
            <div>
              <p className={Classes.TextReg}>Register</p>
              <div
                className="errrMsg"
                style={{ textAlign: "center", marginTop: "-20px" }}
              >
                {createError}
              </div>
              <p className={Classes.ContactDetails}>Phone Number</p>

              <div className={Classes.FlexPhone}>
                <ReactFlagsSelect
                  selected={selected}
                  countries={country.countryList}
                  customLabels={country.countryCode}
                  selectedSize={14}
                  fullWidth={false}
                  onSelect={(code) => setSelected(code)}
                  onChange={(code) => {}}
                  className={Classes.InputPhone}
                />
                <input
                  type="text"
                  className={Classes.regPhoneNumber}
                  value={regPhoneNumber}
                  onChange={(e) => setRegPhoneNumber(e.target.value)}
                ></input>
              </div>
              {regPhoneNumberError && (
                <p className={Classes.Validation}>{regPhoneNumberError}</p>
              )}

              {/* <p className={Classes.Validation}> Phone number already exist</p> */}
              <input
                className={Classes.LoginButton}
                type="submit"
                value="Get OTP"
                onClick={validateRegPhoneNumber}
              />
              <div className={Classes.Flexmid}>
                <p className={Classes.CheckBoxLabel}>Already have account? </p>
                <p className={Classes.Join} onClick={handleModal}>
                  {" "}
                  Login
                </p>
              </div>
            </div>
          </div>
          {/* otp verification */}
          <div className={verifyOtp ? [Classes.Block] : [Classes.None]}>
            <div className={Classes.LoginLogo}>
              <img src={BlueLogo} alt="" />
            </div>
            <div>
              <p className={Classes.TextReg}>Register</p>
              <div
                className="errrMsg"
                style={{ textAlign: "center", marginTop: "-20px" }}
              >
                {error}
              </div>
              <p className={Classes.ContactDetails}>OTP</p>
              <input
                type="text"
                className={Classes.Input}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              ></input>
              {otpError && <p className={Classes.Validation}>{otpError}</p>}

              <input
                className={Classes.LoginButton}
                type="submit"
                value="verify"
                onClick={validateOtp}
              />
              <div className={Classes.Flexmid}>
                <p className={Classes.CheckBoxLabel}>Not get OTP </p>
                <p className={Classes.Join} onClick={handleRegister}>
                  Resend now{" "}
                </p>
              </div>
            </div>
          </div>
          {/* set new account */}
          <div className={newPassword ? [Classes.Block] : [Classes.None]}>
            <div className={Classes.LoginLogo}>
              <img src={BlueLogo} alt="" />
            </div>
            <div>
              <p className={Classes.TextReg}>Register</p>
              <div
                className="errrMsg"
                style={{ textAlign: "center", marginTop: "-10px" }}
              >
                {error}
              </div>
              <p className={Classes.ContactDetails}>Name</p>
              <input
                type="text"
                className={Classes.Input}
                onChange={(e) => setName(e.target.value)}
                onBlur={validateName}
              ></input>
              {nameError && <p className={Classes.Validation}>{nameError}</p>}

              <p className={Classes.ContactDetails}>Password</p>
              <input
                type="password"
                className={Classes.Input}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={validatePassword}
              />
              {passwordError && (
                <p className={Classes.Validation}>{passwordError}</p>
              )}

              <p className={Classes.ContactDetails}>Confirm Password</p>
              <input
                type="password"
                className={Classes.Input}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={validateConfirmPassword}
              />
              {confirmPasswordError && (
                <p className={Classes.Validation}>{confirmPasswordError}</p>
              )}

              <div>
                <input className={Classes.CheckBox} type="checkbox" value="" />
                <label className={Classes.CheckBoxLabel} htmlFor="ship">
                  Keep me signed in{" "}
                </label>
              </div>
              <input
                className={Classes.LoginButton}
                type="submit"
                value="Register"
                onClick={registerHandler}
              />
              <div className={Classes.Flexmid}>
                <p className={Classes.CheckBoxLabel}>Already have account? </p>
                <p className={Classes.Join} onClick={handleModal}>
                  Login{" "}
                </p>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default LoginModal;
