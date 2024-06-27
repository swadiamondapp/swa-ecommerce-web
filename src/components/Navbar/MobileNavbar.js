import React, { useState, useEffect, useRef } from "react";
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
import USA from "../../Assets/flagUsa.svg";
import { FaPen } from "react-icons/fa";
import SAU from "../../Assets/flagSAU.svg";
import IND from "../../Assets/flagIND.svg";
import UAE from "../../Assets/flagUAE.svg";
import CheckDelivery from "../CheckDelivery/CheckDelivery";

const MobileNavbar = (props) => {
  const history = useHistory();
  const [isHamOpen, setIsHamOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [activeIndex, setActiveIndex] = useState();
  const token = localStorage.getItem("swaToken");
  const [searchShow, setSearchShow] = useState(false);
  const userDetailsRef = useRef(null);
  const [suggestionList, setSuggesionList] = useState([]);
  const userName = localStorage.getItem("userName");
  const [searchKey, setSearchKey] = useState("");
  const [isSignpuMobileOpen, setIsSignpuMobileOpen] = useState(false);
  const [catgSet, setCatgSet] = useState([]);
  const [category, setCategory] = useState([]);
  const [tags, setTags] = useState([]);
  const [openDropDown, setOpenDropDown] = useState(false);
  const nameRef = useRef(null);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const dropdownRef = useRef(null);
  const [countryData, setCountryData] = useState([]);
  const flag = localStorage.getItem("defaultCountryFlag");
  const CountryIds = localStorage.getItem("id");
  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState("");
  const pincode = localStorage.getItem("pincode");

  console.log("catgSet", text);

  const isHomePage = window.location.pathname === "/";
  const mobileSearchBarHide = !isHomePage
    ? Classes.hideSearchBar
    : Classes.showSearchBar;
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

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
  const toggleSearchBar = () => {
    // setShowSearchBar(!showSearchBar);
    props.setIsHome(!props.isHome);
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
  const searchTitleHandler = (setItem) => {
    if (setItem.type === "category") {
      if (history.location.pathname.slice(0, 12) === "/new_arrivel") {
        window.location.href = "https://swa.co/category_search/" + setItem.id;
      } else {
        history.push({
          pathname: "/new_arrivel",
          state: { data: setItem.id },
        });
      }
    } else if (setItem.type === "product") {
      axios
        .get(
          `${Urls.productDet + setItem.id}&country=${props.selectedCountry.id}`
        )
        .then((response1) => {
          const selData = {
            product_id: setItem.id,
            colour_id: response1.data.results.data.color_id,
            is_on_discount: response1.data.results.data.is_on_discount,
            product_name: response1.data.results.data.product_name,
            sku: response1.data.results.data.sku,
            thumbnail_image: response1.data.results.data.thumbnail_image,
            country_total_price:
              response1.data.results.data.country_total_price,
            country_discount_price: response1.data.results.data.discount_price,
            wishlist_id: response1.data.results.data.wishlist_id,
          };
          if (history.location.pathname.slice(0, 10) === "/products/") {
            window.location.href =
              "https://swa.co/products/" +
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
  const catSelHandler = (id) => {
    if (history.location.pathname !== "/new_arrivel") {
      history.push({ pathname: "/new_arrivel", state: { data: id } });
    }
  };
  const tagSelHandler = (selItem) => {
    if (history.location.pathname.slice(0, 12) === "/new_arrivel") {
      window.location.href = "https://swa.co/tag_search/" + selItem.id;
    } else {
      history.push({
        pathname: "/new_arrivel",
        state: {
          octnId: selItem.id,
          data: "occation",
          product_category: selItem.name,
        },
      });
    }
  };
  // useEffect(() => {
  //   axios
  //     .get(Urls.home)
  //     .then((response1) => {
  //       setCatgSet(response1.data.results.data.categories);
  //       setCategory(response1.data.results.data.categories);

  //       console.log(
  //         "response=======>?",
  //         response1.data.results.data.categories
  //       );
  //       setTags(response1.data.results.data.tags);
  //       console.log("tags...?", response1.data.results.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);
  const countries = [
    { image: IND, text: "IND" },
    { image: SAU, text: "SAU" },
    { image: UAE, text: "UAE" },
    { image: USA, text: "USA" },
  ];
  useEffect(() => {
    if (props.selectedCountry) {
      // Make the API request with the selected country ID as a parameter
      axios
        .get(`${Urls.home}?country=${props.selectedCountry.id}`)
        .then((response) => {
          setCatgSet(response.data.results.data.categories);
          setCategory(response.data.results.data.categories);
          console.log("Categories:", response.data.results.data.categories);
          setTags(response.data.results.data.tags);
          console.log("Tags:", response.data.results.data.tags);
        })
        .catch((error) => {
          console.error("Error fetching home data:", error);
        });
    }
  }, [props.selectedCountry]);

  const moveTocart = () => {
    if (token !== null) {
      history.push("/cart");
      // Handle cart click action
    } else {
      setShow(true); // Open login modal if user is not logged in
    }
  };

  const handleSignupClick = () => {
    setOpen(false);
    setShow(true);
    setIsSignpuMobileOpen(true);
  };
  const cattSelHandler = (setItem) => {
    if (history.location.pathname.slice(0, 12) === "/new_arrivel") {
      window.location.href = "https://swa.co/category_search/" + setItem.id;
    } else {
      history.push({
        pathname: "/new_arrivel",
        state: { data: setItem.id, product_category: setItem.name },
      });
    }
  };
  const handleOpenDropDown = () => {
    setOpenDropDown((prev) => !prev);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(Urls.getCountryFlags);

        setCountryData(response.data.results.data);

        // Extracting the ID of India
        const indiaData = response.data.results.data.find(
          (country) => country.country_name === "India"
        );
        if (!CountryIds && !flag) {
          props.setSelectedCountry({
            ...props.selectedCountry,
            flag_image: indiaData.flag_image,
            id: indiaData.id,
            country_name: indiaData.country_name,
          });
          localStorage.setItem("flag_image", indiaData.flag_image);
          localStorage.setItem("id", indiaData.id);
          localStorage.setItem("country_name", indiaData.country_name);
        }
        console.log("indiaData--->", indiaData);
        const defaultCountryID = localStorage.getItem("id");
        const defaultCountryFlag = localStorage.getItem("flag_image");
        if (defaultCountryID && defaultCountryFlag) {
          // Find the default country from the data using the ID
          const defaultCountry = countryData.find(
            (country) => country.id === parseInt(defaultCountryID)
          );
          if (defaultCountry) {
            props.setSelectedCountry(defaultCountry);
          }
        }
      } catch (error) {
        console.error("Error fetching country details:", error);
      }
    };

    fetchData();
  }, []);
  const handleCountrySelect = (country) => {
    props.setSelectedCountry(country);
    setOpenDropDown(true);

    localStorage.setItem("id", country.id);
    localStorage.setItem("flag_image", country.flag_image);
    localStorage.setItem("country_name", country.country_name);
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
                alt="menuimg"
                className={Classes.hamMenu}
              />
            </div>
            {/* {isHomePage && (
              <div
                className={Classes.Logo}
                onClick={() => (window.location.href = "/")}
              >
                <img className={Classes.mobileLogo} src={Logo} />
              </div>
            )} */}
            <div
              className={Classes.Logo}
              onClick={() => (window.location.href = "/")}
            >
              <img className={Classes.mobileLogo} src={Logo} alt="Logo" />
            </div>

            <div>
              <div
                style={{
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  top: "5px",
                }}
                className={`${Classes.DeliveryPin} ${Classes.headerElement}`}
                // onClick={handleShowModal}
              >
                <span
                  style={{ fontSize: "12px", color: "#fff" }}
                  className={Classes.checkDeliveryTitle}
                >
                  {/* CHECK DELIVERY */}
                </span>{" "}
                {/* {pincode ? null : (
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
                )} */}
                {/* {pincode && (
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
                )} */}
              </div>
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
                {/* <img src={indiaimg} /> */}
                <div
                  style={{ cursor: "pointer" }}
                  className={Classes.CountryFlags}
                  // onClick={handleOpenDropDown}
                  ref={nameRef}
                >
                  <div className={Classes.headerElement}>
                    <img
                      src={
                        props &&
                        props.selectedCountry &&
                        props.selectedCountry.flag_image
                      }
                      alt="Selected flag"
                      className={Classes.selectedImage}
                    />
                  </div>
                  {/* {openDropDown && (
                    <div className={Classes.CountryDropDowns} ref={dropdownRef}>
                      {countryData.map((country, index) => (
                        <div className={Classes.CountryContainer} key={index}>
                          <div
                            className={Classes.contryelements}
                            onClick={() => handleCountrySelect(country)}
                          >
                            <div>
                              <img
                                src={country.flag_image}
                                alt={country.id}
                                className={Classes.dropDownImages}
                              />
                            </div>
                            <div>
                              <span>
                                {country.country_name === "United Arab Emirates"
                                  ? "UAE"
                                  : country.country_name === "Saudi Arabia"
                                  ? "KSA"
                                  : country.country_name === "India"
                                  ? "IND"
                                  : country.country_name === "United States"
                                  ? "USA"
                                  : country.country_name}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )} */}
                </div>
              </div>
            ) : (
              <div onClick={() => props.setIsHome(!props.isHome)}>
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
          {/* {showSearchBar && (
            <div className={Classes.ParentSearchBar}>
              <div>
                <BsArrowLeft
                  className={Classes.Arrowline32}
                  onClick={toggleSearchBar}
                />
              </div>
              <div className={Classes.MobParentSearchBars}>
                <input
                  placeholder="Search your orders"
                  value={searchKey}
                  onChange={searchKeyHanlder}
                />
                {searchKey.length === 0 && (
                  <>
                    <GoSearch className={Classes.Gosearch1} />
                    <IoMdClose
                      className={Classes.Closesearch1}
                      onClick={toggleSearchBar}
                    />
                  </>
                )}
              </div>
            </div>
          )}
          <div
            className={Classes.searchListCont2}
            style={{ display: searchShow ? "block" : "none" }}
          >
            {suggestionList.length !== 0 ? (
              suggestionList.map((item, index) => {
                return (
                  <p
                    className={Classes.SearchItem}
                    key={index}
                    onClick={() => searchTitleHandler(item)}
                  >
                    {item.name}
                  </p>
                );
              })
            ) : (
              <p className={Classes.NoResult}>No Results Found</p>
            )}
          </div> */}
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
            <LoginToggle
              loginText={text}
              onClose={() => setShow(false)}
              isSignpuMobile={isSignpuMobileOpen}
              setShowSuccessModal={props.setShowSuccessModal}
            />
          </Typography>
        </Box>
      </Modal>
      <div className={Classes.yto}>
        <Modal
          open={open}
          onClose={handleClose}
          className={open ? Classes.slideRight : ""}
        >
          <Box sx={isMobileView ? mobileStyle : style}>
            <Typography>
              <div className={Classes.ParentMobSection}>
                <div className={Classes.MobMainHead}>
                  <div className={Classes.MobLeftSection}>
                    <img src={userimg} alt="userimg" />
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
                              {category.map((category, index) => (
                                <div
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
                              {tags.map((item, index) => {
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
                            onClick={() => history.push("/privacy_policy")}
                          >
                            <div className={Classes.ShippingDetialHead}></div>
                          </AccordionTab>

                          {userName && (
                            <AccordionTab header="Account">
                              <div className={Classes.ShippingDetialHead}>
                                <Link to="/profile" onClick={handleClose}>
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
                                <Link to="/my_orders" onClick={handleClose}>
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
                                <Link to="/wish_list" onClick={handleClose}>
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
                                <Link to="/addaddress" onClick={handleClose}>
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
                                <Link to="/rate&review" onClick={handleClose}>
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
                                <Link to="/swaWallet" onClick={handleClose}>
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
                                <Link to="/swaExchange" onClick={handleClose}>
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
                        {userName && (
                          <div
                            style={{ marginBottom: "100px" }}
                            onClick={handleLogOut}
                          >
                            <div className={Classes.LoggedDetailsList}>
                              <Link to="/my_orders">
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
            </Typography>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default MobileNavbar;
