import React, { useState, useEffect } from "react";
import Classes from "./Rating.module.css";
import productimg from "../../Assets/diamonds.png";
import deliveryimg from "../../Assets/delivery.png";
import ReactStarRating from "react-star-ratings-component";
import { Link } from "react-router-dom";
import axios from "axios";
import * as Urls from "../../Urls";

const RateReviewMain = (props) => {
  const [rate, setRate] = useState(2);
  const token = localStorage.getItem("swaToken");
  const [isMobileView, setIsMobileView] = useState(
    window.innerWidth >= 300 && window.innerWidth <= 575
  );
  const countryId = localStorage.getItem("id");

  const rateChangeHandler = (value) => {
    setRate(value);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth >= 300 && window.innerWidth <= 575);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener when component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobileView]);
  const [orderDetails, setOrderDetails] = useState([
    {
      product: {
        thumbnail_image: "",
        product_name: "",
        carat: "",
        gross_weight: "",
        product_id: "",
      },
      color: { size_name: "" },
      quantity: "",
    },
  ]);
  const [orderShipments, setOrderShipments] = useState([]);
  const [productDetails, setProductDetails] = useState([]);

  useEffect(() => {
    axios
      .get(`${Urls.myOrder}?country=${countryId}`, {
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
      // })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log("orderDet...1", orderShipments);
  console.log("orderDet...2", orderDetails);
  console.log("productDetails...2", productDetails);
  return (
    <div>
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

          {orderDetails.map((order) => (
            <div className={Classes.ParentMainReview_Rate} key={order.order_id}>
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
                            <img src={deliveryimg} alt="deliveryimg" />{" "}
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
                          to={{
                            pathname: "/rate_review",
                            state: {
                              product_image: shipment.thumbnail_image,
                              product_id: shipment.product_id,
                              product_rating: shipment.product_rating,
                              product_name: shipment.product_name,
                            },
                          }}
                        >
                          {console.log("....pp", shipment.thumbnail_image)}
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
