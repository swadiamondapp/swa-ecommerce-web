"use client";

import React, { useState, useEffect } from "react";
import NewArrivalCard from "@/components/new-arrivals-section/new-arrival-card/new-arrival-card";
import Wishlist from "@/components/Wishlist/Wishlist";
import Classes from "./WishlistPage.module.css";
import { wishlist, cart } from "@/utils/urls";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FadeLoader } from "react-spinners";
import Features from "@/components/features/features";
import Image from "next/image";
import { useCountry } from "@/providers/country-provider";
import { useAuth } from "@/providers/auth-provider";

const whishlistPage = () => {
  const router = useRouter();
  const { token } = useAuth();
  const { countryId } = useCountry();
  const [wishList, setWishList] = useState([]);
  const [loading, setLoading] = useState(false);

  const wishListing = () => {
    setLoading(true);
    axios
      .get(`${wishlist}?country=${countryId}`, {
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

  useEffect(() => {
    if (token && countryId) {
      wishListing();
    }
  }, [token, countryId]);

  const newWishListHandler = () => {
    setLoading(true);
    axios
      .get(`${wishlist}?country=${countryId}`, {
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
    router.push(
      `/jewellery/${prodItem.product.alias}?id=${prodItem.product.product_id}&color=${prodItem.product.colour_id}&name=${prodItem.product.product_name}`
    );
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
          <Image
            src={"/Assets/empwish.png"}
            alt="wishList"
            width={200}
            height={200}
          />
        </div>
        <h3 className={Classes.wishListHead}>Your wishlist page is empty</h3>
        <p className={Classes.wishPara}>
          Currently, there are no items in the wishlist. Have no worries, Keep
          surfing until you find your favorite ornaments. From wishlist to the
          cart, We wish you 'Happy Shopping'.{" "}
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
          wishAct={item.wishlist_id}
          deltWishList={newWishListHandler}
        />
      );
    });
  }

  return (
    <>
      <div className={Classes.Products}>
        <Wishlist> {wishlists} </Wishlist>
      </div>
      <Features />
    </>
  );
};

export default whishlistPage;
