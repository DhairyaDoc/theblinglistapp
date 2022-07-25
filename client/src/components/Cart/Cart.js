import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isUserLoggedIn } from "../../Helpers/helper";
import { addToCart, fetchCart } from "../../store/actions/Jewels";
import ProductCard from "./ProductCard";
import Summary from "./Summary";
import { connect, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Image from "mui-image";
import { BACKEND_URL } from "../../config/config";

const Cart = (props) => {
  const location = useLocation();
  const cart_products = useSelector((state) => state.jewelsReducer.cart);
  useEffect(() => {
    if (location.state) {
      props.setItem(location.state);
      localStorage.setItem("cart", JSON.stringify(cart_products));
    }
  }, [cart_products]);
  useEffect(() => {
    getCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCart = async () => {
    await axios
      .post(BACKEND_URL + "cart/getCart", {
        userid: JSON.parse(localStorage.getItem("user"))._id,
      })
      .then((data) => {
        if (localStorage.getItem("cart") == null) {
          localStorage.setItem("cart", JSON.stringify(data.data));
          props.fetchCart(data.data);
        } else {
          props.fetchCart(JSON.parse(localStorage.getItem("cart")));
          axios
            .post(BACKEND_URL + "cart/addCart", cart_products)
            .then((response) => {
              localStorage.setItem("cart", JSON.stringify(cart_products));
              props.fetchCart(JSON.parse(localStorage.getItem("cart")));
            })
            .catch((error) => {});
        }
      });
  };
  const boxStyles = (Theme) => ({
    background: "#f3e5f5",
    width: "95%",
    mt: 4,
    m: "auto",
    p: 3,
    [Theme.breakpoints.down("md")]: {
      background: "#f3e5f5",
      width: "100%",
      mt: 4,
      m: "auto",
    },
  });

  const navigate = useNavigate();
  useEffect(() => {
    let role = localStorage.getItem("role");
    isUserLoggedIn()
      ? role === "customer"
        ? navigate("/cart")
        : navigate("/admin")
      : navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box>
        <Typography variant="h2" sx={{ p: 2 }}>
          Your Cart
        </Typography>
      </Box>
      <Grid container sx={boxStyles} direction="row" justifyContent="center">
        {cart_products.items.length === 0 ? (
          <Image
            src={"https://www.valeorx.com/static/media/empty-cart.60e68bfd.png"}
          />
        ) : (
          <>
            <Grid container item xs={12} md={8}>
              {cart_products.items.map((products, index) => {
                return (
                  <Grid item xs={12} md={8} sx={{ mb: 1, mt: 1 }} key={index}>
                    <ProductCard products={products} index={index} />
                  </Grid>
                );
              })}
            </Grid>
            <Grid item xs={12} md={3} sx={{ mb: 6, mr: 2, mt: 1 }}>
              <Summary products={cart_products.items} />
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};

const mapDispatchtoProps = (dispatch) => {
  return {
    setItem: (data) => {
      dispatch(addToCart(data));
    },
    fetchCart: (cart) => {
      dispatch(fetchCart(cart));
    },
  };
};
export default connect(null, mapDispatchtoProps)(Cart);
