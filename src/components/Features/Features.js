import React from "react";
import Shipping from "../../Assets/FreeShipping.png";
import SH1 from "../../Assets/SH1.png";
import PS2 from "../../Assets/PS2.png";
import PS3 from "../../Assets/PS3.png";
import PS4 from "../../Assets/PS4.png";
import MoneyBack from "../../Assets/MoneyBack.png";
import Support from "../../Assets/Support.png";
import Security from "../../Assets/Security.png";
import Classes from "./Features.module.css";
function Features() {
  return (
    <div className={Classes.FeaturesBg}>
      <div className="container">
        <div className={Classes.MarginFeatures}>
          <div className="row shipping_cards">
            <div
              className={`${"col-sm-6"} ${"col-6"} ${"col-md-3"} ${
                Classes.FeaturesDetails
              } ${Classes.Shipping}`}
            >
              <img src={SH1} className={Classes.Images} alt="" />
              <p className={Classes.FeaturesmainText}>Free shipping</p>
              <p className={Classes.FeaturesSubText}>On order over ₹2000... </p>
            </div>
            <div
              className={`${"col-sm-6"} ${"col-6"}  ${"col-md-3"} ${
                Classes.FeaturesDetails
              } ${Classes.MoneyBack}`}
            >
              <img src={PS2} className={Classes.Images} alt="" />
              <p className={Classes.FeaturesmainText}>Moneyback</p>
              <p className={Classes.FeaturesSubText}>Moneyback guarantee ...</p>
            </div>
            <div
              className={`${"col-sm-6"} ${"col-6"}  ${"col-md-3"} ${
                Classes.FeaturesDetails
              } ${Classes.SupportBack}`}
            >
              <img src={PS3} className={Classes.Images} alt="" />
              <p className={Classes.FeaturesmainText}>24/7 Support</p>
              <p className={Classes.FeaturesSubText}>
                Online consultations ...
              </p>
            </div>
            <div
              className={`${"col-sm-6"} ${"col-6"}  ${"col-md-3"} ${
                Classes.FeaturesDetails
              } ${Classes.Security}`}
            >
              <img src={PS4} className={Classes.Images} alt="" />
              <p className={Classes.FeaturesmainText}>Secure payment</p>
              <p className={Classes.FeaturesSubText}>
                Safe shopping guarantee ...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features;
