import React, { useState, useEffect, useRef } from "react";
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
  const [prodDet, setProdDet] = useState([]);
  const [sizeChart, setSizeChart] = useState([]);
  const [colorChart, setColorChart] = useState([]);
  const [review, setReview] = useState([]);
  const [allREv, setAllRev] = useState([]);
  const [thumImg, setThumbImg] = useState();
  const [newThumpSet, setNewThumpSet] = useState(null);
  const [imgSet, setImgSet] = useState([]);
  const [count, setCount] = useState("");
  const [size, setSize] = useState("");
  const [logToken, setLogToken] = useState("");
  const [clrId, setClrId] = useState("");
  const [cartCount, setCartCount] = useState("");
  const [error, setError] = useState("");
  const [description, setDescription] = useState("");

  const [logAct, setLogAct] = useState(false);
  const token = localStorage.getItem("swaToken");
  const history = useHistory();

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
      const newProd = props.location.state.data;
      if (proArray !== null) {
        const found = proArray.find((element) => {
          return element.product_id === newProd.product_id;
        });
        if (!found) {
          proArray.push(newProd);
          let filterArray = proArray.slice(-4);
          localStorage.setItem("recent", JSON.stringify(filterArray));
        }
      } else {
        const newProd = props.location.state.data;
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
      .get(Urls.productDet + props.match.params.id)
      .then((response1) => {
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
      .get(Urls.cart, { headers: { Authorization: "Token " + token } })
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
    if (size !== "") {
      setError("");
      let total;
      if (prodDet.is_on_discount) {
        total = prodDet.discount_price;
      } else {
        total = prodDet.total_price_final;
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
      // total: total,
    };

    if (size !== "") {
      setError("");
      if (token !== null) {
        axios
          .post(Urls.cart, body, {
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
          state: { data: selProd },
        });
      }
    } else {
      setError("Select Size");
    }
  };
  const sizeChangeHandler = (size) => {
    setSize(size);
  };
  const loginActHandler = (logToken) => {
    setLogToken(logToken);
  };

  console.log("prodDet-->", props.match.params.id);

  return (
    <div>
      <Header
        countCartItems={cartCount}
        lognAct={logAct}
        catBuyclose={() => setLogAct(false)}
        loginHandler={loginActHandler}
      />

      <ProductDetails
        sku={"SKU " + prodDet.sku}
        offerPrice={
          prodDet.is_on_discount
            ? prodDet.discount_price
            : prodDet.total_price_final
        }
        actualPrice={prodDet.is_on_discount ? prodDet.total_price_final : null}
        discountVal={
          prodDet.is_on_discount
            ? prodDet.total_price_final - prodDet.discount_price
            : null
        }
        discount={prodDet.is_on_discount}
        name={prodDet.product_name}
        description={prodDet.description}
        sizeChart={sizeChart}
        size={"small"}
        sizeChange={sizeChangeHandler}
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
        bagImgSelect={thumpnailSelHanlder}
        count={count + " Reviews"}
        review={review}
        error={error}
        all={allREv}
        avgR={prodDet.avg_rating}
        cartAdd={cartHandler}
        clickedBuy={buyProductHandler}
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
