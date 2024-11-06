import React, { useState, useEffect } from "react";
import { IoIosStar } from "react-icons/io";
import ReactStarRating from "react-star-ratings-component";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Classes from "../OrderHistoryCard.module.css";
import { useHistory } from "react-router-dom";
import { TbTruckDelivery } from "react-icons/tb";
import { BiRupee } from "react-icons/bi";
import { BsCircleFill } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Button, Tooltip } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import * as Urls from "../../../../Urls";
function Orders(props) {
  const [showReview, setShowReview] = useState();
  const history = useHistory();
  const token = localStorage.getItem("swaToken");

  console.log("props.name?", props.productName);

  const itemsDetail = props.Image;
  const productViewHandler = (id, shipmentId, salebill) => {
    history.push({
      pathname: "/track_order",
      state: {
        data: { productId: id, shipmentId: shipmentId, saleBill: salebill },
      },
    });
  };

  console.log("itemsDetail", itemsDetail);
  return (
    <div className="">
      {/* <div className={Classes.Align}>
        <div>
          <div className={Classes.ProductDetails}>
            <div className={Classes.ProductDetailsText}>
              <p className={Classes.ProductName}>Order ID :{props.orderId}</p>
              <p className={Classes.ProductProperty}>
                <BsCircleFill
                  color={props.ProductDate === "Pending" ? "" : "#069D0D"}
                />
                &nbsp;&nbsp;&nbsp;{props.ProductDate}
              </p>
              <p className={Classes.ProductProperty}>
                SHIPPED TO
                <span style={{ color: "#006E7F" }}>&nbsp;{props.address}</span>
                <MdOutlineKeyboardArrowDown size={25} />
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className={Classes.PriceDetails}>
            <p className={Classes.Price} style={{ marginTop: "2px" }}>
              TOTAL&nbsp;
            </p>
            <BiRupee size={20} className={Classes.RupeeIcon} />
            <p className={Classes.Price}>{props.Price}</p>
          </div>
          <div className={Classes.Rating}>
            <p className={Classes.promo}>
              Promo code{" "}
              <span style={{ color: "#30933A" }}>{props.promCond}</span>
            </p>
          </div>
          <div className={Classes.prodctDetBtn} onClick={props.clicked}>
            View Order Details
          </div>
        </div>
      </div> */}
      {itemsDetail &&
        itemsDetail.map((item) => (
          <div className={Classes.myOrderParentTech}>
            <div className={Classes.ProductName}>
              <p>Order ID : {props.orderId}</p>
            </div>

            <div key={item.shipment_id} className={Classes.BottomContainer}>
              <div className={Classes.MobImgContainer}>
                <div className={Classes.ImageContent}>
                  <img
                    src={item.bag_image}
                    alt="Product Image"
                    style={{ maxWidth: "150px" }}
                  />
                  <div className={Classes.TextWrapper}>
                    <h3>{item.product_name}</h3>
                    {props.delivered_date && (
                      <>
                        <p className={Classes.DeliveryText}>
                          <TbTruckDelivery color="#30933A" size={20} />{" "}
                          Delivered on{" "}
                          <span className={Classes.GreenText}>
                            {props.delivered_date}
                          </span>
                        </p>
                        <p className={Classes.Expected}>
                          Expected Delivery by{" "}
                          <span className={Classes.OverLined}>
                            {props.expected_delivered_date}
                          </span>
                        </p>
                      </>
                    )}
                  </div>
                </div>
                <MdOutlineKeyboardArrowRight
                  className={Classes.MobileRightArrow}
                  fill="#006E7F"
                  size={25}
                  onClick={props.clicked}
                />
              </div>
              <div className={Classes.RighSection}>
                <div className={Classes.ViewButton}>
                  <button
                    // onClick={props.clicked}
                    onClick={() =>
                      productViewHandler(
                        props.currentId,
                        item.shipment_id,
                        item.sale_bill_number
                      )
                    }
                  >
                    View Order details
                  </button>
                  <MdOutlineKeyboardArrowRight className={Classes.RightArrow} />
                </div>
                {props.ShipmentStatus === "4" && (
                  <div className={Classes.RatingContainer}>
                    <ReactStarRating
                      numberOfStar={5}
                      numberOfSelectedStar={props.rating}
                      colorFilledStar="#F6C514"
                      colorEmptyStar="#D1D3D5"
                      starSize="25px"
                      spaceBetweenStar="10px"
                      disableOnSelect={false}
                      // onSelectStar={rateChangeHandler}
                    />
                    <Link
                      to={{
                        pathname: "/rate_review",
                        state: {
                          product_image: item.bag_image, // Use item.bag_image here
                          product_id: item.product_id,
                          product_rating: props.rating,
                          product_name: item.product_name,
                        },
                      }}
                    >
                      <p>Rate & Review</p>
                    </Link>
                    {console.log("shipment status", props.shipmentstatus)}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Orders;
