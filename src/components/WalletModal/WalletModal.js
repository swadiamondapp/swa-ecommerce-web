import React from "react";
import Classes from "./WalletModal.module.css";
import wallet from "../../Assets/wallet.png";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

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

const WalletModal = (props) => {
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography>
            <div className={Classes.WalletContainer}>
              <h3>
                Do you want to pay from <br />
                swa wallet / swa exchange
              </h3>
            </div>
            {/* <div className={Classes.BorderLine}></div> */}
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
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default WalletModal;
