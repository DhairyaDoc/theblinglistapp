/***
 * @author : Dhairya Analbhai Doctor
 * @bannerID : B00864868
 * @email : dh973257@dal.ca
 * @description: React component for displaying selecting the type of gift card from various gift card.
 ***/
import React from "react";
import { Button, Paper, Typography } from "@mui/material";
import { Slide } from "react-slideshow-image";

import "react-slideshow-image/dist/styles.css";

const SelectGiftCard = ({
  imageList,
  selectGiftCard,
  giftCard,
  resetGiftCard,
}) => {
  return (
    <Paper elevation={20} className="gift-card">
      <Typography variant="h4" className="title" gutterBottom component="div">
        Select Gift Card
      </Typography>
      <h5 className="gift-card-text">
        {giftCard === ""
          ? "Click on the gift to select a gift card"
          : "Gift card selected"}
      </h5>
      {giftCard === "" ? (
        <div className="slide-container">
          <Slide autoplay={false}>
            {imageList.map((image, index) => {
              return (
                <div
                  className="each-slide"
                  key={index}
                  onClick={() => selectGiftCard(index)}
                >
                  <img alt="" src={image} width="100%" />
                </div>
              );
            })}
          </Slide>
        </div>
      ) : (
        <div>
          <img alt="" src={giftCard} width="100%" />
          <Button onClick={resetGiftCard} variant="outlined" color="secondary">
            Reselect Gift Card
          </Button>
        </div>
      )}
    </Paper>
  );
};

export default SelectGiftCard;
