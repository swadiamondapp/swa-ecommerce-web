"use client";
import React, { useState, useEffect } from "react";
import Classes from "./Rating.module.css";
import { Link } from "next/link";
import axios from "axios";
import { myOrder } from "@/utils/urls";
import ReactStarRating from "react-star-ratings";
import { useAuth } from "@/providers/auth-provider";
import { useCountry } from "@/providers/country-provider";
import { useIsMobile } from "@/hooks/useIsMobile";

const RateReviewMain = () => {
  const [rate, setRate] = useState(2);
  const { token } = useAuth;
  const { countryId } = useCountry();
  const isMobileView = useIsMobile();
  const [orderDetails, setOrderDetails] = useState([]);
  const [orderShipments, setOrderShipments] = useState([]);
  const [productDetails, setProductDetails] = useState([]);

  const rateChangeHandler = (value) => {
    setRate(value);
  };

  useEffect(() => {
    if (token && countryId) {
      axios
        .get(`${myOrder}?country=${countryId}`, {
          headers: {
          Authorization: "Token " + token,
        },
      })
      .then((response1) => {
        setOrderDetails(response1.data.results.data);
        setOrderShipments(response1.data.results.data.shipments);
        const products = response1.data.results.data.flatMap((order) =>
          order.shipments.map((shipment) => ({
            product_id: shipment.product_id,
            product_rating: shipment.product_rating,
            product_name: shipment.product_name,
          }))
        );
        setProductDetails(products);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }, [token, countryId]);

  return (
    <div className="py-8 bg-zinc-100">
      <div className={`container ${Classes.MainCont}`}>
        <div className={Classes.RateReviewParent}>
          <div className={Classes.RateReviewHeading}>
            <div className={Classes.Main}>
              <h1 className={Classes.Title}>Rate & review</h1>
            </div>
            <div className={Classes.SubText}>
              <p className={Classes.Home}>HOME / </p>
              <p className={Classes.Wishlist}>&nbsp; RATE & REVIEW</p>
            </div>
          </div>

          {orderDetails.map((order, index) => (
            <div className={Classes.ParentMainReview_Rate} key={`${order.order_id}-${index}`}>
              {order.shipments &&
                order.shipments.map((shipment, index) => (
                  <div className={Classes.RateAndReviewCard}>
                    <div className={Classes.OrderIdReview}>
                      <p>Order ID : {order.order_code}</p>
                    </div>
                    <div className={Classes.CardView1}>
                      <div className={Classes.LeftCardView1}>
                        <div className={Classes.ProductImgReview}>
                          <img
                            src={shipment.thumbnail_image}
                            style={{ maxWidth: "150px" }}
                            alt="thumbnail_image"
                          />
                        </div>
                        <div className={Classes.ProductDetailsReview}>
                          <p className={Classes.productNames3}>
                            {shipment.product_name}
                          </p>
                          <p className={Classes.pDesc3}>
                            <Image
                              src={`/Assets/delivery.png`}
                              alt="deliveryimg"
                              width={20}
                              height={20}
                            />{" "}
                            Delivered on{" "}
                            <span
                              style={{
                                color: "#30933A",
                              }}
                            >
                              {order.delivered_date}
                            </span>
                          </p>
                          <p className={Classes.pDesc4}>
                            Expected Delivery by{" "}
                            <span>{order.expected_delivery_date}</span>
                          </p>
                        </div>
                      </div>
                      <div className={Classes.RightCardView1}>
                        <div>
                          <ReactStarRating
                            numberOfStar={5}
                            numberOfSelectedStar={shipment.product_rating}
                            colorFilledStar="#F6C514"
                            colorEmptyStar="#D1D3D5"
                            starSize={isMobileView ? "25px" : "30px"}
                            spaceBetweenStar="10px"
                            disableOnSelect={false}
                            onSelectStar={rateChangeHandler}
                          />{" "}
                        </div>
                        <Link
                          href={{
                            pathname: "/rate&/review",
                            state: {
                              product_image: shipment.thumbnail_image,
                              product_id: shipment.product_id,
                              product_rating: shipment.product_rating,
                              product_name: shipment.product_name,
                            },
                          }}
                        >
                          <p className={Classes.RateReviewText}>
                            {" "}
                            Rate & review
                          </p>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RateReviewMain;
