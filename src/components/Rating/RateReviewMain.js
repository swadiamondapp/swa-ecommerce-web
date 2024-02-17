import React, { useState } from "react";
import Classes from "./Rating.module.css";
import productimg from "../../Assets/diamonds.png";
import deliveryimg from "../../Assets/delivery.png";
import ReactStarRating from "react-star-ratings-component";

const RateReviewMain = () => {
  const [rate, setRate] = useState(2);

  const rateChangeHandler = (value) => {
    setRate(value);
  };
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
          <div className={Classes.ParentMainReview_Rate}>
            <div className={Classes.RateAndReviewCard}>
              <div className={Classes.OrderIdReview}>
                <p>Order ID : SWA4R46RF46R356F45</p>
              </div>
              <div className={Classes.CardView1}>
                <div className={Classes.LeftCardView1}>
                  <div className={Classes.ProductImgReview}>
                    <img src={productimg} />
                  </div>
                  <div className={Classes.ProductDetailsReview}>
                    <p className={Classes.productNames3}>Diamond ring</p>
                    <p className={Classes.pDesc3}>
                      <img src={deliveryimg} /> Delivered on{" "}
                      <span style={{ color: "#30933A" }}>26 may 2023</span>
                    </p>
                    <p className={Classes.pDesc4}>
                      Expected Delivery by <span>30 may 2023</span>
                    </p>
                  </div>
                </div>
                <div className={Classes.RightCardView1}>
                  <div>
                    <ReactStarRating
                      numberOfStar={5}
                      numberOfSelectedStar={rate}
                      colorFilledStar="#F6C514"
                      colorEmptyStar="#D1D3D5"
                      starSize="30px"
                      spaceBetweenStar="10px"
                      disableOnSelect={false}
                      onSelectStar={rateChangeHandler}
                    />{" "}
                  </div>
                  <p className={Classes.RateReviewText}> Rate & review</p>
                </div>
              </div>
            </div>
            {/* second */}
            <div className={Classes.RateAndReviewCard}>
              <div className={Classes.OrderIdReview}>
                <p>Order ID : SWA4R46RF46R356F45</p>
              </div>
              <div className={Classes.CardView1}>
                <div className={Classes.LeftCardView1}>
                  <div className={Classes.ProductImgReview}>
                    <img src={productimg} />
                  </div>
                  <div className={Classes.ProductDetailsReview}>
                    <p className={Classes.productNames3}>Diamond ring</p>
                    <p className={Classes.pDesc3}>
                      <img src={deliveryimg} /> Delivered on{" "}
                      <span style={{ color: "#30933A" }}>26 may 2023</span>
                    </p>
                    <p className={Classes.pDesc4}>
                      Expected Delivery by <span>30 may 2023</span>
                    </p>
                  </div>
                </div>
                <div className={Classes.RightCardView1}>
                  <div>
                    <ReactStarRating
                      numberOfStar={5}
                      numberOfSelectedStar={rate}
                      colorFilledStar="#F6C514"
                      colorEmptyStar="#D1D3D5"
                      starSize="30px"
                      spaceBetweenStar="10px"
                      disableOnSelect={false}
                      onSelectStar={rateChangeHandler}
                    />{" "}
                  </div>
                  <p className={Classes.RateReviewText}> Rate & review</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateReviewMain;
