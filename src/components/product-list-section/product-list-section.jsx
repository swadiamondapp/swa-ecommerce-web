"use client";

import { useFilter } from "@/providers/filter-provider";
import Classes from "./product-list.module.css";
import NewArrivalDesign from "@/components/NewArrivalDesign/NewArrivalDesign";
import DownloadOurAppImage from "@/components/download-our-app/download-our-app";
import { useCountry } from "@/providers/country-provider";
import { useState, useEffect } from "react";
import ProductList from "./product-list";
import { productList } from "@/utils/urls";
import axios from "axios";
import { useAuth } from "@/providers/auth-provider";
import FilterModal from "@/components/lifetimemodal/filtermodal";

export default function ProductListSection({ category }) {
  const { filter, setFilter, isLoading: isFilterLoading } = useFilter();
  const { token } = useAuth();
  const { countryId } = useCountry();
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (filter) {
      const categoryIds = filter.selectedCategories?.join(",") || "";
      const occationIds = filter.selectedOccations?.join(",") || "";
      const metalIds = filter.selectedMetalTypes?.join(",") || "";
      const params = new URLSearchParams({
        category_ids: categoryIds,
        occasion_tag_ids: occationIds,
        metal_type: metalIds,
        ...(filter.sort && { sort: filter.sort }),
        ...(filter.sort && { filter_type: filter.sort }),
        ...(filter.budget && { max_price: filter.budget }),
      });
      appFilter(`?${params}`);
    }
  }, [filter]);

  const appFilter = (filterParams) => {
    setIsLoading(true);
    axios
      .get(
        `${productList + filterParams}&country=${countryId}`,
        token && {
          headers: { Authorization: "Token " + token },
        }
      )
      .then((response1) => {
        setIsLoading(false);
        setProducts(response1.data.results.data);
        setCount(response1.data.results.count);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const sortHandler = (e) => {
    setFilter({
      ...filter,
      sort: e.target.value,
    });
  };

  return (
    <>
      <div className={Classes.Products}>
    
        <NewArrivalDesign
          sortHandler={sortHandler}
          count={count}
          categoryName={
            category
              ? category.charAt(0).toUpperCase() + category.slice(1)
              : "New Arrivals"
          }
        >
          <ProductList
            category={category}
            products={products}
            isLoading={isLoading || isFilterLoading}
          />
        
        </NewArrivalDesign>
        <FilterModal />
      </div>

      <div className={Classes.DownloadOurAppImage}>
        <div className={Classes.NewArrivalsPage}>
          <DownloadOurAppImage />
        </div>
      </div>
    </>
  );
}
