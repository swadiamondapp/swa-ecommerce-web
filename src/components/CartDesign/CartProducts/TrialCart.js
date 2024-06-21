import React from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";
import WishListTag from "../../../Assets/whishlist.svg";
import { BiRupee } from "react-icons/bi";
import { CgDollar } from "react-icons/cg";
import Classes from "../CartDesign.module.css";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

const TrialCart = (props) => {
  const Contryname = localStorage.getItem("country_name");
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return (
    <div>
      {/* trial cart design */}
      <div className={Classes.CartItems}>
        <div className="container">
          <div className="row">
            <div
              className={`${"col-4 col-md-12"} ${"col-lg-4"} ${
                Classes.Wrapper
              }`}
            >
              <div className={Classes.Products}>
                <img
                  className={Classes.ProductImage}
                  src={props.ProductImage}
                  alt="ProductImage"
                />
              </div>
            </div>
            <div
              className={`${"col-8 col-md-12"} ${"col-lg-8"} ${
                Classes.Wrapper
              }`}
            >
              <div className={Classes.ProductDetails}>
                <p>{props.ProductName}</p>
                {/* <p>{"Diamod ring"}</p> */}
              </div>
              <div className={Classes.Price}>
                <p className={Classes.PriceNew} style={{ marginBottom: "0px" }}>
                  {/* <BiRupee className={Classes.BiRupee} size={25} /> */}
                  {Contryname === "India" && (
                    <BiRupee className={Classes.Rupee} />
                  )}
                  {Contryname === "United States" && (
                    <CgDollar className={Classes.Rupee} />
                  )}
                  {Contryname === "United Arab Emirates" && (
                    <span style={{ paddingRight: "5px" }}>AED</span>
                  )}{" "}
                  {numberWithCommas(props.NewPrice)}
                </p>
                {props && props.OldPrice !== props.NewPrice ? (
                  <p className={Classes.PriceOld}>
                    {/* <BiRupee className={Classes.BiRupee} size={25} /> */}
                    {Contryname === "India" && (
                      <BiRupee className={Classes.Rupee} />
                    )}
                    {Contryname === "United States" && (
                      <CgDollar className={Classes.Rupee} />
                    )}
                    {Contryname === "United Arab Emirates" && (
                      <span style={{ paddingRight: "5px" }}>AED</span>
                    )}{" "}
                    {numberWithCommas(props.OldPrice)}
                  </p>
                ) : null}
              </div>
              <p style={{ color: "#30933A", fontWeight: "700" }}>Free Trail</p>
            </div>
          </div>
        </div>
      </div>
      <div className={Classes.RemoveMove}>
        <div className={Classes.DummyWrap}>
          <IoCheckmarkCircleSharp fill="#005D67" />
          <p className={Classes.DummyGreen}>30 day money back</p>
          <IoCheckmarkCircleSharp fill="#005D67" />
          <p className={Classes.DummyGreen}>Lifetime exchange & buy back</p>
        </div>
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
            }}
          >
            <RiDeleteBin5Line
              size={20}
              onClick={props.remove}
              style={{ cursor: "pointer" }}
            />
            <p
              className={Classes.Delete}
              onClick={props.remove}
              style={{ cursor: "pointer" }}
            >
              Remove
            </p>
          </div>
        </div>
      </div>

      {/* trial cart design */}
    </div>
  );
};

export default TrialCart;
