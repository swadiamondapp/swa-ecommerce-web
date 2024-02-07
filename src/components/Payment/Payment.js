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
      </div>
    </div>
  );
};

export default Payment;
