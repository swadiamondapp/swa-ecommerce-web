import React, { useState, useEffect } from "react";
import Classes from "./conformModal.module.css";
import Box from "@mui/material/Box";
import { IoClose } from "react-icons/io5";
import Typography from "@mui/material/Typography";
import { Modal } from "@mui/material";
import { IoHeartOutline } from "react-icons/io5";

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
  width: "400px",
  outline: "none",
};

const mobileStyle = {
  position: "absolute",
  top: "41%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  border: "none",
  borderRadius: "6px",
  p: 2,
  width: "350px",
  outline: "none",
};

// const mobileStyle = {
//   position: "absolute",
//   top: "41%",
//   transition: "transform 0.3s ease-in-out",
//   bgcolor: "background.paper",
//   border: "none",
//   boxShadow: 24,
//   borderRadius: "4px",
//   p: 2,
//   overflow: "auto",
//   maxHeight: "85%",
//   outline: "none",
//   width: "100%",
// };

export default function ConformModal(props) {
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

  return (
    <Modal
      open={props.shows}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={isMobileView ? mobileStyle : style}>
        <Typography>
          <div>
            <div className="d-flex">
              <img src={props.img} alt="move" width="130px" height="130px" />
              <div className={Classes.contnt}>
                <h5 className={Classes.title}>{props.title}</h5>
                <p>{props.body}</p>
              </div>
            </div>
            <div className={Classes.RmvWishbtnContainer}>
              <div className={Classes.ModalBtns}>
                <div className={Classes.remv} onClick={props.remove}>
                  REMOVE
                </div>
              </div>
              <div className={Classes.ModalBtns}>
                <div className={Classes.movWish} onClick={props.movWish}>
                  <IoHeartOutline size={20} />
                  <p>MOVE TO WISHLIST</p>
                </div>
              </div>
            </div>
          </div>
        </Typography>
      </Box>
    </Modal>
  );
}
