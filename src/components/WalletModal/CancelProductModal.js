import React, { useState } from "react";
import Classes from "./WalletModal.module.css";
import { Dropdown } from "primereact/dropdown";
import Box from "@mui/material/Box";
import { IoClose } from "react-icons/io5";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const CancelProductModal = (props) => {
  const [selectedCity, setSelectedCity] = useState(null);

  const style = {
    position: "absolute",
    top: "41%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    border: "none",
    borderRadius: "6px",
    p: 2,
    width: "650px",
  };

  const cities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];

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
            <div>
              <div className={Classes.CancelModalHeader}>
                <h3>Cancel this product</h3>
                <IoClose
                  className={Classes.Close}
                  onClick={props.handleClose}
                />
              </div>
              <div className={Classes.DropContainer}>
                <Dropdown
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.value)}
                  options={cities}
                  optionLabel="name"
                  placeholder="Select a City"
                />
              </div>
              <textarea
                cols={50}
                rows={8}
                className={Classes.TextArea}
              ></textarea>
              <div className={Classes.CancelButton}>
                <button>Cancel Product</button>
              </div>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default CancelProductModal;
