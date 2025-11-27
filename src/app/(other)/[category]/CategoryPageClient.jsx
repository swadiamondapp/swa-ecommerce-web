"use client";

import FilterCatgs from "@/components/filter/filter-category";
import FilterProvider from "@/providers/filter-provider";
import ProductListSection from "@/components/product-list-section/product-list-section";

export default function CategoryPageClient({ category }) {
  return (
    <div className="sm:bg-zinc-100">
      <div className="container">
        <FilterProvider category={category}>
          <div className="row">
            <div className="col-lg-3 col-sm-4">
              <FilterCatgs />
            </div>
            <div className="col-lg-9 col-sm-8">
              <ProductListSection category={category} />
            </div>
          </div>
        </FilterProvider>
      </div>
    </div>
  );
}
