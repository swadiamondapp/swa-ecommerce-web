import Classes from "../productdetail.module.css";
import SimilarProducts from "@/components/product-details/similarProducts";
import Features from "@/components/features/features";
import ProductDetails from "@/components/product-details/productDetails";

export const generateMetadata = async ({ params }) => {
  const productAlias = (await params).alias;
  const response = await fetch(
    `https://swaecommain.swa.co/ecom/alias-product/?alias=${productAlias}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const productDetails = (await response.json()).results.data;

  return {
    title: productDetails.meta_title,
    description: productDetails.meta_description,
    openGraph: {
      title: productDetails.meta_title,
      description: productDetails.meta_description,
      url: "https://www.swa.co/jewellery/" + productDetails.alias,
      images: [productDetails.image_url],
    },
    twitter: {
      card: "summary_large_image",
      title: productDetails.meta_title,
      description: productDetails.meta_description,
      images: [productDetails.image_url],
    },
    other: {
      "application/ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        name: productDetails.product_name,
        alternateName: `${productDetails.product_name} In Gold (${productDetails.gross_weight} gram)${
          productDetails.diamond_weight > 0
            ? ` with Diamonds (${productDetails.diamond_weight} Carat)`
            : ""
        }`,
        description: productDetails.description,
        sku: productDetails.sku,
        brand: {
          "@type": "Brand",
          name: "SWA",
        },
        image: Object.values(productDetails.image).map(
          (color) => color.thumbnail
        ),
        offers: {
          "@type": "Offer",
          price: productDetails.is_on_discount
            ? productDetails.country_discount_price
            : productDetails.country_total_price,
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
          url: `https://www.swa.co/jewellery/${productDetails.alias}`,
        },
        category: productDetails.category.name,
        material: "Diamond",
        additionalProperty: [
          {
            "@type": "PropertyValue",
            name: "Diamond Clarity",
            value: productDetails.diamond_clarity,
          },
          {
            "@type": "PropertyValue",
            name: "Diamond Weight",
            value: `${productDetails.diamond_weight} ct`,
          },
          {
            "@type": "PropertyValue",
            name: "Diamond Count",
            value: productDetails.diamond_count,
          },
          {
            "@type": "PropertyValue",
            name: "Gross Weight",
            value: `${productDetails.gross_weight} g`,
          },
          {
            "@type": "PropertyValue",
            name: "Dimensions",
            value: `${productDetails.length}mm x ${productDetails.width}mm x ${productDetails.height}mm`,
          },
        ],
        aggregateRating:
          productDetails.reviews_count > 0
            ? {
                "@type": "AggregateRating",
                ratingValue: productDetails.avg_rating,
                reviewCount: productDetails.reviews_count,
              }
            : undefined,
      }),
    },
  };
};

async function ProductDetailsPage({ params }) {
  const productAlias = (await params).alias;

  const productDetails = await fetch(
    `https://swaecommain.swa.co/ecom/alias-product/?alias=${productAlias}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => res.json())
    .then((data) => data.results.data);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: productDetails.product_name,
    description: productDetails.description,
    sku: productDetails.sku,
    brand: {
      "@type": "Brand",
      name: "SWA",
    },
    image: Object.values(productDetails.image).map((color) => color.thumbnail),
    offers: {
      "@type": "Offer",
      price: productDetails.is_on_discount
        ? productDetails.country_discount_price
        : productDetails.country_total_price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: `https://www.swa.co/jewellery/${productDetails.alias}`,
    },
    category: productDetails.category.name,
    material: "Diamond",
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Diamond Clarity",
        value: productDetails.diamond_clarity,
      },
      {
        "@type": "PropertyValue",
        name: "Diamond Weight",
        value: `${productDetails.diamond_weight} ct`,
      },
      {
        "@type": "PropertyValue",
        name: "Diamond Count",
        value: productDetails.diamond_count,
      },
      {
        "@type": "PropertyValue",
        name: "Gross Weight",
        value: `${productDetails.gross_weight} g`,
      },
      {
        "@type": "PropertyValue",
        name: "Dimensions",
        value: `${productDetails.length}mm x ${productDetails.width}mm x ${productDetails.height}mm`,
      },
    ],
    aggregateRating:
      productDetails.reviews_count > 0
        ? {
            "@type": "AggregateRating",
            ratingValue: productDetails.avg_rating,
            reviewCount: productDetails.reviews_count,
          }
        : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetails
        sku={
          productDetails.sku && productDetails.sku === "undefined"
            ? ""
            : productDetails.sku
        }
        offerPrice={
          productDetails.is_on_discount
            ? productDetails.country_discount_price
            : productDetails.country_total_price
        }
        actualPrice={
          productDetails.is_on_discount
            ? productDetails.country_total_price
            : ""
        }
        discountVal={
          productDetails.is_on_discount
            ? productDetails.country_total_price > productDetails.discount_price
              ? productDetails.country_total_price -
                productDetails.discount_price
              : productDetails.discount_price -
                productDetails.country_total_price
            : null
        }
        discountPercentage={productDetails.discount_percentage}
        discount={productDetails.is_on_discount}
        name={productDetails.product_name}
        description={productDetails.description}
        sizeChart={productDetails.size_names}
        size={"small"}
        // sizeChange={sizeChangeHandler}
        // selectedSize={sizechangeModal}
        // Size={size}
        IsRestricted={productDetails.is_restricted || false}
        wishAct={productDetails.wishlist_id}
        gw={productDetails.gross_weight}
        diamondTypw={productDetails.diamond_clarity}
        otherStoneW={productDetails.other_stone_weight}
        otherStoneC={productDetails.other_stone_count}
        diamondWeight={productDetails.diamond_weight}
        diamondCount={productDetails.diamond_count}
        oSw={productDetails.other_stone_weight}
        length={productDetails.length}
        width={productDetails.width}
        height={productDetails.height}
        colors={productDetails.colors}
        thumbImg={
          productDetails.image[Object.keys(productDetails.image)[0]].thumbnail
        }
        id={productDetails && productDetails.id}
        // colorSelct={colorHandler}
        bagImg={
          productDetails.image[Object.keys(productDetails.image)[0]]
            .multiple_images
        }
        Video={
          productDetails.video[Object.keys(productDetails.video)[0]]
            .multiple_videos
        }
        // bagImgSelect={thumpnailSelHanlder}
        count={productDetails.reviews_count + " Reviews"}
        // review={review}
        // error={error}
        // all={allREv}
        avgR={productDetails.avg_rating}
        // cartAdd={cartHandler}
        // checkDelivery={checkAvailability}
        // sizeError={sizeError}
        // colorError={colorError}
        // picodeError={picodeError}
        // pincodeShow={pincodeShow}
        // setPincodeShow={setPincodeShow}
        // deliveryDate={deliveryDate}
        // pinCode={pinCode}
        // setPinCode={setPinCode}
        // TryatHome={TryhomeHandler}
        // errormsgtrycart={errormsgtrycart}
        // clickedBuy={buyProductHandler}
        // deliveryShopList={deliveryShopList}
        image={productDetails.image}
        productDetails={productDetails}
        alias={productDetails && productDetails.alias}
      />
      <div className={Classes.RecentSearch}>
        <SimilarProducts productId={productDetails.id} />
      </div>
      <div className={Classes.Features}>
        <Features />
      </div>
    </>
  );
}

export default ProductDetailsPage;
