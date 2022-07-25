/***
 * @author : Dhairya Analbhai Doctor
 * @bannerID : B00864868
 * @email : dh973257@dal.ca
 * @description: Input field for taking amount from user that is to be added to gift card.
 ***/
import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

const PayForGiftCard = ({
  amount,
  errorInAmount,
  handleAmount,
  validateAmount,
}) => {
  return (
    <Paper elevation={20} className="gift-card">
      <Typography variant="h4" className="title" gutterBottom component="div">
        Payment
      </Typography>
      <Grid container align="center">
        <Grid xs={12} mb={2}>
          <TextField
            className="user-input"
            variant="outlined"
            label="Amount"
            color="secondary"
            type="number"
            value={amount}
            error={errorInAmount === "" ? false : true}
            helperText={errorInAmount}
            onChange={(event) => handleAmount(event)}
            onBlur={validateAmount}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PayForGiftCard;
