import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import TopHeader from "./TopHeader";
import Classes from "./MainHead.module.css";
import MainHead from "./MainHead";
import { BsPerson, BsEye, BsEyeSlash } from "react-icons/bs";
import LoginSuccessModal from "../LoginSuccesModal/LoginSuccessModal";
import { BsSearch } from "react-icons/bs";
import { CgHeart } from "react-icons/cg";
import { FiBell } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import LoginModal from "../LoginModal/LoginModal";
import axios from "axios";
import * as Urls from "../../Urls";
import { Carousel } from "antd";
import { Link } from "react-router-dom";
import CheckDelivery from "../CheckDelivery/CheckDelivery";
import indiaimg from "../../Assets/india.png";
import logedimg from "../../Assets/loged.png";
import { IoIosArrowDown } from "react-icons/io";
import USA from "../../Assets/flagUsa.svg";
import SAU from "../../Assets/flagSAU.svg";
import IND from "../../Assets/flagIND.svg";
import UAE from "../../Assets/flagUAE.svg";
import { MdEdit } from "react-icons/md";
import { FaPen } from "react-icons/fa";

const Header = (props) => {
  const flag = localStorage.getItem("flag_image");
  const CountryIds = localStorage.getItem("id");
  const Contryname = localStorage.getItem("country_name");
  const location = useLocation();
  const [isHome, setIsHome] = useState(
    location.pathname === "/" ? true : false
  );
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [catgSet, setCatgSet] = useState([]);
  const [category, setCategory] = useState([]);
  const [tags, setTags] = useState([]);
  const token = localStorage.getItem("swaToken");
  const [searchShow, setSearchShow] = useState(false);
  const [suggestionList, setSuggesionList] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [isSticky, setIsSticky] = useState(false);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [loginText, setLoginText] = useState("");
  const [countryData, setCountryData] = useState([]);
  const dropdownRef = useRef(null);
  const nameRef = useRef(null);
  const isHomePage = window.location.pathname === "/";
  const mobileSearchBarClass = isHomePage
    ? Classes.MobileSearchBar
    : Classes.MobileSearchbarOthers;
  const isCheckoutPage = window.location.pathname === "/checkout";
  const isCartPage = window.location.pathname === "/cart";
  const userName = localStorage.getItem("userName");
  const [showModal, setShowModal] = useState(false);
  const pincode = localStorage.getItem("pincode");
  const [country, setCountry] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showUserDetails, setShowUserDetails] = useState(false);
  const userDetailsRef = useRef(null);
  console.log("countryData", countryData);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

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

  const history = useHistory();
  useEffect(() => {
    if (props.lognAct) {
      setShow(true);
    }
  }, [props.lognAct]);
  // useEffect(() => {
  //   axios
  //     .get(`${Urls.home}?country=${country.id}`)
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

  const moveToWishList = () => {
    if (token !== null) {
      history.push("/wish_list");
    } else {
      setShow(true);
    }
  };

  const catSelHandler = (setItem) => {
    // if (history.location.pathname !== "/new_arrivel") {
    //   history.push({ pathname: "/new_arrivel", state: { data: id } });
    // }

    if (history.location.pathname.slice(0, 12) === "/new_arrivel") {
      window.location.href = "https://www.swa.co/category_search/" + setItem.id;
    } else {
      history.push({
        pathname: "/new_arrivel",
        state: { data: setItem.id, product_category: setItem.name },
      });
    }
  };
  // const cattSelHandler = (setItem) => {
  //   if (history.location.pathname.slice(0, 12) === "/new_arrivel") {
  //     window.location.href =
  //       "http://swaecomnew.zinfog.in/category_search/" + setItem.id;
  //   } else {
  //     history.push({
  //       pathname: "/new_arrivel",
  //       state: { data: setItem.id, product_category: setItem.name },
  //     });
  //   }
  // };
  // const cattSelHandler = (setItem) => {
  //   history.push({
  //     pathname: "/new_arrivel",
  //     state: { data: setItem.id, product_category: setItem.name },
  //   });
  // };
  const cattSelHandler = (setItem) => {
    history.push({
      pathname: `/${setItem.name}`,
      state: { data: setItem.id, product_category: setItem.name },
    });
  };

  const tagSelHandler = (selItem) => {
    if (history.location.pathname.slice(0, 12) === "/new_arrivel") {
      window.location.href = "https://www.swa.co/tag_search/" + selItem.id;
    } else {
      history.push({
        // pathname: "/new_arrivel",
        pathname: `/${selItem.name}`,
        state: {
          octnId: selItem.id,
          data: "occation",
          product_category: selItem.name,
        },
      });
    }
  };
  const moveToOrderHistory = () => {
    history.push("/track_order");
  };
  const moveToOrderHistory2 = () => {
    history.push("/my_orders");
  };
  const moveTocart = () => {
    if (token !== null) {
      history.push("/cart");
    } else {
      setShow(true);
    }
  };
  const setHomepageHandler = () => {
    history.push("/");
  };
  const cateclose = () => {
    props.catBuyclose();
    setShow(false);
  };
  const [open, setOpen] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const searchKeyHanlder = (e) => {
    setSearchKey(e.target.value);
    if (e.target.value.length !== 0) {
      setSearchShow(true);

      axios
        .get(
          `${Urls.suggestion + e.target.value}&country=${
            props.selectedCountry.id
          }`
        )
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
          "https://www.swa.co/category_search/" + setItem.id;
      } else {
        history.push({ pathname: "/new_arrivel", state: { data: setItem.id } });
      }
    } else if (setItem.type === "product") {
      axios
        .get(
          `${Urls.productDet + setItem.id}?country=${props.selectedCountry.id}`
        )
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
              "https://www.swa.co/products/" +
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
  const closeHanlder = () => {};

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleOpenDropDown = () => {
    setOpenDropDown((prev) => !prev);
  };

  const countries = [
    { image: IND, text: "IND" },
    { image: SAU, text: "SAU" },
    { image: UAE, text: "UAE" },
    { image: USA, text: "USA" },
  ];
  const countryFlag = localStorage.getItem("flag_image");

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(Urls.getCountryFlags);
  //       console.log("response.data.results.data", response.data.results.data);
  //       // const filteredData = response.data.results.data.filter(
  //       //   (country) => country.country_name === "United Arab Emirates"
  //       // );
  //       setCountryData(response.data.results.data);

  //       // Extracting the ID of India
  //       const indiaData = response.data.results.data.find(
  //         (country) => country.country_name === "India"
  //       );
  //       console.log(indiaData,"indiaData---")
  //       if (!CountryIds && !flag) {
  //         props.setSelectedCountry({
  //           ...props.selectedCountry,
  //           flag_image: indiaData.flag_image,
  //           id: indiaData.id,
  //           country_name: indiaData.country_name,
  //         });
  //         localStorage.setItem("flag_image", indiaData.flag_image);
  //         localStorage.setItem("id", indiaData.id);
  //         localStorage.setItem("country_name", indiaData.country_name);
  //       }
  //       console.log("indiaData--->", indiaData);
  //       const defaultCountryID = localStorage.getItem("id");
  //       const defaultCountryFlag = localStorage.getItem("flag_image");
  //       if (defaultCountryID && defaultCountryFlag) {
  //         // Find the default country from the data using the ID
  //         const defaultCountry = countryData.find(
  //             (country) => country.id === parseInt(defaultCountryID)
  //           );
  //           if (defaultCountry) {
  //               props.setSelectedCountry(defaultCountry);
  //         }
  //       }
  //       console.log("filterCountry",filterCountry);
  //       } catch (error) {
  //         console.error("Error fetching country details:", error);
  //       }
  //     };

  //     fetchData();
  //   }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(Urls.getCountryFlags);
  //       console.log("response.data.results.data", response.data.results.data);
  //       setCountryData(response.data.results.data);

  //       const geoResponse = await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=61f94c2e11f248ecac2db57308e0ceca`);
  //       const userCountryName = geoResponse.data.country_name;
  //       // const userCountryName = "Oman";
  //       console.log("User Country from IP:", userCountryName);
  //       setCountry(userCountryName);

  //       let selectedCountryData;

  //       if (userCountryName === "India" || userCountryName === "United Arab Emirates") {
  //         selectedCountryData = response.data.results.data.find(
  //           (country) => country.country_name === userCountryName
  //         );
  //       } else {
  //         selectedCountryData = response.data.results.data.find(
  //           (country) => country.country_name === "United States"
  //         );
  //       }

  //       if (selectedCountryData) {
  //         console.log("Selected Country Data:", selectedCountryData);
  //         if (!CountryIds && !flag) {
  //           props.setSelectedCountry({
  //             ...props.selectedCountry,
  //             flag_image: selectedCountryData.flag_image,
  //             id: selectedCountryData.id,
  //             country_name: selectedCountryData.country_name,
  //           });
  //           localStorage.setItem("flag_image", selectedCountryData.flag_image);
  //           localStorage.setItem("id", selectedCountryData.id);
  //           localStorage.setItem("country_name", selectedCountryData.country_name);
  //         }
  //       }

  //       const defaultCountryID = localStorage.getItem("id");
  //       const defaultCountryFlag = localStorage.getItem("flag_image");
  //       if (defaultCountryID && defaultCountryFlag) {
  //         const defaultCountry = countryData.find(
  //           (country) => country.id === parseInt(defaultCountryID)
  //         );
  //         if (defaultCountry) {
  //           props.setSelectedCountry(defaultCountry);
  //         }
  //       }

  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching country details:", error);
  //       setError("Failed to fetch country details");
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);
  const [isLoading, setIsLoading] = useState(false);
  const [pinCode, setPinCode] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(Urls.getCountryFlags);
        console.log("response.data.results.data", response.data.results.data);
        setCountryData(response.data.results.data);
        const getLocation = async () => {
          setIsLoading(true);
          navigator.geolocation.getCurrentPosition(
            async (pos) => {
              const { latitude, longitude } = pos.coords;
              let _url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
              try {
                const geoResponse = await axios.get(_url);
                const userCountryName = geoResponse.data.address.country;
                setCountry(userCountryName);

                let selectedCountryData;

                if (
                  userCountryName === "India" ||
                  userCountryName === "United Arab Emirates"
                ) {
                  selectedCountryData = response.data.results.data.find(
                    (country) => country.country_name === userCountryName
                  );
                } else {
                  selectedCountryData = response.data.results.data.find(
                    (country) => country.country_name === "United States"
                  );
                }

                // Optionally set additional state or perform other actions with selectedCountryData
                // setSelectedCountry(selectedCountryData);

                if (selectedCountryData) {
                  console.log("Selected Country Data:", selectedCountryData);
                  if (!CountryIds && !flag) {
                    props.setSelectedCountry({
                      ...props.selectedCountry,
                      flag_image: selectedCountryData.flag_image,
                      id: selectedCountryData.id,
                      country_name: selectedCountryData.country_name,
                    });
                    localStorage.setItem(
                      "flag_image",
                      selectedCountryData.flag_image
                    );
                    localStorage.setItem("id", selectedCountryData.id);
                    localStorage.setItem(
                      "country_name",
                      selectedCountryData.country_name
                    );
                  }
                }

                const defaultCountryID = localStorage.getItem("id");
                const defaultCountryFlag = localStorage.getItem("flag_image");
                if (defaultCountryID && defaultCountryFlag) {
                  const defaultCountry = countryData.find(
                    (country) => country.id === parseInt(defaultCountryID)
                  );
                  if (defaultCountry) {
                    props.setSelectedCountry(defaultCountry);
                  }
                }
              } catch (error) {
                console.log(error);
              } finally {
                setIsLoading(false);
              }
            },
            (error) => {
              console.error("Error getting geolocation:", error);
              setIsLoading(false);
            }
          );
        };

        // Call getLocation to set country based on user's location
        getLocation();
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    };

    fetchData();
  }, []);

  // console.log("country==>", country);
  // console.log("countryData", countryData);

  const handleCountrySelect = (country) => {
    debugger;
    if (!isHomePage) {
      history.push("/");
    }
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

  return (
    <div>
      {isHomePage && <TopHeader headeroffer={props.headeroffer} />}

      <MainHead
        setIsHome={setIsHome}
        isHome={isHome}
        setSelectedCountry={props.setSelectedCountry}
        selectedCountry={props.selectedCountry}
        setShowSuccessModal={setShowSuccessModal}
        activeCart={props.activeCart}
        setActiveCart={props.setActiveCart}
      >
        <div className={Classes.SearchIcons}>
          <div className={Classes.searchList}>
            {/* <label className={Classes.SearchlabelAnimate}>
              Search for <span>diamond jewellery</span>
              <span>gold jewellery</span>
              <span>platinium jewellery</span>
              <span>gemstone jewellery</span>
            </label> */}
            <div
              className="labelWrapper"
              style={{
                display: searchKey.length === 0 ? "block" : "none",
                pointerEvents: "none",
              }}
            >
              <span>diamond jewellery</span>
              <span>gold jewellery</span>
              <span>platinum jewellery</span>
              <span>gemstone jewellery</span>
            </div>
            <input
              style={{
                background: "#F8F8F8",
                borderRadius: "32px",
                position: "relative",
              }}
              className={Classes.searchbar}
              type="text"
              value={searchKey}
              onChange={searchKeyHanlder}
              placeholder="Search for "
            />
            <BsSearch
              size={22}
              className={Classes.searchIcon}
              style={{ display: searchShow ? "none" : "block" }}
            />
            {/* <AiOutlineClose size={22}  className={Classes.searchIcon} style={{display:searchShow?'block':'none',cursor:'pointer'}} /> */}
            <div className={Classes.searchListCont}>
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
            </div>
          </div>
          <div className={Classes.SearchMob}>
            <input
              type="text"
              value={searchKey}
              onChange={searchKeyHanlder}
              className={Classes.SerachLine}
            />
            <BsSearch className={Classes.Icons} color="#FFFFFF" size={18} />
          </div>

          {/* <FiBell
            className={Classes.Icon}
            color="#FFFFFF"
            size={25}
            // onClick={Notification}
          /> */}
          {/* <CheckDelivery islog={show} close={closeHanlder} /> */}
          <div className={Classes.LogList}>
            <div
              style={{ cursor: "pointer" }}
              className={`${Classes.DeliveryPin} ${Classes.headerElement}`}
              onClick={handleShowModal}
            >
              <span className={Classes.checkDeliveryTitle}>CHECK DELIVERY</span>
              {pincode ? null : (
                <span
                  onClick={handleShowModal}
                  className={Classes.EnterPinTitle}
                  style={{ cursor: "pointer" }}
                >
                  Enter PinCode
                </span>
              )}
              {pincode && (
                <span
                  className={Classes.EnterPinTitle}
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  {pincode} <FaPen onClick={handleShowModal} />
                </span>
              )}
            </div>
          </div>
          <CheckDelivery
            show={showModal}
            handleClose={handleCloseModal}
            handleShow={handleShowModal}
          />
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
            {openDropDown && (
              <div className={Classes.CountryDropDowns} ref={dropdownRef}>
                {countryData
                  .sort((a, b) =>
                    a.country_name === "India"
                      ? -1
                      : b.country_name === "India"
                      ? 1
                      : 0
                  ) // Sorts India to the top
                  .map((country, index) => (
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
            )}
          </div>

          <CgHeart
            className={`${Classes.Icon} ${Classes.headerElement}`}
            color="#FFFFFF"
            size={25}
            onClick={() => {
              moveToWishList();
              setLoginText("Please Login");
            }}
          />
          <div className={Classes.CartItemNum}>
            <IoCartOutline
              className={`${Classes.Icon} ${Classes.AddToCart} ${Classes.headerElement}`}
              color="#FFFFFF"
              size={25}
              onClick={() => {
                moveTocart();
                setLoginText("Please Login");
              }}
            />
            {userName && props.countCartItems && (
              <div className={Classes.ItemsNum}>{props.countCartItems}</div>
            )}
          </div>
          <LoginSuccessModal
            openSuccessModal={showSuccessModal}
            close={() => setShowSuccessModal(false)}
            state={showSuccessModal}
            text={text}
          />
          <LoginModal
            className={Classes.loginUser}
            isLog={show}
            handleOpenLogin={() => setShow(!show)}
            logAct={props.loginHandler}
            cartClose={cateclose}
            close={closeHanlder}
            style={{ marginTop: "0px" }}
            setLoginText={setLoginText}
            text={loginText}
            setShowSuccessModal={setShowSuccessModal}
            setText={setText}
          />
          {/* modal */}
        </div>
      </MainHead>

      {!isCartPage && (
        <div
          className={Classes.SubHeadNav}
          style={{
            position: isSticky ? "fixed" : "static",
            top: 0,
            zIndex: 1000,
            width: "100%",
          }}
        >
          <div className="container" style={{ padding: "0px" }}>
            <div className={Classes.NavLinksDesk}>
              {category.map((category, index) => (
                <div key={index}>
                  <Link
                    onClick={() => cattSelHandler(category)}
                    style={{ color: "#ffff", cursor: "pointer" }}
                  >
                    <p>{category.name.toUpperCase()}</p>
                  </Link>
                </div>
              ))}
              {tags.map((category, index) => (
                <div key={index}>
                  <Link
                    onClick={() => cattSelHandler(category)}
                    style={{ color: "#ffff", cursor: "pointer" }}
                  >
                    <p>{category.name.toUpperCase()}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div
        className={Classes.searchListCont}
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
      </div>
      {!isCheckoutPage && !isCartPage && (
        <div
          className={`${mobileSearchBarClass} ${Classes.MobileSearchbarOthers}`}
        >
          {/* {isHomePage && (
            <div className={Classes.DiwaliOffers}>
              <div className="labelWrapper2" style={{ height: "20px" }}>
                {props.headeroffer &&
                  props.headeroffer.map((item) => (
                    <>
                      <p>{item.head} 🥳</p>
                    </>
                  ))}
              </div>
            </div>
          )} */}
          {isHomePage && (
            <div className={Classes.mobCheckDelivery} onClick={handleShowModal}>
              <p>CHECK DELIVERY</p>
              {pincode ? null : (
                <p>
                  Enter pincode <MdEdit />
                </p>
              )}
              {pincode && (
                <span
                  className={Classes.EnterPinTitle}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "14px",
                    color: "#007481",
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

          {isHome && (
            <div className="container">
              <div
                style={{
                  position: "relative",
                  margin: "12px 0px",
                  marginBottom: "0px",
                }}
              >
                <div
                  className="labelWrapper"
                  style={{ display: searchKey.length === 0 ? "block" : "none" }}
                >
                  <span>diamond jewellery</span>
                  <span>gold jewellery</span>
                  <span>platinum jewellery</span>
                  <span>gemstone jewellery</span>
                </div>
                <input
                  style={{ width: "100%" }}
                  type=""
                  className={Classes.searchbar}
                  placeholder="Search for"
                  value={searchKey}
                  onChange={searchKeyHanlder}
                />
                <BsSearch
                  size={22}
                  className={Classes.searchIcon}
                  style={{ display: searchShow ? "none" : "block" }}
                />
              </div>
            </div>
          )}
        </div>
      )}
      {isHomePage && (
        <div className={Classes.CatList}>
          <div className="container" style={{ padding: "0px" }}>
            {/* <div className={Classes.Web}>
              <div>
                <Carousel
                  // autoplay
                  slidesToShow={4}
                  dots={false}
                  centerMode={true}
                  centerPadding="5px"
                  className={Classes.ResponsiveCarousel}
                  responsive={[
                    {
                      breakpoint: 1200,
                      settings: {
                        slidesToShow: 8, // Set the number of slides to display on tablets
                      },
                    },
                    {
                      breakpoint: 991,
                      settings: {
                        slidesToShow: 5, // Set the number of slides to display on tablets
                      },
                    },
                    {
                      breakpoint: 767,
                      settings: {
                        slidesToShow: 4,
                        // Set the number of slides to display on mobile devices
                      },
                    },
                  ]}
                >
                  {catgSet.map((item, index) => {
                    return (
                      <div
                        className={Classes.Offers}
                        key={index}
                        onClick={() => catSelHandler(item)}
                      >
                        <div className={Classes.OffersInner}>
                          <img
                            style={{ width: "45px", height: "45px" }}
                            className={Classes.SlideImage}
                            src={item.thumbnail}
                            alt="catg"
                          />

                          <p>{item.name.slice(0, 10)}</p>
                        </div>
                      </div>
                    );
                  })}

                  {tags.map((item, index) => {
                    return (
                      <div
                        className={Classes.Offers}
                        key={index}
                        onClick={() => tagSelHandler(item)}
                      >
                        <div className={Classes.OffersInner}>
                          <img
                            style={{ width: "45px", height: "45px" }}
                            // className={Classes.SlideImage}
                            src={item.thumbnail}
                            alt="tag"
                          />

                          <p>{item.name.slice(0, 10)}</p>
                        </div>
                      </div>
                    );
                  })}
                </Carousel>
              </div>
            </div> */}
            <div className={Classes.ParentMobSlider1}>
              <div className={Classes.MobSliderCards}>
                {catgSet.map((item, index) => {
                  return (
                    <div
                      className={Classes.Offers}
                      key={index}
                      onClick={() => catSelHandler(item)}
                    >
                      <div className={Classes.OffersInner}>
                        <img
                          style={{
                            width: "70px",
                            height: "50px",
                            borderTopLeftRadius: "5px",
                            borderTopRightRadius: "5px",
                            marginRight: "0px",
                          }}
                          className={Classes.SlideImage}
                          src={item.thumbnail}
                          alt="catg"
                        />

                        <p>{item.name.slice(0, 10).toUpperCase()}</p>
                      </div>
                    </div>
                  );
                })}

                {tags.map((item, index) => {
                  return (
                    <div
                      className={Classes.Offers}
                      key={index}
                      onClick={() => tagSelHandler(item)}
                    >
                      <div className={Classes.OffersInner}>
                        <img
                          style={{
                            width: "70px",
                            height: "50px",
                            borderTopLeftRadius: "5px",
                            borderTopRightRadius: "5px",
                          }}
                          // className={Classes.SlideImage}
                          src={item.thumbnail}
                          alt="tag"
                        />

                        <p>{item.name.slice(0, 10)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* dummy carousel */}
            {/* <div className={Classes.Web}>
            <p>anasmk</p>
            <Carousel autoplay>
              <div className={Classes.carouselWeb}>
                <img />
              </div>
            </Carousel>
          </div> */}
            {/* dummy carousel */}
          </div>
        </div>
      )}
    </div>
  );
};
export default Header;
