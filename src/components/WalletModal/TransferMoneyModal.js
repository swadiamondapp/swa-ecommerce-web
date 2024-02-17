import React from "react";
import Classes from "./WalletModal.module.css";
import wallet from "../../Assets/wallet.png";
import { PiBank } from "react-icons/pi";
import { FaPlus } from "react-icons/fa6";

const TransferMoneyModal = () => {
  return (
    <div>
      <div className={Classes.WalletContainer}>
        <h3>Transfer money to</h3>
      </div>
      <div className={Classes.AmountCheckContainer}>
        <div className={Classes.ContentLines}>
          <div className={Classes.Content}>
            <PiBank className={Classes.Bank} />
            <p className={Classes.Word}>Axis Bank A/C</p>
          </div>
          <input type="radio" />
        </div>
        <p>91999567000034</p>
        <div className={Classes.ContentLines}>
          <div className={Classes.Content}>
            <PiBank className={Classes.Bank} />
            <p className={Classes.Word}>Add another Bank account</p>
          </div>
          <FaPlus className={Classes.Bank} />
        </div>
        <div className={Classes.ContentLines}>
          <div className={Classes.Content}>
            <img src={wallet} />
            <p className={Classes.Word}>Swa Wallet</p>
          </div>
          <input type="radio" />
        </div>
      </div>
      <div className={Classes.ConfirmButton}>CONFIRM</div>
    </div>
  );
};

export default TransferMoneyModal;
