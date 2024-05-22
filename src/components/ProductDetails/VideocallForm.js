import React, { useState, useEffect } from "react";
import axios from "axios";
import * as Urls from "../../Urls";
import Joi from "joi";
import { Modal, Box } from "@mui/material";
import Classes from "./ProductDetails.module.css";
import videoimg from "../../../src/Assets/videosucces.png";

const VideocallForm = (props) => {
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [errors, setErrors] = useState();
  const [videoData, setVideoData] = useState({
    productId: props.productId,
    phone: "",
    email: "",
    language: "English",
    description: "",
  });
  const handleLanguageClick = (language) => {
    setVideoData({ ...videoData, language: language });
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

  const schema = Joi.object({
    phone: Joi.string()
      .pattern(
        /^\+91[6-9]\d{9}$|^\+1\d{10}$|^\+971[2-9]\d{7,8}$/,
        "valid phone number"
      )
      .required()
      .messages({
        "string.empty": "Mobile number is required",
        "string.pattern.name":
          "Mobile number must be a valid format for India, USA, or UAE",
      }),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.email": "Email must be a valid email address",
        "string.empty": "Email is required",
      }),
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const { phone, email } = videoData;
    const { error } = schema.validate({ phone, email }, { abortEarly: false });

    if (error) {
      const errorDetails = error.details.reduce((acc, err) => {
        acc[err.path[0]] = err.message;
        return acc;
      }, {});
      setErrors(errorDetails);
    } else {
      videoCall();
      setErrors({});
    }
  };

  const handleSuccessClose = () => {
    setIsSuccessOpen(false);
    props.handleClose();
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

  const videoCall = async () => {
    try {
      const body = {
        product_id: videoData.productId,
        phone_code: "+91",
        phone_number: videoData.phone,
        email: videoData.email,
        language: videoData.language,
        description: videoData.description,
      };

      const reposnse = await axios.post(Urls.videoCallPost, body);
      if (reposnse.data.status === 200) {
        setIsSuccessOpen(true);
        props.handleClose();
        setVideoData({
          productId: "",
          phone: "",
          email: "",
          language: "English",
          description: "",
        });
        setTimeout(() => {
          setIsSuccessOpen(false);
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeVideoData = (event) => {
    const { name, value } = event.target;
    setVideoData({
      ...videoData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  return (
    <div>
      <Modal
        open={props.isOpen}
        onClose={props.handleClose}
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
                  <input
                    type="text"
                    placeholder="98975656785"
                    value={videoData.phone}
                    name="phone"
                    onChange={handleChangeVideoData}
                  />
                </div>
                {errors && errors.phone && (
                  <p className={Classes.Error}>{errors.phone}</p>
                )}
                <div className={Classes.Email_field_vi}>
                  <label>Email</label>
                  <input
                    type="text"
                    placeholder="Sample@gmail.com"
                    value={videoData.email}
                    name="email"
                    onChange={handleChangeVideoData}
                  />
                </div>
                {errors && errors.email && (
                  <p className={Classes.Error}>{errors.email}</p>
                )}
                <div className={Classes.Prefered_languages}>
                  <h3>Prefered Language</h3>
                  <div className={Classes.Language_vi}>
                    {languages.map((language) => (
                      <button
                        key={language}
                        className={
                          videoData.language === language
                            ? Classes.Active_language
                            : Classes.unActive_language
                        }
                        type="button"
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
                    value={videoData.description}
                    name="description"
                    onChange={handleChangeVideoData}
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
