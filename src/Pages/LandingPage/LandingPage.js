import React, { useEffect, useState } from "react";
import Header from "../../components/HeaderNew/Header";
import Banner from "../../components/Banner/Banner";
import Features from "../../components/Features/Features";
import ShopOnBudget from "../../components/ShopOnBudget/ShopOnBudget";
import BudgetCard from "../../components/ShopOnBudget/budgetCard/budgetCard";
import ShopOnBudget1 from "../../Assets/ShopOnBudget1.png";
import ShopOnBudget2 from "../../Assets/ShopOnBudget2.png";
import ShopOnBudget3 from "../../Assets/ShopOnBudget3.png";
import ShopOnBudget4 from "../../Assets/ShopOnBudget4.png";
import shop1 from "../../Assets/shop1.png";
import shop2 from "../../Assets/shop2.png";
import shop3 from "../../Assets/shop3.png";
import shop4 from "../../Assets/shop4.png";
import NewArrivals from "../../components/NewArrivals/NewArrivals";
import NewArrivalCard from "../../components/NewArrivals/NewArrivalCard/NewArrivalCard";
import BringTheParty from "../../components/BringTheParty/BringTheParty";
import TopDemanded from "../../components/TopDemanded/TopDemanded";
import Certificate from "../../components/Certificate/Certificate";
import RecentSearch from "../../components/RecentSearch/RecentSearch";
import DownloadOurAppImage from "../../components/DownloadOurAppImage/DownloadOurAppImage";
import Footer from "../../components/Footer/Footer";
import * as Urls from "../../Urls";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import SliderFeature from "../../components/ProductDetails/SliderFeature";

const LandingPage = () => {
  const [banner, setBanner] = useState([]);
  const [newArrival, setNewArrivel] = useState([]);
  const [budjet, setBudjet] = useState([
    { budget: "", count: "" },
    { budget: "", count: "" },
    { budget: "", count: "" },
    { budget: "", count: "" },
  ]);
  const [add, setAdd] = useState([
    { Ad_image: "" },
    { Ad_image: "" },
    { Ad_image: "" },
  ]);
  const [topDeamd, setTopDemand] = useState([]);
  const [video, setVideo] = useState("");
  const [serachList, setSearcList] = useState([]);
  const [mobBanner, setMobBanner] = useState([]);
  const [cartCount, setCartCount] = useState("");
  const [loading, setLoading] = useState(false);
  const [logToken, setLogToken] = useState("");
  const [tags, setTags] = useState([]);
  const countryId = localStorage.getItem("id");
  const flag = localStorage.getItem("flag_image");
  const Contryname = localStorage.getItem("country_name");
  const [selectedCountry, setSelectedCountry] = useState({
    id: countryId,
    flag_image: flag,
    country_name: Contryname,
  });

  console.log("mobBanner..01", mobBanner);
  console.log("budjet..02", budjet);
  console.log("bannercarousel", banner);
  console.log("flag...?", flag);

  const history = useHistory();
  const token = localStorage.getItem("swaToken");
  const home = () => {
    axios
      .get(`${Urls.home}?country=${selectedCountry.id}`, {
        headers: { Authorization: "Token " + token },
      })
      .then((response1) => {
        console.log("response1=====>", response1);
        setLoading(false);
        setSearcList(response1.data.results.data.recent_search);
        let bannerArray = [];
        for (let i = 0; i < response1.data.results.data.corosals.length; i++) {
          if (response1.data.results.data.corosals[i].for_mobile === false) {
            bannerArray.push({
              corousal_image:
                response1.data.results.data.corosals[i].corousal_image,
              corousal_name:
                response1.data.results.data.corosals[i].corousal_name,
              type_id: response1.data.results.data.corosals[i].type_id,
              is_category: response1.data.results.data.corosals[i].is_category,
            });
          }
        }

        setBanner(bannerArray);
        setNewArrivel(response1.data.results.data.new_arrival.slice(0, 8));
        setBudjet(response1.data.results.data.product_budget);
        setAdd(response1.data.results.data.banners);
        setTopDemand(response1.data.results.data.top_demand.slice(0, 8));
        setVideo(response1.data.results.data.Video + "?feature=oembed");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    setLoading(true);
    if (token !== null) {
      home();
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
    } else {
      let serchListNoAUth = localStorage.getItem("recent");

      if (localStorage.getItem("recent") !== null) {
        setSearcList(JSON.parse(serchListNoAUth));
      }

      axios
        .get(`${Urls.home}?country=${selectedCountry.id}`)
        .then((response1) => {
          setLoading(false);
          let bannerArray = [];
          let banMob = [];
          for (
            let i = 0;
            i < response1.data.results.data.corosals.length;
            i++
          ) {
            if (response1.data.results.data.corosals[i].for_mobile === false) {
              bannerArray.push({
                corousal_image:
                  response1.data.results.data.corosals[i].corousal_image,
                corousal_name:
                  response1.data.results.data.corosals[i].corousal_name,
                is_category:
                  response1.data.results.data.corosals[i].is_category,
                type_id: response1.data.results.data.corosals[i].type_id,
              });
            } else {
              banMob.push({
                corousal_image:
                  response1.data.results.data.corosals[i].corousal_image,
                corousal_name:
                  response1.data.results.data.corosals[i].corousal_name,
                is_category:
                  response1.data.results.data.corosals[i].is_category,
                type_id: response1.data.results.data.corosals[i].type_id,
              });
            }
          }
          setBanner(bannerArray);
          setMobBanner(banMob);
          setNewArrivel(response1.data.results.data.new_arrival.slice(0, 8));
          setBudjet(response1.data.results.data.product_budget);
          setAdd(response1.data.results.data.banners);
          setTopDemand(response1.data.results.data.top_demand.slice(0, 8));
          setVideo(response1.data.results.data.Video);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [logToken, selectedCountry]);
  const loginActHandler = (logToken) => {
    setLogToken(logToken);
  };
  const productMinHandler = (price) => {
    history.push({
      pathname: "/new_arrivel",
      state: { data: "filMin", price: price },
    });
  };
  const prodDetHandler = (prodItem) => {
    console.log("prodItem---->", prodItem);
    history.push({
      pathname:
        "/products/" +
        prodItem.product_id +
        "/" +
        prodItem.colour_id +
        "/" +
        prodItem.product_name,
      state: { data: prodItem },
    });
  };

  let newArriv;
  if (loading) {
    newArriv = (
      <div className="d-flex justify-content-center align-items-center loader">
        {" "}
        <FadeLoader color="#00464d" />
      </div>
    );
  } else {
    newArriv = newArrival.map((item, index) => {
      return (
        <NewArrivalCard
          ProductImage={item.thumbnail_image}
          ProductName={item.product_name}
          cartSddHandler={() => prodDetHandler(item)}
          ProductId={"SKU:" + item.sku}
          PriceNew={
            item.is_on_discount
              ? item.discounted_final_price
              : item.total_price_final
          }
          PriceOld={item.is_on_discount ? item.total_price_final : null}
          key={index}
          Discount={
            item.discount_percentage !== null
              ? item.discount_percentage + "% OFF"
              : null
          }
          prodet={item}
          wishAct={item.wishlist_id}
          Suces={home}
          clicked={() => prodDetHandler(item)}
        />
      );
    });
  }
  let topDemnd;
  if (loading) {
    topDemnd = (
      <div className="d-flex justify-content-center align-items-center loader">
        {" "}
        <FadeLoader color="#00464d" />
      </div>
    );
  } else {
    topDemnd = topDeamd.map((item, index) => {
      return (
        <NewArrivalCard
          ProductImage={item.thumbnail_image}
          ProductName={item.product_name}
          cartSddHandler={() => prodDetHandler(item)}
          ProductId={"SKU:" + item.sku}
          PriceNew={
            item.is_on_discount
              ? item.discounted_final_price
              : item.total_price_final
          }
          PriceOld={item.is_on_discount ? item.total_price_final : null}
          key={index}
          Discount={
            item.discount_percentage !== null
              ? item.discount_percentage + "% OFF"
              : null
          }
          clicked={() => prodDetHandler(item)}
          wishAct={item.wishlist_id}
          Suces={home}
          prodet={item}
        />
      );
    });
  }
  let searchList;
  if (loading) {
    searchList = (
      <div className="d-flex justify-content-center align-items-center loader ">
        {" "}
        <FadeLoader color="#00464d" />
      </div>
    );
  } else if (serachList.length !== 0) {
    searchList = (
      <RecentSearch>
        {serachList
          .slice(0)
          .reverse()
          .map((item, index) => {
            return (
              <NewArrivalCard
                key={index}
                ProductImage={item.thumbnail_image}
                ProductName={item.product_name}
                ProductId={"SKU:" + item.sku}
                cartSddHandler={() => prodDetHandler(item)}
                PriceNew={
                  item.is_on_discount
                    ? item.discounted_final_price
                    : item.total_price_final
                }
                PriceOld={item.is_on_discount ? item.total_price_final : null}
                Discount={
                  item.discount_percentage !== null && undefined
                    ? item.discount_percentage + "% OFF"
                    : null
                }
                clicked={() => prodDetHandler(item)}
                Suces={home}
                wishAct={item.wishlist_id}
                prodet={item}
              />
            );
          })}
      </RecentSearch>
    );
  }
  console.log("add1111", add);

  return (
    <div>
      <Header
        countCartItems={cartCount}
        loginHandler={loginActHandler}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
      />
      <Banner banners={banner} tags={tags} mob={mobBanner} />
      <Features />
      <div className="container">
        <div className="row mobRow1">
          <ShopOnBudget>
            <BudgetCard
              head={"Under  " + budjet[0].budget}
              sub={budjet[0].count + " styles"}
              backgroundImage={shop1}
              clicked={() => productMinHandler(budjet[0].budget)}
            />
            <BudgetCard
              head={"Under  " + budjet[1].budget}
              sub={budjet[1].count + " styles"}
              backgroundImage={shop2}
              clicked={() => productMinHandler(budjet[1].budget)}
            />
            <BudgetCard
              head={"Under  " + budjet[2].budget}
              sub={budjet[2].count + " styles"}
              backgroundImage={shop3}
              clicked={() => productMinHandler(budjet[2].budget)}
            />
            <BudgetCard
              head={"Under  " + budjet[3].budget}
              sub={budjet[3].count + " styles"}
              backgroundImage={shop4}
              clicked={() => productMinHandler(budjet[3].budget)}
            />
          </ShopOnBudget>
        </div>
      </div>
      <div className="container newarrivalContainer">
        <NewArrivals>{newArriv}</NewArrivals>
      </div>
      <div className="container bringthepartpage">
        <BringTheParty add={add} />
      </div>
      <div className="container newarrivalContainer">
        <TopDemanded>{topDemnd}</TopDemanded>

        <Certificate video={"https://www.youtube.com/embed/s3PrxdvAihI"} />

        {searchList}

        <DownloadOurAppImage />
        {/* <RecentSearch /> */}
      </div>
      <SliderFeature />

      <Footer />
    </div>
  );
};

export default LandingPage;
