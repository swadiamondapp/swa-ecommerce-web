export async function generateStaticParams() {
  try {
    const res = await fetch(
      "https://swaecommain.swadiamonds.com/ecom/categories/",
      { next: { revalidate: 3600 } }
    );

    const categories = await res.json();

    return categories.map((cat) => ({
      category: cat.slug || String(cat.id),
    }));
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
}

import FilterCatgs from "@/components/filter/filter-category";
import FilterProvider from "@/providers/filter-provider";
import ProductListSection from "@/components/product-list-section/product-list-section";

export default async function CategoryPage({ params }) {
  const category = params.category;

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
