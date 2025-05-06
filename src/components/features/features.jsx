"use client";

import React from "react";
import Image from "next/image";
import Classes from "./features.module.css";

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
              <Image src={'/Assets/SH1.png'} className={Classes.Images} alt="SH1" width={72} height={72}/>
              <p className={Classes.FeaturesmainText}>Free shipping</p>
              <p
                className={Classes.FeaturesSubText}
                style={{ display: "flex", alignItems: "center", gap: "3px" }}
              >
                Every order ships free!
              </p>
            </div>
            <div
              className={`${"col-sm-6"} ${"col-6"}  ${"col-md-3"} ${
                Classes.FeaturesDetails
              } ${Classes.MoneyBack}`}
            >
              <Image src={'/Assets/PS2.png'} className={Classes.Images} alt="PS2" width={72} height={72} />
              <p className={Classes.FeaturesmainText}>100% Refund</p>
              <p className={Classes.FeaturesSubText}>
                Return with 15 days of delivery
              </p>
            </div>
            <div
              className={`${"col-sm-6"} ${"col-6"}  ${"col-md-3"} ${
                Classes.FeaturesDetails
              } ${Classes.SupportBack}`}
            >
              <Image src={'/Assets/PS3.png'} className={Classes.Images} alt="PS3" width={72} height={72} />
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
              <Image src={'/Assets/PS4.png'} className={Classes.Images} alt="PS4" width={72} height={72} />
              <p className={Classes.FeaturesmainText}>
                LifetimeExchange & Buyback
              </p>
              <p className={Classes.FeaturesSubText}>
                Get 95% Exchange value and 90% cashback
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features;
