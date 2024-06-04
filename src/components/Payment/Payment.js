import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom";
import Classes from "./Payment.module.css";
import phonepay from "../../Assets/phonepay.svg";
import { BiRupee } from "react-icons/bi";
import { CgDollar } from "react-icons/cg";
import mastercard from "../../Assets/mastercard.svg";
import axios from "axios";
import * as Urls from "../../Urls";
import AddAddress from "../CheckOut/AddAddress";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Payment = () => {
  const countryId = localStorage.getItem("id");
  const token = localStorage.getItem("swaToken");
  const localAddress = localStorage.getItem("Address");
  const Contryname = localStorage.getItem("country_name");
  const history = useHistory();
  const location = useLocation();
  const [promoId, setPromoId] = useState("");
  const [mode, setMode] = useState("");
  const [amountPay, setAmountPay] = useState(100);
  const [showChangeAddress, setShowChangeAddress] = useState(false);
  const [changeId, setChangeId] = useState("");
  const [cartCount, setCartCount] = useState("");
  const [loading, setLoading] = useState(false);
  const [addressId, setAddressId] = useState(null);
  const [address, setAddress] = useState([]);
  const pincodes = localStorage.getItem("pincode");
  const [isLoading, setIsLoading] = useState(false);
  const [pmethodError, setPmethodError] = useState("");
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
  const { data, name } = location.state;
  const handleChangeAddress = () => {
    setShowChangeAddress((prevState) => !prevState);
  };

  useEffect(() => {
    setLoading(true);
    fetchAddress();
    // setTotal(props.location.state.data.total);
    // axios
    //   .get(Urls.cart, { headers: { Authorization: "Token " + token } })
    //   .then((response1) => {
    //     if (response1.data.results.message === "cart is empty") {
    //       setCartCount("");
    //     } else {
    //       setCartCount(response1.data.results.count);
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }, [changeId]);

  const adressChangeHanlder = (id) => {
    setChangeId(id);
  };
  const radioChangeHandler = (e) => {
    setAddressId(e.target.value);
  };

  useEffect(() => {
    let _token = !data.token ? token : data.token;
    // _token && getDefaultAddress(_token);
    setAddressData(data.addressData);
  }, [data]);

  const handlePayButton = () => {
    if (localAddress) {
      submitAddress();
    } else {
      placeOrder();
    }
  };

  const submitAddress = async () => {
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
      if (
        response.data &&
        response.data.status === 200 &&
        response.data.data &&
        response.data.data.id
      ) {
        placeOrder(response.data.data.id);
      }
    } catch (error) {
      console.log(error);
    }
    // if (
    //   addressData.fullName !== isNewaddress.fullName ||
    //   addressData.city !== isNewaddress.city ||
    //   addressData.hNumber_Bname !== isNewaddress.hNumber_Bname ||
    //   addressData.landMark !== isNewaddress.landMark ||
    //   addressData.mobile !== isNewaddress.mobile ||
    //   addressData.pincode !== isNewaddress.pincode ||
    //   addressData.state !== isNewaddress.state ||
    //   addressData.streetColony !== isNewaddress.streetColony
    // ) {
    //   try {
    //     const body = {
    //       name: addressData.fullName,
    //       phone_code: "+91",
    //       phone_number: addressData.mobile,
    //       email: addressData.sEmail,
    //       pincode: addressData.pincode,
    //       state: addressData.state,
    //       city: addressData.city,
    //       house: addressData.hNumber_Bname,
    //       area: addressData.streetColony,
    //       landmark: addressData.landMark,
    //       type: "HOME",
    //       // is_main: false,
    //     };
    //     const response = await axios.post(Urls.addAdress, body, {
    //       headers: { Authorization: "Token " + token },
    //     });
    //     if (response.data && response.data.status === 200) {
    //       history.push({
    //         pathname: "/payment",
    //         state: {
    //           data: {
    //             pay: amountPay,
    //             total: total,
    //             addressId: response.data.data.id,
    //             updatedCart: props.proDet.data.updatedCartResponse,
    //             token: token,
    //             name: _userName,
    //             number: _userMob,
    //             buyBody: location.state.data,
    //             userId: _userId,
    //             totalSavedAmount: props.proDet.data.totalSavedAmount,
    //             addressData: addressData,
    //           },
    //           name: "cart",
    //         },
    //       });
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // } else {
    //   history.push({
    //     pathname: "/payment",
    //     state: {
    //       data: {
    //         pay: amountPay,
    //         total: total,
    //         addressId: addressData.id,
    //         updatedCart: props.proDet.data.updatedCartResponse,
    //         totalSavedAmount: props.proDet.data.totalSavedAmount,
    //         addressData: addressData,
    //       },
    //       name: "cart",
    //     },
    //   });
    // }
  };

  const placeOrder = (addressId) => {
    let cartBody;
    let buyBody;
    const p_Method = mode === "cash" ? "C" : "P";
    if (promoId !== "") {
      cartBody = {
        promocode_id: promoId,
        address_id: addressId ? addressId : data.addressId,
        mode: p_Method,
        amount_to_pay: data.updatedCart
          ? data.updatedCart.amount_to_pay
          : data.pay,
        exchange_wallet_balance: data.updatedCart.exchange_wallet_balance,
        swa_wallet_balance: data.updatedCart.swa_wallet_balance,
        wallet_amount_used: data.updatedCart.wallet_amount_used,
        exchange_change: data.updatedCart.exchange_change,
        swa_change: data.updatedCart.swa_change,
      };
      if (data.buyBody) {
        buyBody = {
          product_id: data.buyBody.product_id,
          color: data.buyBody.color,
          size: data.buyBody.size,
          promocode: "",
          address_id: addressId ? addressId : data.addressId,
          mode: p_Method,
          user_id: data.userId,
        };
      }
    } else {
      cartBody = {
        promocode_id: 0,
        address_id: addressId ? addressId : data.addressId,
        mode: p_Method,
        amount_to_pay: data.updatedCart
          ? data.updatedCart.amount_to_pay
          : data.pay,
        exchange_wallet_balance: data.updatedCart
          ? data.updatedCart.exchange_wallet_balance
          : 0,
        swa_wallet_balance: data.updatedCart
          ? data.updatedCart.swa_wallet_balance
          : 0,
        wallet_amount_used: data.updatedCart
          ? data.updatedCart.wallet_amount_used
          : 0,
        exchange_change: data.updatedCart
          ? data.updatedCart.exchange_change
          : 0,
        swa_change: data.updatedCart ? data.updatedCart.swa_change : 0,
      };
      if (data.buyBody) {
        buyBody = {
          product_id: data.buyBody.product_id,
          color: data.buyBody.color,
          size: data.buyBody.size,
          promocode: "",
          address_id: addressId ? addressId : data.addressId,
          mode: p_Method,
          user_id: data.userId,
        };
      }
    }
    if ((mode === "upi" || mode === "credit_card") && name === "buybody") {
      axios
        .post(`${Urls.buyNow}?country=${countryId}`, buyBody, {
          headers: {
            Authorization: "Token " + token,
          },
        })
        .then((response1) => {
          var options = {
            //test_secret
            key: "rzp_test_hbBeCNBjrqDq6P",
            key_secret: "HwgmIdicOPlAeLkBdOJIMXiu",
            // key: "rzp_live_rKLs1hbpVT5npK",
            // key_secret: "td3G02g20iPqQzfz4b2NFSFN",
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
                  headers: {
                    Authorization: "Token " + token,
                  },
                })
                .then((response2) => {
                  if (response2.data.results.status_code === 200 && !token) {
                    localStorage.setItem("swaToken", data.token);
                    localStorage.setItem("userName", data.name);
                    localStorage.setItem("phoneNumber", data.number);
                    localStorage.removeItem("Address");
                    history.push("/my_orders");
                  } else if (response2.data.results.status_code === 200) {
                    localStorage.removeItem("Address");
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
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (mode === "cash" && name === "buybody") {
      axios
        .post(`${Urls.buyNow}?country=${countryId}`, buyBody, {
          headers: {
            Authorization: "Token " + token,
          },
        })
        .then((response1) => {
          if (response1.data.results.status_code === 200 && !token) {
            localStorage.setItem("swaToken", data.token);
            localStorage.setItem("userName", data.name);
            localStorage.setItem("phoneNumber", data.number);
            localStorage.removeItem("Address");
            history.push("/my_orders");
          } else if (response1.data.results.status_code === 200) {
            localStorage.removeItem("Address");
            history.push("/my_orders");
          }
        });
    } else if ((mode === "upi" || mode === "credit_card") && name === "cart") {
      setIsLoading(true);
      axios
        .post(`${Urls.checkout}?country=${countryId}`, cartBody, {
          headers: { Authorization: "Token " + token },
        })
        .then((response1) => {
          setIsLoading(false);
          var options = {
            key: "rzp_test_hbBeCNBjrqDq6P", // test Key
            key_secret: "HwgmIdicOPlAeLkBdOJIMXiu",
            // key: "rzp_live_rKLs1hbpVT5npK",
            // key_secret: "td3G02g20iPqQzfz4b2NFSFN",
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
                .then((response1) => {
                  console.log(response1);
                  if (response1.data.results.status_code === 200 && !token) {
                    localStorage.setItem("swaToken", data.token);
                    localStorage.setItem("userName", data.name);
                    localStorage.setItem("phoneNumber", data.number);
                    setIsLoading(false);
                    localStorage.removeItem("Address");
                    history.push("/my_orders");
                  } else if (response1.data.results.status_code === 200) {
                    setIsLoading(false);
                    localStorage.removeItem("Address");
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
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (mode === "cash" && name === "cart") {
      setIsLoading(true);
      axios
        .post(`${Urls.checkout}?country=${countryId}`, cartBody, {
          headers: { Authorization: "Token " + token },
        })
        .then((response1) => {
          setIsLoading(false);
          if (response1.data.results.status_code === 200 && !token) {
            localStorage.setItem("swaToken", data.token);
            localStorage.setItem("userName", data.name);
            localStorage.setItem("phoneNumber", data.number);
            localStorage.removeItem("Address");
            history.push("/my_orders");
          } else if (response1.data.results.status_code === 200) {
            localStorage.removeItem("Address");
            history.push("/my_orders");
          }
        });
    }
    // if (token) {
    //   if (mode === "upi" || mode === "credit_card") {
    //     setIsLoading(true);
    //     axios
    //       .post(Urls.checkout, cartBody, {
    //         headers: { Authorization: "Token " + _userToken },
    //       })
    //       .then((response1) => {
    //         setIsLoading(false);
    //         var options = {
    //           key: "rzp_test_hbBeCNBjrqDq6P", // test Key
    //           key_secret: "HwgmIdicOPlAeLkBdOJIMXiu",
    //           // key: "rzp_live_rKLs1hbpVT5npK",
    //           // key_secret: "td3G02g20iPqQzfz4b2NFSFN",
    //           amount: amountPay * 100,
    //           order_id: response1.data.results.data.razorpay_order_id,
    //           currency: "INR",
    //           name: "Swa Diamonds",
    //           description: "for testing purpose",
    //           handler: function(response) {
    //             const bodyPay = {
    //               razorpay_payment_id: response.razorpay_payment_id,
    //               razorpay_order_id: response.razorpay_order_id,
    //               razorpay_signature: response.razorpay_signature,
    //               order_id: response1.data.results.data.order.id,
    //             };
    //             axios
    //               .post(Urls.paySuces, bodyPay, {
    //                 headers: { Authorization: "Token " + token },
    //               })
    //               .then((response1) => {
    //                 console.log(response1);
    //                 if (response1.data.results.status_code === 200 && !token) {
    //                   localStorage.setItem("swaToken", data.token);
    //                   localStorage.setItem("userName", data.name);
    //                   localStorage.setItem("phoneNumber", data.number);
    //                   setIsLoading(false);
    //                   localStorage.removeItem("Address");
    //                   history.push("/my_orders");
    //                 } else if (response1.data.results.status_code === 200) {
    //                   setIsLoading(false);
    //                   localStorage.removeItem("Address");
    //                   history.push("/my_orders");
    //                 }
    //               })
    //               .catch((error) => {
    //                 console.log(error);
    //               });
    //           },
    //           prefill: {
    //             name: "",
    //             email: "",
    //             contact: "",
    //           },
    //           notes: {
    //             address: "Razorpay Corporate office",
    //           },
    //           theme: {
    //             color: "#007481",
    //           },
    //         };
    //         var pay = new window.Razorpay(options);
    //         pay.open();
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //       });
    //   } else if (mode === "cash") {
    //     setIsLoading(true);
    //     axios
    //       .post(Urls.checkout, cartBody, {
    //         headers: { Authorization: "Token " + _userToken },
    //       })
    //       .then((response1) => {
    //         setIsLoading(false);
    //         if (response1.data.results.status_code === 200 && !token) {
    //           localStorage.setItem("swaToken", data.token);
    //           localStorage.setItem("userName", data.name);
    //           localStorage.setItem("phoneNumber", data.number);
    //           localStorage.removeItem("Address");
    //           history.push("/my_orders");
    //         } else if (response1.data.results.status_code === 200) {
    //           localStorage.removeItem("Address");
    //           history.push("/my_orders");
    //         }
    //       });
    //   }
    // } else {
    //   if (mode === "upi" || mode === "credit_card") {
    //     axios
    //       .post(Urls.buyNow, buyBody, {
    //         headers: {
    //           Authorization: "Token " + _userToken,
    //         },
    //       })
    //       .then((response1) => {
    //         var options = {
    //           //test_secret
    //           key: "rzp_test_hbBeCNBjrqDq6P",
    //           key_secret: "HwgmIdicOPlAeLkBdOJIMXiu",
    //           // key: "rzp_live_rKLs1hbpVT5npK",
    //           // key_secret: "td3G02g20iPqQzfz4b2NFSFN",
    //           amount: amountPay * 100,
    //           order_id: response1.data.results.data.razorpay_order_id,
    //           currency: "INR",
    //           name: "Swa Diamonds",
    //           description: "for testing purpose",
    //           handler: function(response) {
    //             const bodyPay = {
    //               razorpay_payment_id: response.razorpay_payment_id,
    //               razorpay_order_id: response.razorpay_order_id,
    //               razorpay_signature: response.razorpay_signature,
    //               order_id: response1.data.results.data.order.id,
    //             };

    //             axios
    //               .post(Urls.paySuces, bodyPay, {
    //                 headers: {
    //                   Authorization: "Token " + token,
    //                 },
    //               })
    //               .then((response2) => {
    //                 if (response2.data.results.status_code === 200 && !token) {
    //                   localStorage.setItem("swaToken", data.token);
    //                   localStorage.setItem("userName", data.name);
    //                   localStorage.setItem("phoneNumber", data.number);
    //                   localStorage.removeItem("Address");
    //                   history.push("/my_orders");
    //                 } else if (response2.data.results.status_code === 200) {
    //                   localStorage.removeItem("Address");
    //                   history.push("/my_orders");
    //                 }
    //               })
    //               .catch((error) => {
    //                 console.log(error);
    //               });
    //           },
    //           prefill: {
    //             name: "",
    //             email: "",
    //             contact: "",
    //           },
    //           notes: {
    //             address: "Razorpay Corporate office",
    //           },
    //           theme: {
    //             color: "#007481",
    //           },
    //         };
    //         var pay = new window.Razorpay(options);
    //         pay.open();
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //       });
    //   } else if (mode === "cash") {
    //     axios
    //       .post(Urls.buyNow, buyBody, {
    //         headers: {
    //           Authorization: "Token " + _userToken,
    //         },
    //       })
    //       .then((response1) => {
    //         if (response1.data.results.status_code === 200 && !token) {
    //           localStorage.setItem("swaToken", data.token);
    //           localStorage.setItem("userName", data.name);
    //           localStorage.setItem("phoneNumber", data.number);
    //           localStorage.removeItem("Address");
    //           history.push("/my_orders");
    //         } else if (response1.data.results.status_code === 200) {
    //           localStorage.removeItem("Address");
    //           history.push("/my_orders");
    //         }
    //       });
    //   }
    // }
    console.log("buyBody-->", buyBody);
    console.log("cartBody--->", cartBody);
  };

  const handleMethodChange = (event) => {
    setMode(event.target.value);
  };

  const getDefaultAddress = async (_token) => {
    try {
      const response = await axios.get(Urls.defaultAddress, {
        headers: { Authorization: "Token " + _token },
      });
      if (response.data.results.status === 200) {
        setAddressData({
          ...addressData,
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
          id: response.data.results.data.id,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAddress = () => {
    axios
      .get(Urls.address, { headers: { Authorization: "Token " + token } })
      .then((response1) => {
        setAddress(response1.data.results.data);
        if (response1.data.results.data.length !== 0) {
          setAddressId(
            response1.data.results.data[response1.data.results.data.length - 1]
              .id
          );
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDoneButton = () => {
    getDefaultAddress(token);
    fetchAddress();
  };

  function formatIndianNumber(number) {
    const numberString = number && number.toString();
    const lastThreeDigits = numberString && numberString.slice(-3);
    const otherDigits = numberString && numberString.slice(0, -3);

    return (
      otherDigits &&
      otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ",") +
        (otherDigits ? "," : "") +
        lastThreeDigits
    );
  }

  return (
    <div>
      <div className={`${Classes.Wrapper} container`}>
        <div>
          <div className={Classes.Main}>
            <div>
              <h1 className={Classes.Title}>Payments</h1>
              <div className={Classes.SubText}>
                <p className={`${Classes.Home} ${Classes.HomeNew}`}>HOME /</p>
                <p className={`${Classes.Home} ${Classes.HomeNew}`}>CART /</p>
                <p className={Classes.NewArrival}>CHECKOUT</p>
              </div>
            </div>
            <div className={Classes.Step}>
              <h1
                className={Classes.Title}
                style={{
                  fontWeight: 600,
                  fontSize: "16px",
                }}
              >
                STEP 3 <span style={{ color: "#0d1217 !important" }}> / 3</span>
              </h1>
            </div>
          </div>
        </div>
        <div className={Classes.PaymentCards}>
          <div className={Classes.PaymentMethod}>
            <h4>Payment Method</h4>
            <p>Choose your payment method</p>
            {/* <div className={Classes.Pmethod}>
              <input
                type="radio"
                value="credit_card"
                style={{ cursor: "pointer" }}
                checked={mode === "credit_card"}
                onChange={handleMethodChange}
              />
              <img src={mastercard} alt="Mastercard" />
              Debit / Credit card
            </div>
            <div className={Classes.Pmethod}>
              <input
                type="radio"
                value="upi"
                style={{ cursor: "pointer" }}
                checked={mode === "upi"}
                onChange={handleMethodChange}
              />
              <img src={phonepay} alt="Phonepay" />
              UPI
            </div> */}
            <div className={Classes.Pmethod}>
              <input
                type="radio"
                value="cash"
                style={{ cursor: "pointer" }}
                checked={mode === "cash"}
                onChange={handleMethodChange}
              />
              Cash on delivery
            </div>
          </div>
          <div className={Classes.TotalCard}>
            <div className={Classes.Right}>
              <div className={Classes.TotalText}>
                <div className={Classes.TotalItem}>
                  <p className={Classes.TotalSmall}>
                    Total &nbsp;<span>{data.totalItems} Items</span>
                  </p>
                </div>

                <p className={Classes.Amount}>
                  {Contryname === "India" && (
                    <BiRupee className={Classes.Rupee} />
                  )}
                  {Contryname === "United States" && (
                    <CgDollar className={Classes.Rupee} />
                  )}
                  {Contryname === "United Arab Emirates" && (
                    <span style={{ paddingRight: "5px" }}>AED</span>
                  )}{" "}
                  {formatIndianNumber(data.total)}
                </p>
              </div>
              <div
                className={Classes.TotalText}
                style={{
                  borderBottom: "1px solid #e8e9ea",
                  paddingTop: "15px",
                }}
              >
                <div className={Classes.TotalItem}>
                  <p className={Classes.TotalSmall}>TOTAL PAYABLE</p>
                </div>

                <p className={Classes.Amount}>
                  {Contryname === "India" && (
                    <BiRupee className={Classes.Rupee} />
                  )}
                  {Contryname === "United States" && (
                    <CgDollar className={Classes.Rupee} />
                  )}
                  {Contryname === "United Arab Emirates" && (
                    <span style={{ paddingRight: "5px" }}>AED</span>
                  )}{" "}
                  {formatIndianNumber(data.pay)}
                </p>
              </div>
              <div
                className={Classes.PayButton}
                onClick={() => {
                  mode
                    ? handlePayButton()
                    : alert("Please select a payment method");
                  // setPmethodError("Please select a payment method");
                }}
              >
                {isLoading ? (
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <CircularProgress size={20} sx={{ color: "#fff" }} />
                    </Box>
                  </>
                ) : (
                  <>
                    Pay{" "}
                    {Contryname === "India" && (
                      <BiRupee className={Classes.Rupee} />
                    )}
                    {Contryname === "United States" && (
                      <CgDollar className={Classes.Rupee} />
                    )}
                    {Contryname === "United Arab Emirates" && (
                      <span style={{ paddingRight: "5px" }}>AED</span>
                    )}{" "}
                    {formatIndianNumber(data.pay)}
                  </>
                )}
              </div>
              {data.totalSavedAmount ? (
                <p className={Classes.HurrayText}>
                  You totaly saved {data.totalSavedAmount} hurray!..
                </p>
              ) : null}
              {pincodes && (
                <div className={Classes.deliverypay}>
                  Expected Delivery : Delivery in 5-7 Days
                </div>
              )}
            </div>
          </div>
          <div className={Classes.DeliverCard}>
            <div className={Classes.DeliverCardHeader}>
              <h4>{!showChangeAddress && "Deliver to"}</h4>
              <div className={Classes.Changebtn} onClick={handleChangeAddress}>
                {showChangeAddress ? (
                  <p onClick={handleDoneButton}>Done</p>
                ) : (
                  <p>Change</p>
                )}
              </div>
            </div>
            {showChangeAddress ? (
              <>
                <AddAddress
                  addressArray={address}
                  fetchAddress={fetchAddress}
                  name={"payment"}
                />
              </>
            ) : (
              <>
                <p className={Classes.Name}>{addressData.fullName}</p>
                <p className={Classes.SubAddress}>
                  {addressData.hNumber_Bname} (House) {addressData.city}{" "}
                  {addressData.pincode}
                </p>
                <p className={Classes.SubAddress}>{addressData.landMark}</p>
                <p className={Classes.SubAddress}>{addressData.streetColony}</p>
                <p className={Classes.SubAddress}>{addressData.state}</p>
                <p className={Classes.SubAddress} style={{ marginTop: "15px" }}>
                  Phone number:{addressData.mobile}
                </p>
              </>
            )}
          </div>
          <div
            className={Classes.PayButtonMobile}
            onClick={() => {
              mode ? placeOrder() : alert("Please select a payment method");
              // setPmethodError("Please select a payment method");
            }}
          >
            Pay{" "}
            {Contryname === "India" && <BiRupee className={Classes.Rupee} />}
            {Contryname === "United States" && (
              <CgDollar className={Classes.Rupee} />
            )}
            {Contryname === "United Arab Emirates" && (
              <span style={{ paddingRight: "5px" }}>AED</span>
            )}{" "}
            {data.pay}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
