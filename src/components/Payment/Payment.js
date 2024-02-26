import React from "react";
import Classes from "./Payment.module.css";
import phonepay from "../../Assets/phonepay.svg";
import mastercard from "../../Assets/mastercard.svg";

const Payment = (props) => {
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
              <h1 className={Classes.Title}>STEP 3 /3</h1>
            </div>
          </div>
        </div>
        <div className={Classes.PaymentCards}>
          <div className={Classes.PaymentMethod}>
            <h4>Payment Method</h4>
            <p>Choose your payment method</p>
            <div className={Classes.Pmethod}>
              <input type="radio" />
              <img src={mastercard} />
              Debit / Credit card
            </div>
            <div className={Classes.Pmethod}>
              <input type="radio" />
              <img src={phonepay} />
              Upi
            </div>
            <div className={Classes.Pmethod}>
              <input type="radio" />
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
                  &#x20B9; {"54000"}
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
                  &#x20B9; {"54000"}
                </p>
              </div>
              <div className={Classes.PayButton}>Pay 54,000</div>
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
        </div>
      </div>
    </div>
  );
};

export default Payment;
