"use client";
import React, { useState, useEffect } from "react";
import Classes from "./WalletModal.module.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { PiBank } from "react-icons/pi";
import { FaPlus } from "react-icons/fa6";
import axios from "axios";
import * as Urls from "@/utils/urls";
import Image from "next/image";
import AddBank from "../lifetimemodal/addBank";
import { useAuth } from "@/providers/auth-provider";
import { useCountry } from "@/providers/country-provider";
import { useIsMobile } from "@/hooks/useIsMobile";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  border: "none",
  borderRadius: "6px",
  width: "360px",
  outline: "none",
  overflowY: "scroll",

  // p: 2,
};
const successM = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  borderRadius: "4px",
  p: 4,
};

const TransferMoneyModal = (props) => {
  const [open, setOpen] = useState(false);
  // const token = localStorage.getItem("swaToken");
  const [addBankOpen, setAddBankOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState("");
  const [showNextModal, setShowNextModal] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [selectedBankDetails, setSelectedBankDetails] = useState(null);
  const [useFullAmount, setUseFullAmount] = useState(false);
  // const countryId = localStorage.getItem("id");
  const { token } = useAuth();
  const { countryId } = useCountry();
  const isMobileView = useIsMobile();
  
  const handleClose = () => {
    setOpen(false);
  };
  const handleRadioChnage = (bank) => {
    setSelectedBank(bank.id);
    setSelectedBankDetails(bank);
  };

  const handleNextClick = () => {
    if (selectedBank !== "") {
      props.handleClose();
      setShowNextModal(true);
    } else {
      // Handle case where no bank is selected
      alert("Please select a bank to proceed.");
    }
  };
  const handleCloseNextModal = () => {
    setShowNextModal(false);
  };
  const changeaccount = () => {
    setShowNextModal(false);
    props.handleopens();
  };
  const requestWithdraw = () => {
    const body = {
      bank_id: selectedBank,
      withdrawal_amount: useFullAmount ? props.walletAmount : withdrawalAmount,
    };

    axios
      .post(`${Urls.withdrawamount}?country=${countryId}`, body, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((response) => {
        if (response.data) {
          setShowNextModal(false);
          setSuccessModalOpen(true);
          setWithdrawalAmount("");
          setTimeout(() => {
            setSuccessModalOpen(false);

            handleClose();
            props.handleClose();
          }, 3000); // Close the success modal after 5 seconds
          props.getSwaWalletAmounts();
          props.getSwaWalletAmountsDetails();
        } else {
          alert("Failed to submit withdrawal request.");
        }
      })
      .catch((error) => {
        console.error(error);
        alert("An error occurred while submitting your request.");
      });
  };

  const style = {
    position: "absolute",
    bottom: 0,
    width: "96%",
    height: "auto",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 2,
    outline: "none",
    m: 1,
    borderRadius: "4px",
  };
  const styleDesk = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    width: "400px",
    height: "auto",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 2,
    outline: "none",
    borderRadius: "4px",
  };

  return (
    <div className={Classes.bankDetailmodal}>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        // open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={isMobileView ? style : styleDesk}>
          <div>
            <div className={Classes.WalletContainer}>
              <h3>Bank Details</h3>
            </div>
            <div className={Classes.AmountCheckContainer}>
              <div>
                {props &&
                  props.banklists &&
                  props.banklists.map((Item) => (
                    <>
                      <div
                        className={Classes.ContentLines}
                        // style={{ marginTop: "20px" }}
                      >
                        <div className={Classes.Content}>
                          <PiBank className={Classes.Bank} />
                          <p className={Classes.Word}>{Item.bank_name}</p>
                        </div>
                        <input
                          type="radio"
                          name="bank"
                          onClick={() => handleRadioChnage(Item)}
                        />
                      </div>
                      <p className={Classes.Phone}>{Item.account_number}</p>
                    </>
                  ))}
              </div>
              <div className={Classes.ContentLines}>
                <div
                  className={Classes.Content}
                  onClick={() => setAddBankOpen(true)}
                >
                  <PiBank className={Classes.Bank} />
                  <p className={Classes.Word}>Add another Bank account</p>
                </div>
                <FaPlus className={Classes.Plus} />
              </div>
              <div className={Classes.Border}></div>
              <AddBank
                open={addBankOpen}
                movetoBank={props.movetoBank}
                handleClose={() => setAddBankOpen(false)}
              />
              {/* <div
                className={Classes.ContentLines}
                style={{ paddingTop: "15px" }}
              >
                <div className={Classes.Content}>
                  <img src={wallet} />
                  <p className={Classes.Word}>Swa Wallet</p>
                </div>
                <input type="radio" />
              </div> */}
            </div>
            <div className={Classes.ConfirmButton} onClick={handleNextClick}>
              NEXT
            </div>
          </div>
        </Box>
      </Modal>
      {/* Modal to show after NEXT button click */}
      <Modal
        open={showNextModal}
        onClose={handleCloseNextModal}
        aria-labelledby="next-modal-title"
        aria-describedby="next-modal-description"
      >
        <Box sx={style}>
          <div>
            <div style={{ padding: "20px" }}>
              <div className={Classes.walletheading}>
                <div>Amount you want to withdraw</div>
                <Image
                  src={`/Assets/walletclose.png`}
                  alt="walletclose"
                  width={20}
                  height={20}
                  onClick={handleCloseNextModal}
                />
              </div>
              <div className={Classes.parentbankwallet}>
                <div className={Classes.leftmodal1}>
                  <div className={Classes.ContentLines}>
                    <div className={Classes.Content}>
                      <PiBank className={Classes.Bank} />
                      <p className={Classes.Word}>
                        {" "}
                        {selectedBankDetails && selectedBankDetails.bank_name}
                      </p>
                    </div>
                  </div>
                  <p className={Classes.Phone}>
                    {selectedBankDetails && selectedBankDetails.account_number}
                  </p>
                </div>
                <div className={Classes.rightmodal2}>
                  <button onClick={changeaccount}>Change</button>
                </div>
              </div>
              <div className={Classes.Enteramountwallet}>
                <label style={{ color: "#585F67" }}>Enter amount</label>
                <input
                  type="number"
                  placeholder="₹ 2000"
                  value={withdrawalAmount}
                  onChange={(e) => setWithdrawalAmount(e.target.value)}
                />
              </div>
              <div className={Classes.fullwalletamount}>
                <div className={Classes.fullamountLeft}>
                  <Image
                    src={`/Assets/wallet1.png`}
                    alt="wallet"
                    width={20}
                    height={20}
                  />
                  Full Amount from wallet
                </div>
                <div className={Classes.rightamountewallet}>
                  <input
                    type="checkbox"
                    checked={useFullAmount}
                    onChange={(e) => setUseFullAmount(e.target.checked)}
                  />
                </div>
              </div>
              <div className={Classes.requestWidrw}>
                <button onClick={requestWithdraw}>REQUEST TO WITHDRAW</button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
      {/* success modal */}
      <Modal open={successModalOpen} onClose={() => setSuccessModalOpen(false)}>
        <Box
          sx={successM}
          style={
            isMobileView ? { width: "90%" } : { width: "30%", height: "auto" }
          }
        >
          <div className={Classes.successModalContainer}>
            <div>
              <Image
                src={`/Assets/successTick.png`}
                alt="SuccessTick"
                width={40}
                height={40}
              />
            </div>
            <div
              style={{
                textAlign: "center",
                margin: "12px 0px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span className={Classes.titlesuccesModal}>Thank you</span>
            </div>
          </div>
        </Box>
      </Modal>
      {/* success modal */}
    </div>
  );
};

export default TransferMoneyModal;
