import { Paper, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isUserLoggedIn } from "../../Helpers/helper";
import ReviewPage from "../Review/ReviewPage";
import axios from "axios";
import "./Product.css";
import { BACKEND_URL } from "../../config/config";
import { ToastContainer, toast } from "react-toastify";

const ViewProduct = () => {
  const navigate = useNavigate();
  const [product, setProducts] = useState({});
  const [favourites, setFavourites] = useState(0);

  useEffect(() => {
    let role = localStorage.getItem("role");
    isUserLoggedIn()
      ? role === "customer"
        ? navigate("/viewdetails")
        : navigate("/admin")
      : navigate("/");

    async function fetchData() {
      const user_id = JSON.parse(localStorage.getItem("user"))._id;
      const res = await axios.get(
        BACKEND_URL +
        "products/getproductsById?user_id=" +
        user_id +
        `&id=${localStorage.getItem("productDetailsId")}`
      );

      if (res.data.success) {
        setFavourites(res.data.data.favourite)
        setProducts(res.data.data)
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeFavourites = async (e) => {
    e.preventDefault();

    const result = await axios.put(
      BACKEND_URL + "favourites/removefavourites",
      {
        user_id: JSON.parse(localStorage.getItem("user"))._id,
        product_id: product._id,
      }
    );
    if (result.data.success) {
      setFavourites(0);
      toast.success("Product has been removed from wishlist successfully!", {
        position: "top-right",
        theme: "dark",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error(
        "Something went wrong! Please refresh your page and try again.",
        {
          position: "top-right",
          theme: "dark",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
  };

  const addToFavourites = async (e) => {
    e.preventDefault();

    const result = await axios.post(
      BACKEND_URL + "favourites/addToFavourites",
      {
        user_id: JSON.parse(localStorage.getItem("user"))._id,
        product_id: product._id,
      }
    );

    if (result.data.success) {
      setFavourites(1);
      toast.success("Product added to your wishlist!", {
        position: "top-right",
        theme: "dark",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error(
        "Something went wrong! Please refresh your page and try again.",
        {
          position: "top-right",
          theme: "dark",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
  };

  return (
    <div>
      <Grid align="center" mt={4} mb={4}>
        <Typography
          className="product-details-heading"
          variant="p"
          mb={4}
          gutterBottom
          component="div"
          color="initial"
        >
          Product Details
        </Typography>
        {product===undefined || product===null || product.length===0? <></> :
          <div>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Paper elevation={24} className="product-details">
                  <Grid xs={12} container>
                    <Grid xs={3} align="left">
                      <img
                        alt=""
                        src={product.productImage}
                        height="100%"
                        width="90%"
                      />
                    </Grid>
                    <Grid xs={6} align="left">
                      <Typography
                        className="product-name"
                        variant="h4"
                        gutterBottom
                        component="div"
                      >
                        {product.productName}
                      </Typography>
                      <div>
                        <Typography className="item-info-text">
                          <b>Product number: </b> {product._id}
                        </Typography>
                        <Typography className="item-info-text">
                          <b>Metal: </b> {product.metalType}
                        </Typography>
                        <Typography className="item-info-text">
                          <b>Type: </b> {product.productType}
                        </Typography>
                        <Typography className="item-info-text">
                          <b>Color: </b> {product.productColor}
                        </Typography>
                        <Typography className="item-info-text">
                          <b>Description: </b> {product.productDescription}
                        </Typography>
                        <Stack mt={3} spacing={2} direction="row">
                          {favourites === 1 ? (
                            <button
                              onClick={(e) => {
                                removeFavourites(e);
                              }}
                              className="product-btn"
                            >
                              REMOVE FAVORITE
                            </button>
                          ) : (
                            <button
                              onClick={(e) => {
                                addToFavourites(e);
                              }}
                              className="product-btn"
                            >
                              ADD TO FAVORITES
                            </button>
                          )}

                          <button
                            onClick={() => {
                              navigate("/cart", {
                                state: { ...product, quantity: 1 },
                              });
                            }}
                            className="product-btn"
                          >
                            ADD TO CART
                          </button>
                        </Stack>
                      </div>
                    </Grid>
                    <Grid xs={2} align="right">
                      <b>CAD {product.productPrice}</b>
                    </Grid>
                  </Grid>
                  <Grid xs={12} align="left" mt={4}>
                    <ReviewPage id={product._id} />
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </div>}
      </Grid>
      <ToastContainer />
    </div>
  );
};

export default ViewProduct;
