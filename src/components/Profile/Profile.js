import React, { useState } from "react";

import defaultProfile from "../../Assets/userprofile.png";
import Classes from "../SwaWallet/SwaWallet.module.css";
import Joi from "joi";
import axios from "axios";
import * as urls from "../../Urls";

const Profile = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    photo: null,
  });
  const [errors, setErrors] = useState({});
  const token = localStorage.getItem("swaToken");
  const [preview, setPreview] = useState(defaultProfile);

  console.log("photo", formData.photo);

  const schema = Joi.object({
    fullName: Joi.string()
      .trim()
      .regex(/^[a-zA-Z\s]+$/)
      .required()
      .messages({
        "string.base": `"Full Name" should be a type of string`,
        "string.empty": `"Full Name" is required`,
        "string.pattern.base": `"Full Name" should contain only alphabets and spaces`,
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
        "string.empty": `"Email" must not be empty`,
        "string.pattern.base": `"Email" must be a valid email address`,
        "any.required": `"Email" is a required field`,
      }),
    mobile: Joi.string()
      .trim()
      .regex(/^[6-9]\d{9}$/)
      .required()
      .messages({
        "string.base": `"Mobile Number" should be a type of string`,
        "string.empty": `"Mobile Number" is required`,
        "string.pattern.base": `"Mobile Number" must be a 10-digit number starting with 6-9`,
        "any.required": `"Mobile Number" is a required field`,
      }),
    photo: Joi.object()
      .required()
      .messages({
        "any.required": `"Photo" is a required field`,
      }),
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
    const { error } = schema.validate(formData, { abortEarly: false });
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
            Authorization: "Token " + token, // add your token if needed
          },
        });
        console.log("Form data is valid and submitted:", response.data);
      } catch (err) {
        console.error("Error submitting the form:", err);
      }
    }
  };
  return (
    <div>
      <div className={Classes.mainContianerProfile}>
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className={Classes.ProfileCard}>
              <h3>Edit profile</h3>
              <img src={preview} />
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
              </div>
              <div className={Classes.ParentProfileBtn}>
                <button type="button" className={Classes.ProfileCancelbtn}>
                  Cancel
                </button>
                <button type="submit" className={Classes.ProfileSaveChangeBtn}>
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
