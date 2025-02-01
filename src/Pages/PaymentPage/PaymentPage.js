import React, { useState, useEffect } from "react";
import Classes from "./PaymentPage.module.css";
import Header from "../../components/HeaderNew/Header";
import Features from "../../components/Features/Features";
import Footer from "../../components/Footer/Footer";
import Payment from "../../components/Payment/Payment";
import SliderFeature from "../../components/ProductDetails/SliderFeature";
import axios from "axios";
import * as Urls from "../../Urls";
import useCanonicalTag from "../../useCanonicalTag";

const PaymentPage = (props) => {
  const countryId = localStorage.getItem("id");
  const flag = localStorage.getItem("flag_image");
  const Contryname = localStorage.getItem("country_name");
  const token = localStorage.getItem("swaToken");
  const [cartCount, setCartCount] = useState("");
  const [selectedCountry, setSelectedCountry] = useState({
    id: countryId,
    flag_image: flag,
    country_name: Contryname,
  });
  useCanonicalTag();

  useEffect(() => {
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
  }, []);

  return (
    <div>
      <div className={Classes.Background}>
        <Header
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          countCartItems={cartCount}
        />
        <Payment />
        <div className={Classes.Features}>
          <SliderFeature />
          <Features />
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default PaymentPage;
