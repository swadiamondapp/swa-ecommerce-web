import TopHeader from "./TopHeader";
import React, { useState, useEffect, useRef } from "react";
import Classes from "./MainHead.module.css";
import MainHead from "./MainHead";
import { BsPerson, BsEye, BsEyeSlash } from "react-icons/bs";

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

const Header = (props) => {
  const [show, setShow] = useState(false);
  const [catgSet, setCatgSet] = useState([]);
  const [category, setCategory] = useState([]);
  const [tags, setTags] = useState([]);
  const token = localStorage.getItem("swaToken");
  const [searchShow, setSearchShow] = useState(false);
  const [suggestionList, setSuggesionList] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [isSticky, setIsSticky] = useState(false);
  const isHomePage = window.location.pathname === "/";
  const mobileSearchBarClass = isHomePage
    ? Classes.MobileSearchBar
    : Classes.MobileSearchbarOthers;
  const isCheckoutPage = window.location.pathname === "/checkout";
  const isCartPage = window.location.pathname === "/cart";
  const userName = localStorage.getItem("userName");

  const [showUserDetails, setShowUserDetails] = useState(false);
  const userDetailsRef = useRef(null);

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
  useEffect(() => {
    axios
      .get(Urls.home)
      .then((response1) => {
        setCatgSet(response1.data.results.data.categories);
        setCategory(response1.data.results.data.categories);
        console.log(
          "response=======>?",
          response1.data.results.data.categories
        );
        setTags(response1.data.results.data.tags);
        console.log("tags...?", response1.data.results.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const moveToWishList = () => {
    if (token !== null) {
      history.push("/wish_list");
    } else {
      setShow(true);
    }
  };

  const catSelHandler = (id) => {
    if (history.location.pathname !== "/new_arrivel") {
      history.push({ pathname: "/new_arrivel", state: { data: id } });
    }
  };
  const cattSelHandler = (setItem) => {
    if (history.location.pathname.slice(0, 12) === "/new_arrivel") {
      window.location.href =
        "https://swaecomnew.zinfog.in/category_search/" + setItem.id;
    } else {
      history.push({
        pathname: "/new_arrivel",
        state: { data: setItem.id, product_category: setItem.name },
      });
    }
  };
  const tagSelHandler = (selItem) => {
    if (history.location.pathname.slice(0, 12) === "/new_arrivel") {
      window.location.href =
        "https://swaecomnew.zinfog.in/tag_search/" + selItem.id;
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
        history.push({ pathname: "/new_arrivel", state: { data: setItem.id } });
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
  return (
    <div>
      <TopHeader />
      <MainHead>
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
              style={{ display: searchKey.length === 0 ? "block" : "none" }}
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
          <CheckDelivery islog={show} close={closeHanlder} />
          <img src={indiaimg} />
          <CgHeart
            className={Classes.Icon}
            color="#FFFFFF"
            size={25}
            onClick={moveToWishList}
          />
          <div className={Classes.CartItemNum}>
            <IoCartOutline
              className={`${Classes.Icon} ${Classes.AddToCart}`}
              color="#FFFFFF"
              size={25}
              onClick={moveTocart}
            />
            {userName && props.countCartItems && (
              <div className={Classes.ItemsNum}>{props.countCartItems}</div>
            )}
          </div>
          <LoginModal
            className={Classes.loginUser}
            isLog={show}
            handleOpenLogin={() => setShow((prevShow) => !prevShow)}
            logAct={props.loginHandler}
            cartClose={cateclose}
            close={closeHanlder}
            style={{ marginTop: "0px" }}
          />
          {/* modal */}
        </div>
      </MainHead>
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
            {/* <Link to="">
              <p>OFFERS</p>
            </Link>
            <Link to="">
              <p>EARRINGS</p>
            </Link>
            <Link to="">
              <p>DEVOTIONAL</p>
            </Link>
            <Link to="">
              <p>BANGLE</p>
            </Link>
            <Link to="">
              <p>BRACELET</p>
            </Link>
            <Link to="">
              <p>PLATINUM</p>
            </Link>
            <Link to="">
              <p>SOLITAIRE</p>
            </Link>
            <Link to="">
              <p>PENDANT</p>
            </Link>
            <Link to="">
              <p>RINGS</p>
            </Link>
            <Link to="">
              <p>NOSE PIN</p>
            </Link>
            <Link to="">
              <p>COUPLE BAND</p>
            </Link>
            <Link to="">
              <p>NECKLACE</p>
            </Link>
            <Link to="">
              <p>NAVARATNA</p>
            </Link>
            <Link to="">
              <p>CLIP BANGLE</p>
            </Link>
            <Link to="">
              <p>PENDANT WITH CHAIN</p>
            </Link>
            <Link to="">
              <p>KIDS</p>
            </Link> */}
          </div>
        </div>
      </div>
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
          <div className={Classes.DiwaliOffers}>
            Diwali offer - 10% on every purchase 🥳
          </div>
          <div className="container">
            {isHomePage && (
              <div
                style={{
                  position: "relative",
                  margin: "12px 0px",
                  marginBottom: "5px",
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
            )}
          </div>
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
