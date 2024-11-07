import React, { useState, useEffect } from "react";
import Header from "../../components/HeaderNew/Header";
import Outlet from "../../components/OUTLET/Outlet";
import SliderFeature from "../../components/ProductDetails/SliderFeature";
import Features from "../../components/Features/Features";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import * as Urls from "../../Urls";

const OutletPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
      <div>
        <Header
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          countCartItems={cartCount}
        />
      </div>
      <div>
        <Outlet />
      </div>
      <div>
        <SliderFeature />
        <Features />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default OutletPage;
