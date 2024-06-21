import React, { useState, useEffect } from "react";
import Classes from "../SwaWallet/SwaWallet.module.css";
import Wallet from "../../Assets/wallet1.png";
import axios from "axios";
import * as Urls from "../../Urls";

const SwaExchangeWallet = () => {
  const [walletValues, setWalletValues] = useState(null);
  const token = localStorage.getItem("swaToken");
  const countryId = localStorage.getItem("id");

  const getSwaWalletAmounts = async () => {
    try {
      const response = await axios.get(
        `${Urls.getWalletAmounts}?country=${countryId}`,
        {
          headers: { Authorization: "Token " + token },
        }
      );
      setWalletValues(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSwaWalletAmounts();
  }, []);
  return (
    <div className={Classes.mainContianer}>
      <div className="container">
        <div className={Classes.title}>SWA Exchange</div>
        <div className={Classes.container}>
          <div className={Classes.swaWalletBalanceContainer}>
            <div className={Classes.walletTitle}>SWA EXCHANGE BALANCE</div>
            <div className={Classes.head}>
              <img src={Wallet} />

              <span>
                $ {walletValues ? walletValues.exchange_wallet : null}
              </span>
            </div>
          </div>
          <div
            style={{ borderTop: "1px solid lightGray", margin: "10px 10px" }}
          ></div>
          <div className={Classes.texts}>
            <p>Note:</p>
            <span>
              1.buyback with 15 days of delivery will be 100% of your money will
              be refunded
              <br />
            </span>
            <span>
              2. buyback after 15 days of delivery will be 10% of your money
              will be deducted
              <br />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwaExchangeWallet;
