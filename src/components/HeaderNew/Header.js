import TopHeader from "./TopHeader";
import React, { useState, useEffect } from "react";
import Classes from "./MainHead.module.css";
import MainHead from "./MainHead";
import { BsSearch } from "react-icons/bs";
import { CgHeart } from "react-icons/cg";
import { FiBell } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import LoginModal from "../LoginModal/LoginModal";
import axios from "axios";
import * as Urls from "../../Urls";

const Header = (props) => {
  const [show, setShow] = useState(false);
  const [catgSet, setCatgSet] = useState([]);
  const [tags, setTags] = useState([]);
  const token = localStorage.getItem("swaToken");
  const [searchShow, setSearchShow] = useState(false);
  const [suggestionList, setSuggesionList] = useState([]);
  const [searchKey, setSearchKey] = useState("");

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
        setTags(response1.data.results.data.tags);
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
  const catSelHandler = (setItem) => {
    if (history.location.pathname.slice(0, 12) === "/new_arrivel") {
      window.location.href =
        "https://swaecommerce.zinfog.com/category_search/" + setItem.id;
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
        "https://swaecommerce.zinfog.com/tag_search/" + selItem.id;
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
          "https://swaecommerce.zinfog.com/category_search/" + setItem.id;
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
              "https://swaecommerce.zinfog.com/products/" +
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

  return (
    <div>
      {/* <TopHeader /> */}
      <MainHead>
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
          <div className={Classes.SearchMob}>
            <input
              type="text"
              value={searchKey}
              onChange={searchKeyHanlder}
              className={Classes.SerachLine}
            />
            <BsSearch className={Classes.Icons} color="#FFFFFF" size={18} />
          </div>

          <FiBell
            className={Classes.Icon}
            color="#FFFFFF"
            size={25}
            // onClick={Notification}
          />

          <LoginModal
            isLog={show}
            logAct={props.loginHandler}
            cartClose={cateclose}
            close={closeHanlder}
          />
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
        </div>
      </MainHead>
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

      <div className={Classes.CatList}>
        <div className="container">
          <div className={Classes.Slider}>
            <div className="d-flex">
              {catgSet.map((item, index) => {
                return (
                  <div
                    className={Classes.Offers}
                    key={index}
                    onClick={() => catSelHandler(item)}
                  >
                    <img src={item.thumbnail} alt="catg" />

                    <p>{item.name}</p>
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
                    <img src={item.thumbnail} alt="tag" />

                    <p>{item.name}</p>
                  </div>
                );
              })}

              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
