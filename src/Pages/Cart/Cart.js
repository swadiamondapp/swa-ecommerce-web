import React, { useEffect, useState } from "react";
import Header from "../../components/HeaderNew/Header";
import Footer from "../../components/Footer/Footer";
import CartProducts from "../../components/CartDesign/CartProducts/CartProducts";
import CartDesign from "../../components/CartDesign/CartDesign";
import Features from "../../components/Features/Features";
import Classes from "./Cart.module.css";
import axios from "axios";
import * as Urls from "../../Urls";
import ReactPaginate from "react-paginate";
import { FadeLoader } from "react-spinners";
import cartEmpty from "../../Assets/cartempty.png";

import ConformModal from "../../components/confromModal/confromModal";
import WalletModal from "../../components/WalletModal/WalletModal";
import SliderFeature from "../../components/ProductDetails/SliderFeature";
import TrialCart from "../../components/CartDesign/CartProducts/TrialCart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Cart = () => {
  const [cartCount, setCartCount] = useState("");
  const [cartList, setCartList] = useState([]);
  const [pageCount, setPageCount] = useState("");
  const [show, setShow] = useState(false);
  const [img, setSelImg] = useState("");
  const [selId, setSelId] = useState("");
  const [selProAmnt, setSelProAmnt] = useState(0);
  const [productId, setProdctId] = useState("");
  const [loading, setLoading] = useState(false);
  const [amountPay, setAmountPay] = useState("");
  const [cartItemsCount, setCartItemsCount] = useState("");
  const token = localStorage.getItem("swaToken");
  const countryId = localStorage.getItem("id");
  const flag = localStorage.getItem("flag_image");
  const Contryname = localStorage.getItem("country_name");
  const [activeCart, setActiveCart] = useState("shopping");
  const [tryCartResults, setTryCartResults] = useState();
  const [tryCartcountResults, setTryCartcountResults] = useState();
  const [selectedCountry, setSelectedCountry] = useState({
    id: countryId,
    flag_image: flag,
    country_name: Contryname,
  });

  console.log("activeCart", activeCart);
  console.log("cartList00000", cartList);
  console.log("cartItemsCount", cartItemsCount);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${Urls.cart}?country=${countryId}`, {
        headers: { Authorization: "Token " + token },
      })
      .then((response1) => {
        setLoading(false);
        console.log("response1--->", response1);
        if (response1.data.results.messege === "cart is empty") {
          setCartCount("");
        } else {
          setCartCount(response1.data.results.data.cartmaster.item_count);
        }

        setPageCount(response1.data.results.count / 20);
        setCartList(response1.data.results.data.cart_item);
        setAmountPay(response1.data.results.data.cartmaster.grand_total);
        setCartItemsCount(response1.data.results.count);
        console.log("111111,", response1.data.results.count);
      })

      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handlePageClick = (data) => {
    setLoading(true);
    let page = data.selected + 1;
    axios
      .get(`${Urls.cart}?country=${countryId}`, {
        headers: { Authorization: "Token " + token },
      })
      .then((response1) => {
        setLoading(false);

        setCartCount(response1.data.results.count);
        setPageCount(response1.data.results.count / 20);
        setCartList(response1.data.results.data.cart_item);
        setCartItemsCount(response1.data.results.count);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleCloseHandler = () => {
    setShow(false);
  };
  const removeCartHandler = (selItem) => {
    console.log("selItemqw", selItem);
    // setSelProAmnt(selItem.items_total.toFixed(2));
    setSelImg(selItem.thumbnail_image);
    setSelId(selItem.id);
    setProdctId(selItem.product.id);
    setShow(true);
  };
  const removeHandler = (selids) => {
    setLoading(true);
    setShow(false);
    // const index = cartList.findIndex((obj) => obj.id === selids);
    // Use filter to create a new array excluding the removed item
    const updatedCartList = cartList.filter((item) => item.id !== selids);

    // Optimistically update the state
    setCartList(updatedCartList);
    console.log("cartListqqqqq", cartList);
    setSelProAmnt(cartList && cartList[0].items_total);
    axios
      .delete(`${Urls.cart}${selids}/?country=${countryId}`, {
        headers: {
          Authorization: "Token " + token,
        },
      })
      .then((response1) => {
        setLoading(false);

        // let cartNewArray = [];
        // cartNewArray = [...cartList];
        // cartNewArray.splice(index, 1);
        // setCartList(cartNewArray);
        let count = cartItemsCount;
        count = count - 1;
        setCartItemsCount(count);
        if (count == 0) {
          setCartList([]);
        }
        if (response1.data.results.status_code == 200) {
          axios
            .get(`${Urls.cart}?country=${countryId}`, {
              headers: { Authorization: "Token " + token },
            })
            .then((response1) => {
              setLoading(false);
              console.log("response1--->", response1);
              if (response1.data.results.messege === "cart is empty") {
                setCartCount("");
              } else {
                setCartCount(response1.data.results.data.cartmaster.item_count);
              }

              setPageCount(response1.data.results.count / 20);
              setCartList(response1.data.results.data.cart_item);
              setAmountPay(response1.data.results.data.cartmaster.grand_total);
              setCartItemsCount(response1.data.results.count);
              console.log("111111,", response1.data.results.count);
            })

            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
        // Revert to the original state if the API call fails
        setCartList([...cartList]);
      });
  };
  // new
  useEffect(() => {
    fechTryAtHomeCart();
  }, []);
  const fechTryAtHomeCart = () => {
    axios
      .get(`${Urls.tryathome}?country=${countryId}`, {
        headers: { Authorization: "Token " + token },
      })
      .then((response1) => {
        if (response1.data.results.status === 200) {
          setTryCartResults(response1.data.results.data.cart_item);
          setTryCartcountResults(response1.data.results.data.cartmaster);
        }
        if (response1.data.results.message === "cart is empty") {
          setTryCartResults();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log("tryCartcountResults", tryCartcountResults);
  const addDesigns = (cartid) => {
    console.log("idcart", cartid);
    axios
      .delete(`${Urls.tryatcartdelete}/${cartid}/?country=${countryId}`, {
        headers: { Authorization: "Token " + token },
      })
      .then((response1) => {
        if (response1.data.results.status_code === 200) {
          fechTryAtHomeCart();
          setShow(false);
        } else if (
          response1.data.results.message === "Already Processed, Cannot delete"
        ) {
          toast("Already Processed, Cannot delete");
        }
        console.log("...delete>", response1.data.results.message);
      })
      .catch((error) => {
        console.log(error);
      });
    // history.push("/new/arrivals");
  };
  // new
  const movWishList = (selids) => {
    setShow(false);
    setLoading(true);
    const index = cartList.findIndex((obj) => obj.id === selids);
    axios
      .delete(`${Urls.cart}${selids}/?country=${countryId}`, {
        headers: { Authorization: "Token " + token },
      })
      .then((response1) => {
        setLoading(false);

        const body = {
          product_id: productId,
        };

        axios
          .post(`${Urls.wishlist}?country=${countryId}`, body, {
            headers: { Authorization: "Token " + token },
          })
          .then((response1) => {
            setLoading(false);
            setShow(false);
            let count = cartItemsCount;
            count = count - 1;
            setCartItemsCount(count);
            let cartNewArray = [];
            cartNewArray = [...cartList];
            cartNewArray.splice(index, 1);
            setCartList(cartNewArray);
            // setCartItemsCount(count);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const movWishListTrial = (selids) => {
    setShow(false);
    setLoading(true);
    const index = tryCartResults.findIndex((obj) => obj.id === selids);
    axios
      .delete(`${Urls.cart}${selids}/?country=${countryId}`, {
        headers: { Authorization: "Token " + token },
      })
      .then((response1) => {
        setLoading(false);

        const body = {
          product_id: productId,
        };

        axios
          .post(`${Urls.wishlist}?country=${countryId}`, body, {
            headers: { Authorization: "Token " + token },
          })
          .then((response1) => {
            setLoading(false);
            setShow(false);
            let count = cartItemsCount;
            count = count - 1;
            setCartItemsCount(count);
            let cartNewArray = [];
            cartNewArray = [...tryCartResults];
            cartNewArray.splice(index, 1);
            setTryCartResults(cartNewArray);
            // setCartItemsCount(count);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const totalSavedAmount = cartList.reduce((total, item) => {
    if (item.product.is_on_discount) {
      return (
        total +
        (item.product.country_total_price - item.product.country_discount_price)
      );
    }
    return total;
  }, 0);
  let cartLists;
  if (loading) {
    cartLists = (
      <div className="d-flex justify-content-center align-items-center loader">
        {" "}
        <FadeLoader color="#00464d" />
      </div>
    );
  }

  if (activeCart == "shopping") {
    if (cartList.length < 1) {
      cartLists = (
        <div className="container contBg">
          <div className=" d-flex justify-content-center align-items-center loader">
<div
              className="col-md-6"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div className={Classes.cartEmpty}>
                <img src={cartEmpty} alt="cartEmpty" />
              </div>
              <h3 className={Classes.cartListHead}>Your Cart is empty</h3>
              <p className={Classes.cartPara}>
                Currently, there are no items in the cart. Have no worries, Keep
                surfing until you find your favorite ornaments. From wishlist to
                the cart, We wish you ‘Happy Shopping’.{" "}
              </p>
 <Link to="/">
                {" "}
                <button className={Classes.btn_shopnow}>Shop Now</button>
              </Link>
            </div>
          </div>
        </div>
      );
    } else {
      cartLists = (
        <>
          <CartDesign
            amount={amountPay}
            cartProAmnt={selProAmnt}
            cartCount={cartList.length}
            totalSavedAmount={totalSavedAmount}
            activeCart={activeCart}
            tryCartcountResults={tryCartcountResults}
            // handleOpen={() => setWalletOpen(true)}
          >
            {cartList.map((item, index) => {
              return (
                <CartProducts
                  key={index}
                  remove={() => removeCartHandler(item)}
                  ProductImage={item.thumbnail_image}
                  ProductName={item.product.product_name}
                  NewPrice={
                    item.product.is_on_discount
                      ? item.product.country_discount_price
                      : item.product.country_total_price
                  }
                  OldPrice={item.product.country_total_price}
                  discound={item.product.is_on_discount}
                  disPrice={
                    item.product.is_on_discount
                      ? item.product.country_total_price -
                        item.product.country_discount_price
                      : null
                  }
                  Property={
                    // item.description.carat +
                    item.product.metal_type +
                    // " KT " +
                    " " +
                    // item.description.colour_name +
                    " " +
                    parseFloat(item.product.gross_weight).toFixed(3) +
                    " g "
                  }
                  DiamondProperty={
                    " Diamond " +
                    parseFloat(item.product.diamond_weight).toFixed(3) +
                    " Carat"
                  }
                  Size={item.size}
                  color={item.color}
                  quanty={item.quantity}
                  DeliveryDate="Delivery by tue oct 18"
                />
              );
            })}
          </CartDesign>
        </>
      );
    }
  }

  if (activeCart === "trial") {
    if (tryCartResults.length < 1) {
      cartLists = (
        <div className="container contBg">
          <div className=" d-flex justify-content-center align-items-center loader">
            <div
              className="col-md-6"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div className={Classes.cartEmpty}>
                <img src={cartEmpty} alt="cartEmpty" />
              </div>
              <h3 className={Classes.cartListHead}>Your Cart is empty</h3>
              <p className={Classes.cartPara}>
                Currently, there are no items in the cart. Have no worries, Keep
                surfing until you find your favorite ornaments. From wishlist to
                the cart, We wish you ‘Happy Shopping’.{" "}
              </p>
              <Link to="/">
                {" "}
                <button className={Classes.btn_shopnow}>Shop Now</button>
              </Link>
            </div>
          </div>
        </div>
      );
    } else {
      cartLists = (
        <>
          <CartDesign
            amount={amountPay}
            cartProAmnt={selProAmnt}
            cartCount={tryCartResults.length}
            totalSavedAmount={totalSavedAmount}
            activeCart={activeCart}
            tryCartcountResults={tryCartcountResults}
            // handleOpen={() => setWalletOpen(true)}
          >
            {tryCartResults &&
              tryCartResults.map((item, index) => {
                return (
                  <TrialCart
                    key={index}
                    remove={() => removeCartHandler(item)}
                    ProductImage={item.thumbnail_image}
                    ProductName={item.product.product_name}
                    NewPrice={
                      item.product.is_on_discount
                        ? item.product.country_discount_price
                        : item.product.country_total_price
                    }
                    OldPrice={item.product.country_total_price}
                    discound={item.product.is_on_discount}
                    disPrice={
                      item.product.is_on_discount
                        ? item.product.country_total_price -
                          item.product.country_discount_price
                        : null
                    }
                  />
                );
              })}
          </CartDesign>
        </>
      );
    }
  }
  console.log("activeCart", activeCart);

  return (
    <div>
      <ToastContainer />
      <div className={Classes.Background}>
        <Header
          countCartItems={cartItemsCount}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          activeCart={activeCart}
          setActiveCart={setActiveCart}
        />
        <ConformModal
          handleClose={handleCloseHandler}
          title="Move from bag"
          img={img}
          movWish={
            activeCart === "shopping"
              ? () => movWishList(selId)
              : () => movWishListTrial(selId)
          }
          remove={
            activeCart === "shopping"
              ? () => removeHandler(selId)
              : () => addDesigns(selId)
          }
          body="Are you sure that you want to move 
        this item from the cart?"
          shows={show}
        />

        {cartLists}

        <div className={Classes.Features}>
          <SliderFeature />
          <Features />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Cart;
