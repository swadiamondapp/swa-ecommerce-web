import React, { useState, useEffect } from "react";
import Classes from "./OrderHistoryCard2.module.css";
import { BiRupee } from "react-icons/bi";
import ReactStarRating from "react-star-ratings-component";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const OrderHistoryCard2 = (props) => {
  const [trackShow, setTrackShow] = useState(false);
  const trackShowHandler = () => {
    setTrackShow(!trackShow);
  };
  return (
    <div>
      <div className={Classes.OutBox}>
        <div className="container">
          <div className={Classes.Border}>
            <div className="row">
              <div className="col-md-3">
                <img
                  className={Classes.ProductImage}
                  src={props.Image}
                  alt=""
                />
              </div>
              <div className="col-md-4">
                <div className={Classes.ProductDetailsText}>
                  <p className={Classes.ProductName}>{props.ProductName}</p>
                  <p className={Classes.ProductProperty}>
                    {props.ProductProperty}
                  </p>
                  <p className={Classes.ProductProperty}>
                    {props.DiamondProperty}
                  </p>
                </div>
              </div>
              <div className="col-md-2"></div>
              <div className="col-md-3 ">
                <div className="samPle">
                  <div className={Classes.qty}>Qty:{props.qty}</div>
                  <p className={Classes.ProductQty}>
                    <BiRupee size={25} />
                    {props.price}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className={Classes.Border}>
            <div className="row">
              <div className="col-md-8">
                <div className="row">
                  <p
                    className={Classes.TrackYourOrder}
                    onClick={trackShowHandler}
                  >
                    Track your order
                    {trackShow ? (
                      <FaAngleUp size={25} />
                    ) : (
                      <FaAngleDown size={25} />
                    )}
                  </p>
                </div>
              </div>

              <div className="col-md-4">
                <div className={Classes.Rating}>
                  <div style={{ marginTop: "-7px" }}>
                    <ReactStarRating
                      numberOfStar={5}
                      numberOfSelectedStar={props.rate}
                      colorFilledStar="#F6C514"
                      colorEmptyStar="#D1D3D5"
                      starSize="20px"
                      spaceBetweenStar="10px"
                      disableOnSelect={true}
                    />
                  </div>
                  <p onClick={props.clicked}>&nbsp;&nbsp;&nbsp;Rate & review</p>
                </div>
              </div>
            </div>
          </div>
          <div
            className={Classes.TrackOrder}
            style={{ display: trackShow ? "block" : "none" }}
          >
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryCard2;
