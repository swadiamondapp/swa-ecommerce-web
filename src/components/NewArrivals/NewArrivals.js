import React from "react";
import Classes from "./NewArrivals.module.css";
import { useHistory } from "react-router-dom";
import LIfeTImeModal from "../LifeTImeModal/LIfeTImeModal";
import BuyBackRequiest from "../BuyBackRequiest/BuyBackRequiest";

function NewArrivals(props) {
  const history = useHistory();
  const seeAllHandler = (type) => {
    history.push({ pathname: "/new_arrivel", state: { data: type } });
  };


  return (
    <div>
      <LIfeTImeModal/>
      <BuyBackRequiest/>
      {/* <div className={Classes.NewArrivals}>
        <div className={Classes.setItems}>
          <div>
            <h1 className={Classes.NewArrivalsMainText}>New Arrivals</h1>
            <p className={Classes.NewArrivalsSubText}>
              Be the First to Shine: Shop Our Stunning New Jewellery Pieces!
            </p>
          </div>
          <p className={Classes.seeAll} onClick={() => seeAllHandler("new")}>
            See all
          </p>
        </div>
      </div>
      <div className={Classes.NewArrivalImages}>
        <div className="container">
          <div className="row">{props.children}</div>
        </div>
      </div> */}
    </div>
  );
}

export default NewArrivals;
