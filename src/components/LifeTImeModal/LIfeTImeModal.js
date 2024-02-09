import React from "react";
import classes from "./LIfeTimeModal.module.css";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
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

const LIfeTImeModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography>
            <div className={classes.Container}>
              <div className={classes.planContainer}>
                <div>
                  <div className={classes.titles}>
                    <p>
                      Lifetime Exchange
                      <br /> ( approximate . estimate)
                    </p>
                  </div>
                  <div className={classes.SubDetails}>
                    <div className={classes.subDetialstexts}>
                      <p className={classes.labelText}>Purchase Amount </p>

                      <p className={classes.textAmount}>$678</p>
                    </div>
                    <div className={classes.line}></div>
                    <div className={classes.subDetialstexts}>
                      <p className={classes.labelText}>Discounted </p>

                      <p className={classes.textAmount}>$34</p>
                    </div>
                    <div className={classes.line}></div>
                    <div className={classes.subDetialstexts}>
                      <p className={classes.labelText}>Totel LBB Value </p>

                      <p className={classes.greenColor}>$712</p>
                    </div>
                    <div className={classes.line}></div>
                  </div>
                  <button className={classes.buttonllb}>
                    PROCEED WITH LBB
                  </button>
                </div>




                <div>
                  <div className={classes.titles}>
                    <p>
                    Life time buy-back<br/>
( approximate . estimate)
                    </p>
                  </div>
                  <div className={classes.SubDetails}>
                    <div className={classes.subDetialstexts}>
                      <p className={classes.labelText}>Purchase Amount </p>

                      <p className={classes.textAmount}>$678</p>
                    </div>
                    <div className={classes.line}></div>
                    <div className={classes.subDetialstexts}>
                      <p className={classes.labelText}>Discounted </p>

                      <p className={classes.textAmount}>$34</p>
                    </div>
                    <div className={classes.line}></div>
                    <div className={classes.subDetialstexts}>
                      <p className={classes.labelText}>Totel LBB Value </p>

                      <p className={classes.greenColor}>$712</p>
                    </div>
                    <div className={classes.line}></div>
                  </div>
                    <button className={classes.buttonllb}>
                      PROCEED WITH LTE
                    </button>
                </div>
              </div>
            </div>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <div className={classes.noteTitle}>
                <p>Note:</p>
                <span className={classes.noteContent}>1. buyback with 15 days of delivery will be 100% of your money will be refunded<br/></span>
                <span className={classes.noteContent}>2  buyback after 15 days of delivery will be 10% of your money will be dedected<br/></span>
                <span className={classes.noteContent}>3. Lorem ipsum dolor sit amet consectetur. Felis faucibus cras enim pretium semper.<br/></span>
                <span className={classes.noteContent}>4. Lorem ipsum dolor sit amet consectetur. Felis faucibus cras enim pretium semper. Aliquam pellentesque aliquam magna mauris nulla.<br/></span>
              </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default LIfeTImeModal;
