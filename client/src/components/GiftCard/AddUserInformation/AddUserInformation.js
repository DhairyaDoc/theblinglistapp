/***
 * @author : Dhairya Analbhai Doctor
 * @bannerID : B00864868
 * @email : dh973257@dal.ca
 * @description: React componnent for taking information from the user.
 ***/
import React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {
  APPARTMENT_NUMBER,
  EMAIL,
  NAME,
  POSTAL_CODE,
  STREET_NAME,
  STREET_NUMBER,
} from "../../../Constants/constants.js";

const AddUserInformation = ({
  userInfo,
  handleUserInformation,
  handleNameBlurEvents,
  handleEmailBlurEvents,
  handleAptNumberBlurEvents,
  handleStreetNumberBlurEvents,
  handleStreetNameBlurEvents,
  handlePostalCodeBlurEvents,
}) => {
  return (
    <Paper elevation={20} className="user-card">
      <Typography variant="h4" className="title" gutterBottom component="div">
        User Information
      </Typography>
      <Grid container align="center">
        <Grid xs={12} mb={2}>
          <TextField
            className="user-input"
            variant="outlined"
            label="Name"
            color="secondary"
            error={userInfo.errors.name === "" ? false : true}
            helperText={userInfo.errors.name}
            value={userInfo.name}
            onChange={(e) => {
              handleUserInformation(NAME, e.target.value);
            }}
            onBlur={handleNameBlurEvents}
          />
        </Grid>
        <Grid xs={12} mb={2}>
          <TextField
            className="user-input"
            variant="outlined"
            label="Email"
            color="secondary"
            error={userInfo.errors.email === "" ? false : true}
            helperText={userInfo.errors.email}
            value={userInfo.email}
            onChange={(e) => {
              handleUserInformation(EMAIL, e.target.value);
            }}
            onBlur={handleEmailBlurEvents}
          />
        </Grid>
        <Grid xs={12} mb={2}>
          <TextField
            className="user-input"
            variant="outlined"
            label="Appartment Number"
            color="secondary"
            error={userInfo.errors.appartmentNumber === "" ? false : true}
            helperText={userInfo.errors.appartmentNumber}
            value={userInfo.appartmentNumber}
            onChange={(e) => {
              handleUserInformation(APPARTMENT_NUMBER, e.target.value);
            }}
            onBlur={handleAptNumberBlurEvents}
          />
        </Grid>
        <Grid xs={12} mb={2}>
          <TextField
            className="user-input"
            variant="outlined"
            label="Street Number"
            color="secondary"
            error={userInfo.errors.streetNumber === "" ? false : true}
            helperText={userInfo.errors.streetNumber}
            value={userInfo.streetNumber}
            onChange={(e) => {
              handleUserInformation(STREET_NUMBER, e.target.value);
            }}
            onBlur={handleStreetNumberBlurEvents}
          />
        </Grid>
        <Grid xs={12} mb={2}>
          <TextField
            className="user-input"
            variant="outlined"
            label="Street Name"
            color="secondary"
            error={userInfo.errors.streetName === "" ? false : true}
            helperText={userInfo.errors.streetName}
            value={userInfo.streetName}
            onChange={(e) => {
              handleUserInformation(STREET_NAME, e.target.value);
            }}
            onBlur={handleStreetNameBlurEvents}
          />
        </Grid>
        <Grid xs={12} mb={2}>
          <TextField
            className="user-input"
            variant="outlined"
            label="Postal Code"
            color="secondary"
            error={userInfo.errors.postalCode === "" ? false : true}
            helperText={userInfo.errors.postalCode}
            value={userInfo.postalCode}
            onChange={(e) => {
              handleUserInformation(POSTAL_CODE, e.target.value);
            }}
            onBlur={handlePostalCodeBlurEvents}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AddUserInformation;
