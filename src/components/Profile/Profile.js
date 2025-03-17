"use client";

import React, { useState, useEffect } from "react";
import Classes from "../SwaWallet/SwaWallet.module.css";
import Joi from "joi";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import axios from "axios";
import * as urls from "@/utils/urls";
import LoginModal from "@/components/login-modal/loginModal";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/providers/auth-provider";
import { useIsMobile } from "@/hooks/useIsMobile";

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

const Profile = () => {
  const router = useRouter();
  const { user, token, setAuth } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    photo: null,
  });

  const [initialData, setInitialData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    photo: null,
  });

  const [preview, setPreview] = useState("/Assets/userprofile.png");

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.userName,
        email: user.userEmail,
        mobile: user.phoneNumber,
        photo: null,
      });
      if (
        user.userProfile &&
        user.userProfile !== "" &&
        user.userProfile !== "https://swaecommain.swa.co/media/default.png"
      ) {
        setPreview(user.userProfile);
      }
      setInitialData({
        fullName: user.userName,
        email: user.userEmail,
        mobile: user.phoneNumber,
        photo: user.userProfile,
      });
    }
  }, [user]);

  const [errors, setErrors] = useState({});
  const [moberrors, setmobErrors] = useState("");

  const [open, setOpen] = useState(false);
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [show, setShow] = useState(false);

  const isMobileView = useIsMobile();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const schema = Joi.object({
    fullName: Joi.string()
      .trim()
      .regex(/^[a-zA-Z\s]+$/)
      .required()
      .messages({
        "string.base": `"Full Name" should be a type of string`,
        "string.empty": `"Full Name" is required`,
        "string.pattern.base": `"Full Name" should contain only alphabets`,
        "any.required": `"Full Name" is a required field`,
      }),
    email: Joi.string()
      .trim()
      .regex(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
      .required()
      .messages({
        "string.base": `"Email" should be a type of string`,
        "string.empty": `Email must not be empty`,
        "string.pattern.base": `"Email" must be  valid `,
        "any.required": `"Email" is a required field`,
      }),
    mobile: Joi.string()
      .trim()
      .regex(/^[6-9]\d{9}$/)
      .required()
      .messages({
        "string.base": `"Mobile Number" should be a type of string`,
        "string.empty": `Mobile Number is required`,
        "string.pattern.base": `"Mobile Number" must be a 10-digit number`,
        "any.required": `"Mobile Number" is a required field`,
      }),
    photo: Joi.any().optional(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        photo: file,
      });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isUnchanged =
      formData.fullName === initialData.fullName &&
      formData.email === initialData.email &&
      formData.mobile === initialData.mobile &&
      !formData.photo;

    if (isUnchanged) {
      alert("No changes were made.");
      return;
    }

    const validationData = { ...formData };
    if (!formData.photo) delete validationData.photo;
    const { error } = schema.validate(validationData, {
      abortEarly: false,
    });
    if (error) {
      const validationErrors = {};
      error.details.forEach((detail) => {
        validationErrors[detail.path[0]] = detail.message;
      });
      setErrors(validationErrors);
    } else {
      setErrors({});
      const data = new FormData();
      data.append("name", formData.fullName);
      data.append("email", formData.email);
      data.append("phone_number", formData.mobile);
      data.append("phone_code", "+91");
      if (formData.photo) {
        data.append("image", formData.photo);
      }

      try {
        const response = await axios.post(urls.updateuser, data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Token " + token,
          },
        });

        if (response.data.message === "updated successfully") {
          handleOpen();
          let { name, phone_number, email, image } = response.data.data;
          setAuth(token, {
            userName: name,
            userEmail: email,
            phoneNumber: phone_number,
            userProfile: image,
          });
          setTimeout(() => {
            handleClose();
            // setLoginModalVisible(true);
            setShow(true);
            router.push("/");
          }, 5000);
        } else if (
          response.data.errors.phone_number &&
          response.data.errors.phone_number.includes(
            "custom user with this phone number already exists."
          )
        ) {
          console.log(
            "Phone number already exists error:",
            response.data.errors
          );
          setmobErrors("Phone number already exists");
        } else if (
          response.data.errors.email &&
          response.data.errors.email.includes(
            "custom user with this email already exists."
          )
        ) {
          setmobErrors("Email already exists");
        }
      } catch (err) {
        console.error("Error submitting the form:", err);
      }
    }
  };

  const closeHanlder = () => {
    setShow(false);
  };

  return (
    <div>
      <div className={Classes.mainContianerProfile}>
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className={Classes.ProfileCard}>
              <h3>Edit profile</h3>
              <Image src={preview} alt="preview" width={77} height={77} />
              <p
                className={Classes.UploadPhotoProfile}
                onClick={() => document.getElementById("photoUpload").click()}
              >
                Upload photo
              </p>
              <input
                type="file"
                id="photoUpload"
                style={{ display: "none" }}
                onChange={handlePhotoUpload}
                accept="image/*"
              />
              {errors.photo && <p className={Classes.error}>{errors.photo}</p>}
              <div className={Classes.ProfileForms}>
                <div className={Classes.ProfileNames}>
                  <label>Full Name</label>
                  <input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                  {errors.fullName && (
                    <p className={Classes.error}>{errors.fullName}</p>
                  )}
                </div>
                <div className={Classes.ProfileMails}>
                  <label>Email</label>

                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />

                  {errors.email && (
                    <p className={Classes.error}>{errors.email}</p>
                  )}
                </div>
                <div className={Classes.ProfileMobile}>
                  <label>Mobile Number</label>
                  <input
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                  />
                  {errors.mobile && (
                    <p className={Classes.error}>{errors.mobile}</p>
                  )}
                </div>
                {moberrors && <p className={Classes.error}>{moberrors}</p>}
              </div>
              <div className={Classes.ParentProfileBtn}>
                <button type="submit" className={Classes.ProfileSaveChangeBtn}>
                  Save Changes
                </button>
              </div>
            </div>
          </form>
          <Modal
            open={open}
            onClose={handleClose}
          >
            <Box
              sx={successM}
              style={
                isMobileView
                  ? { width: "90%" }
                  : { width: "30%", height: "auto" }
              }
            >
              <div className={Classes.successModalContainer}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <div>
                    <Image
                      src={`/Assets/successTick.png`}
                      alt="SuccessTick"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      margin: "12px 0px",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <span className={Classes.titlesuccesModal}>
                      profile updated successfully
                    </span>
                  </div>
                </div>
              </div>
            </Box>
          </Modal>
          {loginModalVisible && (
            <LoginModal
              isLog={show}
              close={closeHanlder}
              handleOpenLogin={"profile"}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
