import React, { useState } from "react";
import { Modal, Box } from "@mui/material";
import Classes from "./ProductDetails.module.css";

const VideocallForm = ({ isOpen, handleClose }) => {
  const [activeLanguage, setActiveLanguage] = useState("English");
  const handleLanguageClick = (language) => {
    setActiveLanguage(language);
  };
  const languages = ["English", "Malayalam", "Tamil", "Hindi", "Telugu"];

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
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
          <div style={{ overflow: "hidden" }}>
            <h3 className={Classes.vi_head}>Sheadule your video call</h3>
            <p className={Classes.vi_paras}>
              Video call with our consultant and see your Jewles closer
            </p>
            <div className={Classes.contactForms}>
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
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default VideocallForm;
