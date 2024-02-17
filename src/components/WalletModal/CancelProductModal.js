import React, { useState } from "react";
import Classes from "./WalletModal.module.css";
import { Dropdown } from "primereact/dropdown";
import CloseButton from "../../Assets/closeModal.png";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const CancelProductModal = () => {
  const [open, setOpen] = useState(true);
  const [selectedCity, setSelectedCity] = useState(null);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    border: "none",
    borderRadius: "6px",
    p: 2,
  };

  const cities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography>
            <div>
              <div className={Classes.CancelModalHeader}>
                <h3>Cancel this product</h3>
                <Button onClick={handleClose}>
                  <img src={CloseButton} />
                </Button>
              </div>
              <div>
                <Dropdown
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.value)}
                  options={cities}
                  optionLabel="name"
                  placeholder="Select a City"
                />
              </div>
              <textarea></textarea>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default CancelProductModal;
