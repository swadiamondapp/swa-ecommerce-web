"use client";

import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { DataContext } from "@/providers/data-provider";
import { FadeLoader } from "react-spinners";
import NewArrivalCard from "@/components/new-arrivals-section/new-arrival-card/new-arrival-card";
import Classes from "./new-arrivals.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NewArrivals() {
  const { newArrivel, counts, loading } = useContext(DataContext);
  const router = useRouter();

  const prodDetHandler = (prodItem) => {
    router.push(`/jewellery/${prodItem.alias}`);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center loader">
        <FadeLoader color="#00464d" />
      </div>
    );
  }
  console.log("newArriveltttttttttttttttt", newArrivel);

  return (
    <div className="container newarrivalContainer">
      <div className={Classes.NewArrivals}>
        <div className={Classes.setItems}>
          <div>
            <h1 className={Classes.NewArrivalsMainText}>New Arrivals</h1>
            <p className={Classes.NewArrivalsSubText}>
              {counts.new_arrivals_count} New item added
            </p>
          </div>
        </div>
      </div>

      <div className={Classes.NewArrivalImages}>
        <div className="container">
          <div className="row landingrow">
            {newArrivel.map((item, index) => {
              console.log("landingitems", item);
              return (
                <NewArrivalCard
                  ProductImage={item.thumbnail_image && item.thumbnail_image}
                  ProductName={item.product_name}
                  cartSddHandler={() => prodDetHandler(item)}
                  ProductId={"SKU:" + item.sku}
                  PriceNew={
                    item.is_on_discount
                      ? item.country_discount_price
                      : item.country_total_price
                  }
                  PriceOld={
                    item.is_on_discount ? item.country_total_price : null
                  }
                  key={index}
                  isDiscount={item.is_on_discount}
                  Discount={
                    item.discount_percentage && item.discount_percentage !== 0.0
                      ? item.discount_percentage + "% OFF"
                      : null
                  }
                  prodet={item}
                  wishAct={item.wishlist_id}
                  // Suces={home}
                  clicked={() => prodDetHandler(item)}
                />
              );
            })}
          </div>
        </div>
      </div>
      <Link href="/new-arrivals/new" className="text-decoration-none">
        <p className={Classes.seeAll}>See all</p>
      </Link>
    </div>
  );
}
