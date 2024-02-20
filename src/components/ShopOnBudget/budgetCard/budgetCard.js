import React from "react";
import Classes from "../budgetCard/budgetCard.module.css";

function BudgetCard(props) {
  return (
    <React.Fragment>
      <div
        className={`${"col-md-3"} ${"col-sm-6"} ${"col-lg-3"} ${"col-6"} ${"padLeft"}`}
        onClick={props.clicked}
        style={{
          cursor: "pointer",
          position: "relative",
          paddingRight: "0px",
        }}
      >
        <div className={Classes.MobScreensParent}>
          <div
            className={Classes.ShopOnBudgetImage}
            style={{ backgroundImage: `url(${props.backgroundImage})` }}
          >
            <p className={Classes.ImageText1}>
              {props.head}

              <span className={Classes.ImageText2}>{props.sub}</span>
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default BudgetCard;
