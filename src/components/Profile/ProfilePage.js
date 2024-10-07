import React, { useState } from "react";
import Header from "../HeaderNew/Header";
import Profile from "./Profile";
import Features from "../Features/Features";
import Footer from "../Footer/Footer";

const ProfilePage = () => {
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
        <Profile />
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

export default ProfilePage;
