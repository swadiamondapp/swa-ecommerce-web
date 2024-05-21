import React, { useState, useEffect } from "react";
import { Modal, Box } from "@mui/material";
import Classes from "./ProductDetails.module.css";
import videoimg from "../../../src/Assets/videosucces.png";

const VideocallForm = ({ isOpen, handleClose }) => {
  const [activeLanguage, setActiveLanguage] = useState("English");
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const handleLanguageClick = (language) => {
    setActiveLanguage(language);
  };
  const [isDesk, setIsDesk] = useState(
    window.innerWidth >= 300 && window.innerWidth <= 575
  );
  useEffect(() => {
    const handleResize = () => {
      setIsDesk(window.innerWidth >= 300 && window.innerWidth <= 575);
    };
    // Add event listener to listen for window resize
    window.addEventListener("resize", handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isDesk]);
  const languages = ["English", "Malayalam", "Tamil", "Hindi", "Telugu"];
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSuccessOpen(true);
  };

  const handleSuccessClose = () => {
    setIsSuccessOpen(false);
    handleClose();
  };
  const style = {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "auto",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 2,
    outline: "none",
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
  };

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={isDesk ? style : styleDesk}>
          <div style={{ overflow: "hidden" }}>
            <h3 className={Classes.vi_head}>Sheadule your video call</h3>
            <p className={Classes.vi_paras}>
              Video call with our consultant and see your Jewles closer
            </p>
            <div className={Classes.contactForms}>
              <form onSubmit={handleSubmit}>
                <h3>Contact Details</h3>
                <div className={Classes.Mobile_field_vi}>
                  <label>Mobile number</label>
                  <input type="text" placeholder="+91 98975656785" />
                </div>
                <div className={Classes.Email_field_vi}>
                  <label>Email</label>
                  <input type="text" placeholder="Sample@gmail.com" />
                </div>
                <div className={Classes.Prefered_languages}>
                  <h3>Prefered Language</h3>
                  <div className={Classes.Language_vi}>
                    {languages.map((language) => (
                      <button
                        key={language}
                        className={
                          activeLanguage === language
                            ? Classes.Active_language
                            : Classes.unActive_language
                        }
                        onClick={() => handleLanguageClick(language)}
                      >
                        {language}
                      </button>
                    ))}
                  </div>
                </div>
                <div className={Classes.vi_message}>
                  <textarea
                    rows={3}
                    placeholder="Let’s us know  if you have any preference in price, budget "
                  />
                </div>
                <div className={Classes.vi_submit}>
                  <button type="submit">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </Box>
      </Modal>
      {/* success modal */}
      <Modal
        open={isSuccessOpen}
        onClose={handleSuccessClose}
        aria-labelledby="success-modal-title"
        aria-describedby="success-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <div style={{ textAlign: "center" }}>
            <img src={videoimg} style={{ marginBottom: "25px" }} />

            <p
              style={{
                color: "#0D1217",
                fontFamily: "lato",
                fontWeight: "600",
              }}
            >
              Thank you! our representative will call you <br /> in 30 imn to
              confirm your appointment
            </p>
          </div>
        </Box>
      </Modal>
      {/* success modal */}
    </div>
  );
};

export default VideocallForm;
