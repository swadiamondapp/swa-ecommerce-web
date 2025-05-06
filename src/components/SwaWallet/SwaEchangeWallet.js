"use client";
import React, { useState, useEffect } from "react";
import Classes from "../SwaWallet/SwaWallet.module.css";
import axios from "axios";
import { getWalletAmounts } from "@/utils/urls";
import Image from "next/image";
import { useCountry } from "@/providers/country-provider";
import { useAuth } from "@/providers/auth-provider";

const SwaExchangeWallet = () => {
  const [walletValues, setWalletValues] = useState(null);
  const { countryId } = useCountry();
  const { token } = useAuth();
  
  const getSwaWalletAmounts = async () => {
    try {
      const response = await axios.get(
        `${getWalletAmounts}?country=${countryId}`,
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
    if (token) {
      getSwaWalletAmounts();
    }
  }, [token]);

  return (
    <div className={Classes.mainContianer}>
      <div className="container">
        <div className={Classes.title}>SWA Exchange</div>
        <div className={Classes.container}>
          <div className={Classes.swaWalletBalanceContainer}>
            <div className={Classes.walletTitle}>SWA EXCHANGE BALANCE</div>
            <div className={Classes.head}>
              <Image
                src={`/Assets/wallet1.png`}
                alt="Wallet"
                width={30}
                height={25}
              />

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
