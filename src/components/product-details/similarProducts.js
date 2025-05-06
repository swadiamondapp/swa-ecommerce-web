import Classes from "../header/main-header.module.css";
import SimilarProductsList from "./similar-products-list";
import { cookies } from "next/headers";

async function SimilarProducts({ productId }) {
  const countryId = (await cookies()).get("countryId") || "2";

  const similarProducts = await fetch(
    "https://swaprdnecomnewdemo.zinfog.in/ecom/products/" +
      productId +
      "?country=" +
      countryId
  )
    .then((res) => res.json())
    .then((data) => data.results.similar_data);

  if (!similarProducts) return null;

  return (
    <div style={{ marginTop: "80px" }}>
      <div className="container">
        <div className={Classes.SimilerProductHead}>Similar style</div>
        <div className={Classes.CatList1}>
          <div className="container similetrSliders">
            <div className={Classes.Web}>
              <SimilarProductsList products={similarProducts} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SimilarProducts;
