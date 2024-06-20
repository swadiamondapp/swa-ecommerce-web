import React, { useState, useEffect } from "react";
import Classes from "./WalletModal.module.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import wallet from "../../Assets/wallet.png";
import { PiBank } from "react-icons/pi";
import { FaPlus } from "react-icons/fa6";
import { Button } from "@mui/material";
import AddBank from "../LifeTImeModal/AddBank";
import axios from "axios";
import * as Urls from "../../Urls";
import SuccessTick from "../../Assets/successTick.png";
import Item from "antd/es/list/Item";
import walletclose from "../../Assets/walletclose.png";

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
  const token = localStorage.getItem("swaToken");
  const [addBankOpen, setAddBankOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState("");
  const [showNextModal, setShowNextModal] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [selectedBankDetails, setSelectedBankDetails] = useState(null);
  const countryId = localStorage.getItem("id");

  const [isMobileView, setIsMobileView] = useState(
    window.innerWidth >= 300 && window.innerWidth <= 575
  );

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
      withdrawal_amount: withdrawalAmount,
    };

    axios
      .post(`${Urls.withdrawamount}?country=${countryId}`, body, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((response) => {
        if (response.data) {
          setShowNextModal(false);
          setSuccessModalOpen(true);
          setTimeout(() => {
            setSuccessModalOpen(false);

            handleClose();
            props.handleClose();
          }, 3000); // Close the success modal after 5 seconds
          props.getSwaWalletAmounts();
        } else {
          alert("Failed to submit withdrawal request.");
        }
      })
      .catch((error) => {
        console.error(error);
        alert("An error occurred while submitting your request.");
      });
  };
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        // open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography>
            <div className={Classes.WalletContainer}>
              <h3>Bank Details</h3>
            </div>
            <div className={Classes.AmountCheckContainer}>
              <div>
                {props.banklists.map((Item) => (
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
          </Typography>
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
          <Typography>
            <div style={{ padding: "20px" }}>
              <div className={Classes.walletheading}>
                <div>Amount you want to withdraw</div>
                <img src={walletclose} onClick={handleCloseNextModal} />
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
                  <img src="" /> Full Amount from wallet
                </div>
                <div className={Classes.rightamountewallet}>
                  <input type="checkbox" />
                </div>
              </div>
              <div className={Classes.requestWidrw}>
                <button onClick={requestWithdraw}>REQUEST TO WITHDRAW</button>
              </div>
            </div>
          </Typography>
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
          <Typography className={Classes.successModalContainer}>
            <div>
              <img src={SuccessTick} />
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
          </Typography>
        </Box>
      </Modal>
      {/* success modal */}
    </div>
  );
};

export default TransferMoneyModal;
