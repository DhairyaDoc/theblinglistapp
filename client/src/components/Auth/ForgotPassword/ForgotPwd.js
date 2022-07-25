/***
 * @author : Guryash Singh Dhall
 * @bannerID : B00910690
 * @email : guryash.dhall@dal.ca
 ***/

import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import NavBar from "../../NavBar";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { validateEmail } from "../../../Helpers/validateInfo";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isUserLoggedIn } from "../../../Helpers/helper";
import { BACKEND_URL } from "../../../config/config";

const ForgotPwd = () => {
  // const { handleChange, values, handleSubmit, errors } = useForm(validate);
  // const [SecurityQuestion, setSecurityQuestion] = React.useState("");

  const title = "Forgot Password?";
  const color = "#000000";
  const navigate = useNavigate();
  const SecurityQuestion = "";

  const [forgotPwdInfo, setforgotPwdInfo] = useState({
    email: "",
    securityAnswer: "",
    securityQuestion: "",
    errors: {
      email: "",
      securityAnswer: "",
      securityQuestion: "",
    },
  });

  useEffect(() => {
    let role = localStorage.getItem("role");
    isUserLoggedIn()
      ? role === "customer"
        ? navigate("/recommendation")
        : navigate("/admin")
      : navigate("/forgotPwd");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEmailErrors = () => {
    setforgotPwdInfo({
      ...forgotPwdInfo,
      errors: {
        ...forgotPwdInfo.errors,
        email: validateEmail(forgotPwdInfo.email),
      },
    });
  };
  const handleSecurityAnswerErrors = () => {
    if (!forgotPwdInfo.securityAnswer) {
      setforgotPwdInfo({
        ...forgotPwdInfo,
        errors: {
          ...forgotPwdInfo.errors,
          securityAnswer: "Security Answer is required",
        },
      });
    } else {
      setforgotPwdInfo({
        ...forgotPwdInfo,
        errors: {
          ...forgotPwdInfo.errors,
          securityAnswer: "",
        },
      });
    }
  };

  const onhandleChange = (name, value) => {
    setforgotPwdInfo({
      ...forgotPwdInfo,
      [name]: value,
    });
  };

  const onhandleSubmit = (e) => {
    e.preventDefault();
    if (
      forgotPwdInfo.errors.email === "" &&
      forgotPwdInfo.errors.securityAnswer === ""
    ) {
      axios
        .post(BACKEND_URL + "forgot-password", {
          email: forgotPwdInfo.email,
          securityAnswer: forgotPwdInfo.securityAnswer,
          securityQuestion: forgotPwdInfo.securityQuestion,
        })
        .then((res) => {
          if (res.data.success === true) {
            localStorage.setItem("email", forgotPwdInfo.email);
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
                navigate("/resetPwd");
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
      handleEmailErrors();
    }
  };
  return (
    <div>
      <NavBar title={title} color={color}></NavBar>
      <form
        className="form"
        onSubmit={onhandleSubmit}
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
          <label htmlFor="email" className="form-label"></label>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={forgotPwdInfo.email}
            error={forgotPwdInfo.errors.email !== ""}
            helperText={forgotPwdInfo.errors.email}
            onChange={(e) => onhandleChange("email", e.target.value)}
            onBlur={handleEmailErrors}
          />
        </div>
        <br />
        <Box sx={{ minWidth: 225 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label" value={SecurityQuestion}>
              Security Question
            </InputLabel>
            <Select
              name="securityQuestion"
              color="secondary"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={SecurityQuestion}
              label="Security Question"
              onChange={(e) =>
                onhandleChange("securityQuestion", e.target.value)
              }
            >
              <MenuItem value={"What's your pet name?"}>
                What's your pet name?
              </MenuItem>
              <MenuItem value={"What's your mother's maiden name?"}>
                What's your mother's maiden name?
              </MenuItem>
              <MenuItem value={"What's the brand of your first car?"}>
                What's the brand of your first car?
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
        <br />
        <div className="form-inputs">
          <label htmlFor="Security Answer" className="form-label"></label>
          <TextField
            label="Security Answer"
            id="securityAnswer"
            type="text"
            name="securityAnswer"
            className="form-inputs"
            placeholder="Enter Security Answer"
            value={forgotPwdInfo.securityAnswer}
            error={forgotPwdInfo.errors.securityAnswer !== ""}
            helperText={forgotPwdInfo.errors.securityAnswer}
            onChange={(e) => onhandleChange("securityAnswer", e.target.value)}
            onBlur={handleSecurityAnswerErrors}
          />
        </div>
        <br />
        <Button
          // href="/resetPwd"
          color="secondary"
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

export default ForgotPwd;
