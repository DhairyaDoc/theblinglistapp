// **Name** : Suchitra Dhamu
// **Banner ID** : B0897187
// **Group Id** : 7

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Cart from "../Cart/Cart";
import ReviewPage from "../Review/ReviewPage";
import { useNavigate } from "react-router-dom";

import { getOrder } from "../../store/actions/order.js";
import { isUserLoggedIn } from "../../Helpers/helper";

const theme = createTheme();
function OrderDetails() {
  const navigate = useNavigate();
  const params = useParams();
  const [order, setOrder] = useState({ data: [] });
  const toReviews = (pid) => {
    localStorage.setItem("productDetailsId", pid);
    <ReviewPage />;
    navigate("/viewdetails");
  };

  useEffect(() => {
    let role = localStorage.getItem("role");
    if (isUserLoggedIn()) {
      if (role === "customer") {
        getOrder(`${params.id}`).then((result) => {
          result.data[0].createdAt = new Date(
            result.data[0].createdAt
          ).toDateString();
          result.data[0].delivery = new Date(
            result.data[0].delivery
          ).toDateString();
          result.data[0].userName = "Group 17";
          setOrder(result.data[0]);
        });
      } else if (role === "admin") {
        navigate("/admin");
      }
    } else {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toCart = (e, data) => {
    e.preventDefault();
    <Cart />;
    // navigate("/cart");
    navigate("/cart", { state: { ...data, quantity: 1 } })
  };
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexFlow: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignitems: "center",
          width: "100%",
        }}
      >
        <Container
          component="main"
          sx={{
            p: 2,
            width: "100%",
          }}
        >
          <Typography
            sx={{ color: "blueGrey" }}
            variant="h4"
            gutterBottom
            component="div"
          >
            Order Details
          </Typography>
          <Box
            //style={{ textAlign: 'left' }}
            sx={{
              border: 1,
              borderRadius: "10px",
              backgroundColor: "#800080db",
              color: "#ffffff",
              m: 1,
              p: 1,

              //textTransform: 'none',
            }}
          >
            <Grid
              container
              component="form"
              sx={{
                p: 1,
                alignItems: "left",
                justifyContent: "left",
              }}
            >
              <Grid item xs style={{ textAlign: "right", paddingRight: 10 }}>
                <Typography
                  sx={{ color: "#ffffff" }}
                  variant="body2"
                  gutterBottom
                  component="div"
                >
                  ORDER PLACED
                </Typography>
                <Typography
                  sx={{ color: "#ffffff" }}
                  variant="body1"
                  gutterBottom
                  component="div"
                >
                  {order.createdAt}
                </Typography>
              </Grid>
              <Divider orientation="vertical" variant="middle" flexItem />

              <Grid item xs style={{ paddingLeft: 10 }}>
                <Typography
                  sx={{ color: "#ffffff" }}
                  variant="body2"
                  gutterBottom
                  component="div"
                >
                  ORDER NO.
                </Typography>
                <Typography
                  sx={{ color: "#ffffff" }}
                  variant="body1"
                  gutterBottom
                  component="div"
                >
                  {order._id}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box
            //style={{ textAlign: 'left' }}
            sx={{
              border: 1,
              borderRadius: "10px",
              m: 1,
              borderColor: "#757575",
              p: 1,
              color: "#ffffff",

              //textTransform: 'none',
            }}
          >
            <Grid
              container
              component="form"
              sx={{
                p: 1,
                alignItems: "left",
                justifyContent: "left",
              }}
            >
              <Grid item xs style={{ textAlign: "right", paddingRight: 10 }}>
                <Typography
                  sx={{ color: "black" }}
                  variant="caption"
                  gutterBottom
                  component="div"
                >
                  Quantity:
                </Typography>
                <Typography
                  sx={{ color: "black" }}
                  variant="body2"
                  gutterBottom
                  component="div"
                >
                  {order.quantity}
                </Typography>
              </Grid>
              <Grid item xs style={{ paddingLeft: 10 }}>
                <Typography
                  sx={{ color: "black" }}
                  variant="caption"
                  gutterBottom
                  component="div"
                >
                  Status:
                </Typography>
                <Typography
                  sx={{ color: "black" }}
                  variant="body2"
                  gutterBottom
                  component="div"
                >
                  {order.status}
                </Typography>
              </Grid>
            </Grid>

            {order.itemsList?.map((item) => {
              return (
                <Grid
                  key={item._id}
                  container
                  component="form"
                  sx={{
                    p: 1,
                    alignItems: "left",
                    justifyContent: "left",
                  }}
                >
                  <Grid item xs style={{ maxInlineSize: "max-content" }}>
                    <img
                      src={item.productImage}
                      alt="earring1"
                      width="150"
                      height="120"
                      alignitems="left"
                    />
                    <br></br>
                  </Grid>
                  <Grid item xs style={{ padding: 5 }}>
                    <Link href="#" sx={{ color: "purple" }} underline="hover">
                      {item.productName}
                    </Link>
                    <Typography
                      sx={{ color: "#808080" }}
                      variant="caption"
                      gutterBottom
                      component="div"
                    >
                      {item.productColor} {item.productType}
                    </Typography>
                    <Typography
                      sx={{ color: "#808080" }}
                      variant="body2"
                      gutterBottom
                      component="div"
                    >
                      Metal Type: {item.metalType}
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    xs
                    style={{
                      textAlign: "right",
                      maxInlineSize: "max-content",
                      padding: 3,
                    }}
                  >
                    <br></br>
                    <Button
                      sx={{
                        color: "#800080",
                        border: "1px solid #80008059",
                        "&:hover": {
                          backgroundColor: "#e8b8ff96",
                          opacity: [0.9, 0.8, 0.7],
                        },
                      }}
                      onClick={() => toReviews(item._id)}
                    >
                      Write a review
                    </Button>
                  </Grid>
                  <Grid
                    item
                    xs
                    style={{
                      textAlign: "right",
                      maxInlineSize: "max-content",
                      padding: 3,
                    }}
                  >
                    <br></br>
                    <Button
                      sx={{
                        color: "#800080",
                        border: "1px solid #80008059",
                        "&:hover": {
                          backgroundColor: "#e8b8ff96",
                          opacity: [0.9, 0.8, 0.7],
                        },
                      }}
                      onClick={e=>toCart(e,item)}
                    >
                      Repurchase
                    </Button>
                  </Grid>
                </Grid>
              );
            })}
          </Box>
          <Grid
            container
            component="form"
            sx={{
              p: 1,
              alignItems: "right",
              justifyContent: "right",
            }}
          >
            <Grid
              item
              xs
              style={{
                textAlign: "right",
                maxInlineSize: "max-content",
                padding: 3,
              }}
            >
              <Typography
                sx={{ color: "black" }}
                variant="body2"
                gutterBottom
                component="div"
              >
                Retail Price:
              </Typography>
              <Typography
                sx={{ color: "black" }}
                variant="body2"
                gutterBottom
                component="div"
              >
                Taxes Included:
              </Typography>
              <Typography
                sx={{ color: "black", fontWeight: "bold" }}
                variant="body2"
                gutterBottom
                component="div"
              >
                Total:{" "}
              </Typography>
              <Divider />
            </Grid>
            <Grid
              item
              xs
              style={{
                textAlign: "right",
                maxInlineSize: "max-content",
                padding: 3,
              }}
            >
              <Typography
                sx={{ color: "black" }}
                variant="body2"
                gutterBottom
                component="div"
              >
                CA$ {order.retail}
              </Typography>
              <Typography
                sx={{ color: "black" }}
                variant="body2"
                gutterBottom
                component="div"
              >
                CA$ {order.tax}
              </Typography>
              <Typography
                sx={{ color: "black", fontWeight: "bold" }}
                variant="body2"
                gutterBottom
                component="div"
              >
                CA$ {order.totalPrice}
              </Typography>
              <Divider />
            </Grid>
          </Grid>

          <Grid
            container
            component="form"
            sx={{
              p: 1,
              alignItems: "left",
              justifyContent: "left",
            }}
          >
            <Grid item xs={12} style={{ paddingRight: 10 }}>
              <Typography
                sx={{ color: "black", fontWeight: "bold" }}
                variant="caption"
                gutterBottom
                component="div"
              >
                Billing Information
              </Typography>
              <Divider />
              <Typography
                sx={{ color: "#808080" }}
                variant="body2"
                gutterBottom
                component="div"
              >
                Group 7
              </Typography>
              <Typography
                sx={{ color: "#808080" }}
                variant="body2"
                gutterBottom
                component="div"
              >
                {order.address}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography
                sx={{ color: "black", fontWeight: "bold" }}
                variant="caption"
                gutterBottom
                component="div"
              >
                Shipping Information
              </Typography>
              <Divider />
              <Typography
                sx={{ color: "#808080" }}
                variant="body2"
                gutterBottom
                component="div"
              >
                Group 7
              </Typography>
              <Typography
                sx={{ color: "#808080" }}
                variant="body2"
                gutterBottom
                component="div"
              >
                {order.address}
              </Typography>
            </Grid>
          </Grid>

          <Grid
            container
            component="form"
            sx={{
              p: 1,
              alignItems: "left",
              justifyContent: "left",
            }}
          >
            <Grid item xs={12} style={{ paddingRight: 10 }}>
              <Typography
                sx={{ color: "black", fontWeight: "bold" }}
                variant="caption"
                gutterBottom
                component="div"
              >
                Shipping Method
              </Typography>
              <Divider />
              <Typography
                sx={{ color: "#808080" }}
                variant="body2"
                gutterBottom
                component="div"
              >
                Standard Shipping
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography
                sx={{ color: "black", fontWeight: "bold" }}
                variant="caption"
                gutterBottom
                component="div"
              >
                Payment Method
              </Typography>
              <Divider />
              <Typography
                sx={{ color: "#808080" }}
                variant="body2"
                gutterBottom
                component="div"
              >
                Credit Card
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default OrderDetails;
