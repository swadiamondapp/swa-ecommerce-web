import React, { useState } from "react";
import Classes from "./WalletModal.module.css";
import wallet from "../../Assets/wallet.png";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
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

const WalletModal = (props) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <div>
      <Button onClick={handleOpen}>WalletModal</Button>
      <Modal
        // open={props.open}
        open={open}
        // onClose={props.handleClose}
        onClose={handleClose}
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
