import React from "react";
import { IoIosStar } from "react-icons/io";
import Classes from "../OrderHistoryCard.module.css";
import { useHistory } from "react-router-dom";
import { BiRupee } from "react-icons/bi";
import { BsCircleFill } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Button, Tooltip } from "antd";
function Orders(props) {
  const history = useHistory();
  // color="#069D0D"

  return (
    <div>
      <div className={Classes.Align}>
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
              {/* <Tooltip placement="bottomLeft" title={props.textAdres}> */}
              <p className={Classes.ProductProperty}>
                SHIPPED TO
                <span style={{ color: "#006E7F" }}>&nbsp;{props.address}</span>
                <MdOutlineKeyboardArrowDown size={25} />
              </p>
              {/* </Tooltip> */}
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
      </div>
    </div>
  );
}

export default Orders;
