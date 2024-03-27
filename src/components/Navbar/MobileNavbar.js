import React, { useState, useEffect } from "react";
// import Logo from "../../Assets/moblogo.png";
import Logo from "../../Assets/moblogo.svg";
import Hamburger from "hamburger-react";
import { FiBell } from "react-icons/fi";
import { IoCartOutline } from "react-icons/io5";
import LoginToggle from "./LoginToggle";
import Classes from "./MobileNav.module.css";
// import { loginHandler } from "../LoginModal/LoginModal";
import menuimg from "../../Assets/mobmenu.png";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IoMdClose } from "react-icons/io";
import userimg from "../../Assets/user.png";
import { Accordion, AccordionTab } from "primereact/accordion";
import "../../Pages/OrderHistoryPage2/OrderHistoryPage2.module.css";
import ringimg from "../../Assets/ladiesring.png";
import ringimg2 from "../../Assets/pendant1.png";
import { HiPlus } from "react-icons/hi";
import indiaimg from "../../Assets/india.png";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

const MobileNavbar = () => {
  const [isHamOpen, setIsHamOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState();
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "none",
    boxShadow: 24,
    borderRadius: "4px",
    p: 4,
  };

  const mobileStyle = {
    position: "absolute",
    transition: "transform 0.3s ease-in-out",
    bgcolor: "background.paper",
    border: "none",
    boxShadow: 24,
    borderRadius: "4px",
    overflowY: "auto",
    overflowY: "auto",
    maxHeight: "100vh",
    width: "100%",
  };
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
  return (
    <div className={Classes.NavContainer}>
      <div className={Classes.Navbar}>
        <header>
          <div className={Classes.NavElements}>
            <div className={Classes.LeftIcons}>
              {/* <Hamburger
                className={Classes.hamIcon}
                color="#fff"
                size={24}
                toggled={isHamOpen}
                toggle={setIsHamOpen}
                onToggle={(toggled) => {
                  if (toggled) {
                    // open a menu
                    setIsHamOpen(true);
                  } else {
                    // close a menu
                  }
                }}
              /> */}
              <img
                onClick={handleOpen}
                src={menuimg}
                className={Classes.hamMenu}
              />
            </div>
            <div className={Classes.Logo}>
              <img className={Classes.mobileLogo} src={Logo} />
            </div>
          </div>
          <div className={Classes.rightIcons}>
            <div>
              <img src={indiaimg} />
            </div>
            <div>
              <FiBell
                className={Classes.Icon}
                color="#FFFFFF"
                size={25}
                // onClick={loginHandler}
              />
            </div>
            <div>
              <IoCartOutline
                className={`${Classes.Icon} ${Classes.AddToCart}`}
                color="#FFFFFF"
                size={25}
                // onClick={moveTocart}
              />
            </div>
          </div>
        </header>
        {isHamOpen ? (
          <>
            <div className={Classes.SlideButto}>
              <LoginToggle />
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      <Modal
        // open={props.open}
        open={open}
        // onClose={props.handleClose}
        onClose={handleClose}
      >
        <Box sx={isMobileView ? mobileStyle : style}>
          <Typography>
            <div className={Classes.ParentMobSection}>
              <div className={Classes.MobMainHead}>
                <div className={Classes.MobLeftSection}>
                  <img src={userimg} />
                  <div className={Classes.MobLog_Signup}>
                    <p>Login</p>
                    <p className={Classes.BorderLineMob}></p>
                    <p>Sign up</p>
                  </div>
                </div>
                <div className={Classes.MobRightSection}>
                  <IoMdClose
                    style={{
                      cursor: "pointer",
                      color: "#fff",
                      fontSize: "22px",
                    }}
                    // onClick={props.handleClose}
                    onClick={handleClose}
                  />
                </div>
              </div>
              <div className={Classes.CollapsParent}>
                <div className={Classes.parentCollaps5}>
                  <div style={{ background: "#fff", borderRadius: "8px" }}>
                    <div className={`shipment1 ${Classes.dmm}`}>
                      <Accordion
                        multiple
                        activeIndex={activeIndex}
                        onTabChange={(e) => setActiveIndex(e.index)}
                      >
                        <AccordionTab header="Catagory">
                          <div className={Classes.ShippingDetialHead}>
                            <div className={Classes.ParentCards1}>
                              <img src={ringimg} />
                              <p>ladies ring</p>
                            </div>
                            <div
                              className={Classes.ParentCards1}
                              style={{ borderBottom: "none" }}
                            >
                              <img src={ringimg2} />
                              <p>Pendant</p>
                            </div>
                          </div>
                        </AccordionTab>
                        <AccordionTab header="Tags">
                          <div className={Classes.ShippingDetialHead}>
                            <div className={Classes.ParentCards2}>
                              <HiPlus />
                              <p>Birthday</p>
                            </div>
                            <div className={Classes.ParentCards2}>
                              <HiPlus />
                              <p>Akshayathrithiya</p>
                            </div>
                            <div className={Classes.ParentCards2}>
                              <HiPlus />
                              <p>little price</p>
                            </div>
                            <div className={Classes.ParentCards2}>
                              <HiPlus />
                              <p>Men</p>
                            </div>
                            <div className={Classes.ParentCards2}>
                              <HiPlus />
                              <p>Woman</p>
                            </div>
                            <div className={Classes.ParentCards2}>
                              <HiPlus />
                              <p>Gifting</p>
                            </div>
                            <div className={Classes.ParentCards2}>
                              <HiPlus />
                              <p>Anniversary</p>
                            </div>
                          </div>
                        </AccordionTab>
                        <AccordionTab header="Policy">
                          <div className={Classes.ShippingDetialHead}></div>
                        </AccordionTab>
                        <AccordionTab header="Account">
                          <div className={Classes.ShippingDetialHead}>
                            <div className={Classes.LoggedDetailsList}>
                              <Link to="/my_orders">
                                <p style={{ fontSize: "16px", color: "#000" }}>
                                  My orders
                                </p>
                              </Link>
                              <IoIosArrowForward style={{ color: "#006E7F" }} />
                            </div>
                            <div className={Classes.LoggedDetailsList}>
                              <Link to="/wish_list">
                                <p style={{ fontSize: "16px", color: "#000" }}>
                                  Wishlist
                                </p>
                              </Link>
                              <IoIosArrowForward style={{ color: "#006E7F" }} />
                            </div>
                            <div className={Classes.LoggedDetailsList}>
                              <Link to="/addaddress">
                                <p style={{ fontSize: "16px", color: "#000" }}>
                                  Add address
                                </p>
                              </Link>
                              <IoIosArrowForward style={{ color: "#006E7F" }} />
                            </div>
                            <div className={Classes.LoggedDetailsList}>
                              <Link to="/rate&review">
                                <p style={{ fontSize: "16px", color: "#000" }}>
                                  Write Review
                                </p>
                              </Link>
                              <IoIosArrowForward style={{ color: "#006E7F" }} />
                            </div>
                            <div className={Classes.LoggedDetailsList}>
                              <p style={{ fontSize: "16px", color: "#000" }}>
                                SWA Wallet
                              </p>
                              <IoIosArrowForward style={{ color: "#006E7F" }} />
                            </div>
                            <div className={Classes.LoggedDetailsList}>
                              <p style={{ fontSize: "16px", color: "#000" }}>
                                Exchange Wallet
                              </p>
                              <IoIosArrowForward style={{ color: "#006E7F" }} />
                            </div>
                          </div>
                        </AccordionTab>
                      </Accordion>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default MobileNavbar;
