import React, { useEffect, useState } from "react";
import FAQ from "../../components/FAQ/FAQ";
import Header from "../../components/HeaderNew/Header";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import * as Urls from "../../Urls";

function FAQPage() {
  const [cartCount, setCartCount] = useState("");
  const token = localStorage.getItem("swaToken");
  const countryId = localStorage.getItem("id");
  const flag = localStorage.getItem("flag_image");
  const Contryname = localStorage.getItem("country_name");
  const [selectedCountry, setSelectedCountry] = useState({
    id: countryId,
    flag_image: flag,
    country_name: Contryname,
  });
  useEffect(() => {
    if (token !== null) {
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
    }
  }, []);
  return (
    <div>
      <Header
        countCartItems={cartCount}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
      />
      <FAQ />
      <Footer />
    </div>
  );
}

export default FAQPage;
