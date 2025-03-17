"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { FadeLoader } from "react-spinners";
import { checkdeliveryDate } from "@/utils/urls";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth-provider";
import NewArrivalCard from "@/components/new-arrivals-section/new-arrival-card/new-arrival-card";

export default function ProductList({ products, isLoading }) {
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center loader">
        {" "}
        <FadeLoader color="#00464d" />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center loader">
        No data found
      </div>
    );
  }

  const prodDetHandler = (prodItem) => {
    router.push(`/jewellery/${prodItem.alias}`);
  };

  return (
    <>
      {products.map((item, index) => {
        console.log(item.sku, "item.sku");
        return (
          <NewArrivalCard
            ProductImage={item.thumbnail_image}
            ProductName={item.product_name}
            ProductId={"SKU:" + item.sku}
            cartSddHandler={() => prodDetHandler(item)}
            PriceNew={
              item.is_on_discount
                ? item.country_discount_price
                : item.country_total_price
            }
            PriceOld={item.is_on_discount ? item.country_total_price : null}
            key={index}
            isDiscount={item.is_on_discount}
            Discount={
              item.discount_percentage !== null
                ? item.discount_percentage + "%OFF"
                : item.discount_percentage
            }
            clicked={() => prodDetHandler(item)}
            wishAct={item && item.wishlist_id}
            prodet={item}
          />
        );
      })}
    </>
  );
}
