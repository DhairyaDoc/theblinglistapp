/***
 * @author : Guryash Singh Dhall
 * @bannerID : B00910690
 * @email : guryash.dhall@dal.ca
 ***/

import { Box, Grid, Paper, TextField, Typography } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import React, { useEffect } from "react";
import { Button } from "@mui/material";
import blingsvg from "../../images/User Profile.svg";
import "./Profile.css";
import NavBarProfile from "../NavbarProfile";
import { useNavigate } from "react-router-dom";
import { isUserLoggedIn } from "../../Helpers/helper";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config/config";

const Profile = () => {
  const navigate = useNavigate();

  const title = "User Profile";
  const color = "#000000";
  const user = JSON.parse(localStorage.getItem("user"));
  const [profileInfo, setProfileInfo] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    errors: {
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  // Handle first name change

  const handleFirstNameErrors = () => {
    if (!profileInfo.firstName) {
      setProfileInfo({
        ...profileInfo,
        errors: {
          ...profileInfo.errors,
          firstName: "First Name is required",
        },
      });
    } else {
      setProfileInfo({
        ...profileInfo,
        errors: {
          ...profileInfo.errors,
          firstName: "",
        },
      });
    }
  };

  //  Handle last name errors

  const handleLastNameErrors = () => {
    if (!profileInfo.lastName) {
      setProfileInfo({
        ...profileInfo,
        errors: {
          ...profileInfo.errors,
          lastName: "Last Name is required",
        },
      });
    } else {
      setProfileInfo({
        ...profileInfo,
        errors: {
          ...profileInfo.errors,
          lastName: "",
        },
      });
    }
  };

  useEffect(() => {
    let role = localStorage.getItem("role");
    isUserLoggedIn()
      ? role === "customer"
        ? navigate("/profile")
        : navigate("/admin")
      : navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfileInfo({ ...profileInfo, [name]: value });
  };
  const onhandleSubmit = (e) => {
    // e.preventDefault();
    if (
      profileInfo.errors.firstName === "" &&
      profileInfo.errors.lastName === "" &&
      profileInfo.errors.email === ""
    ) {
      axios
        .post(BACKEND_URL + "edit-profile", {
          email: profileInfo.email,
          firstName: profileInfo.firstName,
          lastName: profileInfo.lastName,
        })
        .then((res) => {
          if (res.data.success === true) {
            let user = JSON.parse(localStorage.getItem("user"));
            user.firstName = res.data.user.firstName;
            user.lastName = res.data.user.lastName;
            localStorage.setItem("user", JSON.stringify(user));
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
                navigate("/recommendation");
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
      handleFirstNameErrors();
      handleLastNameErrors();
    }
  };

  return (
    <Grid container>
      <Grid xs={12} align="center" mb={3}>
        <div>
          <NavBarProfile title={title} color={color} />
        </div>
        <Paper
          elevation={24}
          sx={{
            width: "90%",
            height: "100%",
            padding: "30px",
            spacing: 5,
            display: "flex",
            flexFlow: "row",
          }}
        >
          {/* Grid for User Profile Image */}
          <Grid item sm={6} alignContent="center">
            <Box
              sx={{
                display: "flex",
                flexFlow: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "auto",
                height: "50%",
                margin: "auto",
              }}
            >
              <img
                src={blingsvg}
                alt="bling"
                width="100%"
                height="100%"
                min-width="300"
                alignitems="left"
                className="center bling-image"
              />
            </Box>
          </Grid>
          {/* Grid for Other Fields */}
          <Grid item sm={6}>
            <Typography mt={2} ml={1} variant="p" gutterBottom component="div">
              <TextField
                label="First Name"
                id="firstName"
                type="text"
                name="firstName"
                className="form-inputs"
                placeholder="Update your First Name"
                variant="outlined"
                color="secondary"
                value={profileInfo.firstName}
                error={profileInfo.errors.firstName !== ""}
                helperText={profileInfo.errors.firstName}
                onChange={handleChange}
                onBlur={handleFirstNameErrors}
              />
              <br />
              <br />
              <TextField
                label="Last Name"
                id="lastName"
                type="text"
                name="lastName"
                className="form-input"
                placeholder="Update your Last Name"
                variant="outlined"
                color="secondary"
                value={profileInfo.lastName}
                error={profileInfo.errors.lastName !== ""}
                helperText={profileInfo.errors.lastName}
                onChange={handleChange}
                // onChange={(e) => handleChange("lastName", e.target.value)}
                onBlur={handleLastNameErrors}
              />
              <br />
              <br />
              <TextField
                label="Email"
                id="email"
                type="email"
                name="email"
                className="form-input"
                placeholder="Update your Email"
                variant="outlined"
                color="secondary"
                value={profileInfo.email}
                // onChange={handleChange}
                disabled={true}
              />
              <br />
              <br />
              <br />
              <Typography>
                <Button
                  className="form-input-btn"
                  variant="contained"
                  type="submit"
                  style={{
                    color: "secondary",
                    maxWidth: "200px",
                    maxHeight: "200px",
                    background: "#6A0DAD",
                    textAlign: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                  onClick={onhandleSubmit}
                >
                  Save Profile
                </Button>
              </Typography>
            </Typography>
          </Grid>
        </Paper>
      </Grid>
      <ToastContainer />
    </Grid>
  );
};

export default Profile;
