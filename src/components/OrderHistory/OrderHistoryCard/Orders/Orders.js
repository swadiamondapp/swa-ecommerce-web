"use client";
import React, { useState, useEffect } from "react";

import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Classes from "../OrderHistoryCard.module.css";
import { TbTruckDelivery } from "react-icons/tb";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useOrder } from "@/providers/order-provider";

function Orders(props) {
  const [showReview, setShowReview] = useState();
  const router = useRouter();
  const { setOrderData, setReviewData } = useOrder();
  console.log("props.name?", props.productName);

  const itemsDetail = props.Image;
  const productViewHandler = (id, shipmentId, salebill) => {
    setOrderData({ productId: id, shipmentId: shipmentId, saleBill: salebill });
    router.push("/track/orders");
  };
  const handleReviewClick = (item) => {
    setReviewData({
      product_image: item.bag_image,
      product_id: item.product_id,
      product_rating: props.rating,
      product_name: item.product_name,
    });
  };
  console.log("itemsDetail", itemsDetail);
  return (
    <div className="">
      {itemsDetail &&
        itemsDetail.map((item) => (
          <div key={item.shipment_id} className={Classes.myOrderParentTech}>
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
                          Delivered on
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
                      href="/rate/review"
                      onClick={() => handleReviewClick(item)}
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
