"use client";
import React, { useEffect, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { BiRupee } from "react-icons/bi";
import { CgDollar } from "react-icons/cg";
import Classes from "../CartDesign.module.css";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import Image from "next/image";

const TrialCart = (props) => {
  // const Contryname = localStorage.getItem("country_name");
  const [countryName, setCountryName] = useState("");

  useEffect(() => {
    const Countryname = localStorage.getItem("country_name");
    setCountryName(Countryname);
  }, []);
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
                <Image
                  className={Classes.ProductImage}
                  src={props.ProductImage}
                  alt="ProductImage"
                  width={200}
                  height={200}
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
                  {countryName === "India" && (
                    <BiRupee className={Classes.Rupee} />
                  )}
                  {countryName === "United States" && (
                    <CgDollar className={Classes.Rupee} />
                  )}
                  {countryName === "United Arab Emirates" && (
                    <span style={{ paddingRight: "5px" }}>AED</span>
                  )}{" "}
                  {numberWithCommas(props.NewPrice)}
                </p>
                {props && props.OldPrice !== props.NewPrice ? (
                  <p className={Classes.PriceOld}>
                    {/* <BiRupee className={Classes.BiRupee} size={25} /> */}
                    {countryName === "India" && (
                      <BiRupee className={Classes.Rupee} />
                    )}
                    {countryName === "United States" && (
                      <CgDollar className={Classes.Rupee} />
                    )}
                    {countryName === "United Arab Emirates" && (
                      <span style={{ paddingRight: "5px" }}>AED</span>
                    )}{" "}
                    {numberWithCommas(props.OldPrice)}
                  </p>
                ) : null}
              </div>
              <p style={{ color: "#30933A", fontWeight: "700" }}>Free Trial</p>
            </div>
          </div>
        </div>
      </div>
      {/* <div className={Classes.RemoveMove}>
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
      </div> */}
      <div className={Classes.RemoveMove}>
        <div className={Classes.DummyWrap}>
          <IoCheckmarkCircleSharp fill="#005D67" />
          <p className={Classes.DummyGreen}>15 day money back</p>
          <IoCheckmarkCircleSharp fill="#005D67" />
          <p className={Classes.DummyGreen}>Lifetime exchange & buy back</p>
        </div>
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
            <Image
              src={`/Assets/whishlist.svg`}
              alt="WishListTag"
              width={13}
              height={13}
            />
            <p
              className={Classes.Delete}
              onClick={props.remove}
              style={{ cursor: "pointer" }}
            >
              Move to WishList
            </p>
          </div>
        </div>
      </div>

      {/* trial cart design */}
    </div>
  );
};

export default TrialCart;
