import React, { useState, useEffect } from "react";
import Header from "../../components/HeaderNew/Header";
import Footer from "../../components/Footer/Footer";
import NewArrivalCard from "../../components/NewArrivals/NewArrivalCard/NewArrivalCard";
import Wishlist from "../../components/Wishlist/Wishlist";
import Classes from "./WishlistPage.module.css";
import wishEmpty from "../../Assets/empwish.png";
import * as Urls from "../../Urls";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import Features from "../../components/Features/Features";
import SliderFeature from "../../components/ProductDetails/SliderFeature";

const whishlistPage = () => {
  const history = useHistory();
  const [wishList, setWishList] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("swaToken");
  const countryId = localStorage.getItem("id");
  const flag = localStorage.getItem("flag_image");
  const Contryname = localStorage.getItem("country_name");
  const [selectedCountry, setSelectedCountry] = useState({
    id: countryId,
    flag_image: flag,
    country_name: Contryname,
  });
  const [cartCount, setCartCount] = useState("");
  const wishListing = () => {
    setLoading(true);
    axios
      .get(`${Urls.wishlist}?country=${countryId}`, {
        headers: { Authorization: "Token 	" + token },
      })
      .then((response1) => {
        setLoading(false);
        setWishList(response1.data.results.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`${Urls.cart}?country=${countryId}`, {
        headers: { Authorization: "Token " + token },
      })
      .then((response1) => {
        if (response1.data.results.message === "cart is empty") {
          setCartCount("");
        } else {
          setCartCount(response1.data.results.count);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    wishListing();
  }, []);
  const newWishListHandler = () => {
    setLoading(true);
    axios
      .get(`${Urls.wishlist}?country=${countryId}`, {
        headers: { Authorization: "Token 	" + token },
      })
      .then((response1) => {
        setLoading(false);
        setWishList(response1.data.results.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const prodDetHandler = (prodItem) => {
    // history.push({
    //   pathname:
    //     "/products/" +
    //     prodId.product_id +
    //     "/" +
    //     prodId.product.thumbnail_colour_id +
    //     "/" +
    //     prodId.product.product_name,
    //   state: { data: prodId },
    // });
    sessionStorage.setItem(
      "productDetails",
      JSON.stringify({
        id: prodItem.product_id,
        color: prodItem.colour_id,
        name: prodItem.product_name,
      })
    );
    history.push({
      pathname: "/jewellery/" + prodItem.alias,
      state: { data: prodItem },
    });
    // history.push({pathname:'/product_det',state:{data:prodId,path:'wish'}})
  };
  let wishlists;
  if (loading) {
    wishlists = (
      <div className="d-flex justify-content-center align-items-center loader">
        {" "}
        <FadeLoader color="#00464d" />
      </div>
    );
  } else if (wishList.length === 0) {
    wishlists = (
      <div className=" justify-content-center align-items-center loader">
        <div className={Classes.wishEmpty}>
          <img src={wishEmpty} alt="wishList" />
        </div>
        <h3 className={Classes.wishListHead}>Your wishlist page is empty</h3>
        <p className={Classes.wishPara}>
          Currently, there are no items in the wishlist. Have no worries, Keep
          surfing until you find your favorite ornaments. From wishlist to the
          cart, We wish you ‘Happy Shopping’.{" "}
        </p>
      </div>
    );
  } else {
    wishlists = wishList.map((item, index) => {
      return (
        <NewArrivalCard
          ProductImage={item.product.thumbnail_image}
          ProductName={item.product.product_name}
          ProductId={"SKU:" + item.product.sku}
          PriceNew={
            item.product.is_on_discount
              ? item.product.country_discount_price
              : item.product.country_total_price
          }
          PriceOld={
            item.product.is_on_discount
              ? item.product.country_total_price
              : null
          }
          key={index}
          Discount={
            item.product.discount_percentage !== null
              ? item.product.discount_percentage + "% OFF"
              : null
          }
          prodet={item.product}
          wishId={item.id}
          Suces={wishListing}
          clicked={() => prodDetHandler(item)}
          wishAct={item.id}
          deltWishList={newWishListHandler}
        />
      );
    });
  }
  return (
    <div>
      <div className={Classes.BgColour}>
        <Header
          countCartItems={cartCount}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
        />
        <div className={Classes.Products}>
          <Wishlist> {wishlists} </Wishlist>
        </div>
        <div>
          <SliderFeature />
          <Features />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default whishlistPage;
