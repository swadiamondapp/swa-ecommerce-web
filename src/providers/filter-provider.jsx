"use client";

import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  metalCategoryUrl,
  categoryWiseUrl,
  occationalProducts,
} from "@/utils/urls";
import { useCountry } from "@/providers/country-provider";
import { stripWhiteSpace } from "@/utils/utils";
export const FilterContext = createContext();

const FilterProvider = ({ children, category, sort, budget }) => {
  const { countryId } = useCountry();
  const [metalTypes, setMetalTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [occations, setOccations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [filter, setFilter] = useState(
    sort || budget
      ? {
          sort: sort,
          budget: budget,
          selectedCategories: [],
          selectedOccations: [],
          selectedMetalTypes: [],
        }
      : undefined
  );

  useEffect(() => {
    axios
      .get(`${metalCategoryUrl}?country=${countryId}`)
      .then((response2) => {
        const metalTypesData = response2.data.results.data.filter(
          (item) => item.product_count > 0
        );
        setMetalTypes(metalTypesData);
      })
      .catch((error) => {
        console.log("Error fetching metalCategory:", error);
      });

    axios.get(`${categoryWiseUrl}?country=${countryId}`).then((response) => {
      const categoryWiseData = response.data.results.data.filter(
        (item) => item.product_count > 0
      );
      setCategories(categoryWiseData);
      setInitialFilter(categoryWiseData);
      setIsLoading(false);
    });

    axios
      .get(`${occationalProducts}?country=${countryId}`)
      .then((responseOcc) => {
        const occationsData = responseOcc.data.results.data.filter(
          (item) => item.product_count > 0
        );
        setOccations(occationsData);
        const occationIds = occationsData
          .filter(
            (item) =>
              stripWhiteSpace(item.name.toLowerCase()) ===
              category?.toLowerCase()
          )
          .map((item) => item.id);
        if (occationIds.length > 0) {
          setFilter({
            ...filter,
            selectedOccations: occationIds,
          });
        }
      });
  }, []);

  const setInitialFilter = (categoryWiseData) => {
    if (category) {
      const categoryIds = categoryWiseData
        .filter(
          (item) =>
            stripWhiteSpace(item.name.toLowerCase()) === category.toLowerCase()
        )
        .map((item) => item.id);
      if (categoryIds.length > 0) {
        setFilter({
          ...filter,
          selectedCategories: categoryIds,
        });
      }
    }
  };

  return (
    <FilterContext.Provider
      value={{
        metalTypes,
        categories,
        occations,
        filter,
        isLoading,
        setFilter,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;

export const useFilter = () => useContext(FilterContext);
