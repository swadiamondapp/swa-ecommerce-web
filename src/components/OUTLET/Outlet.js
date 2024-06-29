import React, { useState, useEffect } from "react";
import Classes from "../SwaWallet/SwaWallet.module.css";
import outletimg from "../../Assets/outlet.png";
import starimg from "../../Assets/Star.png";
import locationimg from "../../Assets/locationimgs.png";
import timeimg from "../../Assets/times.png";
import { BsSearch } from "react-icons/bs";
import pincodeimg from "../../Assets/locations.png";
import { RiWhatsappFill } from "react-icons/ri";
import { IoMdCall } from "react-icons/io";
import Tab from "react-bootstrap/Tab";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { IoClose } from "react-icons/io5";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "0%",
  right: "0%",
  transform: "translate(-0%, -0%)",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  borderRadius: "4px",
  width: 450,
  maxHeight: "100%",
  overflowY: "scroll",
};

const mobileStyle = {
  position: "absolute",
  bottom: 0,
  transition: "transform 0.3s ease-in-out",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  borderRadius: "4px",
  p: 2,
  overflow: "auto",
  maxHeight: "78%",
  width: "100%",
};

const Outlet = () => {
  const [opensort, setOpensort] = useState(false);
  const [isMobileView, setIsMobileView] = useState(
    window.innerWidth >= 300 && window.innerWidth <= 575
  );
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth >= 300 && window.innerWidth <= 575);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener when component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobileView]);
  const handleOpenSort = () => {
    setOpensort(true);
  };
  const handleCloseSort = () => {
    setOpensort(false);
  };
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
                <img src={pincodeimg} alt="pincodeimg" /> Use your current
                location
              </p>
            </div>
            <div className={Classes.OutletCardParent}>
              {outlets.map((item) => (
                <div className={Classes.OutletCard}>
                  <div className={Classes.ParentSubOutlet}>
                    <div className={Classes.LeftOutlets}>
                      <div className={Classes.OutletImage}>
                        <img src={outletimg} alt="outletimg" />
                      </div>
                      <div className={Classes.OutletDetails}>
                        <h3>{item.name}</h3>
                        <p className={Classes.RatingOutlets}>
                          <img
                            style={{ position: "relative", top: "-3px" }}
                            src={starimg}
                            alt="starimg"
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
                      <img src={locationimg} alt="locationimg" /> 6KM
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
                        <button onClick={handleOpenSort}>Book a Vist</button>
                      </div>
                    </div>
                    <p className={Classes.OutletFooters}>
                      <img
                        style={{ position: "relative", top: "-1px" }}
                        src={timeimg}
                        alt="timeimg"
                      />{" "}
                      WORKING HOURS : 10:00AM TO 10:00PM
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* modal */}
            <div>
              <Modal
                // open={props.open}
                open={opensort}
                // onClose={props.handleClose}
                onClose={handleCloseSort}
              >
                <Box sx={isMobileView ? mobileStyle : style}>
                  <Typography>
                    <div className={Classes.OutletModalsParent}>
                      <div className={Classes.OutletModalHeader}>
                        <img src={outletimg} alt="outletimg" />
                        <div>
                          <h3>Hilite mall - Calicut</h3>
                          <p>
                            Door no 2/1149 G25& G26 <br /> Ground floor , HiLITE
                            MALL  
                          </p>
                        </div>
                        <div className={Classes.Modaloutletclose}>
                          <IoClose className={Classes.MOdalcloseiconOutlet} />
                        </div>
                      </div>
                      <div className={Classes.BasicDetailsOutlet}>
                        <h3>Basic Details</h3>
                        <div className={Classes.OutletMform}>
                          <label>Enter Name</label>
                          <input type="" placeholder="Arjun" />
                        </div>
                        <div className={Classes.OutletMform}>
                          <label>Email</label>
                          <input type="" placeholder="Jameel" />
                        </div>
                        <div className={Classes.OutletMform}>
                          <label>Phone number</label>
                          <input type="" placeholder="+91 98975656785" />
                        </div>
                      </div>
                      <div className={Classes.SelectDateModal}>
                        <div className={Classes.selectdateMText}>
                          <h3>Select date</h3>
                        </div>
                        <div className={Classes.ParentDateModals}>
                          <div className={Classes.DMdate1}>
                            <p>MON</p>
                            <p>02</p>
                          </div>
                          <div className={Classes.DMdate1}>
                            <p>TUE</p>
                            <p>03</p>
                          </div>
                          <div className={Classes.DMdate1}>
                            <p>WED</p>
                            <p>04</p>
                          </div>
                          <div className={Classes.DMdate1}>
                            <p>THU</p>
                            <p>05</p>
                          </div>
                          <div className={Classes.DMdate1}>
                            <p>FRI</p>
                            <p>06</p>
                          </div>
                        </div>
                      </div>
                      <div className={Classes.outletModalTime}>
                        <div className={Classes.selectdateMText}>
                          <h3>Choose Time</h3>
                        </div>
                        <div className={Classes.outletModalTimesec}>
                          <div className={Classes.Timesec}>10:OO AM</div>
                          <div className={Classes.Timesec}>11:OO AM</div>
                          <div className={Classes.Timesec}>12:OO AM</div>
                          <div className={Classes.Timesec}>1:OO PM</div>
                          <div className={Classes.Timesec}>2:OO PM</div>
                          <div className={Classes.Timesec}>3:OO PM</div>
                        </div>
                      </div>
                      <div className={Classes.Bookvistbtns}>
                        <button>Book a Vist</button>
                      </div>
                    </div>
                  </Typography>
                </Box>
              </Modal>
            </div>
            {/* modal */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Outlet;
