import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom";
import Classes from "./Payment.module.css";
import phonepay from "../../Assets/phonepay.svg";
import mastercard from "../../Assets/mastercard.svg";
import axios from "axios";
import * as Urls from "../../Urls";

const Payment = () => {
  const token = localStorage.getItem("swaToken");
  const history = useHistory();
  const location = useLocation();
  const [promoId, setPromoId] = useState("");
  const [mode, setMode] = useState("");
  const [amountPay, setAmountPay] = useState(100);
  const [propsFCheckOut, setpropsFCheckOut] = useState([]);
  const { data, name } = location.state;

  const placeOrder = () => {
    let cartBody;
    let buyBody;
    const p_Method = mode === "cash" ? "C" : "P";
    if (promoId !== "") {
      cartBody = {
        promocode_id: promoId,
        address_id: data.addressId,
        mode: p_Method,
        amount_to_pay: data.updatedCart.amount_to_pay,
        exchange_wallet_balance: data.updatedCart.exchange_wallet_balance,
        swa_wallet_balance: data.updatedCart.swa_wallet_balance,
        wallet_amount_used: data.updatedCart.wallet_amount_used,
        exchange_change: data.updatedCart.exchange_change,
        swa_change: data.updatedCart.swa_change,
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
        address_id: data.addressId,
        mode: p_Method,
        amount_to_pay: data.updatedCart.amount_to_pay,
        exchange_wallet_balance: data.updatedCart.exchange_wallet_balance,
        swa_wallet_balance: data.updatedCart.swa_wallet_balance,
        wallet_amount_used: data.updatedCart.wallet_amount_used,
        exchange_change: data.updatedCart.exchange_change,
        swa_change: data.updatedCart.swa_change,
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
    if (name === "cart") {
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
    } else if (name === "buy") {
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

  const handleMethodChange = (event) => {
    setMode(event.target.value);
  };

  console.log("data----->", data);

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
              <h1 className={Classes.Title}>
                STEP 3 <span> /3</span>
              </h1>
            </div>
          </div>
        </div>
        <div className={Classes.PaymentCards}>
          <div className={Classes.PaymentMethod}>
            <h4>Payment Method</h4>
            <p>Choose your payment method</p>
            <div className={Classes.Pmethod}>
              <input
                type="radio"
                value="credit_card"
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
                checked={mode === "upi"}
                onChange={handleMethodChange}
              />
              <img src={phonepay} alt="Phonepay" />
              UPI
            </div>
            <div className={Classes.Pmethod}>
              <input
                type="radio"
                value="cash"
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
                    Total &nbsp;<span>(1 Items)</span>
                  </p>
                </div>

                <p className={Classes.Amount}>
                  {/* <BiRupee /> */}
                  &#x20B9; {data.total}
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
                  {/* <BiRupee /> */}
                  &#x20B9; {data.pay}
                </p>
              </div>
              <div
                className={Classes.PayButton}
                // onClick={() => {
                //   history.push("/addaddress");
                // }}
                onClick={placeOrder}
              >
                Pay &#x20B9; {data.pay}
              </div>
              <p className={Classes.HurrayText}>
                You totaly saved {"9888"}. hurray!..
              </p>
            </div>
          </div>
          <div className={Classes.DeliverCard}>
            <div className={Classes.DeliverCardHeader}>
              <h4>Deliver to</h4>
              <div className={Classes.Changebtn}>Change</div>
            </div>
            <p className={Classes.Name}>Mohammed Inshad</p>
            <p className={Classes.SubAddress}>
              Kottakunnan (House) Morayur 673642
            </p>
            <p className={Classes.SubAddress}>Opposit family health center</p>
            <p className={Classes.SubAddress}>Malappuram district</p>
            <p className={Classes.SubAddress}>Kerala 673643</p>
            <p className={Classes.SubAddress} style={{ marginTop: "15px" }}>
              Phone number:9995200745
            </p>
          </div>
          <div
            className={Classes.PayButtonMobile}
            // onClick={() => {
            //   history.push("/addaddress");
            // }}
            onClick={placeOrder}
          >
            Pay &#x20B9; {data.pay}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
