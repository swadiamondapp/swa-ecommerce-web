"use client";
import React, { useEffect } from "react";
import Classes from "./ReturnPolicy.module.css";

export default function ReturnPolicy() {
  useEffect(() => {
    window?.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <div className="container">
        <div className={Classes.ParentReturnPolicy}>
          <div className={Classes.HaedParentRturn1}>
            <div className={Classes.Main}>
              <h1 className={Classes.Title}>Return Policy</h1>
            </div>
            <div className={Classes.SubText}>
              <p className={Classes.Home}>HOME /</p>
              <p className={Classes.ReturnPolicy}>Return Policy</p>
            </div>
          </div>
          <div className={Classes.Content}>
            <div className={Classes.Description}>
              <ul>
                <li>
                  SWA Diamonds provide Life time buy back & Exchangepolicy
                </li>
                <li>
                  Buy-back policy of SWA Diamond(Online purchase) products is
                  applicable after 10% deduction on MRP
                </li>
                <li>
                  Exchange of SWA Diamond(Online purchase) products is permitted
                  after 5% deduction on MRP
                </li>
                <li>
                  Buy-back policy of SWA Diamond(same outlet) products is
                  applicable after 10% deduction on MRP
                </li>
                <li>
                  Buy-back policy of SWA Diamond(same outlet) products is
                  applicable after 10% deduction on MRP
                </li>
                <li>
                  Buy-back policy of SWA Diamond(Other outlet) products is
                  applicable after 20% deduction on MRP
                </li>
                <li>
                  Exchange of SWA Diamond(Other outlet) products is permitted
                  after 10% deduction on MRP
                </li>
                <li>
                  In free life time repair warranty of SWA Diamond ornaments,
                  the following are exempted
                </li>
              </ul>
              <ul className={Classes.Description2}>
                <li>
                  In case of missing parts, the same shall not be replaced free
                  of material cost.
                </li>
                <li>
                  In case of missing diamonds, Single Diamond above 0.03 ct
                  shall not be replaced free of material cost.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
