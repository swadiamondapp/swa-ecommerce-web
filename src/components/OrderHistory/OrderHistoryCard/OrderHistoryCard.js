import React from "react";
import Classes from "./OrderHistoryCard.module.css";

function OrderHistoryCard(props) {
  return (
    <div>
      {" "}
      <div className="">
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
