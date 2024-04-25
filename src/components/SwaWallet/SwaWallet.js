import React from "react";
import Classes from "../SwaWallet/SwaWallet.module.css";
import Wallet from "../../Assets/wallet1.png";

const SwaWallet = () => {
  return (
    <div className={Classes.mainContianer}>
      <div className="container">
        <div className={Classes.title}>SWA Wallet</div>
        <div className={Classes.container}>
          <div className={Classes.swaWalletBalanceContainer}>
            <div className={Classes.walletTitle}>SWA WALLET BALANCE</div>
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
              1. Your amount will be transfered to your bank account after
              verified checkup of the product
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

export default SwaWallet;
