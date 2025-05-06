import FilterCatgs from "@/components/filter/filter-category";
import FilterProvider from "@/providers/filter-provider";
import ProductListSection from "@/components/product-list-section/product-list-section";
import Feature from "@/components/features/features";

async function Budget({ params }) {
  const budget = (await params).budget
  // const { budget } = await params;

  return (
    <div className="sm:bg-zinc-100">
      <div className="container">
        <FilterProvider budget={budget}>
          <div className="row">
            <div className="col-lg-3 col-sm-4">
              <FilterCatgs />
            </div>
            <div className="col-lg-9 col-sm-8">
              <ProductListSection />
            </div>
          </div>
        </FilterProvider>
      </div>
      <Feature />
    </div>
  );
}

export default Budget;
