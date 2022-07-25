/***
 * @author : Dhairya Analbhai Doctor
 * @bannerID : B00864868
 * @email : dh973257@dal.ca
 * @description: Element for displaying the payable amount for gift card
 ***/
import React from "react";
import { Paper, Typography, Grid } from "@mui/material";

const PayableAmount = ({ amount }) => {
  return (
    <Paper elevation={20} className="gift-card">
      <Typography variant="h4" className="title" gutterBottom component="div">
        Payable Amount
      </Typography>
      {amount ? (
        <Grid container spacing={2} align="left">
          <Grid xs={12} container>
            <Grid item xs={8}>
              <Typography variant="h6" gutterBottom component="div">
                Gift Card Amount
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h6" gutterBottom component="div">
                <b>${amount}</b>
              </Typography>
            </Grid>
          </Grid>
          <Grid xs={12} container>
            <Grid item xs={8}>
              <Typography variant="h6" gutterBottom component="div">
                HST (15%)
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h6" gutterBottom component="div">
                <b>${(amount * 0.15).toFixed(2)}</b>
              </Typography>
            </Grid>
          </Grid>
          <Grid xs={12} container>
            <Grid item xs={8}>
              <Typography variant="h6" gutterBottom component="div">
                Delivery Charge
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h6" gutterBottom component="div">
                <b>$3.99</b>
              </Typography>
            </Grid>
          </Grid>
          <Grid xs={12} sx={{ borderTop: "1px solid #eee" }} container>
            <Grid item xs={8}>
              <Typography variant="h6" gutterBottom component="div">
                Total
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h6" gutterBottom component="div">
                <b>${(amount + amount * 0.15 + 3.99).toFixed(2)}</b>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Typography variant="h6" gutterBottom component="div">
          No amount selected
        </Typography>
      )}
    </Paper>
  );
};

export default PayableAmount;
