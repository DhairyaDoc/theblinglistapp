/***
 * @author : Aayushi Rashesh Gandhi
 * @bannerID : B00890697
 * @email : aayushi.gandhi@dal.ca
 ***/

import React from "react";
import { Box } from "@material-ui/core";
import Carousel from "react-material-ui-carousel";
import useStyles from "./Styles.js";

const bannerData = [
  "images/set3.jpg",
  "images/set8.jpg",
  "images/set7.jpg",
  "images/set6.jpg",
  "images/set9.jpg",
];

const Poster = () => {
  const classes = useStyles();

  return <Box className={classes.banner}>
      <Carousel animation="slide" interval={2500} navButtonsAlwaysVisible={true} indicators={false} navButtonsProps={{
      style: {
        backgroundColor: "#ffffff",
        borderRadius: 0,
        color: "#222",
        margin: 0,
        height: 47
      }
    }}>
        {bannerData.map((url, i) => <img src={url} className={classes.banner_img} alt="Offers" key={i} />)}
      </Carousel>
    </Box>;
}

export default Poster;