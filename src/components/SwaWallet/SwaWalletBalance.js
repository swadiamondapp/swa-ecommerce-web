import React, { useEffect, useState } from "react";
import Header from "../../components/HeaderNew/Header";
import Features from "../../components/Features/Features";
import Footer from "../../components/Footer/Footer";
import SwaWallet from "./SwaWallet";

const SwaWalletBalance = () => {
  return (
    <div>
      <div>
        <Header  />
        <SwaWallet/>

        <div >
          <Features />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default SwaWalletBalance;
