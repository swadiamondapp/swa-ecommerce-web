import React, { useState, useEffect } from "react";
import Classes from "../SwaWallet/SwaWallet.module.css";
import Wallet from "../../Assets/wallet1.png";
import AddBank from "../LifeTImeModal/AddBank";
import TransferMoneyModal from "../WalletModal/TransferMoneyModal";
import axios from "axios";
import * as Urls from "../../Urls";

const SwaWallet = () => {
  const [transferModalOpen, setTransferModalOpen] = useState(false);
  const [banklists, setBanklists] = useState([]);
  const countryId = localStorage.getItem("id");
  const [walletValues, setWalletValues] = useState(null);
  const [walletDetails, setWalletDetails] = useState([]);
  console.log("walletValues", walletValues);
  console.log("walletDetails", walletDetails);
  const token = localStorage.getItem("swaToken");
  const movetoBank = () => {
    setTransferModalOpen(true);
    axios
      .get(Urls.BankLists, {
        headers: { Authorization: "Token " + token },
      })
      .then((response1) => {
        setBanklists(response1.data.results.Bank_Details);
        console.log("banklists", response1.data.results.Bank_Details);
      })
      .catch((error) => {
        console.log(error);
      });
  };
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
  const getSwaWalletAmountsDetails = async () => {
    try {
      const response = await axios.get(
        `${Urls.withdrawamountDetails}?country=${countryId}`,
        {
          headers: { Authorization: "Token " + token },
        }
      );
      setWalletDetails(response.data.results.data.withdraw_details);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSwaWalletAmounts();
    getSwaWalletAmountsDetails();
  }, []);

  return (
    <div className={Classes.mainContianer}>
      <div className="container">
        <div className={Classes.title}>SWA Wallet</div>
        <div className={Classes.container}>
          <div className={Classes.swaWalletBalanceContainer}>
            <div className={Classes.walletLeft}>
              <div className={Classes.walletTitle}>SWA WALLET BALANCE</div>
              <div className={Classes.head}>
                <img src={Wallet} />

                <span>${walletValues ? walletValues.swa_wallet : null}</span>
              </div>
            </div>
            <div className={Classes.walletRight}>
              <button onClick={movetoBank}>MOVE TO BANK</button>
            </div>

            <TransferMoneyModal
              open={transferModalOpen}
              banklists={banklists}
              movetoBank={movetoBank}
              handleopens={() => setTransferModalOpen(true)}
              handleClose={() => setTransferModalOpen(false)}
              getSwaWalletAmounts={getSwaWalletAmounts}
            />
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
        {/* transfer bank details */}
        <div className={Classes.container} style={{ marginTop: "20px" }}>
          <div className={Classes.ParentTransfer1}>
            <div className={Classes.LeftTransferfund}>
              <h3>Transfered Bank details</h3>
              <p>Requested on : 23 April 24, 3:30AM</p>
            </div>
            <div className={Classes.RightTransfercall}>
              <p>Need Support : 1800 699 888</p>
            </div>
          </div>
          {walletDetails.map((item) => (
            <div className={Classes.T1Parent}>
              <div className={Classes.T1Leftsec}>
                <p>{item && item.bank_details && item.bank_details.Name}</p>
                <p>
                  Account Number :{" "}
                  {item &&
                    item.bank_details &&
                    item.bank_details.Account_Number}
                </p>
                <p>
                  IFSC: {item && item.bank_details && item.bank_details.IFSC}
                </p>
                <p>
                  Bank : {item && item.bank_details && item.bank_details.Bank}
                </p>
                <p>
                  Branch:{" "}
                  {item && item.bank_details && item.bank_details.Branch}
                </p>
              </div>
              <div className={Classes.T1Rightsec}>
                <p>WITHDRAW AMOUNT</p>
                <h3>
                  ₹ {console.log("itemsanas", item)}
                  {item && item.withdrawal_amount}
                </h3>
              </div>
            </div>
          ))}
        </div>
        {/* transfer bank details */}
      </div>
    </div>
  );
};

export default SwaWallet;
