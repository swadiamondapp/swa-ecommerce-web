import React, { useEffect } from "react";
import Classes from "./CheckOut.module.css";
import { useHistory } from "react-router-dom";
import { BiRupee } from "react-icons/bi";

import { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import Warning from "../../Assets/Warning.png";
import Succes from "../../Assets/success.png";
import { AiOutlineHome } from "react-icons/ai";
import { Radio, Space } from "antd";
import axios from "axios";
import { FadeLoader } from "react-spinners";
import * as Urls from "../../Urls";
import { useFormik } from "formik";
import * as Yup from "yup";

function CheckOut(props) {
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

  const [formShow, setFormShow] = useState(false);

  const token = localStorage.getItem("swaToken");
  var alphaExp = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;

  useEffect(() => {
    setTotal(props.total);
    setAmountPay(props.total);
  }, []);
  const placeOrder = () => {
    let cartBody;
    let buyBody;
    if (promoId !== "") {
      cartBody = {
        promocode_id: promoId,
        address_id: props.address,
        mode: mode,
      };
      buyBody = {
        product_id: props.proDet.data.product_id,
        color: props.proDet.data.color,
        size: props.proDet.data.size,
        promocode: code,
        address_id: props.address,
        mode: mode,
      };
    } else {
      cartBody = {
        promocode_id: 0,
        address_id: props.address,
        mode: mode,
      };
      buyBody = {
        product_id: props.proDet.data.product_id,
        color: props.proDet.data.color,
        size: props.proDet.data.size,
        promocode_id: 0,
        address_id: props.address,
        mode: mode,
      };
    }
    if (props.proDet.name === "cart") {
      axios
        .post(Urls.checkout, cartBody, {
          headers: { Authorization: "Token " + token },
        })
        .then((response1) => {
          if (mode === "P") {
            var options = {
              // key: "rzp_test_hbBeCNBjrqDq6P", // test Key
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
  const handleSubmit = (event) => {
    event.preventDefault();
  };
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
  const formik = useFormik({
    initialValues: {
      namef: "",
      mobile: "",
      building: "",
      city: "",
      pin: "",
      colony: "",
      landMark: "",
      state: "1",
    },
    validationSchema: Yup.object({
      namef: Yup.string()
        .required("This field is required")
        .matches(alphaExp, "Valid name"),

      mobile: Yup.string()
        // .min(6, "Password should be at least 6 characters ")
        .required("This field is required")
        .length(10, "Enter valid number"),
      building: Yup.string().required("This field is required"),
      city: Yup.string().required("This field is required"),
      pin: Yup.string()
        .required("This field is required")
        .min(5, "Enter valid pincode"),
      colony: Yup.string().required("This field is required"),
      landMark: Yup.string().required("This field is required"),
    }),
    onSubmit: (values, onSubmitprops) => {
      //   setIsLoading(true)

      const inputs = {
        name: values.namef,
        phone_code: "+91",
        phone_number: values.mobile,
        alt_code: "",
        alt_number: "",
        pincode: values.pin,
        state: values.state,
        city: values.city,
        landmark: values.landMark,
        house: values.building,
        area: values.colony,
        type: "HOME",
        is_main: false,
      };

      axios
        .post(Urls.addAdress, inputs, {
          headers: { Authorization: "Token " + token },
        })
        .then((response) => {
          onSubmitprops.resetForm();
          setFormShow(false);
          props.adresChnge(response.data.data.id);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });
  const methodChange = (e) => {
    setMode(e.target.value);
  };
  let adres;
  if (props.isLoad) {
    adres = (
      <div className="d-flex justify-content-center align-items-center loader">
        {" "}
        <FadeLoader color="#00464d" />
      </div>
    );
  } else {
    adres = (
      <>
        <Radio.Group onChange={props.radioChange} value={props.address}>
          <Space direction="vertical">
            {props.addressArray.map((item, index) => {
              return (
                <div className={Classes.AddresCont} key={index}>
                  <Radio value={item.id}>
                    <div className={Classes.Address}>
                      <h6 className={Classes.Name}>{item.name}</h6>
                      <p
                        className={Classes.AddreInner}
                        style={{ fontWeight: "400" }}
                      >
                        {item.house} ( house ){item.area} , {item.landmark}{" "}
                        {item.state} {item.pincode}
                      </p>
                      <span className={Classes.Mobile}>
                        phone number : {item.phone_code}
                        {item.phone_number}
                      </span>
                    </div>
                  </Radio>
                </div>
              );
            })}
          </Space>
        </Radio.Group>
        <div className={Classes.addAdres} onClick={formShowHandler}>
          <AiOutlineHome
            color="#0997E7"
            size={25}
            style={{ marginTop: "-5px" }}
          />
          &nbsp;&nbsp;Add new address
        </div>
      </>
    );
  }

  return (
    <div>
      <div className="container">
        <div className="container">
          <div className={Classes.Main}>
            <h1 className={Classes.Title}>Checkout</h1>
            <div className={Classes.SubText}>
              <p className={`${Classes.Home} ${Classes.HomeNew}`}>HOME /</p>
              <p className={`${Classes.Home} ${Classes.HomeNew}`}>CART /</p>
              <p className={Classes.NewArrival}>CHECKOUT</p>
            </div>
          </div>

          <div className="row">
            <div className="col-md-8">
              {/* <div className={Classes.Main}>
                <div className={Classes.AddresLay}>{adres}</div>
              </div> */}

              <div className={Classes.Main}>
                <div className={Classes.Left}>
                  <form autoComplete="off" onSubmit={formik.handleSubmit}>
                    <div className={Classes.EmailMobileNew}>
                      <div>
                        <label>Email</label>
                        <input
                          className={Classes.PlaceInput}
                          type="text"
                          placeholder="Sample@gmail.com"
                          name="email"
                          onChange={formik.handleChange}
                        />
                      </div>
                      <div>
                        <label>Mobile number</label>
                        <input
                          className={Classes.PlaceInput}
                          type="text"
                          placeholder="+91 98975656785"
                          name="mobile"
                          onChange={formik.handleChange}
                        />
                      </div>
                    </div>
                    <p className={Classes.Heading}>Delivery Address</p>
                    <div>
                      <label>Full Name</label>
                      <input
                        className={Classes.PlaceInput}
                        type="text"
                        placeholder="Full name*"
                        value={formik.values.namef}
                        name="namef"
                        onChange={formik.handleChange}
                      />
                      {formik.touched.namef && formik.errors.namef && (
                        <div className={Classes.ErrorMsg}>
                          {formik.errors.namef}
                        </div>
                      )}
                    </div>

                    <div className={Classes.ParentF1}>
                      <div>
                        <labe>Mobile Number</labe>
                        <input
                          className={Classes.PlaceInput}
                          type="number"
                          placeholder="Phone number*"
                          value={formik.values.mobile}
                          name="mobile"
                          onChange={formik.handleChange}
                        />
                        {formik.touched.mobile && formik.errors.mobile && (
                          <div className={Classes.ErrorMsg}>
                            {formik.errors.mobile}
                          </div>
                        )}
                      </div>
                      <div>
                        <input
                          className={Classes.PlaceInput}
                          type="text"
                          placeholder="Pincode*"
                          value={formik.values.pin}
                          name="pin"
                          onChange={formik.handleChange}
                        />
                        {formik.touched.pin && formik.errors.pin && (
                          <div className={Classes.ErrorMsg}>
                            {formik.errors.pin}
                          </div>
                        )}
                      </div>
                      <div>
                        <input
                          className={Classes.PlaceInput}
                          type="text"
                          placeholder="City*"
                          value={formik.values.city}
                          name="city"
                          onChange={formik.handleChange}
                        />
                        {formik.touched.city && formik.errors.city && (
                          <div className={Classes.ErrorMsg}>
                            {formik.errors.city}
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label>State</label>
                      <select
                        className={Classes.PlaceInputDrop}
                        value={formik.values.state}
                        name="state"
                        onChange={formik.handleChange}
                      >
                        <option value="none" disabled hidden>
                          State*
                        </option>
                        <option value={"kerala"}>Kerala</option>
                        <option value={"Karnataka"}>Karnataka</option>
                        <option value={"TamilNadu"}>TamilNadu</option>
                      </select>
                    </div>

                    <div className={Classes.ParentStreetColony}>
                      <div className={Classes.House1NN}>
                        <input
                          className={Classes.PlaceInput}
                          type="text"
                          placeholder="house number/ building name*"
                          value={formik.values.building}
                          name="building"
                          onChange={formik.handleChange}
                        />
                        {formik.touched.building && formik.errors.building && (
                          <div className={Classes.ErrorMsg}>
                            {formik.errors.building}
                          </div>
                        )}
                      </div>
                      <div className={Classes.ColonyForm}>
                        <input
                          className={Classes.PlaceInput}
                          type="text"
                          placeholder="road name, area colony*"
                          value={formik.values.colony}
                          name="colony"
                          onChange={formik.handleChange}
                        />
                        {formik.touched.colony && formik.errors.colony && (
                          <div className={Classes.ErrorMsg}>
                            {formik.errors.colony}
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <input
                        className={Classes.PlaceInput}
                        type="text"
                        placeholder="Landmark"
                        value={formik.values.landMark}
                        name="landMark"
                        onChange={formik.handleChange}
                      />
                      {formik.touched.landMark && formik.errors.landMark && (
                        <div className={Classes.ErrorMsg}>
                          {formik.errors.landMark}
                        </div>
                      )}
                    </div>

                    {/* <div className={Classes.Flex}>
                                    <input className={Classes.CheckBox} type="checkbox" id="ship" value='Address' />
                                    <label className={Classes.CheckBoxLabel} for="ship">Make this address as shipping address </label>
                                    
                                </div> */}
                    <div className={Classes.Save}>
                      <div
                        type="submit"
                        className={Classes.Submit}
                        onClick={formik.handleSubmit}
                      >
                        Save address
                      </div>
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
                <div className={Classes.Voucher}>
                  <p className={Classes.NumOfItem}>Do you have Voucher code</p>
                  <p className={Classes.Apply} onClick={showHandler}>
                    Apply
                  </p>
                </div>
                {show ? (
                  <form onSubmit={handleSubmit} autoComplete="off">
                    <div className="d-flex">
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
                ) : null}

                <div className={Classes.PlaceOrderButton} onClick={placeOrder}>
                  Place Order
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
