import Footer from "../../components/Footer/Footer";
import React, { useState } from "react";
import Header from "../../components/HeaderNew/Header";
import success from "../../Assets/sucesLarge.png";
import Classes from "./OrderSuccessful.module.css";
import { BsFillCheckCircleFill } from "react-icons/bs";

function OrderSuccessfulPage() {
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
      <Header
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
      />
      <div className={Classes.Successful}>
        <div className={Classes.SuccessText}>
          <img src={success} alt="suces" />
          {/* <BsFillCheckCircleFill className={Classes.Image} size={200} color='rgb(182, 191, 199)'/> */}
          <p className={Classes.OrderSuccessful}>Order placed sucessfully</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default OrderSuccessfulPage;
