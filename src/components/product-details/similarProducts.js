"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Classes from "../header/main-header.module.css";
import SimilarProductsList from "./similar-products-list";

function SimilarProducts({ productId }) {
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    const countryId = Cookies.get("countryId") || "2";
    fetch(
      `https://swaecommain.swa.co/ecom/products/${productId}?country=${countryId}`
    )
      .then((res) => res.json())
      .then((data) => {
        setSimilarProducts(data.results.similar_data);
      });
  }, [productId]);

  if (!similarProducts.length) return null;

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
