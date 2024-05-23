import React, { useState, useEffect } from "react";
import Classes from "./WalletModal.module.css";
import wallet from "../../Assets/wallet.png";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import * as Urls from "../../Urls";
import { Button } from "@mui/material";

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
  const token = localStorage.getItem("swaToken");
  const [walletValues, setWalletValues] = useState([]);
  const countryId = localStorage.getItem("id");
  const [isMobileView, setIsMobileView] = useState(
    window.innerWidth >= 300 && window.innerWidth <= 575
  );

  useEffect(() => {
    getSwaWalletAmounts();
  }, [props.open]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth >= 300 && window.innerWidth <= 575);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener when component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobileView]);

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

  const handleWalletCheck = (e) => {
    const value = e.target.checked ? walletValues.swa_wallet : null;
    props.setSwaWallet(value);
  };

  const handleExchangeWalletCheck = (e) => {
    const value = e.target.checked ? walletValues.exchange_wallet : null;
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
          <Typography>
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
                    value={walletValues.swa_wallet}
                    checked={props.swaWallet !== null}
                    onChange={handleWalletCheck}
                  />
                  <img src={wallet} />
                  <p className={Classes.Word}>Swa Wallet</p>
                </div>
                <p className={Classes.Amount}>
                  &#x20B9; {walletValues.swa_wallet}
                </p>
              </div>
              <div className={Classes.WalletContentLines}>
                <div className={Classes.Content}>
                  <input
                    type="checkbox"
                    value={walletValues.exchange_wallet}
                    checked={props.swaExchangeWallet !== null}
                    onChange={handleExchangeWalletCheck}
                  />
                  <img src={wallet} />
                  <p className={Classes.Word}>Exchange Wallet</p>
                </div>
                <p className={Classes.Amount}>
                  &#x20B9; {walletValues.exchange_wallet}
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
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default WalletModal;
