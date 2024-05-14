import React, { useState } from "react";
import Classes from "./PaymentPage.module.css";
import Header from "../../components/HeaderNew/Header";
import Features from "../../components/Features/Features";
import Footer from "../../components/Footer/Footer";
import Payment from "../../components/Payment/Payment";

const PaymentPage = (props) => {
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
      <div className={Classes.Background}>
        <Header
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
        />
        <Payment />
        <div className={Classes.Features}>
          <Features />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default PaymentPage;
