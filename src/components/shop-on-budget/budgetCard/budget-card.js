import React from "react";
import Classes from "./budget-card.module.css";

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
            style={{ backgroundImage: `url('/Assets/b${props.index +1}.png')` }}
          >
            <p className={Classes.ImageText1}>
              {"Under  " + props.budget.budget}
              <span className={Classes.ImageText2}>{props.budget.count + " styles"}</span>
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default BudgetCard;
