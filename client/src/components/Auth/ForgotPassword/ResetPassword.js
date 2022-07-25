/***
 * @author : Guryash Singh Dhall
 * @bannerID : B00910690
 * @email : guryash.dhall@dal.ca
 ***/

import React, { useEffect } from "react";
import useForm from "../../../Helpers/useForm";
import validate from "../../../Helpers/validateInfo";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import NavBar from "../../NavBar";
import SuccessAlert from "../../SuccessAlert";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { isUserLoggedIn } from "../../../Helpers/helper";
import { BACKEND_URL } from "../../../config/config";

const PasswordReset = () => {
  const title = "Reset Password";
  const color = "#000000";
  const navigate = useNavigate();

  const [resetPwdInfo, setResetPwdInfo] = useState({
    email: "",
    newpassword: "",
    confirmNewPassword: "",
    errors: {
      email: "",
      newpassword: "",
      confirmNewPassword: "",
    },
  });

  useEffect(() => {
    let role = localStorage.getItem("role");
    isUserLoggedIn()
      ? role === "customer"
        ? navigate("/recommendation")
        : navigate("/admin")
      : navigate("/resetPwd");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePwdErrors = () => {
    if (!resetPwdInfo.newpassword) {
      setResetPwdInfo({
        ...resetPwdInfo,
        errors: {
          ...resetPwdInfo.errors,
          newpassword: "Password is required",
        },
      });
    } else if (resetPwdInfo.newpassword.length < 8) {
      setResetPwdInfo({
        ...resetPwdInfo,
        errors: {
          ...resetPwdInfo.errors,
          newpassword: "Password needs to be 8 characters or more",
        },
      });
    } else {
      setResetPwdInfo({
        ...resetPwdInfo,
        errors: {
          ...resetPwdInfo.errors,
          newpassword: "",
        },
      });
    }
  };

  const handleConfirmPwdErrors = () => {
    if (!resetPwdInfo.confirmNewPassword) {
      setResetPwdInfo({
        ...resetPwdInfo,
        errors: {
          ...resetPwdInfo.errors,
          confirmNewPassword: "Confirm Password is required",
        },
      });
    } else if (resetPwdInfo.confirmNewPassword !== resetPwdInfo.newpassword) {
      setResetPwdInfo({
        ...resetPwdInfo,
        errors: {
          ...resetPwdInfo.errors,
          confirmNewPassword: "Passwords do not match",
        },
      });
    } else {
      setResetPwdInfo({
        ...resetPwdInfo,
        errors: {
          ...resetPwdInfo.errors,
          confirmNewPassword: "",
        },
      });
    }
  };
  const onhandleChange = (name, value) => {
    setResetPwdInfo({
      ...resetPwdInfo,
      [name]: value,
    });
  };

  const onhandleSubmit = (e) => {
    e.preventDefault();
    if (
      resetPwdInfo.errors.email == "" &&
      resetPwdInfo.errors.newpassword == "" &&
      resetPwdInfo.errors.confirmNewPassword == ""
    ) {
      const email = localStorage.getItem("email");
      axios
        .post(BACKEND_URL + "reset-password", {
          email: email,
          newpassword: resetPwdInfo.newpassword,
          confirmNewPassword: resetPwdInfo.confirmNewPassword,
        })
        .then((res) => {
          if (res.data.success) {
            toast.success(res.data.message, {
              position: "top-right",
              theme: "dark",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              onClose: () => {
                navigate("/");
              },
            });
          } else {
            toast.error(res.data.message, {
              position: "top-right",
              theme: "dark",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      handleConfirmPwdErrors();
      handlePwdErrors();
    }
  };

  useEffect(() => {
    let role = localStorage.getItem("role");
    isUserLoggedIn()
      ? role === "customer"
        ? navigate("/recommendation")
        : navigate("/admin")
      : navigate("/resetPwd");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="form-content-right">
      <NavBar title={title} color={color}></NavBar>
      <form
        className="form"
        // onSubmit={handleSubmit}
        s
        style={{
          display: "flex",
          flexFlow: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <br />
        <br />
        <div className="form-inputs">
          <label htmlFor="newpassword" className="form-label"></label>
          <TextField
            color="secondary"
            label="New Password"
            id="newpassword"
            type="password"
            name="newpassword"
            className="form-inputs"
            placeholder="Enter your New Password"
            value={resetPwdInfo.newpassword}
            error={resetPwdInfo.errors.newpassword !== ""}
            helperText={resetPwdInfo.errors.newpassword}
            onBlur={handlePwdErrors}
            onChange={(e) => {
              onhandleChange("newpassword", e.target.value);
            }}
          />
        </div>
        <br />
        <div className="form-inputs">
          <label htmlFor="confirmNewPassword" className="form-label"></label>
          <TextField
            color="secondary"
            label="Confirm New Password"
            id="confirmNewPassword"
            type="password"
            name="confirmNewPassword"
            className="form-inputs"
            placeholder="Enter your New Password"
            value={resetPwdInfo.confirmNewPassword}
            error={resetPwdInfo.errors.confirmNewPassword !== ""}
            helperText={resetPwdInfo.errors.confirmNewPassword}
            onChange={(e) => {
              onhandleChange("confirmNewPassword", e.target.value);
            }}
            onBlur={handleConfirmPwdErrors}
          />
          <br />
          <br />
        </div>
        <Button
          onSubmit={<SuccessAlert />}
          className="form-input-btn"
          variant="contained"
          type="submit"
          style={{ background: "#000000", marginBottom: "1%" }}
          onClick={onhandleSubmit}
        >
          Submit
        </Button>
        <Link to={"/"}>Go Back</Link>
      </form>
      <ToastContainer />
    </div>
  );
};

export default PasswordReset;
