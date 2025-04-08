"use client";
import React, { useState, useEffect, useRef } from "react";
// import Logo from "../../Assets/moblogo.png";
// import Logo from "../../../public/Assets/moblogo.svg";
// import Hamburger from "hamburger-react";
// import { FiBell } from "react-icons/fi";
import { IoCartOutline } from "react-icons/io5";
import LoginToggle from "./LoginToggle";
import Classes from "./MobileNav.module.css";
// import { loginHandler } from "../LoginModal/LoginModal";
// import menuimg from "../../Assets/mobmenu.png";
import Box from "@mui/material/Box";
// import div from "@mui/material/div";
import Modal from "@mui/material/Modal";
import { IoMdClose } from "react-icons/io";
// import userimg from "../../Assets/user.png";
import { Accordion, AccordionTab } from "primereact/accordion";
// import "../../Pages/OrderHistoryPage2/OrderHistoryPage2.module.css";
// import ringimg from "../../Assets/ladiesring.png";
// import ringimg2 from "../../Assets/pendant1.png";
import { HiPlus } from "react-icons/hi";
// import indiaimg from "../../Assets/india.png";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import { CgHeart } from "react-icons/cg";
import { BsArrowLeft } from "react-icons/bs";
import { GoSearch } from "react-icons/go";
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import * as Urls from "@/utils/urls";
// import USA from "../../../public/Assets/flagUsa.svg";
import { FaPen } from "react-icons/fa";
// import SAU from "../../../public/Assets/flagSAU.svg";
// import IND from "../../../public/Assets/flagIND.svg";
// import UAE from "../../../public/Assets/flagUAE.svg";
// import backBtn from "../../../public/Assets/backBtn.png";
import CheckDelivery from "@/components/check-delivery/check-delivery";
// import { useLocation } from "react-router-dom/cjs/react-router-dom";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCountries } from "@/hooks/useCountries";
import { useAuth } from "@/providers/auth-provider";
import { useWindowResize } from "@/hooks/useWindowResize";
import { useData } from "@/providers/data-provider";
import { useTrial } from "@/providers/trial-provider";

const MobileNavbar = (props) => {
  const router = useRouter();
  const [isHamOpen, setIsHamOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [activeIndex, setActiveIndex] = useState();
  const [searchShow, setSearchShow] = useState(false);
  const userDetailsRef = useRef(null);
  const [suggestionList, setSuggesionList] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [isSignpuMobileOpen, setIsSignpuMobileOpen] = useState(false);
  const [openDropDown, setOpenDropDown] = useState(false);
  const nameRef = useRef(null);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const dropdownRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState("");
  const [pincode, setPincode] = useState("");
  const [flag, setFlag] = useState("");
  const [countryId, setCountryId] = useState("2");
  // const [userName, setUserName] = useState("");
  const { countryData } = useCountries();
  const { token, user, logout } = useAuth();
  const { categories, tags } = useData();
  const { setOctnState } = useTrial();
  useEffect(() => {
    // const userName = localStorage.getItem("userName");
    const flag = localStorage.getItem("flag_image");
    const countryId = localStorage.getItem("id");
    // setUserName(userName);
    setFlag(flag);
    setCountryId(countryId);
  }, []);

  const handleBackClick = () => {
    router.back();
  };

  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogOut = () => {
    handleClose();
    logout();
    router.push("/");
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

  const { isMobile } = useWindowResize();
  const moveToWishList = () => {
    if (token !== null) {
      router.push("/wish-list");
    } else {
      setShow(true);
    }
  };

  const isCartPage = pathname === "/shoping/cart";

  const handleClickOutside = (event) => {
    if (
      userDetailsRef.current &&
      !userDetailsRef.current.contains(event.target)
    ) {
      setShowUserDetails(false);
    }
  };
  const handleLogedUserClick = () => {
    setShowUserDetails(!showUserDetails);
  };

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
  const tagSelHandler = (selItem) => {
    router.push(`/${selItem.name.toLowerCase()}`);
  };

  const moveTocart = () => {
    if (token !== null) {
      router.push("/shoping/cart");
    } else {
      setShow(true);
    }
  };

  const handleSignupClick = () => {
    setOpen(false);
    setShow(true);
    setIsSignpuMobileOpen(true);
  };

  const cattSelHandler = (setItem) => {
    router.push(`/${setItem.name.toLowerCase().replace(/\s+/g, "-")}`);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        openDropDown &&
        !dropdownRef.current.contains(event.target) &&
        !nameRef.current.contains(event.target)
      ) {
        setOpenDropDown(false);
      }
      if (
        userDetailsRef.current &&
        !userDetailsRef.current.contains(event.target)
      ) {
        setShowUserDetails(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [openDropDown]);

  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const toggleCart = (cartType) => {
    props.setActiveCart(cartType);
  };

  return (
    <div className={Classes.NavContainer}>
      <div className={Classes.Navbar}>
        <div className={Classes.header}>
          {isCartPage && (
            <div
              style={{
                width: "100%",
                display: "flex",
                gap: "34px",
                alignItems: "center",
              }}
            >
              <Image
                onClick={handleBackClick}
                src={"/Assets/backBtn.png"}
                alt="move"
                width="24"
                height="24"
              />
              <div>
                <div className={Classes.Parentcartitems}>
                  <div
                    className={
                      props.activeCart === "shopping"
                        ? Classes.ActiveCarthead
                        : ""
                    }
                    onClick={() => toggleCart("shopping")}
                  >
                    Shopping Cart
                  </div>
                  <div
                    className={
                      props.activeCart === "trial" ? Classes.ActiveCarthead : ""
                    }
                    onClick={() => toggleCart("trial")}
                  >
                    Trial Cart
                  </div>
                </div>
              </div>
            </div>
          )}
          {!isCartPage && (
            <>
              <div className={Classes.NavElements}>
                <div className={Classes.LeftIcons}>
                  <Image
                    onClick={handleOpen}
                    src={"/Assets/mobmenu.png"}
                    alt="menuimg"
                    className={Classes.hamMenu}
                    width="30"
                    height="20"
                  />
                </div>
                {pathname !== "/new-arrivals" && (
                  <div
                    className={Classes.Logo}
                    onClick={() => router.push("/")}
                  >
                    <Image
                      className={Classes.mobileLogo}
                      src={"/Assets/swaLogo.png"}
                      alt="Logo"
                      width="42"
                      height="30"
                    />
                  </div>
                )}

                <div>
                  {pathname !== "/" && !pathname.startsWith("/products/") && (
                    <div
                      style={{
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                        position: "relative",
                        top: "5px",
                      }}
                      className={`${Classes.DeliveryPin} ${Classes.headerElement}`}
                    >
                      <span
                        style={{ fontSize: "12px", color: "#fff" }}
                        className={Classes.checkDeliveryTitle}
                      >
                        CHECK DELIVERY
                      </span>
                      {pincode ? null : (
                        <span
                          onClick={handleShowModal}
                          className={Classes.EnterPinTitle}
                          style={{
                            cursor: "pointer",
                            color: "#00e5ed",
                            fontSize: "12px",
                          }}
                        >
                          Enter PinCode
                        </span>
                      )}
                      {pincode && (
                        <span
                          className={Classes.EnterPinTitle}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            fontSize: "14px",
                            color: "#00e5ed",
                          }}
                        >
                          {pincode}{" "}
                          <FaPen
                            style={{ fontSize: "12px" }}
                            onClick={handleShowModal}
                          />
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <CheckDelivery
                  show={showModal}
                  handleClose={handleCloseModal}
                  handleShow={handleShowModal}
                />
              </div>
              <div className={Classes.rightIcons}>
                {isHomePage ? (
                  <div>
                    <div
                      style={{ cursor: "pointer" }}
                      className={Classes.CountryFlags}
                      ref={nameRef}
                    >
                      <div className={Classes.headerElement}>
                        {props.selectedCountry && (
                          <img
                            src={
                              props &&
                              props.selectedCountry &&
                              props.selectedCountry.flag_image
                            }
                            alt="Selected flag"
                            className={Classes.selectedImage}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div onClick={() => props.setShowSearchBar(!props.showSearchBar)}>
                    <GoSearch style={{ color: "#fff", fontSize: "25px" }} />
                  </div>
                )}
                <div>
                  <CgHeart
                    className={Classes.Icon}
                    color="#FFFFFF"
                    size={25}
                    onClick={() => {
                      moveToWishList();
                      setText("Please Login");
                    }}
                  />
                </div>
                <div>
                  <IoCartOutline
                    className={`${Classes.Icon} ${Classes.AddToCart}`}
                    color="#FFFFFF"
                    size={25}
                    onClick={() => {
                      moveTocart();
                      setText("Please Login");
                    }}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <Modal open={show} onClose={() => setShow(false)}>
        <Box sx={isMobile && mobileStyleLogin}>
          <div>
            <LoginToggle
              loginText={text}
              onClose={() => setShow(false)}
              isSignpuMobile={isSignpuMobileOpen}
              setShowSuccessModal={props.setShowSuccessModal}
              setText={props.setText}
            />
          </div>
        </Box>
      </Modal>
      <div className={Classes.yto}>
        <Modal
          open={open}
          onClose={handleClose}
          className={open ? Classes.slideRight : ""}
        >
          <Box sx={isMobile ? mobileStyle : style}>
            <div>
              <div className={Classes.ParentMobSection}>
                <div className={Classes.MobMainHead}>
                  <div className={Classes.MobLeftSection}>
                    <Image
                      src={`/Assets/user.png`}
                      alt="userimg"
                      width="40"
                      height="40"
                    />
                    {user ? (
                      <p className="text-white font-gilroy">{user.userName}</p>
                    ) : (
                      <div className={Classes.MobLog_Signup}>
                        <p
                          onClick={() => {
                            setOpen(false);
                            setShow(true);
                            setIsSignpuMobileOpen(false);
                            setText("Welcome Back");
                          }}
                        >
                          Login
                        </p>
                        <p className={Classes.BorderLineMob}></p>
                        <p onClick={handleSignupClick}>Sign up</p>
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
                      <div
                        className={`shipment1 ${Classes.dmm}`}
                        style={{ marginBottom: "150px" }}
                      >
                        <Accordion
                          multiple
                          activeIndex={activeIndex}
                          onTabChange={(e) => setActiveIndex(e.index)}
                        >
                          <AccordionTab header="Category">
                            <div className={Classes.ShippingDetialHead}>
                              {categories?.map((category, index) => (
                                <div
                                  key={index}
                                  className={Classes.ParentCards1}
                                  onClick={() => cattSelHandler(category)}
                                  style={{
                                    color: "#ffff",
                                    cursor: "pointer",
                                  }}
                                >
                                  <img
                                    style={{ maxWidth: "45px" }}
                                    src={category.thumbnail}
                                    alt="thumbnail"
                                  />
                                  <p>{category.name.toUpperCase()}</p>
                                </div>
                              ))}
                            </div>
                          </AccordionTab>
                          <AccordionTab header="Tags">
                            <div className={Classes.ShippingDetialHead}>
                              {tags?.map((item, index) => {
                                return (
                                  <div
                                    className={Classes.ParentCards2}
                                    key={index}
                                    onClick={() => tagSelHandler(item)}
                                  >
                                    <HiPlus />
                                    <p>{item.name}</p>
                                  </div>
                                );
                              })}
                            </div>
                          </AccordionTab>
                          <AccordionTab
                            header="Policy"
                            onClick={() => router.push("/privacy/policy")}
                          >
                            <div className={Classes.ShippingDetialHead}></div>
                          </AccordionTab>

                          {user && (
                            <AccordionTab header="Account">
                              <div className={Classes.ShippingDetialHead}>
                                <Link href="/my/profile" onClick={handleClose}>
                                  <div className={Classes.LoggedDetailsList}>
                                    <p
                                      style={{
                                        fontSize: "16px",
                                        color: "#000",
                                      }}
                                    >
                                      Profile
                                    </p>

                                    <IoIosArrowForward
                                      style={{
                                        color: "#006E7F",
                                        fontSize: "16px",
                                      }}
                                    />
                                  </div>
                                </Link>
                                <Link href="/my/orders" onClick={handleClose}>
                                  <div className={Classes.LoggedDetailsList}>
                                    <p
                                      style={{
                                        fontSize: "16px",
                                        color: "#000",
                                      }}
                                    >
                                      My orders
                                    </p>

                                    <IoIosArrowForward
                                      style={{
                                        color: "#006E7F",
                                        fontSize: "16px",
                                      }}
                                    />
                                  </div>
                                </Link>
                                <Link href="/wish-list" onClick={handleClose}>
                                  <div className={Classes.LoggedDetailsList}>
                                    <p
                                      style={{
                                        fontSize: "16px",
                                        color: "#000",
                                      }}
                                    >
                                      Wishlist
                                    </p>

                                    <IoIosArrowForward
                                      style={{
                                        color: "#006E7F",
                                        fontSize: "16px",
                                      }}
                                    />
                                  </div>
                                </Link>
                                <Link href="/add/address" onClick={handleClose}>
                                  <div className={Classes.LoggedDetailsList}>
                                    <p
                                      style={{
                                        fontSize: "16px",
                                        color: "#000",
                                      }}
                                    >
                                      Add address
                                    </p>

                                    <IoIosArrowForward
                                      style={{
                                        color: "#006E7F",
                                        fontSize: "16px",
                                      }}
                                    />
                                  </div>
                                </Link>
                                <Link
                                  href="/rate&/review"
                                  onClick={handleClose}
                                >
                                  <div className={Classes.LoggedDetailsList}>
                                    <p
                                      style={{
                                        fontSize: "16px",
                                        color: "#000",
                                      }}
                                    >
                                      Write Review
                                    </p>

                                    <IoIosArrowForward
                                      style={{
                                        color: "#006E7F",
                                        fontSize: "16px",
                                      }}
                                    />
                                  </div>
                                </Link>
                                <Link href="/swa/wallet" onClick={handleClose}>
                                  <div className={Classes.LoggedDetailsList}>
                                    <p
                                      style={{
                                        fontSize: "16px",
                                        color: "#000",
                                      }}
                                    >
                                      SWA Wallet
                                    </p>

                                    <IoIosArrowForward
                                      style={{
                                        color: "#006E7F",
                                        fontSize: "16px",
                                      }}
                                    />
                                  </div>
                                </Link>
                                <Link
                                  href="/swa/exchange"
                                  onClick={handleClose}
                                >
                                  <div className={Classes.LoggedDetailsList}>
                                    <p
                                      style={{
                                        fontSize: "16px",
                                        color: "#000",
                                      }}
                                    >
                                      Exchange Wallet
                                    </p>

                                    <IoIosArrowForward
                                      style={{
                                        color: "#006E7F",
                                        fontSize: "16px",
                                      }}
                                    />
                                  </div>
                                </Link>
                              </div>
                            </AccordionTab>
                          )}
                        </Accordion>
                        {token && (
                          <div
                            style={{ marginBottom: "100px" }}
                            onClick={handleLogOut}
                          >
                            <div className={Classes.LoggedDetailsList}>
                              <Link href="/">
                                <p
                                  style={{
                                    fontSize: "16px",
                                    color: "#000",
                                    marginLeft: "-3px",
                                  }}
                                >
                                  Log out
                                </p>
                              </Link>
                              <IoIosArrowForward style={{ color: "#006E7F" }} />
                            </div>
                          </div>
                        )}

                        <Accordion>
                          <AccordionTab className="last-accordion-tab"></AccordionTab>
                        </Accordion>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default MobileNavbar;
