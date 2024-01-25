import React from "react";
import Classes from "./NewArrivals.module.css";
import { useHistory } from "react-router-dom";

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
            <p className={Classes.NewArrivalsSubText}>234 New item added</p>
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
