import React, { useState } from "react";
import Header from "../../components/HeaderNew/Header";
import Features from "../../components/Features/Features";
import Footer from "../../components/Footer/Footer";
import Rating from "../../components/Rating/Rating";
import Classes from "./RateAndReview.module.css";
import RateReviewMain from "../../components/Rating/RateReviewMain";
import SliderFeature from "../../components/ProductDetails/SliderFeature";

const RateAndReviewMain = () => {
  const [cartCount, setCartCount] = useState("");
  const countryId = localStorage.getItem("id");
  const flag = localStorage.getItem("flag_image");
  const Contryname = localStorage.getItem("country_name");
  const [selectedCountry, setSelectedCountry] = useState({
    id: countryId,
    flag_image: flag,
    country_name: Contryname,
  });
  return (
    <div>
      <div className={Classes.BgColour}>
        <Header
          countCartItems={cartCount}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
        />
        <div className={Classes.Margin}>
          <RateReviewMain />
        </div>
        <div className={Classes.Features}>
          <SliderFeature />
          <Features />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RateAndReviewMain;
