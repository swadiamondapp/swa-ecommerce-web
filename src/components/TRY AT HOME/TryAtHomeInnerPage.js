import React, { useState } from "react";
import Header from "../HeaderNew/Header";
import TryAtHomeInner from "./TryAtHomeInner";
import Features from "../Features/Features";
import Footer from "../Footer/Footer";
import useCanonicalTag from "../../useCanonicalTag";

const TryAtHomeInnerPage = () => {
  const countryId = localStorage.getItem("id");
  const flag = localStorage.getItem("flag_image");
  const Contryname = localStorage.getItem("country_name");
  const [selectedCountry, setSelectedCountry] = useState({
    id: countryId,
    flag_image: flag,
    country_name: Contryname,
  });
  useCanonicalTag();
  return (
    <div>
      <div>
        <Header
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
        />
      </div>
      <div>
        <TryAtHomeInner />
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

export default TryAtHomeInnerPage;
