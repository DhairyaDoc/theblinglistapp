/***
 * @author : Aayushi Rashesh Gandhi
 * @bannerID : B00890697
 * @email : aayushi.gandhi@dal.ca
 ***/

import React, { useEffect, useState } from "react";
import Poster from "./Poster/Poster";
import Slider from "./Slider/Slider";
import { Grid, Divider, CircularProgress } from "@material-ui/core";
import Category from "./Categories/Category";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import {
  getNewArrivalsProducts,
  getMostPopularProducts,
  getYouMayLikeProducts,
} from "../../store/actions/recommendation";
import { isUserLoggedIn } from "../../Helpers/helper";

const Recommendation = () => {
  const navigate = useNavigate();
  const [earringImages, setEarringImages] = useState([]);
  const [necklaceImages, setNecklaceImages] = useState([]);
  const [ringImages, setRingImages] = useState([]);

  const [earringMpImages, setEarringMpImages] = useState([]);
  const [necklaceMpImages, setNecklaceMpImages] = useState([]);
  const [ringMpImages, setRingMpImages] = useState([]);

  const [earringYmlImages, setEarringYmlImages] = useState([]);
  const [necklaceYmlImages, setNecklaceYmlImages] = useState([]);
  const [ringYmlImages, setRingYmlImages] = useState([]);

  const userid = JSON.parse(localStorage.getItem('user'))._id

  useEffect(() => {
    if (isUserLoggedIn()) {
      var jewels1 = [];
      var jewels2 = [];
      var jewels3 = [];

      getNewArrivalsProducts().then((result) => {
        for (var i = 0; i < result["earring"].length; i++) {
          var arr1 = {
            label: result["earring"][i]["productName"],
            imgPath: result["earring"][i]["productImage"],
            productID: result["earring"][i]["_id"]
          };
          jewels1.push(arr1);
        }
        setEarringImages(jewels1);

        for (var i = 0; i < result["necklace"].length; i++) {
          var arr2 = {
            label: result["necklace"][i]["productName"],
            imgPath: result["necklace"][i]["productImage"],
            productID: result["necklace"][i]["_id"]
          };
          jewels2.push(arr2);
        }
        setNecklaceImages(jewels2);

        for (var i = 0; i < result["ring"].length; i++) {
          var arr3 = {
            label: result["ring"][i]["productName"],
            imgPath: result["ring"][i]["productImage"],
            productID: result["ring"][i]["_id"]
          };
          jewels3.push(arr3);
        }
        setRingImages(jewels3);
      });

      var mp_earring = [];
      var mp_necklace = [];
      var mp_ring = [];

      getMostPopularProducts().then((result) => {
        for (var i = 0; i < result["message"].length; i++) {
          if (result["message"][i]["productsList"]["productType"] === "ring") {
            var arr1 = {
              label: result["message"][i]["productsList"]["productName"],
              imgPath: result["message"][i]["productsList"]["productImage"],
              productID: result["message"][i]["productsList"]["_id"]
            };
            mp_ring.push(arr1);
          }
        }
        setRingMpImages(mp_ring);

        for (var i = 0; i < result["message"].length; i++) {
          if (
            result["message"][i]["productsList"]["productType"] === "necklace"
          ) {
            var arr2 = {
              label: result["message"][i]["productsList"]["productName"],
              imgPath: result["message"][i]["productsList"]["productImage"],
              productID: result["message"][i]["productsList"]["_id"]
            };
            mp_necklace.push(arr2);
          }
        }
        setNecklaceMpImages(mp_necklace);

        for (var i = 0; i < result["message"].length; i++) {
          if (
            result["message"][i]["productsList"]["productType"] === "earring"
          ) {
            var arr3 = {
              label: result["message"][i]["productsList"]["productName"],
              imgPath: result["message"][i]["productsList"]["productImage"],
              productID: result["message"][i]["productsList"]["_id"]
            };
            mp_earring.push(arr3);
          }
        }
        setEarringMpImages(mp_earring);
      });

      var yml_earring = [];
      var yml_necklace = [];
      var yml_ring = [];

      getYouMayLikeProducts(userid).then((result) => {
        for (var i = 0; i < result["products1"].length; i++) {
          var arr1 = {
            label: result["products1"][i]["productName"],
            imgPath: result["products1"][i]["productImage"],
            productID: result["products1"][i]["_id"]
          };
          yml_earring.push(arr1);
        }
        setEarringYmlImages(yml_earring);        

        for (var i = 0; i < result["products2"].length; i++) {
          var arr2 = {
            label: result["products2"][i]["productName"],
            imgPath: result["products2"][i]["productImage"],
            productID: result["products2"][i]["_id"]
          };
          yml_ring.push(arr2);
        }
        setRingYmlImages(yml_ring);

        for (var i = 0; i < result["products3"].length; i++) {
          var arr3 = {
            label: result["products3"][i]["productName"],
            imgPath: result["products3"][i]["productImage"],
            productID: result["products3"][i]["_id"]
          };
          yml_necklace.push(arr3);
        }
        setNecklaceYmlImages(yml_necklace);
      })
    } else {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Poster />

      <Category />

      <div style={{ margin: "70px" }}>
        <Divider style={{ width: "100%" }} />
        <br></br>
        <br></br>
        <Typography variant="h4" align="center">
          New Arrivals
        </Typography>
        {earringImages.length > 0 ? (
          <Grid
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Slider
              images={earringImages}
            />
            <Slider
              images={necklaceImages}
            />
            <Slider
              images={ringImages}
            />
          </Grid>
        ) : (
          <CircularProgress />
        )}
      </div>

      <div style={{ margin: "70px" }}>
        <Divider style={{ width: "100%" }} />
        <br></br>
        <br></br>
        <Typography variant="h4" align="center">
          You May Also Like
        </Typography>

        {earringImages.length > 0 ? (
          <Grid
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Slider
              images={earringYmlImages}
            />
            <Slider 
              images={ringYmlImages}
            />
            <Slider
              images={necklaceYmlImages}
            />
          </Grid>
        ) : (
          <CircularProgress />
        )}
      </div>

      <div style={{ margin: "70px" }}>
        <Divider style={{ width: "100%" }} />
        <br></br>
        <br></br>
        <Typography variant="h4" align="center">
          Most Popular
        </Typography>

        {earringImages.length > 0 ? (
          <Grid
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Slider
              images={ringMpImages}
            />
            <Slider
              images={necklaceMpImages}
            />
            <Slider
              images={earringMpImages}
            />
          </Grid>
        ) : (
          <CircularProgress />
        )}
      </div>
    </div>
  );
};

export default Recommendation;
