import React, { useState, useEffect } from "react";
import Classes from "./CartDesign.module.css";
import { BiRupee } from "react-icons/bi";
import { CgDollar } from "react-icons/cg";
import Warning from "../../Assets/Warning.png";
import Succes from "../../Assets/success.png";
import axios from "axios";
import * as Urls from "../../Urls";
import { Link } from "react-router-dom";
import { RiErrorWarningFill } from "react-icons/ri";
import WalletModal from "../WalletModal/WalletModal";
import { useHistory } from "react-router-dom";

function CartDesign(props) {
  const countryId = localStorage.getItem("id");
  const Contryname = localStorage.getItem("country_name");
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
  const [walletValues, setWalletValues] = useState([]);
  const [swaExchangeWallet, setSwaExchangeWallet] = useState(null);
  const [updatedCartResponse, setUpdatedCartResponse] = useState([]);
  const history = useHistory();
  const token = localStorage.getItem("swaToken");
  console.log("walletValuesab", walletValues.swa_wallet);
  let diff = 0;
  useEffect(() => {
    setTotal(props.amount - props.cartProAmnt);
    setAmountPay(props.amount - props.cartProAmnt);
  }, [props.amount, props.cartProAmnt]);
  console.log("amm1", props.amount);
  console.log("amm2", props.cartProAmnt);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  console.log(total, "amountsoftrialCart");
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
          totalSavedAmount: totally_saved,
          promoCodeIds: promoId,
        },
        name: "cart",
      },
    });
  };

  const promCodeChngeHandler = (e) => {
    setCode(e.target.value);
  };
  const getSwaWalletAmounts = async () => {
    try {
      const response = await axios.get(
        `${Urls.getWalletAmounts}?country=${countryId}`,
        {
          headers: { Authorization: "Token " + token },
        }
      );
      console.log("response.data---->56", response.data.exchange_wallet);
      setWalletValues(response.data);
      // if (
      //   response.data.swa_wallet === 0 &&
      //   response.data.exchange_wallet === 0
      // ) {
      //   // If both wallet balances are 0, directly update the cart and proceed to checkout
      //   step2Handler();
      // }
      if (isApply) {
        step2Handler();
      } else if (
        response &&
        response.data &&
        response.data.exchange_wallet === 0 &&
        response &&
        response.data &&
        response.data.swa_wallet === 0
      ) {
        updateCart(true);
      } else {
        setWalletOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
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
        .post(`${Urls.promoCode}?country=${countryId}`, body, {
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
          } else if (response1.data.results.message === "Promo code expired") {
            setError("Promo code expired");
          } else if (response1.data.results.status_code === 206) {
            setError("Invalid coupon code");
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
        `${Urls.cart}?country=${countryId}`,
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
                pay:
                  response.data.results.amount_to_pay > totally_saved
                    ? response.data.results.amount_to_pay - totally_saved
                    : totally_saved - response.data.results.amount_to_pay,
                total: response.data.results.total_amount,
                updatedCartResponse: response.data.results,
                totalSavedAmount: totally_saved,
                promoCodeIds: promoId,
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

  diff = total - amountPay;
  let totally_saved = props.totalSavedAmount + diff;

  console.log(amountPay, "amountPay");
  console.log(total, "total");

  function formatIndianNumber(number) {
    const numberString = number && number.toString().split(".")[0];
    const lastThreeDigits = numberString && numberString.slice(-3);
    const otherDigits = numberString && numberString.slice(0, -3);

    return (
      otherDigits &&
      otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ",") +
        (otherDigits ? "," : "") +
        lastThreeDigits
    );
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  console.log("walletValues--->", walletValues);

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
        walletValues={walletValues}
      />
      <div className={`${Classes.Wrapper} container`}>
        <div className={`${Classes.Wrapper} container`}>
          <div className={Classes.Main1}>
            <div>
              <h1 className={Classes.Title}>Cart</h1>
              <div className={Classes.SubText}>
                <p className={Classes.NewArrival}>ITEM ({props.cartCount})</p>
              </div>
            </div>
            <div className={Classes.Steps2}>
              STEP 1 <span style={{ color: "#949494" }}> / 3</span>{" "}
            </div>
          </div>
          {/* <div className={Classes.Main}>
            <div>
              <h1 className={Classes.Title}>Cart</h1>
              <p>ITEM ({props.cartCount})</p>
            </div>
            <div className={Classes.SubText}>
              STEP 1 <span>/ 3</span>
            </div>
          </div> */}
          <div className="row" style={{ paddingTop: "10px" }}>
            <div className="col-md-8">
              <div className={Classes.Left}>{props.children}</div>
            </div>
            <p className={Classes.OrderSummeryMob}>ORDER SUMMARY</p>
            <div className="col-md-4">
              {/* shoping cart */}
              {props.activeCart === "shopping" && (
                <>
                  <div className={Classes.Right}>
                    <p className={Classes.OrderSummery}>ORDER SUMMARY</p>
                    <div
                      className={Classes.TotalText}
                      style={{ paddingTop: "20px" }}
                    >
                      <div className={Classes.TotalItem}>
                        <p className={Classes.TotalSmall}>
                          Total &nbsp;<span>({props.cartCount} Items)</span>
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
                        {formatIndianNumber(total)}
                      </p>
                    </div>
                    <div className={Classes.Voucher}>
                      <p className={Classes.NumOfItem}>
                        Do you have Voucher code
                      </p>
                    </div>
                    <form onSubmit={handleSubmit} autoComplete="off">
                      <div className={Classes.SubmitContainer}>
                        <input
                          className={Classes.Input}
                          type="text"
                          value={code}
                          onChange={promCodeChngeHandler}
                          name="name"
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
                      <p className={Classes.Amount}>
                        {/* &#x20B9; {total}  */}
                        {Contryname === "India" && (
                          <BiRupee className={Classes.Rupee} />
                        )}
                        {Contryname === "United States" && (
                          <CgDollar className={Classes.Rupee} />
                        )}
                        {Contryname === "United Arab Emirates" && (
                          <span style={{ paddingRight: "5px" }}>AED</span>
                        )}{" "}
                        {formatIndianNumber(amountPay)}
                      </p>
                    </div>
                    <input
                      className={Classes.PlaceOrderButton}
                      type="submit"
                      value="Place order"
                      onClick={async () => {
                        await getSwaWalletAmounts();

                        // After fetching wallet values, check if both are 0
                      }}
                    />
                    {props.totalSavedAmount || diff ? (
                      <p className={Classes.HurrayText}>
                        You saved {numberWithCommas(totally_saved)} hurray!..
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
                        if (isApply) {
                          step2Handler();
                        } else {
                          setWalletOpen(true);
                        }
                      }}
                    />
                  </div>
                </>
              )}

              {/* shoping cart */}
              {/* trail cart */}
              {props.activeCart === "trial" && (
                <>
                  <div className={Classes.Right}>
                    <p className={Classes.OrderSummery}>ORDER SUMMARY</p>
                    <div
                      className={Classes.TotalText}
                      style={{ paddingTop: "20px" }}
                    >
                      <div className={Classes.TotalItem}>
                        <p className={Classes.TotalSmall}>
                          Total &nbsp;
                          <span>
                            {/* (
                            {props.tryCartcountResults &&
                              props.tryCartcountResults.item_count}{" "}
                            Items) */}
                            ({props.cartCount && props.cartCount} Items)
                          </span>
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
                        0
                      </p>
                    </div>
                    <div className={Classes.ServiceCharge}>
                      <p className={Classes.TotalSmall}>Service charge</p>
                      <p style={{ color: "#30933A", fontWeight: "500" }}>
                        Free
                      </p>
                    </div>
                    <div className={Classes.Trialpayable}>
                      <p className={Classes.TotalSmall}>TOTAL payable</p>
                      <p className={Classes.TotalSmall}>
                        {/* &#x20B9; {total}  */}
                        {Contryname === "India" && (
                          <BiRupee className={Classes.Rupee} />
                        )}
                        {Contryname === "United States" && (
                          <CgDollar className={Classes.Rupee} />
                        )}
                        {Contryname === "United Arab Emirates" && (
                          <span style={{ paddingRight: "5px" }}>AED</span>
                        )}{" "}
                        0
                      </p>
                    </div>
                    <div className={Classes.BookappointmentTrails}>
                      <Link to="/trialathome">
                        {" "}
                        <button>Book Appointment</button>
                      </Link>
                    </div>
                  </div>
                </>
              )}
              {/* trail cart */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartDesign;
