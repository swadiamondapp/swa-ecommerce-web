import React, { useState, useEffect } from "react";
import classes from "./LIfeTimeModal.module.css";
import axios from "axios";
import * as Urls from "../../Urls";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IoMdClose } from "react-icons/io";
import SuccessTick from "../../Assets/successTick.png";
import { Dropdown } from "primereact/dropdown";
import Joi from "joi";

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

const AddBank = (props) => {
  const token = localStorage.getItem("swaToken");
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [errors, setErrors] = useState({});
  console.log(props.openSuccessModal);
  const [isMobileView, setIsMobileView] = useState(
    window.innerWidth >= 300 && window.innerWidth <= 575
  );
  const [bankDatas, setBankDatas] = useState({
    accountNo: "",
    reAccountNo: "",
    bankName: "",
    branch: "",
    ifsc: "",
    accountHolderName: "",
  });

  const schema = Joi.object({
    accountNo: Joi.string()
      .trim()
      .regex(/^\d+$/)
      .required()
      .messages({
        "string.empty": `Account Number is required`,
        "string.pattern.base": `"Account Number" must be a valid number`,
      }),
    reAccountNo: Joi.string()
      .trim()
      .valid(Joi.ref("accountNo"))
      .required()
      .messages({
        "any.only": `Re-enter Account Number must match "Account Number"`,
        "string.empty": `"Re-enter Account Number" is required`,
      }),
    bankName: Joi.string()
      .trim()
      .required()
      .messages({
        "string.empty": `Bank Name is required`,
      }),
    branch: Joi.string()
      .trim()
      .required()
      .messages({
        "string.empty": `Branch is required`,
      }),
    ifsc: Joi.string()
      .trim()
      .required()
      .messages({
        "string.empty": `IFSC is required`,
      }),
    accountHolderName: Joi.string()
      .trim()
      .required()
      .messages({
        "string.empty": `Account Holder Name is required`,
      }),
  });
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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addBank = async () => {
    const validation = schema.validate(bankDatas, { abortEarly: false });
    if (validation.error) {
      const validationErrors = {};
      validation.error.details.forEach((detail) => {
        validationErrors[detail.path[0]] = detail.message;
      });
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    try {
      const body = {
        account_number: bankDatas.accountNo,
        re_enter_account_number: bankDatas.reAccountNo,
        bank_name: bankDatas.bankName,
        branch: bankDatas.branch,
        ifsc: bankDatas.ifsc,
        account_holder_name: bankDatas.accountHolderName,
      };
      const response = await axios.post(Urls.addBankAccount, body, {
        headers: { Authorization: "Token " + token },
      });
      console.log("Bankresponse", response);
      if (response.status === 200) {
        setSuccessModalOpen(true);
        setBankDatas({
          accountNo: "",
          reAccountNo: "",
          bankName: "",
          branch: "",
          ifsc: "",
          accountHolderName: "",
        });
        props.movetoBank();
        setTimeout(() => {
          setSuccessModalOpen(false);

          handleClose();
          props.handleClose();
        }, 3000); // Close the success modal after 5 seconds
        props.fetchBanklist();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeAddress = (event) => {
    const { name, value } = event.target;
    setBankDatas({
      ...bankDatas,
      [name]: value,
    });
  };

  return (
    <div>
      <Modal
        open={props.open}
        // open={open}
        onClose={props.handleClose}
        // onClose={handleClose}
      >
        <Box sx={isMobileView ? mobileStyle : style}>
          <Typography>
            <div className={classes.Container}>
              <div className={classes.LabelHead}>
                <p>Add bank A/C</p>
                <IoMdClose
                  style={{ cursor: "pointer" }}
                  // onClick={props.handleClose}
                  onClick={props.handleClose}
                />
              </div>
              <div className={classes.FormADDbANK}>
                <div className={classes.AccountLabels}>
                  <label>Enter Account Number</label>
                  <input
                    type="text"
                    placeholder="000153798763"
                    name="accountNo"
                    value={bankDatas.accountNo}
                    onChange={handleChangeAddress}
                  />
                  {errors.accountNo && (
                    <p className={classes.error}>{errors.accountNo}</p>
                  )}
                </div>

                <div className={classes.AccountLabels}>
                  <label>Re Enter Account number</label>
                  <input
                    type="text"
                    placeholder="000153798763"
                    name="reAccountNo"
                    value={bankDatas.reAccountNo}
                    onChange={handleChangeAddress}
                  />
                  {errors.reAccountNo && (
                    <p className={classes.error}>{errors.reAccountNo}</p>
                  )}
                </div>

                <div className={classes.AccountLabels}>
                  <label>Bank Name</label>
                  <input
                    type="text"
                    placeholder="Axis Bank"
                    name="bankName"
                    value={bankDatas.bankName}
                    onChange={handleChangeAddress}
                  />
                  {errors.bankName && (
                    <p className={classes.error}>{errors.bankName}</p>
                  )}
                </div>

                <div className={classes.BranchIfscParent}>
                  <div className={classes.BranchAcc}>
                    <label>Branch</label>
                    <input
                      type="text"
                      placeholder="City*"
                      name="branch"
                      value={bankDatas.branch}
                      onChange={handleChangeAddress}
                    />
                    {errors.branch && (
                      <p className={classes.error}>{errors.branch}</p>
                    )}
                  </div>
                  <div className={classes.BranchAcc}>
                    <label>IFSC</label>
                    <input
                      type="text"
                      placeholder="IFSC*"
                      name="ifsc"
                      value={bankDatas.ifsc}
                      onChange={handleChangeAddress}
                    />
                    {errors.ifsc && (
                      <p className={classes.error}>{errors.ifsc}</p>
                    )}
                  </div>
                </div>
                <div className={classes.AccountLabels}>
                  <label>Account holder Name</label>
                  <input
                    type="text"
                    placeholder="Muhammed Jameel"
                    name="accountHolderName"
                    value={bankDatas.accountHolderName}
                    onChange={handleChangeAddress}
                  />
                  {errors.accountHolderName && (
                    <p className={classes.error}>{errors.accountHolderName}</p>
                  )}
                </div>

                <div className={classes.AddBtnACC}>
                  <button onClick={addBank}>Add</button>
                </div>
              </div>
            </div>
          </Typography>
        </Box>
      </Modal>
      {/* success modal */}
      <Modal open={successModalOpen} onClose={() => setSuccessModalOpen(false)}>
        <Box
          sx={successM}
          style={
            isMobileView ? { width: "90%" } : { width: "30%", height: "auto" }
          }
        >
          <Typography className={classes.successModalContainer}>
            <div>
              <img src={SuccessTick} alt="SuccessTick" />
            </div>
            <div
              style={{
                textAlign: "center",
                margin: "12px 0px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span className={classes.titlesuccesModal}>
                Thank you <br /> your refund will be transfered <br /> to your
                bank account
              </span>
            </div>
          </Typography>
        </Box>
      </Modal>
      {/* success modal */}
    </div>
  );
};

export default AddBank;
