"use client";
import React, { useEffect, useState } from "react";
import CartProducts from "@/components/CartDesign/CartProducts/CartProducts";
import CartDesign from "@/components/CartDesign/CartDesign";
import Classes from "./Cart.module.css";
import axios from "axios";
import * as Urls from "@/utils/urls";
import { FadeLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TrialCart from "@/components/CartDesign/CartProducts/TrialCart";
import ConformModal from "@/components/confromModal/confromModal";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/providers/cart-provider";
import Features from "@/components/features/features";
import { useAuth } from "@/providers/auth-provider";
import { useCountry } from "@/providers/country-provider";

const Cart = () => {
  const { activeCart, setActiveCart, cartItemsCount, setCartItemsCount } = useCart();
  const [cartList, setCartList] = useState([]);
  const [show, setShow] = useState(false);
  const [img, setSelImg] = useState("");
  const [selId, setSelId] = useState("");
  const [selProAmnt, setSelProAmnt] = useState(0);
  const [productId, setProdctId] = useState("");
  const [loading, setLoading] = useState(false);
  const [amountPay, setAmountPay] = useState("");
  const [tryCartResults, setTryCartResults] = useState([]);
  const [tryCartcountResults, setTryCartcountResults] = useState();
  const [isClient, setIsClient] = useState(false);
  const { token } = useAuth();
  const { countryId } = useCountry();

  useEffect(() => {
    setIsClient(true);
    setActiveCart("shopping");
  }, []);

  useEffect(() => {
    if (token) {
      fetchCart();
    }
  }, [token]);

  const fetchCart = () => {
    setLoading(true);
    axios
      .get(`${Urls.cart}?country=${countryId}`, {
        headers: { Authorization: "Token " + token },
      })
      .then((response1) => {
        setLoading(false);
        setCartList(response1.data.results.data.cart_item);
        setAmountPay(response1.data.results.data.cartmaster.grand_total);
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
    if (
      selItem.thumbnail_image &&
      typeof selItem.thumbnail_image === "string"
    ) {
      setSelImg(selItem.thumbnail_image);
    } else {
      setSelImg("/Assets/home1.png");
    }

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
              setCartList(response1.data.results.data.cart_item);
              setAmountPay(response1.data.results.data.cartmaster.grand_total);
              setCartItemsCount(response1.data.results.count);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
        setCartList([...cartList]);
      });
  };

  useEffect(() => {
    if (token) {
      fechTryAtHomeCart();
    }
  }, [token]);

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
  };

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
        <div className="container bg-white rounded-lg">
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
                <Image
                  src={`/Assets/cartempty.png`}
                  alt="cartEmpty"
                  width={200}
                  height={200}
                />
              </div>
              <h3 className={Classes.cartListHead}>Your Cart is empty</h3>
              <p className={Classes.cartPara}>
                Currently, there are no items in the cart. Have no worries, Keep
                surfing until you find your favorite ornaments. From wishlist to
                the cart, We wish you ‘Happy Shopping’.{" "}
              </p>
              <Link href="/">
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
        <div className="container bg-white rounded-lg">
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
                {isClient && (
                  <Image
                    src="/Assets/cartempty.png"
                    alt="cartEmpty"
                    width={200}
                    height={200}
                  />
                )}
              </div>
              <h3 className={Classes.cartListHead}>Your Cart is empty</h3>
              <p className={Classes.cartPara}>
                Currently, there are no items in the cart. Have no worries, Keep
                surfing until you find your favorite ornaments. From wishlist to
                the cart, We wish you ‘Happy Shopping’.{" "}
              </p>
              <Link href="/">
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

  return (
    <div className={Classes.Background}>
      <ToastContainer />
      <div className={`${Classes.Background} py-3`}>
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
      </div>
      <Features />
    </div>
  );
};

export default Cart;
