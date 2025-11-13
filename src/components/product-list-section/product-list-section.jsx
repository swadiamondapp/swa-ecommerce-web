"use client";

import { useFilter } from "@/providers/filter-provider";
import Classes from "./product-list.module.css";
import NewArrivalDesign from "@/components/NewArrivalDesign/NewArrivalDesign";
import DownloadOurAppImage from "@/components/download-our-app/download-our-app";
import { useCountry } from "@/providers/country-provider";
import { useCallback, useEffect, useRef } from "react";
import { FadeLoader } from "react-spinners";
import ProductList from "./product-list";
import { productList } from "@/utils/urls";
import axios from "axios";
import { useAuth } from "@/providers/auth-provider";
import FilterModal from "@/components/lifetimemodal/filtermodal";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function ProductListSection({ category }) {
  const { filter, setFilter, isLoading: isFilterLoading, filterTitle } = useFilter();
  const { token } = useAuth();
  const { countryId } = useCountry();
  const observerTarget = useRef(null);

  const buildFilterParams = useCallback(() => {
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
    return params.toString();
  }, [filter]);

  const fetchProducts = async ({ pageParam = 1 }) => {
    const filterQuery = buildFilterParams();
    const url = `${productList}?${filterQuery}&country=${countryId}&page=${pageParam}`;

    const config = token
      ? { headers: { Authorization: "Token " + token } }
      : undefined;

    const resp = await axios.get(url, config);
    const res = resp.data.results;

    return {
      data: res.data || [],
      count: res.count,
      totalPages: res.total_pages ? parseInt(res.total_pages) : 1,
      currentPage: pageParam,
    };
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["products", filter, countryId, token],
    queryFn: fetchProducts,
    getNextPageParam: (lastPage) => {
      if (lastPage.currentPage < lastPage.totalPages) {
        return lastPage.currentPage + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        threshold: 0,
  rootMargin: "1100px", // Start loading 600px before the end
      }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const sortHandler = (e) => {
    setFilter({
      ...filter,
      sort: e.target.value,
    });
  };

  // Flatten all pages into a single products array
  const products = data?.pages.flatMap((page) => page.data) || [];
  const count = data?.pages[0]?.count || 0;

  return (
    <>
      <div className={Classes.Products}>
        <NewArrivalDesign
          sortHandler={sortHandler}
          count={count}
          categoryName={
            filterTitle
              ? filterTitle
              : category
                ? category.charAt(0).toUpperCase() + category.slice(1)
                : "New Arrivals"
          }
        >
          <ProductList
            category={category}
            products={products}
            isLoading={isLoading || isFilterLoading}
          />
          {/* Skeleton loaders for infinite scroll */}
          {isFetchingNextPage && (
            <div className="d-flex justify-content-center align-items-center py-4 w-100">
              {/* Show 4 skeleton cards as placeholders */}
              {[...Array(4)].map((_, idx) => (
                <div key={idx} style={{ margin: '0 8px' }}>
                  <FadeLoader color="#00464d" height={32} width={6} radius={2} />
                </div>
              ))}
            </div>
          )}
        </NewArrivalDesign>

        {/* Infinite scroll trigger */}
        {hasNextPage && (
          <div
            ref={observerTarget}
            className="text-center mt-4 py-4"
            style={{ minHeight: 1 }}
          />
        )}

        {/* Optional: Manual load more button as fallback */}
        {!isFetchingNextPage && hasNextPage && (
          <div className="text-center mt-4">
            <button
              onClick={() => fetchNextPage()}
              className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              Load More
            </button>
          </div>
        )}

        {isError && (
          <div className="text-center mt-4 text-red-600">
            Error loading products: {error.message}
          </div>
        )}

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