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
import { CgHeart } from "react-icons/cg";
import { BsArrowLeft } from "react-icons/bs";
import { GoSearch } from "react-icons/go";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import * as Urls from "../../Urls";

const MobileNavbar = () => {
  const history = useHistory();
  const [isHamOpen, setIsHamOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [activeIndex, setActiveIndex] = useState();
  const token = localStorage.getItem("swaToken");
  const [searchShow, setSearchShow] = useState(false);
  const [suggestionList, setSuggesionList] = useState([]);
  const userName = localStorage.getItem("userName");
  const [searchKey, setSearchKey] = useState("");
  const isHomePage = window.location.pathname === "/";
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleLogOut = () => {
    localStorage.removeItem("swaToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("phoneNumber");
    handleClose();
    history.push("/");
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
    outline: "none",
  };

  const mobileStyle = {
    position: "absolute",
    // transition: "transform 0.3s ease-in-out",
    transition: "transform 15s ease-in-out", // Slow transition
    transform: open ? "translateX(0)" : "translateX(100%)",
    bgcolor: "background.paper",
    border: "none",
    boxShadow: 24,
    borderRadius: "4px",
    overflowY: "auto",
    overflowY: "auto",
    maxHeight: "100vh",
    width: "100%",
    outline: "none",
  };

  const mobileStyleLogin = {
    position: "absolute",
    top: 100,
    transition: "transform 0.3s ease-in-out",
    bgcolor: "background.paper",
    border: "none",
    boxShadow: 24,
    borderRadius: "4px",

    height: "100%",

    width: "100%",
    outline: "none",
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
  console.log("isHamOpen===>", isHamOpen);
  const moveToWishList = () => {
    if (token !== null) {
      history.push("/wish_list");
    } else {
      setShow(true);
    }
  };
  const [showSearchBar, setShowSearchBar] = useState(false);

  const searchKeyHanlder = (e) => {
    setSearchKey(e.target.value);
    if (e.target.value.length !== 0) {
      setSearchShow(true);

      axios
        .get(Urls.suggestion + e.target.value)
        .then((response1) => {
          setSuggesionList(response1.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setSearchShow(false);
    }
  };
  const searchTitleHandler = (setItem) => {
    if (setItem.type === "category") {
      if (history.location.pathname.slice(0, 12) === "/new_arrivel") {
        window.location.href =
          "https://swaecomnew.zinfog.in/category_search/" + setItem.id;
      } else {
        history.push({
          pathname: "/new_arrivel",
          state: { data: setItem.id },
        });
      }
    } else if (setItem.type === "product") {
      axios
        .get(Urls.productDet + setItem.id)
        .then((response1) => {
          const selData = {
            product_id: setItem.id,
            colour_id: response1.data.results.data.color_id,
            is_on_discount: response1.data.results.data.is_on_discount,
            product_name: response1.data.results.data.product_name,
            sku: response1.data.results.data.sku,
            thumbnail_image: response1.data.results.data.thumbnail_image,
            total_price_final: response1.data.results.data.total_price_final,
            discounted_final_price: response1.data.results.data.discount_price,
            wishlist_id: response1.data.results.data.wishlist_id,
          };
          if (history.location.pathname.slice(0, 10) === "/products/") {
            window.location.href =
              "https://swaecomnew.zinfog.in/products/" +
              setItem.id +
              "/" +
              response1.data.results.data.color_id +
              "/" +
              response1.data.results.data.product_name;
          } else {
            history.push({
              pathname:
                "/products/" +
                setItem.id +
                "/" +
                response1.data.results.data.color_id +
                "/" +
                response1.data.results.data.product_name,
              state: { data: selData },
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
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
            <div
              className={Classes.Logo}
              onClick={() => (window.location.href = "/")}
            >
              <img className={Classes.mobileLogo} src={Logo} />
            </div>
          </div>
          <div className={Classes.rightIcons}>
            {isHomePage ? (
              <div>
                <img src={indiaimg} />
              </div>
            ) : (
              <div>
                <GoSearch style={{ color: "#fff", fontSize: "25px" }} />
              </div>
            )}
            <div>
              <CgHeart
                className={Classes.Icon}
                color="#FFFFFF"
                size={25}
                onClick={moveToWishList}
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
        {/* {isHamOpen ? (
          <>
            <div className={Classes.SlideButto}>
              <LoginModal open={true} />
            </div>
          </>
        ) : (
          <></>
        )} */}
      </div>
      <Modal
        // open={props.open}
        open={show}
        // onClose={props.handleClose}
        onClose={() => setShow(false)}
      >
        <Box sx={isMobileView && mobileStyleLogin}>
          <Typography>
            <LoginToggle onClose={() => setShow(false)} />
          </Typography>
        </Box>
      </Modal>

      <Modal
        // open={props.open}
        open={open}
        // onClose={props.handleClose}
        onClose={handleClose}
      >
        <Box
          className={`mobile-modal ${open ? "open" : ""}`}
          sx={isMobileView ? mobileStyle : style}
        >
          <Typography>
            <div className={Classes.ParentMobSection}>
              <div className={Classes.MobMainHead}>
                <div className={Classes.MobLeftSection}>
                  <img src={userimg} />
                  {userName ? (
                    <p
                      style={{
                        color: "#fff",
                        fontFamily: "gilroyNormal !important;",
                      }}
                    >
                      {userName}
                    </p>
                  ) : (
                    <div className={Classes.MobLog_Signup}>
                      <p
                        onClick={() => {
                          setOpen(false);
                          setShow(true);
                        }}
                      >
                        Login
                      </p>
                      <p className={Classes.BorderLineMob}></p>
                      <p
                        onClick={() => {
                          setOpen(false);
                          setShow(true);
                        }}
                      >
                        Sign up
                      </p>
                    </div>
                  )}
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
                        <AccordionTab header="Category">
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
                        {userName && (
                          <AccordionTab header="Account">
                            <div className={Classes.ShippingDetialHead}>
                              <div className={Classes.LoggedDetailsList}>
                                <Link to="/my_orders">
                                  <p
                                    style={{ fontSize: "16px", color: "#000" }}
                                  >
                                    My orders
                                  </p>
                                </Link>
                                <IoIosArrowForward
                                  style={{ color: "#006E7F" }}
                                />
                              </div>
                              <div className={Classes.LoggedDetailsList}>
                                <Link to="/wish_list">
                                  <p
                                    style={{ fontSize: "16px", color: "#000" }}
                                  >
                                    Wishlist
                                  </p>
                                </Link>
                                <IoIosArrowForward
                                  style={{ color: "#006E7F" }}
                                />
                              </div>
                              <div className={Classes.LoggedDetailsList}>
                                <Link to="/addaddress">
                                  <p
                                    style={{ fontSize: "16px", color: "#000" }}
                                  >
                                    Add address
                                  </p>
                                </Link>
                                <IoIosArrowForward
                                  style={{ color: "#006E7F" }}
                                />
                              </div>
                              <div className={Classes.LoggedDetailsList}>
                                <Link to="/rate&review">
                                  <p
                                    style={{ fontSize: "16px", color: "#000" }}
                                  >
                                    Write Review
                                  </p>
                                </Link>
                                <IoIosArrowForward
                                  style={{ color: "#006E7F" }}
                                />
                              </div>
                              <div className={Classes.LoggedDetailsList}>
                                <p style={{ fontSize: "16px", color: "#000" }}>
                                  SWA Wallet
                                </p>
                                <IoIosArrowForward
                                  style={{ color: "#006E7F" }}
                                />
                              </div>
                              <div className={Classes.LoggedDetailsList}>
                                <p style={{ fontSize: "16px", color: "#000" }}>
                                  Exchange Wallet
                                </p>
                                <IoIosArrowForward
                                  style={{ color: "#006E7F" }}
                                />
                              </div>
                            </div>
                          </AccordionTab>
                        )}

                        <AccordionTab
                          header="Log Out"
                          onClick={handleLogOut}
                        ></AccordionTab>
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
