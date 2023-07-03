import React, { useState, useEffect } from "react";
import Classes from "./CartDesign.module.css";
import { BiRupee } from "react-icons/bi";

import { useHistory } from "react-router-dom";

function CartDesign(props) {
  const [total, setTotal] = useState("");
  const [amountPay, setAmountPay] = useState("");
  const history = useHistory();
  const token = localStorage.getItem("swaToken");
  useEffect(() => {
    setTotal(props.amount - props.cartProAmnt);
    setAmountPay(props.amount - props.cartProAmnt);
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const placeOrder = () => {
    history.push({
      pathname: "/place_order",
      state: { data: { pay: amountPay, total: total }, name: "cart" },
    });
  };

  return (
    <div>
      <div className="container">
        <div className="container">
          <div className={Classes.Main}>
            <h1 className={Classes.Title}>Cart</h1>
            <div className={Classes.SubText}>
              <p className={`${Classes.Home} ${Classes.HomeNew}`}>HOME /</p>
              <p className={Classes.Home}>NEW ARRIVALS /</p>
              <p className={Classes.NewArrival}>DIAMOND RING</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8">
              <div className={Classes.Left}>{props.children}</div>
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

                <input
                  className={Classes.PlaceOrderButton}
                  type="submit"
                  value="Place order"
                  onClick={placeOrder}
                />
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

export default CartDesign;
