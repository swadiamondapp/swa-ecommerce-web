"use client";

import Classes from "./top-demanded.module.css";
import { useData } from "@/providers/data-provider";
import { FadeLoader } from "react-spinners";
import NewArrivalCard from "@/components/new-arrivals-section/new-arrival-card/new-arrival-card";
import Link from "next/link";
import { useRouter } from "next/navigation";

function TopDemanded() {
  const router = useRouter();
  const { topDemand, counts, loading } = useData();

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center loader">
        {" "}
        <FadeLoader color="#00464d" />
      </div>
    );
  }
  const prodDetHandler = (prodItem) => {
    router.push(`/jewellery/${prodItem.alias}`);
  };

  return (
    <div className="container newarrivalContainer">
      <div className={Classes.TopDemnd}>
        <div className={Classes.TopDemanded}>
          <p className={Classes.MainText}>Top Demanded Items</p>
          <p className={Classes.NewArrivalsSubText}>
            {counts?.top_demand_count} Top Demanded Items
          </p>
        </div>
      </div>

      <div className={Classes.Products}>
        <div className="container">
          <div className="row">
            {topDemand?.map((item, index) => (
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
                PriceOld={item.is_on_discount ? item.country_total_price : null}
                key={index}
                isDiscount={item.is_on_discount}
                Discount={
                  item.discount_percentage !== null
                    ? item.discount_percentage + "% OFF"
                    : null
                }
                clicked={() => prodDetHandler(item)}
                wishAct={item.wishlist_id}
                // Suces={home}

                prodet={item}
              />
            ))}
          </div>
        </div>
      </div>
      <Link href="/new-arrivals/top" className="no-underline">
        <p className={Classes.seeAllTopDemand}>See all</p>
      </Link>
    </div>
  );
}

export default TopDemanded;
