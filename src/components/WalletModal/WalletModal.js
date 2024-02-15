import React from "react";
import Classes from "./WalletModal.module.css";
import wallet from "../../Assets/wallet.png";

const WalletModal = () => {
  return (
    <div>
      <div className={Classes.WalletContainer}>
        <h3>Do you want to pay from swa wallet / swa exchange</h3>
      </div>
      <div className={Classes.AmountCheckContainer}>
        <div className={Classes.ContentLines}>
          <div className={Classes.Content}>
            <input type="checkbox" />
            <img src={wallet} />
            <p className={Classes.Word}>Swa Wallet</p>
          </div>
          <p className={Classes.Amount}>&#x20B9; 564</p>
        </div>
        <div className={Classes.ContentLines}>
          <div className={Classes.Content}>
            <input type="checkbox" />
            <img src={wallet} />
            <p className={Classes.Word}>Exchange Wallet</p>
          </div>
          <p className={Classes.Amount}>&#x20B9; 564</p>
        </div>
      </div>
      <div className={Classes.ButtonContainer}>
        <div className={Classes.Cancel}>
          <p>Cancel & continue</p>
        </div>
        <div className={Classes.Apply}>
          <p>Apply</p>
        </div>
      </div>
    </div>
  );
};

export default WalletModal;
