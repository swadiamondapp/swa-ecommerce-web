import React, { useState, useEffect } from "react";
import classes from "./LIfeTimeModal.module.css";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import SuccessTick from "../../Assets/successTick.png";
import closeButton from "../../Assets/closeModal.png"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  borderRadius: "4px",
  p: 3
};

const mobileStyle = {
  position: "absolute",
  bottom: 0,
  transition: "transform 0.3s ease-in-out",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  borderRadius: "4px",
  p: 2,
  overflow: "auto",
  maxHeight: "85%",
  width: "100%",
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

const LIfeTImeModal = (props) => {
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
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

  const handleSuccessModal = () => {
    setSuccessModalOpen(true);
    // You can close the success modal after a certain duration if needed
    setTimeout(() => {
      setSuccessModalOpen(false);
    }, 1000); // Close the success modal after 3 seconds (3000 milliseconds)
  };
  const handleCloseSuccessModal = () => {
    setSuccessModalOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen}>
        return or exchange of a delivered product
      </Button>
      <Modal
        // open={props.open}
        open={open}
        // onClose={props.handleClose}
        onClose={handleClose}
      >
        <Box sx={isMobileView ? mobileStyle : style}>
        <Button style={{position:'absolute',top: 0, right: 0, margin: '8px'}}  onClick={handleClose} className={classes.bbCLoseButton}><img src={closeButton}/></Button>
          
          <Typography>
            <div className={classes.Container}>
              <div className={classes.planContainer}>
                <div>
                  <div className={classes.titles}>
                    <span className={classes.planSubTitle}>
                      Lifetime Exchange
                      <br /> ( approximate . estimate)
                    </span>
                    
                  </div>
                  <div className={classes.SubDetails}>
                    <div className={classes.subDetialstexts}>
                      <span className={classes.labelText}>
                        Purchase Amount{" "}
                      </span>

                      <span className={classes.textAmount}>$678</span>
                    </div>
                    <div className={classes.line}></div>
                    <div className={classes.subDetialstexts}>
                      <span className={classes.labelText}>Discounted </span>

                      <span className={classes.textAmount}>$34</span>
                    </div>
                    <div className={classes.line}></div>
                    <div className={classes.subDetialstexts}>
                      <span className={classes.labelText}>
                        Totel LTE Value{" "}
                      </span>

                      <span className={classes.greenColor}>$712</span>
                    </div>
                    <div className={classes.line}></div>
                  </div>
                  <div>
                    <button
                      className={classes.buttonllb}
                      onClick={handleSuccessModal}
                    >
                      PROCEED WITH LTE
                    </button>
                  </div>
                </div>

                <div>
                  <div className={classes.titles}>
                    <span className={classes.planSubTitle}>
                      Life time buy-back
                      <br />( approximate . estimate)
                    </span>
                  </div>
                  <div className={classes.SubDetails}>
                    <div className={classes.subDetialstexts}>
                      <span className={classes.labelText}>
                        Purchase Value{" "}
                      </span>

                      <span className={classes.textAmount}>$678</span>
                    </div>
                    <div className={classes.line}></div>
                    <div className={classes.subDetialstexts}>
                      <span className={classes.labelText}>Deduction Value </span>

                      <span className={classes.textAmount}>$34</span>
                    </div>
                    <div className={classes.line}></div>
                    <div className={classes.subDetialstexts}>
                      <span className={classes.labelText}>
                        Totel LBB Value{" "}
                      </span>

                      <span className={classes.greenColor}>$712</span>
                    </div>
                    <div className={classes.line}></div>
                  </div>
                  <div>
                    <button
                      className={classes.buttonllb}
                      onClick={handleSuccessModal}
                    >
                      PROCEED WITH LBB
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className={classes.noteTitle}>
              <span style={{fontWeight:'600',fontSize:'14px'}}>Note:</span>
              <span className={classes.noteContent}>
                1. buyback with 15 days of delivery will be 100% of your money
                will be refunded
              </span>
              <span className={classes.noteContent}>
                2 buyback after 15 days of delivery will be 10% of your money
                will be dedected
              </span>
              <span className={classes.noteContent}>
                3. Lorem ipsum dolor sit amet consectetur. Felis faucibus cras
                enim pretium semper.
              </span>
              <span className={classes.noteContent}>
                4. Lorem ipsum dolor sit amet consectetur. Felis faucibus cras
                enim pretium semper. Aliquam pellentesque aliquam magna mauris
                nulla.
              </span>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default LIfeTImeModal;
