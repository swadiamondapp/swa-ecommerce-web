import React from "react";
import Classes from "./NewArrivals.module.css";
import { useHistory } from "react-router-dom";
import LIfeTImeModal from "../LifeTImeModal/LIfeTImeModal";
import BuyBackRequiest from "../BuyBackRequiest/BuyBackRequiest";
import SuccessPage from "../SuccessPage/SuccessPage.js";
import RefundInitiated from "../RefundInitiated/RefundInitiated.js";
import SuccessModal from "../SuccessMessageModal/SuccessModal.js";
import AddBank from "../LifeTImeModal/AddBank";
import TransferMoneyModal from "../WalletModal/TransferMoneyModal.js";
import WalletModal from "../WalletModal/WalletModal.js";

function NewArrivals(props) {
  const history = useHistory();
  const seeAllHandler = (type) => {
    history.push({ pathname: "/new_arrivel", state: { data: type } });
  };

  return (
    <div>
      <div className={Classes.NewArrivals}>
        <div className={Classes.setItems}>
          <div>
            <h1 className={Classes.NewArrivalsMainText}>New Arrivals</h1>
            <p className={Classes.NewArrivalsSubText}>
              {props.counts.new_arrivals_count} New item added
            </p>
          </div>
        </div>
      </div>

      <div className={Classes.NewArrivalImages}>
        <div className="container">
          <div className="row">{props.children}</div>
        </div>
      </div>
      <p className={Classes.seeAll} onClick={() => seeAllHandler("new")}>
        See all
      </p>
    </div>
  );
}

export default NewArrivals;
