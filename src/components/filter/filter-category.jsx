"use client";

import React, { useState, useEffect } from "react";
import Classes from "./filter.module.css";
import { useFilter } from "@/providers/filter-provider";

const FilterCatgs = () => {
  const [isSticky, setIsSticky] = useState(false);
  const { categories, metalTypes, occations, filter, setFilter } = useFilter();

  const handleScroll = () => {
    if (window?.scrollY > 100) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window?.addEventListener("scroll", handleScroll);
    return () => {
      window?.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleCheckboxToggle = (id, filterKey) => {
    if (!filter) return;

    const isIdSelected = filter[filterKey]?.includes(id);
    const updatedIds = isIdSelected
      ? filter[filterKey]?.filter((item) => item !== id)
      : [...(filter[filterKey] || []), id];

    setFilter({
      ...filter,
      [filterKey]: updatedIds,
    });
  };

  const isItemSelected = (id, filterKey) => {
    return filter?.[filterKey]?.includes(id) || false;
  };

  // Handler functions for each filter type
  const handleCheckboxByOccation = (id) => {
    handleCheckboxToggle(id, "selectedOccations");
  };

  const handleCheckboxByMetal = (id) => {
    handleCheckboxToggle(id, "selectedMetalTypes");
  };

  const handleCheckboxByCategory = (id) => {
    handleCheckboxToggle(id, "selectedCategories");
  };

  return (
    <div className={`${Classes.Filter} ${isSticky ? Classes.Sticky : ""}`}>
      <div className={Classes.ParentFilter}>
        <div className={Classes.FilterHead}>
          <p>Filter</p>
        </div>
        <div className={Classes.ParentNewArrival}>
          <FilterSection
            title="Categories"
            items={categories}
            handler={handleCheckboxByCategory}
            filterKey="selectedCategories"
            nameKey="name"
            isItemSelected={isItemSelected}
          />
          <FilterSection
            title="Metal"
            items={metalTypes}
            handler={handleCheckboxByMetal}
            filterKey="selectedMetalTypes"
            nameKey="metal_type"
            isItemSelected={isItemSelected}
          />
          <FilterSection
            title="Occasion"
            items={occations}
            handler={handleCheckboxByOccation}
            filterKey="selectedOccations"
            nameKey="name"
            isItemSelected={isItemSelected}
            style={{ borderBottom: "0px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterCatgs;

const FilterSection = (props) => {
  const { title, items, handler, filterKey, nameKey, style, isItemSelected } =
    props;

  return (
    <div className={Classes.CategoryMainHead} style={style}>
      <div className={Classes.CategoryHead}>
        <p>{title}</p>
      </div>
      {items.map((item, index) => (
        <div className={Classes.CategoryListMain} key={index}>
          <div className={Classes.CategoryList}>
            <input
              type="checkbox"
              className={Classes.checkboxInput}
              onChange={() => handler(item.id)}
              checked={!!isItemSelected(item.id, filterKey)}
            />
            <label>
              {item[nameKey].charAt(0).toUpperCase() +
                item[nameKey].slice(1).toLowerCase()}
            </label>
          </div>
          <div className={Classes.CategoryListAmount}>
            <label>{item.product_count}</label>
          </div>
        </div>
      ))}
    </div>
  );
};
