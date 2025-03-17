"use client";
import React, { useState, useEffect, useCallback } from "react";
import Classes from "../SwaWallet/SwaWallet.module.css";
import TransferMoneyModal from "../WalletModal/TransferMoneyModal";
import axios from "axios";
import * as Urls from "@/utils/urls";
import { BiRupee } from "react-icons/bi";
import { CgDollar } from "react-icons/cg";
import { FaPhoneAlt } from "react-icons/fa";
import Image from "next/image";
import { useCountry } from "@/providers/country-provider";
import { useAuth } from "@/providers/auth-provider";
import { useIsMobile } from "@/hooks/useIsMobile";

const SwaWallet = () => {
  const [transferModalOpen, setTransferModalOpen] = useState(false);
  const [banklists, setBanklists] = useState([]);
  const [walletValues, setWalletValues] = useState(null);
  const [walletAmount, setWalletAmount] = useState();
  const [walletDetails, setWalletDetails] = useState([]);

  const isMobileView = useIsMobile();
  const { countryName, countryId } = useCountry();
  const { token } = useAuth();

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
      setWalletAmount(response.data.swa_wallet);
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
    if (token) {
      getSwaWalletAmounts();
      getSwaWalletAmountsDetails();
    }
  }, [token]);

  return (
    <div className={Classes.mainContianer}>
      <div className="container">
        <div className={Classes.title}>SWA Wallet</div>
        <div className={Classes.container}>
          <div className={Classes.swaWalletBalanceContainer}>
            <div className={Classes.walletLeft}>
              <div className={Classes.walletTitle}>SWA WALLET BALANCE</div>
              <div className={Classes.head}>
                <Image
                  src={`/Assets/wallet1.png`}
                  alt="Wallet"
                  width={30}
                  height={25}
                />
                <span className="flex items-center gap-1">
                  {countryName === "India" && <BiRupee size={25} />}
                  {countryName === "United States" && <CgDollar size={25} />}
                  {countryName === "United Arab Emirates" && (
                    <span style={{ paddingRight: "5px", paddingLeft: "7px" }}>
                      AED
                    </span>
                  )}
                  {walletValues ? walletValues.swa_wallet : null}
                </span>
              </div>
            </div>
            {!isMobileView && (
              <div className={Classes.walletRight}>
                <button
                  onClick={movetoBank}
                  disabled={!walletValues || walletValues.swa_wallet === 0}
                  className={
                    !walletValues || walletValues.swa_wallet === 0
                      ? Classes.disabledButton
                      : ""
                  }
                >
                  MOVE TO BANK
                </button>
              </div>
            )}

            <TransferMoneyModal
              open={transferModalOpen}
              banklists={banklists}
              movetoBank={movetoBank}
              handleopens={() => setTransferModalOpen(true)}
              handleClose={() => setTransferModalOpen(false)}
              getSwaWalletAmounts={getSwaWalletAmounts}
              getSwaWalletAmountsDetails={getSwaWalletAmountsDetails}
              walletAmount={walletAmount}
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
          {isMobileView && (
            <div className={Classes.walletRight} style={{ width: "100%" }}>
              <button
                style={{ width: "100%" }}
                onClick={movetoBank}
                disabled={!walletValues || walletValues.swa_wallet === 0}
                className={
                  !walletValues || walletValues.swa_wallet === 0
                    ? Classes.disabledButton
                    : ""
                }
              >
                MOVE TO BANK
              </button>
            </div>
          )}
        </div>
        {/* transfer bank details */}
        <div className={Classes.container} style={{ marginTop: "20px" }}>
          <div className={Classes.ParentTransfer1}>
            <div className={Classes.LeftTransferfund}>
              <h3>Transfered Bank details</h3>
              <p>Requested on : 23 April 24, 3:30AM</p>
            </div>
            {!isMobileView && (
              <div className={Classes.RightTransfercall}>
                <p style={{ fontWeight: "600" }} className="flex items-center gap-2">
                  Need Support :{" "}
                  <FaPhoneAlt style={{ fontSize: "14px", color: "black" }} />{" "}
                  1800 699 888
                </p>
              </div>
            )}
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
                <p style={{ color: "#86898B" }}>WITHDRAW AMOUNT</p>
                <h3>
                  ₹ {console.log("itemsanas", item)}
                  {item && item.withdrawal_amount}
                </h3>
              </div>
            </div>
          ))}
        </div>
        {/* transfer bank details */}
        {isMobileView && (
          <div
            className={Classes.RightTransfercall}
            style={{ marginLeft: "10%", marginTop: "14px" }}
          >
            <p style={{ fontWeight: "600" }}>
              Need Support : <FaPhoneAlt style={{ color: "black" }} /> 1800 699
              888
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SwaWallet;
