import React, { useState } from "react";
import Header from "../HeaderNew/Header";
import Features from "../Features/Features";
import Footer from "../Footer/Footer";
import TryAtHome from "./TryAtHome";

const TryAtHomePage = () => {
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
      </div>
      <div>
        <TryAtHome />
      </div>
      <div>
        <Features />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default TryAtHomePage;
