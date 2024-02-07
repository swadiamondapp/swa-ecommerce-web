import React from "react";
import Classes from "./Payment.module.css";

const Payment = (props) => {
  return (
    <div>
      <div className="container">
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
            <div>
              <h1 className={Classes.Title}>STEP 3 /3</h1>
            </div>
          </div>
        </div>
        <div className={Classes.PaymentCards}>
          <div className={Classes.PaymentMethod}>
            <h4>Payment Method</h4>
            <p>Choose your payment method</p>
            <div>Debit / Credit card</div>
            <div>Upi</div>
            <div>Cash on delivery</div>
          </div>
          <div className={Classes.TotalCard}></div>
          <div className={Classes.DeliverCard}>
            <div className={Classes.DeliverCardHeader}>
              <h4>Deliver to</h4>
              <div>Change</div>
            </div>
            <p>Mohammed Inshad</p>
            <p>Kottakunnan (House) Morayur 673642</p>
            <p>Opposit family health center</p>
            <p>Malappuram district</p>
            <p>Kerala 673643</p>

            <p>Phone number:9995200745</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
