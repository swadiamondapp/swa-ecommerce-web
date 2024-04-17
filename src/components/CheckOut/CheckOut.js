import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import Classes from "./CheckOut.module.css";
import { useHistory } from "react-router-dom";
import { BiRupee } from "react-icons/bi";
import { states } from "../../countryList";

import { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import Warning from "../../Assets/Warning.png";
import Succes from "../../Assets/success.png";
import { AiOutlineHome } from "react-icons/ai";
import { Radio, Space } from "antd";
import axios from "axios";
import * as Urls from "../../Urls";
import { FadeLoader } from "react-spinners";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Dropdown } from "primereact/dropdown";
import Joi from "joi";

function CheckOut(props) {
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [clr, setClr] = useState("");
  const [errorVald, setErrorVald] = useState("");
  const [errorImg, setErrorImg] = useState(null);
  const history = useHistory();
  const [amountPay, setAmountPay] = useState("");
  const [total, setTotal] = useState("");
  const [voucherInput, setVoucherInput] = useState(false);
  const [promoId, setPromoId] = useState("");
  const [mode, setMode] = useState("P");
  const [selectedCity, setSelectedCity] = useState(null);
  const [userId, setUserId] = useState("");
  const [userMob, setUserMob] = useState("");
  const [userName, setUserName] = useState("");
  const [errorMessage, setErrorMessage] = useState({});
  const [addressData, setAddressData] = useState({
    sEmail: "",
    sPhone: "",
    fullName: "",
    mobile: "",
    pincode: "",
    city: "",
    state: "kerala",
    hNumber_Bname: "",
    streetColony: "",
    landMark: "",
    id: "",
  });

  const [isNewaddress, setIsNewAddress] = useState({
    sEmail: "",
    sPhone: "",
    fullName: "",
    mobile: "",
    pincode: "",
    city: "",
    state: "kerala",
    hNumber_Bname: "",
    streetColony: "",
    landMark: "",
  });
  const [formShow, setFormShow] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("swaToken"));
  var alphaExp = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
  const schema = Joi.object({
    sEmail: Joi.string()
      .required()
      .messages({
        "string.empty": `Please enter your email address.`,
        "string.email": `Please enter a valid email address.`,
      })
      .email({ tlds: { allow: false } }),
    sPhone: Joi.string()
      .required()
      .pattern(/^[0-9]{10}$/)
      .messages({
        "string.empty": "Please enter your mobile number.",
        "string.pattern.base": "Please enter a valid 10-digit mobile number.",
      }),
    fullName: Joi.string()
      .required()
      .messages({
        "string.empty": `Please enter your full name.`,
      }),
    mobile: Joi.string()
      .required()
      .pattern(/^[0-9]{10}$/)
      .messages({
        "string.empty": "Please enter your mobile number.",
        "string.pattern.base": "Please enter a valid 10-digit mobile number.",
      }),
    pincode: Joi.string()
      .required()
      .max(6)
      .min(6)
      .messages({
        "string.empty": `Please enter your pincode.`,
        "string.max": "Pincode must be exactly 6 digits.",
        "string.min": "Pincode must be exactly 6 digits.",
      }),
    city: Joi.string()
      .required()
      .messages({
        "string.empty": `Please enter your city`,
      }),
    state: Joi.string()
      .required()
      .messages({
        "string.empty": `State is a required field`,
      }),
    hNumber_Bname: Joi.string()
      .required()
      .messages({
        "string.empty": `Please enter your house number/building name.`,
      }),
    streetColony: Joi.string()
      .required()
      .messages({
        "string.empty": `Please enter your street/colony name.`,
      }),
    landMark: Joi.string()
      .allow("")
      .messages({ "string.empty": `` }),
  });

  const formRef = useRef(null);

  // const handleSubmit = () => {
  //   const formData = new FormData(formRef.current);
  //   const addressData = Object.fromEntries(formData.entries());

  //   const { error } = schema.validate(addressData, { abortEarly: false });
  //   if (error) {
  //     // Handle validation errors
  //     const errorMessage = error.details.map((detail) => detail.message).join(", ");
  //     console.error("Validation Error: ", errorMessage);

  //     return;
  //   }

  //   // Proceed with form submission
  //   // Your logic here...

  //   // Trigger form submission
  //   formRef.current.submit();

  // };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form data using Joi schema
    const { error } = schema.validate(addressData, {
      abortEarly: false,
      allowUnknown: true,
    });

    if (error) {
      // Form is invalid, display validation errors
      const validationErrors = error.details.reduce((errors, err) => {
        errors[err.path[0]] = err.message;
        return errors;
      }, {});
      setErrorMessage(validationErrors);
    } else {
      // Form is valid, proceed with submission
      console.log("Form submitted:", addressData);
      // Clear errors
      setErrorMessage({});
      handleSignUp(); // Call handleSignUp when there are no validation errors
    }
  };

  useEffect(() => {
    buyWithoutLogin(location.state.data);
  }, [location.state.data]);

  useEffect(() => {
    getDefaultAddress();
    if (props && props.proDet && props.proDet.data) {
      setTotal(props.proDet.data.total);
      setAmountPay(props.proDet.data.total);
    }
  }, []);

  useEffect(() => {
    buyWithoutLogin(location.state.data.product_id);
  }, [location.state.data]);

  console.log("location.state.data---->", location.state.data);

  const placeOrder = () => {
    let cartBody;
    let buyBody;
    if (promoId !== "") {
      cartBody = {
        promocode_id: promoId,
        address_id: props.address,
        mode: mode,
      };
      // buyBody = {
      //   product_id: props.proDet.data.product_id,
      //   color: props.proDet.data.color,
      //   size: props.proDet.data.size,
      //   promocode: code,
      //   address_id: props.address,
      //   mode: mode,
      // };
    } else {
      cartBody = {
        promocode_id: 0,
        address_id: props.address,
        mode: mode,
      };
      // buyBody = {
      //   product_id: props.proDet.data.product_id,
      //   color: props.proDet.data.color,
      //   size: props.proDet.data.size,
      //   promocode_id: 0,
      //   address_id: props.address,
      //   mode: mode,
      // };
    }
    if (props.proDet.name === "cart") {
      axios
        .post(Urls.checkout, cartBody, {
          headers: { Authorization: "Token " + token },
        })
        .then((response1) => {
          if (mode === "P") {
            var options = {
              key: "rzp_test_hbBeCNBjrqDq6P", // test Key
              key_secret: "HwgmIdicOPlAeLkBdOJIMXiu",
              key: "rzp_live_rKLs1hbpVT5npK",
              key_secret: "td3G02g20iPqQzfz4b2NFSFN",
              amount: amountPay * 100,
              order_id: response1.data.results.data.razorpay_order_id,
              currency: "INR",
              name: "Swa Diamonds",
              description: "for testing purpose",
              handler: function(response) {
                const bodyPay = {
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature,
                  order_id: response1.data.results.data.order.id,
                };
                axios
                  .post(Urls.paySuces, bodyPay, {
                    headers: { Authorization: "Token " + token },
                  })
                  .then((response2) => {
                    if (response2.data.success === true) {
                      history.push("/my_orders");
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              },
              prefill: {
                name: "",
                email: "",
                contact: "",
              },
              notes: {
                address: "Razorpay Corporate office",
              },
              theme: {
                color: "#007481",
              },
            };
            var pay = new window.Razorpay(options);
            pay.open();
          } else if (mode === "C") {
            if (response1.data.results.message === "successful") {
              history.push("/my_orders");
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (props.proDet.name === "buy") {
      axios
        .post(Urls.buyNow, buyBody, {
          headers: { Authorization: "Token " + token },
        })
        .then((response1) => {
          if (mode === "P") {
            var options = {
              //test_secret
              // key: "rzp_test_hbBeCNBjrqDq6P",
              // key_secret: "HwgmIdicOPlAeLkBdOJIMXiu",
              key: "rzp_live_rKLs1hbpVT5npK",
              key_secret: "td3G02g20iPqQzfz4b2NFSFN",
              amount: amountPay * 100,
              order_id: response1.data.results.data.razorpay_order_id,
              currency: "INR",
              name: "Swa Diamonds",
              description: "for testing purpose",
              handler: function(response) {
                const bodyPay = {
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature,
                  order_id: response1.data.results.data.order.id,
                };

                axios
                  .post(Urls.paySuces, bodyPay, {
                    headers: { Authorization: "Token " + token },
                  })
                  .then((response2) => {
                    if (response2.data.success === true) {
                      history.push("/my_orders");
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              },
              prefill: {
                name: "",
                email: "",
                contact: "",
              },
              notes: {
                address: "Razorpay Corporate office",
              },
              theme: {
                color: "#007481",
              },
            };
            var pay = new window.Razorpay(options);
            pay.open();
          } else if (mode === "C") {
            if (response1.data.results.message === "successful") {
              history.push("/my_orders");
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const showVoucherInput = () => {
    setVoucherInput(!voucherInput);
  };
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  // };
  const showHandler = () => {
    setShow(true);
  };
  const promCodeChngeHandler = (e) => {
    setCode(e.target.value);
  };
  const promoCodeHandler = () => {
    if (code.length === 0) {
      setErrorVald("Enter Voucher Code");
      setError("");
      setErrorImg(null);
    } else {
      setErrorVald("");
      let body;
      if (props.proDet.name === "cart") {
        body = {
          promocode: code,
          original_amount: null,
        };
      } else {
        body = {
          promocode: code,
          original_amount: total,
        };
      }

      axios
        .post(Urls.promoCode, body, {
          headers: { Authorization: "Token " + token },
        })
        .then((response1) => {
          if (response1.data.results.status_code === 404) {
            setError("Invalid coupon code");
            setErrorImg(Warning);
            setClr("#EB4925");
          } else if (response1.data.results.status_code === 200) {
            setError("Voucher code applied");
            setErrorImg(Succes);
            setClr("#07B018");
            setPromoId(response1.data.results.data.promocode_id);
            setAmountPay(response1.data.results.data.promo_applied_amount);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const formShowHandler = () => {
    setFormShow(true);
  };
  // const formik = useFormik({
  //   initialValues: {
  //     email: defaultAddress.email,
  //     phone: "",
  //     namef: "",
  //     mobile: defaultAddress.phone_number,
  //     building: "",
  //     city: "",
  //     pin: defaultAddress.pincode,
  //     colony: "",
  //     landMark: defaultAddress.landmark,
  //     state: "1",
  //   },
  //   validationSchema: Yup.object({
  //     namef: Yup.string()
  //       .required("This field is required")
  //       .matches(alphaExp, "Valid name"),

  //     mobile: Yup.string()
  //       // .min(6, "Password should be at least 6 characters ")
  //       .required("This field is required")
  //       .length(10, "Enter valid number"),
  //     building: Yup.string().required("This field is required"),
  //     city: Yup.string().required("This field is required"),
  //     pin: Yup.string()
  //       .required("This field is required")
  //       .min(5, "Enter valid pincode"),
  //     colony: Yup.string().required("This field is required"),
  //     landMark: Yup.string().required("This field is required"),
  //   }),
  //   onSubmit: (values, onSubmitprops) => {
  //     //   setIsLoading(true)

  //     const inputs = {
  //       name: values.namef,
  //       phone_code: "+91",
  //       phone_number: values.mobile,
  //       alt_code: "",
  //       alt_number: "",
  //       pincode: values.pin,
  //       state: values.state,
  //       city: values.city,
  //       landmark: values.landMark,
  //       house: values.building,
  //       area: values.colony,
  //       type: "HOME",
  //       is_main: false,
  //     };

  //     axios
  //       .post(Urls.addAdress, inputs, {
  //         headers: { Authorization: "Token " + token },
  //       })
  //       .then((response) => {
  //         onSubmitprops.resetForm();
  //         setFormShow(false);
  //         props.adresChnge(response.data.data.id);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   },
  // });
  const methodChange = (e) => {
    setMode(e.target.value);
  };
  // let adres;
  // if (props.isLoad) {
  //   adres = (
  //     <div className="d-flex justify-content-center align-items-center loader">
  //       {" "}
  //       <FadeLoader color="#00464d" />
  //     </div>
  //   );
  // } else {
  //   adres = (
  //     <>
  //       <Radio.Group onChange={props.radioChange} value={props.address}>
  //         <Space direction="vertical">
  //           {props.addressArray.map((item, index) => {
  //             return (
  //               <div className={Classes.AddresCont} key={index}>
  //                 <Radio value={item.id}>
  //                   <div className={Classes.Address}>
  //                     <h6 className={Classes.Name}>{item.name}</h6>
  //                     <p
  //                       className={Classes.AddreInner}
  //                       style={{ fontWeight: "400" }}
  //                     >
  //                       {item.house} ( house ){item.area} , {item.landmark}{" "}
  //                       {item.state} {item.pincode}
  //                     </p>
  //                     <span className={Classes.Mobile}>
  //                       phone number : {item.phone_code}
  //                       {item.phone_number}
  //                     </span>
  //                   </div>
  //                 </Radio>
  //               </div>
  //             );
  //           })}
  //         </Space>
  //       </Radio.Group>
  //       <div className={Classes.addAdres} onClick={formShowHandler}>
  //         <AiOutlineHome
  //           color="#0997E7"
  //           size={25}
  //           style={{ marginTop: "-5px" }}
  //         />
  //         &nbsp;&nbsp;Add new address
  //       </div>
  //     </>
  //   );
  // }
  let _userId = "";
  let _userName = "";
  let _userMob = "";
  const handleChangeAddress = (event) => {
    const { name, value } = event.target;
    setAddressData({
      ...addressData,
      [name]: value,
    });
  };

  const handleSignUp = async () => {
    if (token !== null) {
      submitAddress(token);
    } else {
      try {
        const body = {
          name: addressData.fullName,
          phone_code: "+91",
          phone_number: addressData.sPhone,
          email: addressData.sEmail,
          login_type: "NORMAL",
        };
        const response = await axios.post(Urls.register, body);
        if (response.data.results.status_code === 200) {
          setToken(response.data.results.data.token);
          setUserId(response.data.results.data.user.id);
          _userName = response.data.results.data.user.name;
          _userMob = response.data.results.data.user.phone_number;
          const _token = response.data.results.data.token;
          _userId = response.data.results.data.user.id;
          _token && _userId && submitAddress(_token);
        } else {
          alert("Something went wrong");
        }
      } catch (error) {
        alert(error.response.data.results.message);
      }
    }
  };

  const submitAddress = async (token) => {
    if (
      addressData.fullName !== isNewaddress.fullName ||
      addressData.city !== isNewaddress.city ||
      addressData.hNumber_Bname !== isNewaddress.hNumber_Bname ||
      addressData.landMark !== isNewaddress.landMark ||
      addressData.mobile !== isNewaddress.mobile ||
      addressData.pincode !== isNewaddress.pincode ||
      addressData.state !== isNewaddress.state ||
      addressData.streetColony !== isNewaddress.streetColony
    ) {
      try {
        const body = {
          name: addressData.fullName,
          phone_code: "+91",
          phone_number: addressData.mobile,
          email: addressData.sEmail,
          pincode: addressData.pincode,
          state: addressData.state,
          city: addressData.city,
          house: addressData.hNumber_Bname,
          area: addressData.streetColony,
          landmark: addressData.landMark,
          type: "HOME",
          // is_main: false,
        };
        const response = await axios.post(Urls.addAdress, body, {
          headers: { Authorization: "Token " + token },
        });
        if (response.data && response.data.status === 200) {
          console.log("userMob, userMob--->", _userName, _userMob);
          history.push({
            pathname: "/payment",
            state: {
              data: {
                pay: amountPay,
                total: total,
                addressId: response.data.data.id,
                updatedCart: props.proDet.data.updatedCartResponse,
                token: token,
                name: _userName,
                number: _userMob,
                buyBody: location.state.data,
                userId: _userId,
              },
              name: "cart",
            },
          });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      history.push({
        pathname: "/payment",
        state: {
          data: {
            pay: amountPay,
            total: total,
            addressId: addressData.id,
            updatedCart: props.proDet.data.updatedCartResponse,
          },
          name: "cart",
        },
      });
    }
  };

  const getDefaultAddress = async () => {
    try {
      const response = await axios.get(Urls.defaultAddress, {
        headers: { Authorization: "Token " + token },
      });
      if (response.data.results.status === 200) {
        setAddressData({
          ...addressData,
          sEmail: "nithin@gmail.com",
          sPhone: response.data.results.data.phone_number,
          fullName: response.data.results.data.name,
          mobile: response.data.results.data.phone_number,
          pincode: response.data.results.data.pincode,
          city: response.data.results.data.city,
          state: response.data.results.data.state,
          hNumber_Bname: response.data.results.data.house,
          streetColony: response.data.results.data.area,
          landMark: response.data.results.data.landmark,
          id: response.data.results.data.id,
        });
        setIsNewAddress({
          ...isNewaddress,
          sEmail: response.data.results.data.email,
          sPhone: response.data.results.data.phone_number,
          fullName: response.data.results.data.name,
          mobile: response.data.results.data.phone_number,
          pincode: response.data.results.data.pincode,
          city: response.data.results.data.city,
          state: response.data.results.data.state,
          hNumber_Bname: response.data.results.data.house,
          streetColony: response.data.results.data.area,
          landMark: response.data.results.data.landmark,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const buyWithoutLogin = async (productId) => {
    try {
      const response = await axios.get(
        `https://swaprdnecomnew.zinfog.in/ecom/buynow/?product_id=${productId}&promocode=`
      );
      if (response && response.data) {
        console.log("buy-->", response.data);
      }
      setTotal(response.data.total);
      setAmountPay(response.data.payable_amount);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("token-->Props", props);

  return (
    <div>
      <div className={`container ${Classes.MobCheck1}`}>
        <div className={`container ${Classes.MobCheck1}`}>
          <div className={Classes.Main1}>
            <div>
              <h1 className={Classes.Title}>Your details</h1>
              <div className={Classes.SubText}>
                <p className={`${Classes.Home} ${Classes.HomeNew}`}>
                  HOME /&nbsp;
                </p>
                <p className={`${Classes.Home} ${Classes.HomeNew}`}>
                  CART /&nbsp;
                </p>
                <p className={Classes.NewArrival}>CHECKOUT</p>
              </div>
            </div>
            <div className={Classes.Steps2}>
              STEP 2 <span style={{ color: "#949494" }}> / 3</span>{" "}
            </div>
          </div>

          <div className="row">
            <div className="col-md-8">
              {/* <div className={Classes.Main}>
                <div className={Classes.AddresLay}>{adres}</div>
              </div> */}

              <div className={Classes.Main}>
                <div className={Classes.Left}>
                  <form
                    ref={formRef}
                    autoComplete="off"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <div className={Classes.EmailMobileNew}>
                      <div className="Parant_Relative">
                        <label>Email</label>
                        <input
                          className={Classes.PlaceInput}
                          type="text"
                          placeholder="Sample@gmail.com"
                          value={addressData.sEmail}
                          name="sEmail"
                          onChange={handleChangeAddress}
                        />
                        {errorMessage.sEmail && (
                          <div className={Classes.ErrorMessage}>
                            {errorMessage.sEmail}
                          </div>
                        )}
                      </div>
                      <div className="Parant_Relative">
                        <label>Mobile number</label>
                        <input
                          className={Classes.PlaceInput}
                          type="text"
                          placeholder="+91 98975656785"
                          value={addressData.sPhone}
                          name="sPhone"
                          onChange={handleChangeAddress}
                        />
                        {errorMessage.sPhone && (
                          <div className={Classes.ErrorMessage}>
                            {errorMessage.sPhone}
                          </div>
                        )}
                      </div>
                    </div>
                    <p className={Classes.Heading}>Delivery Address</p>
                    <div className="Parant_Relative">
                      <label>Full Name</label>
                      <input
                        className={Classes.PlaceInput}
                        type="text"
                        placeholder="Full name*"
                        value={addressData.fullName}
                        name="fullName"
                        onChange={handleChangeAddress}
                      />
                      {errorMessage.fullName && (
                        <div className={Classes.ErrorMessage}>
                          {errorMessage.fullName}
                        </div>
                      )}
                    </div>

                    <div className={Classes.ParentF1}>
                      <div className="Parant_Relative">
                        <label>Mobile Number</label>
                        <input
                          className={Classes.PlaceInput}
                          type="number"
                          placeholder="Phone number*"
                          value={addressData.mobile}
                          name="mobile"
                          onChange={handleChangeAddress}
                        />
                        {errorMessage.mobile && (
                          <div className={Classes.ErrorMessage}>
                            {errorMessage.mobile}
                          </div>
                        )}
                      </div>
                      <div className="Parant_Relative">
                        <label>Pincode</label>
                        <input
                          className={Classes.PlaceInput}
                          type="text"
                          placeholder="Pincode*"
                          value={addressData.pincode}
                          name="pincode"
                          onChange={handleChangeAddress}
                        />
                        {errorMessage.pincode && (
                          <div className={Classes.ErrorMessage}>
                            {errorMessage.pincode}
                          </div>
                        )}
                      </div>
                      <div>
                        <label>City</label>
                        <input
                          className={Classes.PlaceInput}
                          type="text"
                          placeholder="City*"
                          value={addressData.city}
                          name="city"
                          onChange={handleChangeAddress}
                        />

                        {errorMessage.city && (
                          <div className={Classes.ErrorMessage}>
                            {errorMessage.city}
                          </div>
                        )}
                      </div>
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                      <label>State</label>
                      <Dropdown
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.value)}
                        options={states}
                        optionLabel="name"
                        placeholder="Select a state"
                      />
                      {errorMessage.state && (
                        <div className={Classes.ErrorMessage}>
                          {errorMessage.state}
                        </div>
                      )}
                    </div>

                    <div className={Classes.ParentStreetColony}>
                      <div className={Classes.House1NN}>
                        <label>House number / building name</label>
                        <input
                          className={Classes.PlaceInput}
                          type="text"
                          placeholder="house number/ building name*"
                          value={addressData.hNumber_Bname}
                          name="hNumber_Bname"
                          onChange={handleChangeAddress}
                        />
                        {errorMessage.hNumber_Bname && (
                          <div className={Classes.ErrorMessage}>
                            {errorMessage.hNumber_Bname}
                          </div>
                        )}
                      </div>
                      <div className={Classes.ColonyForm}>
                        <label>Street colony name</label>
                        <input
                          className={Classes.PlaceInput}
                          type="text"
                          placeholder="road name, area colony*"
                          value={addressData.streetColony}
                          name="streetColony"
                          onChange={handleChangeAddress}
                        />
                        {errorMessage.streetColony && (
                          <div className={Classes.ErrorMessage}>
                            {errorMessage.streetColony}
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <label>Land mark ( optional )</label>
                      <input
                        className={Classes.PlaceInput}
                        type="text"
                        placeholder="Landmark"
                        value={addressData.landMark}
                        name="landMark"
                        onChange={handleChangeAddress}
                      />
                      {errorMessage.landMark && (
                        <div className={Classes.ErrorMessage}>
                          {errorMessage.landMark}
                        </div>
                      )}
                    </div>

                    {/* <div className={Classes.Flex}>
                                    <input className={Classes.CheckBox} type="checkbox" id="ship" value='Address' />
                                    <label className={Classes.CheckBoxLabel} for="ship">Make this address as shipping address </label>
                                    
                                </div> */}
                    <div className={Classes.Save}>
                      {/* <div
                        type="submit"
                        className={Classes.Submit}
                        onClick={formik.handleSubmit}
                      >
                        Save address
                      </div> */}
                    </div>
                  </form>
                </div>
              </div>

              {/* payment method old design */}

              {/* <div className={Classes.Method}>
                <h3>Payment Method</h3>
                <div className={Classes.MethodPad}>
                  <Radio.Group onChange={methodChange} value={mode}>
                    <Space direction="vertical">
                      <Radio value={"C"}>
                        <div className={Classes.Address}>Cash on Delivery</div>
                      </Radio>

                      <Radio value={"P"}>
                        <div className={Classes.Address}>Online Payment</div>
                      </Radio>
                    </Space>
                  </Radio.Group>
                </div>
              </div> */}
              {/* payment method old design */}
            </div>
            <div className="col-md-4">
              <p className={Classes.Order1P}>ORDER SUMMERY</p>
              <div className={Classes.Right}>
                <p className={Classes.OrderSummery}>ORDER SUMMERY</p>
                <div className={Classes.TotalText}>
                  <div className={Classes.TotalItem}>
                    <p className={Classes.TotalSmall}>Total</p>
                  </div>

                  <p className={Classes.Amount}>
                    <BiRupee />
                    {total}
                  </p>
                </div>
                <div className={Classes.TotalItemBorder}>
                  <p className={Classes.TotalPayable}>Total Payable</p>
                  <div className={Classes.TotalItems}>
                    <BiRupee className={Classes.Rupee} size={20} />
                    <p className={Classes.AmountPayable}>{amountPay}</p>
                  </div>
                </div>
                {/* <div className={Classes.Voucher}>
                  <p className={Classes.NumOfItem}>
                    Do you have Voucher code ?
                  </p>
                  <p className={Classes.Apply} onClick={showHandler}>
                    Apply
                  </p>
                </div> */}
                {/* {show ? (
                  <form onSubmit={handleSubmit} autoComplete="off">
                    <div className="d-flex" style={{ marginTop: "10px" }}>
                      <input
                        className={Classes.Input}
                        type="text"
                        value={code}
                        onChange={promCodeChngeHandler}
                        name="name"
                        placeholder="    SWAFRST"
                      />
                      <input
                        className={Classes.ApplyButton}
                        type="submit"
                        onClick={promoCodeHandler}
                      />
                    </div>
                    <p className="errrMsg" style={{ fontSize: "14px" }}>
                      {errorVald}
                    </p>

                    <div className={Classes.Validation}>
                      {errorImg !== null ? (
                        <img
                          className={Classes.Warning}
                          src={errorImg}
                          alt="Warning"
                        />
                      ) : null}
                      <p
                        className={Classes.ValidationText}
                        style={{ color: clr }}
                      >
                        {error}
                      </p>
                    </div>
                  </form>
                ) : null} */}

                <div
                  className={Classes.PlaceOrderButton}
                  // onClick={placeOrder}
                  onClick={handleSubmit}
                >
                  Proceed to payment
                </div>
                {total !== amountPay ? (
                  <p className={Classes.HurrayText}>
                    You totoly saved {total - amountPay}. hurray!..
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
