import React, { useState, useEffect } from "react";
import Classes from "./WalletModal.module.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { BiRupee } from "react-icons/bi";
import { CgDollar } from "react-icons/cg";
import Image from "next/image";
import { useAuth } from "@/providers/auth-provider";
import { useCountry } from "@/providers/country-provider";
import { useIsMobile } from "@/hooks/useIsMobile";
const style = {
  position: "absolute",
  top: "41%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  border: "none",
  borderRadius: "6px",
  width: "360px",
  // p: 2,
};

const mobileStyle = {
  position: "absolute",
  bottom: 0,
  transition: "transform 0.3s ease-in-out",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  borderRadius: "4px",
  // p: 2,
  overflow: "auto",
  maxHeight: "85%",
  width: "100%",
};

const WalletModal = (props) => {
  const { token, setToken } = useAuth();
  const { countryId, countryName } = useCountry();
  const isMobileView = useIsMobile();

  const handleWalletCheck = (e) => {
    const value = e.target.checked ? props.walletValues.swa_wallet : null;
    props.setSwaWallet(value);
  };

  const handleExchangeWalletCheck = (e) => {
    const value = e.target.checked ? props.walletValues.exchange_wallet : null;
    props.setSwaExchangeWallet(value);
  };

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={isMobileView ? mobileStyle : style}>
          <div>
            <div className={Classes.WalletContainer}>
              <h3>
                Do you want to pay from <br />
                swa wallet / swa exchange
              </h3>
            </div>
            {/* <div className={Classes.BorderLine}></div> */}
            <div className={Classes.AmountCheckContainer}>
              <div className={Classes.WalletContentLines}>
                <div className={Classes.Content}>
                  <input
                    type="checkbox"
                    value={props.walletValues.swa_wallet}
                    checked={props.swaWallet !== null}
                    onChange={handleWalletCheck}
                  />
                  <Image src={"/Assets/wallet.png"} alt="wallet" width={20} height={20} />
                  <p className={Classes.Word}>Swa Wallet</p>
                </div>
                <p className={Classes.Amount}>
                  {countryName === "India" && (
                    <BiRupee className={Classes.Rupee} />
                  )}
                  {countryName === "United States" && (
                    <CgDollar className={Classes.Rupee} />
                  )}
                  {countryName === "United Arab Emirates" && (
                    <span style={{ paddingRight: "5px" }}>AED</span>
                  )}{" "}
                  {props.walletValues.swa_wallet}
                </p>
              </div>
              <div className={Classes.WalletContentLines}>
                <div className={Classes.Content}>
                  <input
                    type="checkbox"
                    value={props.walletValues.exchange_wallet}
                    checked={props.swaExchangeWallet !== null}
                    onChange={handleExchangeWalletCheck}
                  />
                  <Image src={"/Assets/wallet.png"} alt="wallet" width={20} height={20} />
                  <p className={Classes.Word}>Exchange Wallet</p>
                </div>
                <p className={Classes.Amount}>
                  {countryName === "India" && (
                    <BiRupee className={Classes.Rupee} />
                  )}
                  {countryName === "United States" && (
                    <CgDollar className={Classes.Rupee} />
                  )}
                  {countryName === "United Arab Emirates" && (
                    <span style={{ paddingRight: "5px" }}>AED</span>
                  )}{" "}
                  {props.walletValues.exchange_wallet}
                </p>
              </div>
            </div>
            <div className={Classes.ButtonContainer}>
              <div className={Classes.Cancel} onClick={props.handleNext}>
                <p>Cancel & continue</p>
              </div>
              <div className={Classes.Apply} onClick={props.handleApply}>
                <p>Apply</p>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default WalletModal;
