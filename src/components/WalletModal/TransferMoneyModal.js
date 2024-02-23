import React, { useState } from "react";
import Classes from "./WalletModal.module.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import wallet from "../../Assets/wallet.png";
import { PiBank } from "react-icons/pi";
import { FaPlus } from "react-icons/fa6";
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
  outline: "none",
  // p: 2,
};

const TransferMoneyModal = (props) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)}>TransferMoneyModal</Button>
      <Modal
        // open={props.open}
        // onClose={props.handleClose}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography>
            <div className={Classes.WalletContainer}>
              <h3>Transfer money to</h3>
            </div>
            <div className={Classes.AmountCheckContainer}>
              <div
                className={Classes.ContentLines}
                style={{ marginTop: "20px" }}
              >
                <div className={Classes.Content}>
                  <PiBank className={Classes.Bank} />
                  <p className={Classes.Word}>Axis Bank A/C</p>
                </div>
                <input type="radio" />
              </div>
              <p className={Classes.Phone}>91999567000034</p>
              <div className={Classes.ContentLines}>
                <div className={Classes.Content}>
                  <PiBank className={Classes.Bank} />
                  <p className={Classes.Word}>Add another Bank account</p>
                </div>
                <FaPlus className={Classes.Plus} />
              </div>
              <div className={Classes.Border}></div>
              <div
                className={Classes.ContentLines}
                style={{ paddingTop: "15px" }}
              >
                <div className={Classes.Content}>
                  <img src={wallet} />
                  <p className={Classes.Word}>Swa Wallet</p>
                </div>
                <input type="radio" />
              </div>
            </div>
            <div className={Classes.ConfirmButton}>CONFIRM</div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default TransferMoneyModal;
