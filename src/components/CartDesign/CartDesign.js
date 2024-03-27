import React, { useState, useEffect } from "react";
import Classes from "./CartDesign.module.css";
import { BiRupee } from "react-icons/bi";
import Warning from "../../Assets/Warning.png";
import Succes from "../../Assets/success.png";
import axios from "axios";
import * as Urls from "../../Urls";
import { RiErrorWarningFill } from "react-icons/ri";
import WalletModal from "../WalletModal/WalletModal";
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
  const [walletOpen, setWalletOpen] = useState(false);
  const [swaWallet, setSwaWallet] = useState(null);
  const [isApply, setIsApply] = useState(false);
  const [swaExchangeWallet, setSwaExchangeWallet] = useState(null);
  const [updatedCartResponse, setUpdatedCartResponse] = useState([]);
  const history = useHistory();
  const token = localStorage.getItem("swaToken");
  useEffect(() => {
    setTotal(props.amount - props.cartProAmnt);
    setAmountPay(props.amount - props.cartProAmnt);
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const step2Handler = () => {
    history.push({
      pathname: "/checkout",
      state: {
        data: {
          pay: amountPay,
          total: total,
          updatedCartResponse: updatedCartResponse,
        },
        name: "cart",
      },
    });
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
      // let body;
      // if (props.proDet.name === "cart") {
      //   body = {
      //     promocode: code,
      //     original_amount: null,
      //   };
      // } else {
      //   body = {
      //     promocode: code,
      //     original_amount: total,
      //   };
      // }
      const body = {
        promocode: code,
        original_amount: total,
      };
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

  const updateCart = async (value) => {
    try {
      const response = await axios.patch(
        Urls.cart,
        {
          exchange_wallet: swaExchangeWallet,
          swa_wallet: swaWallet,
        },
        {
          headers: { Authorization: "Token " + token },
        }
      );
      if (response.data.results.status_code === 200) {
        setUpdatedCartResponse(response.data.results);
        setAmountPay(response.data.results.amount_to_pay);
        setTotal(response.data.results.total_amount);
        setWalletOpen(false);
        setIsApply(true);
        if (value === true) {
          history.push({
            pathname: "/checkout",
            state: {
              data: {
                pay: response.data.results.amount_to_pay,
                total: response.data.results.total_amount,
                updatedCartResponse: response.data.results,
              },
              name: "cart",
            },
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <WalletModal
        open={walletOpen}
        handleClose={() => setWalletOpen(false)}
        handleNext={() => updateCart(true)}
        handleApply={() => updateCart(false)}
        swaWallet={swaWallet}
        setSwaWallet={setSwaWallet}
        swaExchangeWallet={swaExchangeWallet}
        setSwaExchangeWallet={setSwaExchangeWallet}
        step2Handler={step2Handler}
        setIsApply={setIsApply}
      />
      <div className={`${Classes.Wrapper} container`}>
        <div className={`${Classes.Wrapper} container`}>
          <div className={Classes.Main}>
            <div>
              <h1 className={Classes.Title}>Cart</h1>
              <p>ITEM ({props.cartCount})</p>
            </div>
            <div className={Classes.SubText}>
              STEP 1 <span>/ 3</span>
            </div>
          </div>
          <div className="row" style={{ paddingTop: "10px" }}>
            <div className="col-md-8">
              <div className={Classes.Left}>{props.children}</div>
            </div>
            <p className={Classes.OrderSummeryMob}>ORDER SUMMERY</p>
            <div className="col-md-4">
              <div className={Classes.Right}>
                <p className={Classes.OrderSummery}>ORDER SUMMERY</p>
                <div
                  className={Classes.TotalText}
                  style={{ paddingTop: "20px" }}
                >
                  <div className={Classes.TotalItem}>
                    <p className={Classes.TotalSmall}>
                      Total &nbsp;<span>({props.cartCount} Items)</span>
                    </p>
                  </div>
                  <p className={Classes.Amount}>&#8377; {total}</p>
                </div>
                <div className={Classes.Voucher}>
                  <p className={Classes.NumOfItem}>Do you have Voucher code</p>
                </div>
                <form onSubmit={handleSubmit} autoComplete="off">
                  <div className={Classes.SubmitContainer}>
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
                      value="Apply"
                      onClick={promoCodeHandler}
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
                <div
                  className={Classes.TotalText}
                  style={{
                    borderTop: "1px dashed #e8e9ea",
                    borderBottom: "1px solid rgb(232, 233, 234)",
                  }}
                >
                  <div className={Classes.TotalItem}>
                    <p className={Classes.TotalSmall}>TOTAL PAYABLE</p>
                  </div>
                  <p className={Classes.Amount}>&#x20B9; {total}</p>
                </div>
                <input
                  className={Classes.PlaceOrderButton}
                  type="submit"
                  value="Place order"
                  onClick={() => {
                    if (isApply) {
                      step2Handler();
                    } else {
                      setWalletOpen(true);
                    }
                  }}
                />
                {total === amountPay ? (
                  <p className={Classes.HurrayText}>
                    You totaly saved {total - amountPay}. hurray!..
                  </p>
                ) : null}
                {/* <button
                  className={Classes.PlaceOrderButton}
                  onClick={placeOrder}
                >
                  Apply
                </button> */}
              </div>
              <div className={Classes.BtnPlaceOrderMobile}>
                <input
                  className={Classes.PlaceOrderButtonMobile}
                  type="submit"
                  value="Place order"
                  // onClick={placeOrder}
                  onClick={() => {
                    // history.push("/checkout");
                    setWalletOpen(true);
                  }}
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
