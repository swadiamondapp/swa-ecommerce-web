import React from "react";
import Shipping from "../../Assets/FreeShipping.png";
import SH1 from "../../Assets/SH1.png";
import PS2 from "../../Assets/PS2.png";
import PS3 from "../../Assets/PS3.png";
import PS4 from "../../Assets/PS4.png";
import { BiRupee } from "react-icons/bi";
import { CgDollar } from "react-icons/cg";
import MoneyBack from "../../Assets/MoneyBack.png";
import Support from "../../Assets/Support.png";
import Security from "../../Assets/Security.png";
import Classes from "./Features.module.css";
function Features() {
  const Contryname = localStorage.getItem("country_name");
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
              <p
                className={Classes.FeaturesSubText}
                style={{ display: "flex", alignItems: "center", gap: "3px" }}
              >
                On order over{" "}
                {Contryname === "India" && (
                  <BiRupee className={Classes.Rupee} />
                )}
                {Contryname === "United States" && (
                  <CgDollar className={Classes.Rupee} />
                )}
                {Contryname === "United Arab Emirates" && <span>AED</span>}{" "}
                2000...{" "}
              </p>
            </div>
            <div
              className={`${"col-sm-6"} ${"col-6"}  ${"col-md-3"} ${
                Classes.FeaturesDetails
              } ${Classes.MoneyBack}`}
            >
              <img src={PS2} className={Classes.Images} alt="" />
              <p className={Classes.FeaturesmainText}>100% Refund</p>
              <p className={Classes.FeaturesSubText}>
                Return with 30 days of delivery
              </p>
            </div>
            <div
              className={`${"col-sm-6"} ${"col-6"}  ${"col-md-3"} ${
                Classes.FeaturesDetails
              } ${Classes.SupportBack}`}
            >
              <img src={PS3} className={Classes.Images} alt="" />
              <p className={Classes.FeaturesmainText}>
                100% Certified jewellery
              </p>
              <p className={Classes.FeaturesSubText}>BIS Hallmark, IGI, GIA</p>
            </div>
            <div
              className={`${"col-sm-6"} ${"col-6"}  ${"col-md-3"} ${
                Classes.FeaturesDetails
              } ${Classes.Security}`}
            >
              <img src={PS4} className={Classes.Images} alt="" />
              <p className={Classes.FeaturesmainText}>
                LifetimeExchange & Buyback
              </p>
              <p className={Classes.FeaturesSubText}>
                Exchange for current value or get cash
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features;
