import React, { useEffect, useState } from "react";
import Header from "../../components/HeaderNew/Header";
import Features from "../../components/Features/Features";
import Footer from "../../components/Footer/Footer";

import SwaExchangeWallet from "./SwaEchangeWallet";

const SwaWalletBalance = () => {
  return (
    <div>
      <div>
        <Header  />
        <SwaExchangeWallet/>

        <div >
          <Features />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default SwaWalletBalance;
