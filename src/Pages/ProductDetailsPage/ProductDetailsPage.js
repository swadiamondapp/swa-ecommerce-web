import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import Header from "../../components/HeaderNew/Header";
import Footer from "../../components/Footer/Footer";
import RecentSearch from "../../components/RecentSearch/RecentSearch";
import Features from "../../components/Features/Features";
import Classes from "./ProductDetailsPage.module.css";
import NewArrivalCard from "../../components/NewArrivals/NewArrivalCard/NewArrivalCard";
import ProductDetails from "../../components/ProductDetails/ProductDetails";
import SimilerProducts from "../../components/ProductDetails/SililerProducts";
import axios from "axios";
import * as Urls from "../../Urls";
import { useHistory } from "react-router-dom";
import SliderFeature from "../../components/ProductDetails/SliderFeature";

const ProductDetailsPage = (props) => {
  const { id } = useParams();
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
  const countryId = localStorage.getItem("id");
  const [deliveryDate, setDeliveryDate] = useState();
  const [deliveryShopList, setDeliveryShopsList] = useState([]);
  const [pincodeShow, setPincodeShow] = useState(false);
  const [pinCode, setPinCode] = useState("");

  const [logAct, setLogAct] = useState(false);
  const token = localStorage.getItem("swaToken");
  const history = useHistory();
  console.log("isRestricted", isRestricted);
  const [colorError, setColorError] = useState("");
  const [picodeError, setPicodeError] = useState("");
  const [sizeError, setSizeError] = useState("");
  const [errormsgtrycart, setErrormsgtrycart] = useState();

  console.log("tokenanasmk", props.token);
  console.log("sizeError", sizeError);
  console.log("props.match.params.id", props.match.params.id);

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(props);
    // setClrId(props.location.state.data.thumbnail_colour_id);
    setClrId(props.match.params.color);
    // setProduct_Id(props.match.params.id);

    if (
      localStorage.getItem("swaToken") === null &&
      props.match.path === "/products/:id/:color/:name"
    ) {
      console.log(JSON.parse(localStorage.getItem("recent")));
      let proArray = JSON.parse(localStorage.getItem("recent"));
      const newProd =
        props &&
        props.location &&
        props.location.state &&
        props.location.state.data;
      if (proArray && proArray.some((element) => element)) {
        const found = proArray.find((element) => {
          return (
            element && element.product_id === newProd && newProd.product_id
          );
        });
        if (!found) {
          proArray.push(newProd);
          let filterArray = proArray.slice(-4);
          localStorage.setItem("recent", JSON.stringify(filterArray));
        }
      } else {
        const newProd =
          props &&
          props.location &&
          props.location.state &&
          props.location.state.data;
        let newArray = [];
        newArray.push(newProd);
        localStorage.setItem("recent", JSON.stringify(newArray.slice(0, 5)));
      }
    } else {
      const body = {
        product_id: props.match.params.id,
      };
      axios
        .post(Urls.addRecent, body, {
          headers: { Authorization: "Token " + token },
        })
        .then((response1) => {})
        .catch((error) => {
          console.log(error);
        });
    }
    axios
      .get(`${Urls.productDet + props.match.params.id}?country=${countryId}`, {
        headers: {
          Authorization: "Token " + token,
        },
      })
      .then((response1) => {
        setIsRestricted(response1.data.results.data.is_restricted);
        setProdDet(response1.data.results.data);
        setSizeChart(response1.data.results.data.size_names);
        setColorChart(response1.data.results.data.colors);
        setThumbImg(
          response1.data.results.data.image[
            Object.keys(response1.data.results.data.image)[0]
          ].thumbnail
        );
        setNewThumpSet(response1.data.results.data.image);
        setImgSet(
          response1.data.results.data.image[
            Object.keys(response1.data.results.data.image)[0]
          ].multiple_images
        );
        setVideo(
          response1.data.results.data.video[
            Object.keys(response1.data.results.data.video)[0]
          ].multiple_videos
        );
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(Urls.productDet + props.match.params.id + "/reviews/")
      .then((response1) => {
        setReview(response1.data.results.data.slice(0, 1));
        setCount(response1.data.results.count);
        setAllRev(
          response1.data.results.data.slice(
            1,
            response1.data.results.data.length
          )
        );
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`${Urls.cart}?country=${countryId}`, {
        headers: { Authorization: "Token " + token },
      })
      .then((response1) => {
        if (response1.data.results.message === "cart is empty") {
          setCartCount("");
        } else {
          setCartCount(response1.data.results.count);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.match.params.id]);
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
        history.push({
          pathname: "/checkout",
          state: { data: selProd, name: "buy" },
        });
      } else {
        setLogAct(true);
      }
    } else {
      setError("Select Size");
    }
  };
  const colorHandler = (imgItem) => {
    let clr = imgItem.colour_name;

    if (imgItem.colour_name === "rose") {
      clr = "rose";
      setThumbImg(newThumpSet.rose.thumbnail);
      setImgSet(newThumpSet.rose.multiple_images);
      setClrId(newThumpSet.rose.thumbnail_color_id);
    } else if (imgItem.colour_name === "white") {
      clr = "white";
      setThumbImg(newThumpSet.white.thumbnail);
      setImgSet(newThumpSet.white.multiple_images);
      setClrId(newThumpSet.white.thumbnail_color_id);
    } else if (imgItem.colour_name === "yellow") {
      clr = "yellow";

      setThumbImg(newThumpSet.yellow.thumbnail);
      setImgSet(newThumpSet.yellow.multiple_images);
      setClrId(newThumpSet.yellow.thumbnail_color_id);
    } else if (imgItem.colour_name === "pt") {
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
            history.push("/cart");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      history.push({
        pathname: "/checkout",
        state: { data: selProd, name: "buybody" },
      });
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
    if (!pinCode) {
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
    if (!hasError && pinCode) {
      const body = {
        product_id: prodDet.id,
        color_id: clrId,
        size_id: size,
        pincode: pinCode,
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
          history.push("/trialathome");
        } else if (
          response1.data.results.message === "Item already in try list"
        ) {
          // setErrormsgtrycart("Item already in try list");
          history.push("/trialathome");
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

  console.log("errormsgtrycart-->", errormsgtrycart);
  // const countryId = localStorage.getItem("id");
  const flag = localStorage.getItem("flag_image");
  const Contryname = localStorage.getItem("country_name");
  const [selectedCountry, setSelectedCountry] = useState({
    id: countryId,
    flag_image: flag,
    country_name: Contryname,
  });

  console.log(prodDet.country_total_price, "prodDet");
  return (
    <div>
      <Header
        countCartItems={cartCount}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        lognAct={logAct}
        catBuyclose={() => setLogAct(false)}
        loginHandler={loginActHandler}
      />

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
        id={props.match.params.id}
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
      />
      <div className={Classes.RecentSearch}>
        <SimilerProducts productId={props.match.params.id} />
        {/* <RecentSearch>
        <NewArrivalCard ProductImage={New1} ProductName='Diamond ring' ProductId='SKU: 18037' PriceNew='27000' PriceOld='29500' />
          <NewArrivalCard ProductImage={New2} ProductName='Diamond ring' ProductId='SKU: 18037' PriceNew='27000' PriceOld='29500' />
          <NewArrivalCard ProductImage={New3} ProductName='Diamond ring' ProductId='SKU: 18037' PriceNew='27000' PriceOld='29500' />
          <NewArrivalCard ProductImage={New4} ProductName='Diamond ring' ProductId='SKU: 18037' PriceNew='27000' PriceOld='29500' />
        </RecentSearch> */}
      </div>

      <div className={Classes.Features}>
        <SliderFeature />
        <Features />
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
