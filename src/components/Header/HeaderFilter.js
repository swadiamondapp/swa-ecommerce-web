import React, { useState, useEffect } from "react";
import Logo from "../../Assets/swaLogo.png";
import { useHistory } from "react-router-dom";
import Classes from "./Header.module.css";
import "bootstrap/dist/css/bootstrap.css";
import { FaPhoneAlt } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { FiBell } from "react-icons/fi";
import { BsPersonSquare } from "react-icons/bs";
import { CgHeart } from "react-icons/cg";
import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { CgClose } from "react-icons/cg";
import { HiShoppingBag } from "react-icons/hi";
import { BsSearch } from "react-icons/bs";
import ProductImage from "../../Assets/new1.png";
import LoginModal from "../LoginModal/LoginModal";
import axios from "axios";
import * as Urls from "../../Urls";
const HeaderFilter = (props) => {
  const [show, setShow] = useState(false);
  const token = localStorage.getItem("swaToken");
  const [searchKey, setSearchKey] = useState("");
  const [searchShow, setSearchShow] = useState(false);
  const [suggestionList, setSuggesionList] = useState([]);
  const history = useHistory();
  useEffect(() => {
    if (props.lognAct) {
      setShow(true);
    }
  }, [props.lognAct]);

  const moveToWishList = () => {
    if (token !== null) {
      history.push("/wish_list");
    } else {
      setShow(true);
    }
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
  const catSelHandler = (id) => {
    if (history.location.pathname !== "/new_arrivel") {
      history.push({ pathname: "/new_arrivel", state: { data: id } });
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
  const [open, setOpen] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  // const [openLogin, setOpenLogin] = useState(false);

  const Notification = () => {
    setOpenNotification(!openNotification);
  };
  const searchTitleHandler = (setItem) => {
    console.log(history.location.pathname);
    if (setItem.type === "category") {
      if (history.location.pathname.slice(0, 12) === "/new_arrivel") {
        window.location.href =
          "http://localhost:3000/category_search/" + setItem.id;
        console.log("testk");
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
            country_total_price:
              response1.data.results.data.country_total_price,
            country_discount_price: response1.data.results.data.discount_price,
            wishlist_id: response1.data.results.data.wishlist_id,
          };

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
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <div>
      <div className={Classes.Header_top}>
        <div className={`${"container"} ${Classes.HeaderTop_Text}`}>
          <div className={Classes.Top}>
            <p className={Classes.Phone}>
              <FaPhoneAlt
                className={Classes.TopIcon}
                color="#007481"
                size={18}
              />
              &nbsp;1800 257 8600
            </p>
            <p className={Classes.Mail}>
              <HiOutlineMail
                className={Classes.TopIcon}
                color="#007481"
                size={18}
              />
              &nbsp;info@swadiamonds.com
            </p>
          </div>
          <div className={Classes.Time}>
            <p>IST (Mon - Sat) 10:00 AM to 6:00 PM</p>
          </div>
        </div>
      </div>
      <div className={Classes.Header_downFilter}>
        <div className="container">
          <div className={Classes.Logo_Search}>
            <img
              className={Classes.Logo}
              src={Logo}
              alt="Logo"
              onClick={setHomepageHandler}
            />
            <div className={Classes.SearchIcons}>
              <div className={Classes.searchList}>
                <input
                  className={Classes.searchbar}
                  type="text"
                  value={searchKey}
                  onChange={searchKeyHanlder}
                  placeholder="Search for diamonds & more"
                />
                <BsSearch
                  size={22}
                  className={Classes.searchIcon}
                  style={{ display: searchShow ? "none" : "block" }}
                />
                {/* <AiOutlineClose size={22}  className={Classes.searchIcon} style={{display:searchShow?'block':'none',cursor:'pointer'}} /> */}
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
              </div>

              <FiBell
                className={Classes.Icon}
                color="#FFFFFF"
                size={25}
                onClick={Notification}
              />

              <LoginModal isLog={show} logAct={props.loginHandler} />
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
                <div className={Classes.ItemsNum}>{props.countCartItems}</div>
              </div>
              <div
                className={Classes.hamburger}
                onClick={() => {
                  setOpen(!open);
                }}
              >
                <div className={Classes.line} />
                <div className={Classes.line} />
                <div className={Classes.line} />
              </div>
            </div>
          </div>
          <ul
            className={open ? [Classes.NavBarMobile] : [Classes.Navbar]}
            onClick={() => setOpen(!open)}
          >
            <div className={Classes.DrawerTop}>
              <img
                className={Classes.Logo}
                src={Logo}
                alt="Logo"
                onClick={setHomepageHandler}
              />
              <CgClose
                className={Classes.DrawerClose}
                color="#ffffff"
                size={30}
                onClick={() => setOpen(!open)}
              />
            </div>
            <div className={Classes.DrawerLogin}>
              <BsPersonSquare
                color="#10212F"
                size={30}
                onClick={moveToOrderHistory2}
              />
              <p>Login | Register</p>
            </div>

            <div className={Classes.DrawerShortCuts}>
              <HiShoppingBag
                className={Classes.Icon}
                color="#10212F"
                size={25}
                onClick={moveToOrderHistory}
              />
              <p>My Orders</p>
            </div>
          </ul>
        </div>
      </div>
      <div
        className={
          openNotification
            ? [Classes.NotificationOpen]
            : [Classes.NoNotification]
        }
      >
        <div className={Classes.Heading}>
          <h1 className={Classes.Notification}>Notification</h1>
          <p className={Classes.MarkReaded}>MARK AS READED</p>
        </div>
        <div className="row">
          <div className={Classes.NotificationDetails}>
            <div className="col-md-10">
              <p className={Classes.NotificationText}>
                Confirm your order and get upto 5% discount
              </p>
              <p className={Classes.NotificationTime}>1 hour ago</p>
            </div>
            <div className="col-md-2">
              <img
                src={ProductImage}
                alt="ProductImage"
                className={Classes.NotifictionImage}
              />
            </div>
          </div>
          <div className={`${Classes.NotificationDetails} ${Classes.NoBorder}`}>
            <div className="row">
              <div className="col-md-10">
                <p className={Classes.NotificationText}>
                  UPTO 30 % OFF On making charges
                </p>
                <p className={Classes.NotificationTime}>1 hour ago</p>
              </div>
              <div className="col-md-2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderFilter;
