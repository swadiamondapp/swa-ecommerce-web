"use client";
import React, { useState, useEffect } from "react";
import Classes from "../productdetail.module.css";
import axios from "axios";
import * as Urls from "@/utils/urls";
import Head from "next/head";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Features from "@/components/features/features";
import SimilarProducts from "@/components/product-details/similarProducts";
import ProductDetails from "@/components/product-details/productDetails";
import useCanonicalTag from "@/useCanonicalTag";
import { useCheckout } from "@/providers/checkout-provider";

const ProductDetailsPage = (props) => {
  // const productDetails = JSON.parse(sessionStorage.getItem("productDetails"));
  // const token = localStorage.getItem("swaToken");
  // const pincode = localStorage.getItem("pincode");
  const [token, setToken] = useState(null);
  const [pincode, setPincode] = useState(null);
  const [countryId, setCountryId] = useState(null);
  const router = useRouter();
  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState(
    JSON.parse(localStorage.getItem("productDetails"))
  );
  console.log(
    "productDetails :::::::::::::::::::",
    JSON.parse(sessionStorage.getItem("productDetails"))
  );

  const [prodDet, setProdDet] = useState([]);
  const [sizeChart, setSizeChart] = useState([]);
  const [colorChart, setColorChart] = useState([]);
  const [review, setReview] = useState([]);
  const [allREv, setAllRev] = useState([]);
  const [thumImg, setThumbImg] = useState();
  const [newThumpSet, setNewThumpSet] = useState(null);
  const [imgSet, setImgSet] = useState([]);
  const [video, setVideo] = useState([]);
  const [count, setCount] = useState("");
  const [size, setSize] = useState("");
  const [logToken, setLogToken] = useState("");
  const [clrId, setClrId] = useState("");
  const [cartCount, setCartCount] = useState("");
  const [error, setError] = useState("");
  const [description, setDescription] = useState("");
  const [isRestricted, setIsRestricted] = useState(false);
  // const countryId = localStorage.getItem("id");
  const [deliveryDate, setDeliveryDate] = useState();
  const [deliveryShopList, setDeliveryShopsList] = useState([]);
  const [pincodeShow, setPincodeShow] = useState(false);
  const [pinCode, setPinCode] = useState("");
  const [logAct, setLogAct] = useState(false);
  const [colorError, setColorError] = useState("");
  const [picodeError, setPicodeError] = useState("");
  const [sizeError, setSizeError] = useState("");
  const { checkoutData } = useCheckout();
  const [errormsgtrycart, setErrormsgtrycart] = useState();
  useCanonicalTag();
  useEffect(() => {
    const token = localStorage.getItem("swaToken");
    const pincode = localStorage.getItem("pincode");
    const countryId = localStorage.getItem("id");
    setToken(token);
    setPincode(pincode);
    setCountryId(countryId);
  }, []);
  useEffect(() => {
    if (prodDet) {
      // Set document title
      document.title = prodDet.meta_title || "Detail Page";

      // Check if a meta description tag already exists
      let metaDescription = document.querySelector("meta[name='description']");
      if (!metaDescription) {
        // Create a new meta tag if it doesn't exist
        metaDescription = document.createElement("meta");
        metaDescription.name = "description";
        document.head.appendChild(metaDescription);
      }

      // Update the content of the meta tag
      metaDescription.content =
        prodDet.meta_description ||
        "Default description for the product details page.";
      // Update or create Open Graph meta tags
      const ogTitle = document.querySelector("meta[property='og:title']");
      const ogDescription = document.querySelector(
        "meta[property='og:description']"
      );
      const ogImage = document.querySelector("meta[property='og:image']");

      // Update or create og:title
      if (!ogTitle) {
        const newOgTitle = document.createElement("meta");
        newOgTitle.setAttribute("property", "og:title");
        document.head.appendChild(newOgTitle);
      }
      document.querySelector("meta[property='og:title']").content =
        prodDet.meta_title || "SWA DIAMONDS";

      // Update or create og:description
      if (!ogDescription) {
        const newOgDescription = document.createElement("meta");
        newOgDescription.setAttribute("property", "og:description");
        document.head.appendChild(newOgDescription);
      }
      document.querySelector("meta[property='og:description']").content =
        prodDet.meta_description || "Swa diamonds diamond jewellery";

      // Update or create og:image
      if (!ogImage) {
        const newOgImage = document.createElement("meta");
        newOgImage.setAttribute("property", "og:image");
        document.head.appendChild(newOgImage);
      }
      document.querySelector("meta[property='og:image']").content =
        prodDet.image_url || "https://www.swa.co/";
    }

    // Cleanup function to remove dynamically added meta tags on component unmount
    return () => {
      document.title = "Default Title"; // Reset the document title
      const metaDescription = document.querySelector(
        "meta[name='description']"
      );
      if (metaDescription) {
        metaDescription.content = "Default description";
      }

      // Remove Open Graph meta tags
      const ogTitle = document.querySelector("meta[property='og:title']");
      const ogDescription = document.querySelector(
        "meta[property='og:description']"
      );
      const ogImage = document.querySelector("meta[property='og:image']");

      if (ogTitle) ogTitle.remove();
      if (ogDescription) ogDescription.remove();
      if (ogImage) ogImage.remove();
    };

    // Cleanup not needed for this approach since we're updating an existing meta tag
  }, [prodDet]);

  const [fetchedName, setFetchedName] = useState(null);

  const fetchProductDetails = async (productName) => {
    try {
      const response = await axios.get(
        `${Urls.detailsWithAlias}${productName}`
      );
      console.log("response0000000000", response);

      if (response.data.results.data) {
        const details = {
          id: response.data.results.data.id,
          color: response.data.results.data.color_id,
          name: response.data.results.data.product_name,
        };
        console.log("detailsuuuuuuuuuuuuuuuuuuuu", details);

        setProductDetails(details);
        localStorage.setItem("productDetails", JSON.stringify(details));
        return details;
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
      return null;
    }
  };

  useEffect(() => {
    if (fetchedName === productId) return; // Prevent re-fetching for the same name
    window?.scrollTo(0, 0);
    const updateProductDetails = async () => {
      let details = productDetails;
      console.log("details >>>>>>>>:::::::::::", details);

      if (!productDetails || productDetails.name !== productId) {
        details = await fetchProductDetails(productId);
      }

      if (details) {
        setFetchedName(productId); // Mark the current name as fetched
        const { id } = details;
        console.log(" <<<<<<<< id >>>>>>> ", details.id);
        axios
          .get(`${Urls.productDet}${id}?country=${countryId}`)
          .then((response) => {
            const data = response.data.results.data;
            console.log("data >>>>>>>>", data);
            setProdDet(data);
            setIsRestricted(data.is_restricted);
            setSizeChart(data.size_names);
            setColorChart(data.colors);
            setThumbImg(data.image[Object.keys(data.image)[0]].thumbnail);
            setNewThumpSet(data.image);
            setImgSet(data.image[Object.keys(data.image)[0]].multiple_images);
            setVideo(data.video[Object.keys(data.video)[0]].multiple_videos);
          })
          .catch((error) =>
            console.error("Error fetching product details:", error)
          );

        axios
          .get(`${Urls.productDet}${id}/reviews/`)
          .then((response) => {
            const reviews = response.data.results.data;
            setReview(reviews.slice(0, 1));
            setCount(response.data.results.count);
            setAllRev(reviews.slice(1));
          })
          .catch((error) => console.error("Error fetching reviews:", error));
        if (token) {
          axios
            .get(`${Urls.cart}?country=${countryId}`, {
              headers: { Authorization: "Token " + token },
            })
            .then((response) => {
              const message = response.data.results.message;
              setCartCount(
                message === "cart is empty" ? "" : response.data.results.count
              );
            })
            .catch((error) =>
              console.error("Error fetching cart details:", error)
            );
        } else {
          console.log("no token found");
        }
      }
    };
    updateProductDetails();
  }, [productId, productDetails, fetchedName]);

  const buyProductHandler = () => {
    if (size === "") {
      setError("");
      let total;
      if (prodDet.is_on_discount) {
        total = prodDet.discount_price;
      } else {
        total = prodDet.country_total_price;
      }
      const selProd = {
        product_id: prodDet.id,
        color: clrId,
        size: size,
        total: total,
      };

      if (token !== null) {
        router.push("/cart/checkout");
        // history.push({
        //   pathname: "/cart/checkout",
        //   state: { data: selProd, name: "buy" },
        // });
      } else {
        setLogAct(true);
      }
    } else {
      setError("Select Size");
    }
  };

  const colorHandler = (imgItem) => {
    let clr = imgItem && imgItem.colour_name;

    if (imgItem && imgItem.colour_name === "rose") {
      clr = "rose";
      setThumbImg(newThumpSet.rose.thumbnail);
      setImgSet(newThumpSet.rose.multiple_images);
      setClrId(newThumpSet.rose.thumbnail_color_id);
    } else if (imgItem && imgItem.colour_name === "white") {
      clr = "white";
      setThumbImg(newThumpSet.white.thumbnail);
      setImgSet(newThumpSet.white.multiple_images);
      setClrId(newThumpSet.white.thumbnail_color_id);
    } else if (imgItem && imgItem.colour_name === "yellow") {
      clr = "yellow";

      setThumbImg(newThumpSet.yellow.thumbnail);
      setImgSet(newThumpSet.yellow.multiple_images);
      setClrId(newThumpSet.yellow.thumbnail_color_id);
    } else if (imgItem && imgItem.colour_name === "pt") {
      clr = "pt";
      setThumbImg(newThumpSet.pt.thumbnail);
      setImgSet(newThumpSet.pt.multiple_images);
      setClrId(newThumpSet.pt.thumbnail_color_id);
    }
  };

  const thumpnailSelHanlder = (thumpImg) => {
    setThumbImg(thumpImg);
  };

  const cartHandler = () => {
    let total;
    if (prodDet.is_on_discount) {
      total = prodDet.discount_price;
    } else {
      total = prodDet.country_total_price;
    }
    const body = {
      product_id: prodDet.id,
      color_id: clrId,
      size_id: size,
      quantity: 1,
    };

    const selProd = {
      product_id: prodDet.id,
      color: clrId,
      size: size,
      total: total,
    };

    // if (size !== "") {
    //   setError("");
    if (token !== null) {
      axios
        .post(`${Urls.cart}?country=${countryId}`, body, {
          headers: { Authorization: "Token " + token },
        })
        .then((response1) => {
          if (response1.data.results.status_code === 200) {
            let count = cartCount;
            count = count + 1;
            setCartCount(count);
            router.push("/shoping/cart");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      const checkoutData = {
        data: selProd, // Selected products
        name: "buybody",
      };

      router.push(`/cart/checkout`);
      // history.push({
      //   pathname: "/cart/checkout",
      //   state: { data: selProd, name: "buybody" },
      // });
    }
    // }
    // else {
    //   setError("Select Size");
    // }
  };

  const checkAvailability = () => {
    let hasError = false;

    if (!clrId) {
      setColorError("Color ID is required");
      hasError = true;
    } else {
      setColorError("");
    }
    if (!pincode && !pinCode) {
      setPicodeError("Pincode is required");
    } else {
      setPicodeError("");
    }

    // if (!size) {
    //   setSizeError("Size is required");
    //   hasError = true;
    // } else {
    //   setSizeError("");
    // }
    if (sizeChart.length > 0) {
      if (!size) {
        setSizeError("Size is required");
        hasError = true;
      } else {
        setSizeError("");
      }
    } else {
      // If no size chart is present, reset the size error
      setSizeError("");
    }
    if (!hasError && (pinCode || pincode)) {
      const body = {
        product_id: prodDet.id,
        color_id: clrId,
        size_id: size,
        pincode: pinCode || pincode,
      };

      axios
        .post(Urls.checkdeliveryDate, body, {
          headers: { Authorization: "Token " + token },
        })
        .then((response1) => {
          setDeliveryDate(response1.data.results.message);
          setDeliveryShopsList(response1.data.results.data);
          setPincodeShow(true); // Show the message after receiving the response
          console.log("dateresponse", response1.data.results);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const TryhomeHandler = () => {
    const token = localStorage.getItem("swaToken");
    const body = {
      product_id: prodDet.id,
      colour_id: clrId,
      size_id: size,
    };
    axios
      .post(`${Urls.tryathome}?country=${countryId}`, body, {
        headers: { Authorization: "Token " + token },
      })
      .then((response1) => {
        if (response1.data.results.status_code === 200) {
          history.push("/trial/athome");
        } else if (
          response1.data.results.message === "Item already in try list"
        ) {
          // setErrormsgtrycart("Item already in try list");
          history.push("/trial/athome");
        } else if (response1.data.results.message === "size  required") {
          setErrormsgtrycart("size  required");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const sizeChangeHandler = (size) => {
    console.log("anassiz", size);
    setSize(size);
  };

  const sizechangeModal = (size) => {
    setSize(size);
  };

  const loginActHandler = (logToken) => {
    setLogToken(logToken);
  };

  console.log("123456productDetails-->", productDetails);
  // const countryId = localStorage.getItem("id");
  const flag = localStorage.getItem("flag_image");
  const Contryname = localStorage.getItem("country_name");
  const [selectedCountry, setSelectedCountry] = useState({
    id: countryId,
    flag_image: flag,
    country_name: Contryname,
  });

  console.log(productDetails, "prodDet");
  return (
    <div>
      <Head>
        <meta name="description" content={prodDet.meta_description} />
      </Head>
      {/* <Header
        countCartItems={cartCount}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        lognAct={logAct}
        catBuyclose={() => setLogAct(false)}
        loginHandler={loginActHandler}
      /> */}
      <ProductDetails
        sku={prodDet.sku && prodDet.sku === "undefined" ? "" : prodDet.sku}
        offerPrice={
          prodDet.is_on_discount
            ? prodDet.country_discount_price
            : prodDet.country_total_price
        }
        actualPrice={prodDet.is_on_discount ? prodDet.country_total_price : ""}
        discountVal={
          prodDet.is_on_discount
            ? prodDet.country_total_price > prodDet.discount_price
              ? prodDet.country_total_price - prodDet.discount_price
              : prodDet.discount_price - prodDet.country_total_price
            : null
        }
        discountPercentage={prodDet.discount_percentage}
        discount={prodDet.is_on_discount}
        name={prodDet.product_name}
        description={prodDet.description}
        sizeChart={sizeChart}
        size={"small"}
        sizeChange={sizeChangeHandler}
        selectedSize={sizechangeModal}
        Size={size}
        IsRestricted={isRestricted}
        wishAct={prodDet.wishlist_id}
        gw={prodDet.gross_weight}
        diamondTypw={prodDet.diamond_clarity}
        otherStoneW={prodDet.other_stone_weight}
        otherStoneC={prodDet.other_stone_count}
        diamondWeight={prodDet.diamond_weight}
        diamondCount={prodDet.diamond_count}
        oSw={prodDet.other_stone_weight}
        length={prodDet.length}
        width={prodDet.width}
        height={prodDet.height}
        colors={colorChart}
        thumbImg={thumImg}
        id={productDetails && productDetails.id}
        colorSelct={colorHandler}
        bagImg={imgSet}
        Video={video}
        bagImgSelect={thumpnailSelHanlder}
        count={count + " Reviews"}
        review={review}
        error={error}
        all={allREv}
        avgR={prodDet.avg_rating}
        cartAdd={cartHandler}
        checkDelivery={checkAvailability}
        sizeError={sizeError}
        colorError={colorError}
        picodeError={picodeError}
        pincodeShow={pincodeShow}
        setPincodeShow={setPincodeShow}
        deliveryDate={deliveryDate}
        pinCode={pinCode}
        setPinCode={setPinCode}
        TryatHome={TryhomeHandler}
        errormsgtrycart={errormsgtrycart}
        clickedBuy={buyProductHandler}
        deliveryShopList={deliveryShopList}
        productDetails={productDetails}
        alias={
          props.location &&
          props.location.state &&
          props.location.state.data &&
          props.location.state.data.alias
            ? props.location.state.data.alias
            : productDetails && productDetails.alias
        }
      />
      <div className={Classes.RecentSearch}>
        <SimilarProducts productId={productDetails && productDetails.id} />
      </div>
      <div className={Classes.Features}>
        <Features />
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default ProductDetailsPage;
