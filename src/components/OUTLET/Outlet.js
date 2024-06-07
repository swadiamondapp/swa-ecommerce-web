import React from "react";
import Classes from "../SwaWallet/SwaWallet.module.css";
import outletimg from "../../Assets/outlet.png";
import starimg from "../../Assets/Star.png";
import locationimg from "../../Assets/locationimgs.png";
import timeimg from "../../Assets/times.png";
import { BsSearch } from "react-icons/bs";
import pincodeimg from "../../Assets/locations.png";
import { RiWhatsappFill } from "react-icons/ri";
import { IoMdCall } from "react-icons/io";

const Outlet = () => {
  const outlets = [
    {
      name: "Hilite mall - Calicut",
    },
    {
      name: "Hilite mall - Calicut",
    },
    {
      name: "Hilite mall - Calicut",
    },
    {
      name: "Hilite mall - Calicut",
    },
  ];
  return (
    <div>
      <div className={Classes.mainContianerProfile}>
        <div className="container">
          <div className={Classes.OutletParent}>
            <div className={Classes.OutletHead}>
              <h3 className={Classes.outleth3}>Outlet</h3>
              <div className={Classes.OutletSearch}>
                <input type="" placeholder="Search location" />
                <BsSearch size={22} className={Classes.Outletsearchicon} />
              </div>

              <p className={Classes.Outletpincode}>
                <img src={pincodeimg} /> Use your current location
              </p>
            </div>
            <div className={Classes.OutletCardParent}>
              {outlets.map((item) => (
                <div className={Classes.OutletCard}>
                  <div className={Classes.ParentSubOutlet}>
                    <div className={Classes.LeftOutlets}>
                      <div className={Classes.OutletImage}>
                        <img src={outletimg} />
                      </div>
                      <div className={Classes.OutletDetails}>
                        <h3>{item.name}</h3>
                        <p className={Classes.RatingOutlets}>
                          <img
                            style={{ position: "relative", top: "-3px" }}
                            src={starimg}
                          />{" "}
                          <span>4.9 | 978 Goolge review</span>
                        </p>
                        <p>
                          Door no 2/1149 G25& G26 <br /> Ground floor , HiLITE
                          MALL <br />
                          <span style={{ color: "#006C77" }}>
                            090371 00550, 090371 00550
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className={Classes.RightOutlet}>
                      <img src={locationimg} /> 6KM
                    </div>
                  </div>
                  <div className={Classes.OutletFooterCrad}>
                    <div className={Classes.OutletFooter}>
                      <div className={Classes.outletWatsapp}>
                        <RiWhatsappFill size={20} />
                      </div>
                      <div className={Classes.outletWatsapp}>
                        <IoMdCall size={20} />
                      </div>
                      <div className={Classes.OutletBookvist}>
                        <button>Book a Vist</button>
                      </div>
                    </div>
                    <p className={Classes.OutletFooters}>
                      <img
                        style={{ position: "relative", top: "-1px" }}
                        src={timeimg}
                      />{" "}
                      WORKING HOURS : 10:00AM TO 10:00PM
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Outlet;
