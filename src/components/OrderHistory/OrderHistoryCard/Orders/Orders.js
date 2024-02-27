import React from "react";
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
function Orders(props) {
  const history = useHistory();
  // color="#069D0D"
  console.log("props--.>", props);
  return (
    <div className={Classes.RateContainer}>
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
      <div className={Classes.ProductName}>
        <p>Order ID : {props.orderId}</p>
      </div>
      <div className={Classes.BottomContainer}>
        <div className={Classes.MobImgContainer}>
          <div className={Classes.ImageContent}>
            <img src={props.Image} />
            <div className={Classes.TextWrapper}>
              <h3>Diamond Ring</h3>
              <p className={Classes.DeliveryText}>
                <TbTruckDelivery color="#30933A" size={20} /> Delivered on{" "}
                <span className={Classes.GreenText}>26 may 2023</span>
              </p>
              <p className={Classes.Expected}>
                Expected Delivery by{" "}
                <span className={Classes.OverLined}>30 may 2023</span>
              </p>
            </div>
          </div>
          <MdOutlineKeyboardArrowRight fill="#006E7F" size={25} />
        </div>
        <div className={Classes.RighSection}>
          <div className={Classes.ViewButton}>
            <button>View Order details</button>
            <MdOutlineKeyboardArrowRight className={Classes.RightArrow} />
          </div>
          <div className={Classes.RatingContainer}>
            <ReactStarRating
              numberOfStar={5}
              // numberOfSelectedStar={rate}
              colorFilledStar="#F6C514"
              colorEmptyStar="#D1D3D5"
              starSize="25px"
              spaceBetweenStar="10px"
              disableOnSelect={false}
              // onSelectStar={rateChangeHandler}
            />
            <Link to="/rate&review">
              <p>Rate & Review</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
