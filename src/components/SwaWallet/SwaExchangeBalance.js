import React, { useEffect, useState } from "react";
import Header from "../../components/HeaderNew/Header";
import Features from "../../components/Features/Features";
import Footer from "../../components/Footer/Footer";

import SwaExchangeWallet from "./SwaEchangeWallet";

const SwaWalletBalance = () => {
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
      <div>
        <Header
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
        />
        <SwaExchangeWallet />

        <div>
          <Features />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default SwaWalletBalance;
