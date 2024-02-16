import React, { useState } from "react";
import Header from "../../components/HeaderNew/Header";
import Features from "../../components/Features/Features";
import Footer from "../../components/Footer/Footer";
import Rating from "../../components/Rating/Rating";
import Classes from "./RateAndReview.module.css";
import RateReviewMain from "../../components/Rating/RateReviewMain";

const RateAndReviewMain = () => {
  const [cartCount, setCartCount] = useState("");
  return (
    <div>
      <div className={Classes.BgColour}>
        <Header countCartItems={cartCount} />
        <div className={Classes.Margin}>
          <RateReviewMain />
        </div>
        <div className={Classes.Features}>
          <Features />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RateAndReviewMain;
