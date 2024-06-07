import React from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";
import WishListTag from "../../../Assets/whishlist.svg";
import { BiRupee } from "react-icons/bi";
import { CgDollar } from "react-icons/cg";
import Classes from "../CartDesign.module.css";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

function CartProducts(props) {
  const Contryname = localStorage.getItem("country_name");
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return (
    <div>
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
                  alt=" "
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
              {props
                ? props.OldPrice - props.NewPrice !== 0 && (
                    <p className={Classes.SavedMoney}>
                      Hurray! You have saved{" "}
                      {Contryname === "India" && (
                        <BiRupee
                          className={Classes.Rupee}
                          size={15}
                          color="#30933A"
                        />
                      )}
                      {Contryname === "United States" && (
                        <CgDollar
                          className={Classes.Rupee}
                          size={15}
                          color="#30933A"
                        />
                      )}
                      {Contryname === "United Arab Emirates" && (
                        <span style={{ paddingRight: "5px" }}>AED</span>
                      )}
                      {numberWithCommas(props.OldPrice - props.NewPrice)}
                    </p>
                  )
                : null}
              <p className={Classes.ProductProperty}>
                {props.Property} <span>|</span>
                {props.DiamondProperty}
              </p>
              {/* <p className={Classes.Quantity}>Quantity : {props.quanty}</p> */}
              <div className={Classes.OverView}>
                <p className={Classes.OverViewKey}>Size</p>
                <p className={Classes.OverViewValue}>
                  {props.Size} {props.Size !== "N/A" && "MM"}
                </p>
                <p className={Classes.OverViewKey}>Colour</p>
                <p className={Classes.OverViewValue}>{props.color}</p>
                <div
                  className={Classes.OverViewColor}
                  style={{
                    backgroundColor:
                      props.color === "rose"
                        ? "#ffd7d7"
                        : props.color === "yellow"
                        ? "#fed672"
                        : props.color === "pt"
                        ? "#eee9e9"
                        : "#dedede0d",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div className={Classes.Delivery}>
          <TbTruckDelivery size={20} color="#30933A" />
          {/* <p className={Classes.DeliveryExpected}>{props.DeliveryDate}</p> */}
          <p className={Classes.DeliveryExpected}>Delivery in 3-5 Days</p>
        </div>
        <div className={Classes.OverViewMobile}>
          <p className={Classes.OverViewKey}>Size</p>
          <p className={Classes.OverViewValue}>
            {props.Size} {props.Size !== "N/A" && "MM"}
          </p>
          <p className={Classes.OverViewKey}>Colour</p>
          <p className={Classes.OverViewValue}>{props.color}</p>
          <div
            className={Classes.OverViewColor}
            style={{
              backgroundColor:
                props.color === "rose"
                  ? "#ffd7d7"
                  : props.color === "yellow"
                  ? "#fed672"
                  : props.color === "pt"
                  ? "#eee9e9"
                  : "#dedede0d",
            }}
          ></div>
        </div>
      </div>
      <div className={Classes.RemoveMove}>
        <div className={Classes.Revove12}>
          <div className={Classes.Remove}>
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
          <div
            className={Classes.Remove}
            style={{ borderLeft: "0.5px solid #E8E8E8" }}
          >
            <img src={WishListTag} style={{ width: "13px" }} />
            <p
              className={Classes.Delete}
              onClick={props.remove}
              style={{ cursor: "pointer" }}
            >
              Move to WishList
            </p>
          </div>
        </div>
        <div className={Classes.DummyWrap}>
          <IoCheckmarkCircleSharp fill="#005D67" />
          <p className={Classes.DummyGreen}>30 day money back</p>
          <IoCheckmarkCircleSharp fill="#005D67" />
          <p className={Classes.DummyGreen}>Lifetime exchange & buy back</p>
        </div>
      </div>
    </div>
  );
}

export default CartProducts;
