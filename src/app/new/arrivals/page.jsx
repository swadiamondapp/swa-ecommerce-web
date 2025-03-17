import FilterCatgs from "@/components/filter/filter-category";
import FilterProvider from "@/providers/filter-provider";
import ProductListSection from "@/components/product-list-section/product-list-section";
import Feature from "@/components/features/features";

async function CategoryPage({ params, searchParams }) {
  
  const category = (await params).category
  const { data } = await searchParams;

  return (
    <div className="sm:bg-zinc-100">
      <div className="container">
        <FilterProvider category={category} sort={data}>
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
      <Feature />
    </div>
  );
}

export default CategoryPage;
