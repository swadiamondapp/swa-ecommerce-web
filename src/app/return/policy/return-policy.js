// "use client";
// import React, { useEffect } from "react";
// import Classes from "./ReturnPolicy.module.css";

// export default function ReturnPolicy() {
//   useEffect(() => {
//     window?.scrollTo(0, 0);
//   }, []);
//   return (
//     <div>
//       <div className="container">
//         <div className={Classes.ParentReturnPolicy}>
//           <div className={Classes.HaedParentRturn1}>
//             <div className={Classes.Main}>
//               <h1 className={Classes.Title}>Return Policy</h1>
//             </div>
//             <div className={Classes.SubText}>
//               <p className={Classes.Home}>HOME /</p>
//               <p className={Classes.ReturnPolicy}>Return Policy</p>
//             </div>
//           </div>
//           <div className={Classes.Content}>
//             <div className={Classes.Description}>
//               <ul>
//                 <li>
//                   SWA Diamonds provide Life time buy back & Exchangepolicy
//                 </li>
//                 <li>
//                   Buy-back policy of SWA Diamond(Online purchase) products is
//                   applicable after 10% deduction on MRP
//                 </li>
//                 <li>
//                   Exchange of SWA Diamond(Online purchase) products is permitted
//                   after 5% deduction on MRP
//                 </li>
//                 <li>
//                   Buy-back policy of SWA Diamond(same outlet) products is
//                   applicable after 10% deduction on MRP
//                 </li>
//                 <li>
//                   Buy-back policy of SWA Diamond(same outlet) products is
//                   applicable after 10% deduction on MRP
//                 </li>
//                 <li>
//                   Buy-back policy of SWA Diamond(Other outlet) products is
//                   applicable after 20% deduction on MRP
//                 </li>
//                 <li>
//                   Exchange of SWA Diamond(Other outlet) products is permitted
//                   after 10% deduction on MRP
//                 </li>
//                 <li>
//                   In free life time repair warranty of SWA Diamond ornaments,
//                   the following are exempted
//                 </li>
//               </ul>
//               <ul className={Classes.Description2}>
//                 <li>
//                   In case of missing parts, the same shall not be replaced free
//                   of material cost.
//                 </li>
//                 <li>
//                   In case of missing diamonds, Single Diamond above 0.03 ct
//                   shall not be replaced free of material cost.
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

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
                  Diamond Jewellery purchased from SWA Diamond's Exclusive
                  Outlet can be exchanged without any loss in invoice value if
                  returned to the same outlet within 15 days.
                </li>
                <li>
                  Diamond Jewellery purchased from SWA Diamond's Exclusive
                  Outlet can be Cashback with a 5% deduction on MRP if returned
                  to the same outlet within 15 days. Only one such exchange will
                  be permitted against an invoice.
                </li>
                <li>
                  In case of Return/Exchange after 15 days, the invoice value
                  will be calculated as per the below policy:
                  <ul>
                    <li>
                      1.) &nbsp;Buyback policy of SWA diamond (from the same
                      outlet) products is applicable only after a 10% deduction
                      on MRP.
                    </li>
                    <li>
                      2.) &nbsp;Exchanging SWA diamond (from the same outlet)
                      products is permitted only after a 5% deduction on the
                      MRP.
                    </li>
                    <li>
                      3.) &nbsp;The buyback policy of SWA diamond (from other
                      outlets) products is applicable only after a 20% deduction
                      on the MRP.
                    </li>
                    <li>
                      4.) &nbsp;Exchanging SWA diamond (from other outlets)
                      products is permitted only after a 10% deduction on the
                      MRP.
                    </li>
                  </ul>
                </li>
                <li>
                  In case of cash back, the amount will be credited to your bank
                  account within 48 hours of banking working days.
                </li>
                <li>
                  The actual weight of the ornament at the time of exchange/buy
                  back will be considered.
                </li>
                <li>
                  We offer free lifetime repair warranty for SWA diamond
                  ornaments except the following:
                  <ul>
                    <li>
                      1.) &nbsp;In case of missing parts, the same shall not be
                      replaced free of material cost.
                    </li>
                    <li>
                      2.) &nbsp;In case of missing Diamonds, Single Diamonds
                      above 0.03 CT shall not be replaced free of material cost.
                    </li>
                  </ul>
                </li>
                <li>
                  Exchange/Buy back of gold ornaments other than MRP based
                  ornaments, the rate will be as per the prevailing policy of
                  the showroom.
                </li>
                <li>
                  In order to sell ornament, customer shall provide any identity
                  proof as follows: Electoral ID / Aadhaar Card / Driving
                  License / Passport / Pan Card.
                </li>
                <li>
                  Pan card is mandatory for purchase/sale of Rs. 2 lakhs and
                  above.
                </li>
                <li>
                  Transactions of Rs. 2 Lakhs and above will not be accepted by
                  cash.
                </li>
                <li>
                  The company reserves the right to modify these terms and
                  conditions without prior notice.
                </li>
                <li>
                  All disputes are subject to the jurisdiction of the court in
                  Calicut (Kerala).
                </li>
                <li>
                  (The above two points may be exempted in the payment of
                  material cost by the concerned party, which stands free of
                  service charge).
                </li>
                <h3
                  style={{
                    textAlign: "center",
                    fontSize: "20px",
                    color: "#0596e8",
                    margin: "20px 0px",
                  }}
                >
                  Customer Care Number: 18002578600
                </h3>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
