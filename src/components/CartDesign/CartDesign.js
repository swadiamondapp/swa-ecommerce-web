import React, { useState, useEffect } from "react";
import Classes from "./CartDesign.module.css";
import { BiRupee } from "react-icons/bi";
import Warning from "../../Assets/Warning.png";
import Succes from "../../Assets/success.png";
import axios from "axios";
import * as Urls from "../../Urls";
import { RiErrorWarningFill } from "react-icons/ri";

import { useHistory } from "react-router-dom";

function CartDesign(props) {
  const [total, setTotal] = useState("");
  const [amountPay, setAmountPay] = useState("");
  const [code, setCode] = useState("");
  const [errorVald, setErrorVald] = useState("");
  const [error, setError] = useState("");
  const [clr, setClr] = useState("");
  const [promoId, setPromoId] = useState("");
  const [errorImg, setErrorImg] = useState(null);
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
    props.handleOpen();
    // history.push({
    //   pathname: "/place_order",
    //   state: { data: { pay: amountPay, total: total }, name: "cart" },
    // });
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

  return (
    <div>
      <div className={`${Classes.Wrapper} container`}>
        <div className={`${Classes.Wrapper} container`}>
          <div className={Classes.Main}>
            <h1 className={Classes.Title}>Cart</h1>
            <p>ITEM (2)</p>
            {/* <div className={Classes.SubText}>
              <p className={`${Classes.Home} ${Classes.HomeNew}`}>HOME /</p>
              <p className={Classes.Home}>NEW ARRIVALS /</p>
              <p className={Classes.NewArrival}>DIAMOND RING</p>
            </div> */}
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
                    <p className={Classes.TotalSmall}>
                      Total &nbsp;<span>(1 Items)</span>
                    </p>
                  </div>

                  <p className={Classes.Amount}>
                    <BiRupee />
                    {total}
                  </p>
                </div>
                <div
                  className={Classes.TotalText}
                  style={{ borderBottom: "1px solid #e8e9ea" }}
                >
                  <div className={Classes.TotalItem}>
                    <p className={Classes.TotalSmall}>TOTAL PAYABLE</p>
                  </div>

                  <p className={Classes.Amount}>
                    <BiRupee />
                    {total}
                  </p>
                </div>
                {total === amountPay ? (
                  <p className={Classes.HurrayText}>
                    You totaly saved {total - amountPay}. hurray!..
                  </p>
                ) : null}
                <div className={Classes.Voucher}>
                  <p className={Classes.NumOfItem}>Do you have Voucher code</p>
                </div>
                <form onSubmit={handleSubmit} autoComplete="off">
                  <div className="d-flex">
                    <input
                      className={Classes.Input}
                      type="text"
                      value={code}
                      onChange={promCodeChngeHandler}
                      name="name"
                      placeholder=" SWAFRST"
                    />
                    <input
                      className={Classes.ApplyButton}
                      type="submit"
                      // onClick={promoCodeHandler}
                    />
                  </div>
                  <p className="errrMsg" style={{ fontSize: "14px" }}>
                    {errorVald && (
                      <RiErrorWarningFill
                        style={{ transform: "rotate(180deg)" }}
                      />
                    )}
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
                <input
                  className={Classes.PlaceOrderButton}
                  type="submit"
                  value="Place order"
                  onClick={placeOrder}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartDesign;
