/***
 * @author : Aayushi Rashesh Gandhi
 * @bannerID : B00890697
 * @email : aayushi.gandhi@dal.ca
 ***/

import React from "react";
import { Container, Box, Grid, Typography } from "@mui/material";
import useStyles from "./Styles.js";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <>
      <Container >
        <Box mt={4} mb={2} sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item lg={4} md={2} xs={4}>
              <div className={classes.gridItem}>
                <div className={classes.img_root}>
                  <img onClick={() => {
                    navigate("/admin?search=ring");
                  }}
                    className={classes.img_responsive}
                    src={`./images/ring.svg`}
                    alt="ah"
                  />
                </div>
                <Typography variant="h5" align="center">
                  Rings
                </Typography>
              </div>
            </Grid>
            <Grid item lg={4} md={2} xs={4}>
              <div className={classes.gridItem}>
                <div className={classes.img_root}>
                  <img onClick={() => {
                    navigate("/admin?search=necklace");
                  }}
                    className={classes.img_responsive}
                    src={`./images/necklace.svg`}
                    alt="ah"
                  />
                </div>
                <Typography variant="h5" align="center">
                  Necklaces
                </Typography>
              </div>
            </Grid>
            <Grid item lg={4} md={2} xs={4}>
              <div className={classes.gridItem}>
                <div className={classes.img_root}>
                  <img onClick={() => {
                    navigate("/admin?search=earring");
                  }}
                    className={classes.img_responsive}
                    src={`./images/earring.svg`}
                    alt="ah"
                  />
                </div>
                <Typography variant="h5" align="center">
                  Earrings
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};
export default Category;
