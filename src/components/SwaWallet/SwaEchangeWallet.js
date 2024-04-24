import React from "react";
import Classes from "../SwaWallet/SwaWallet.module.css";
import Wallet from "../../Assets/wallet1.png";

const SwaExchangeWallet = () => {
  return (
    <div className={Classes.mainContianer}>
      <div className="container">
        <div className={Classes.title}>SWA Exchange</div>
        <div className={Classes.container}>
          <div className={Classes.swaWalletBalanceContainer}>
            <div className={Classes.walletTitle}>SWA EXCHANGE BALANCE</div>
            <div className={Classes.head}>
              <img src={Wallet} />

              <span>$796</span>
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
              will be dedected
              <br />
            </span>
            <span>
              3.Lorem ipsum dolor sit amet consectetur. Felis faucibus cras enim
              pretium semper.
              <br />
            </span>
            <span>
              4.Lorem ipsum dolor sit amet consectetur. Felis faucibus cras enim
              pretium semper.
              <br />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwaExchangeWallet;
