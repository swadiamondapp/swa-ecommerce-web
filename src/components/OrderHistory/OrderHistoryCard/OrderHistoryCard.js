import React from "react";
import { useHistory } from "react-router-dom";
import Classes from "./OrderHistoryCard.module.css";
import { BiRupee } from "react-icons/bi";
import { IoIosStar } from "react-icons/io";

function OrderHistoryCard(props) {
  return (
    <div>
      {" "}
      <div className={Classes.OutBox}>
        <div className="container">
          <div className="row">
            <div className={Classes.Background}>{props.children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderHistoryCard;
