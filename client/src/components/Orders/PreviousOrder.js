// **Name** : Suchitra Dhamu
// **Banner ID** : B0897187
// **Group Id** : 7

import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { ToastContainer, toast } from "react-toastify";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import OrderDetails from "./OrderDetails";
import Cart from "../Cart/Cart";
import { useNavigate } from "react-router-dom";
import { getOrderByUserId, editOrder } from "../../store/actions/order.js";
import { isUserLoggedIn } from "../../Helpers/helper";

const theme = createTheme();

function PreviousOrder() {
  const navigate = useNavigate();
  const [orders, setorders] = useState({});

  useEffect(() => {
    let role = localStorage.getItem("role");
    if (isUserLoggedIn()) {
      if (role === "customer") {
        const userId = JSON.parse(localStorage.getItem("user"))._id;
        getOrderByUserId(userId).then((result) => {
          result.data.forEach(function (order) {
            order.createdAt = new Date(order.createdAt).toDateString();
            order.delivery = new Date(order.delivery).toDateString();
            order.userName = "Group 17";
          });
          setorders(result.data);
        });
      } else if (role === "admin") {
        navigate("/admin");
      }
    } else {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (orderid) => {
    <OrderDetails />;
    navigate(`/orderDetails/${orderid}`);
  };

  const CancelOrder = (orderid) => {
    editOrder(orderid).then((result) => {
      if (result.success === true) {
        toast.success("Order Cancelled successfully", {
          position: "bottom-right",
          theme: "dark",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      window.location.reload(false);
    });
  };

  const toReviews = (pid) => {
    localStorage.setItem("productDetailsId", pid);
    navigate("/viewdetails");
  };

  const toCart = (e,data) => {
    e.preventDefault();
    // <Cart />;
    // navigate("/cart");
    navigate("/cart", { state: { ...data, quantity: 1 } })
  };

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
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
          <Grid container alignItems="flex-end" justifyContent="flex-end">
            <Grid item xs>
              <Typography
                sx={{ color: "blueGrey" }}
                variant="h4"
                gutterBottom
                component="div"
              >
                Your Orders
              </Typography>
            </Grid>
          </Grid>
          {orders.length > 0 &&
            orders?.map((order) => {
              return (
                <Box
                  //style={{ textAlign: 'left' }}
                  key={order._id}
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
                  <Box
                    //style={{ textAlign: 'left' }}
                    sx={{
                      border: 1,
                      borderRadius: "10px",
                      backgroundColor: "#800080db",
                      color: "#ffffff",

                      //textTransform: 'none',
                    }}
                  >
                    <Grid
                      key={order._id}
                      container
                      component="form"
                      sx={{
                        p: 1,
                        alignItems: "left",
                        justifyContent: "left",
                      }}
                    >
                      <Grid item xs>
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
                          variant="body2"
                          gutterBottom
                          component="div"
                        >
                          {order.createdAt}
                        </Typography>
                      </Grid>
                      <Grid item xs>
                        <Typography
                          sx={{ color: "#ffffff" }}
                          variant="body2"
                          gutterBottom
                          component="div"
                        >
                          TOTAL
                        </Typography>
                        <Typography
                          sx={{ color: "#ffffff" }}
                          variant="body2"
                          gutterBottom
                          component="div"
                        >
                          CDN ${order.totalPrice}
                        </Typography>
                      </Grid>
                      <Grid item xs>
                        <Typography
                          sx={{ color: "#ffffff" }}
                          variant="body2"
                          gutterBottom
                          component="div"
                        >
                          Delivery date
                        </Typography>
                        <Typography
                          sx={{ color: "#ffffff" }}
                          variant="body2"
                          gutterBottom
                          component="div"
                        >
                          {order.delivery}
                        </Typography>
                      </Grid>
                      <Grid item xs style={{ textAlign: "right" }}>
                        <Typography
                          sx={{ color: "#ffffff" }}
                          variant="body2"
                          gutterBottom
                          component="div"
                        >
                          ORDER # {order._id}
                        </Typography>
                        <Button
                          sx={{
                            color: "#FFFFFF",
                            border: "1px solid #FFFFFF",
                            "&:hover": {
                              backgroundColor: "#e8b8ff96",
                              opacity: [0.9, 0.8, 0.7],
                            },
                          }}
                          onClick={() => onSubmit(order._id)}
                        >
                          Order Details
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                  {order.itemsList?.map((item) => {
                    return (
                      <Box
                        //style={{ textAlign: 'left' }}
                        key={item._id}
                        sx={{
                          m: 1,
                          p: 1,
                          color: "#ffffff",

                          //textTransform: 'none',
                        }}
                      >
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
                          <Grid
                            item
                            s={6}
                            md={3}
                            style={{ maxInlineSize: "max-content" }}
                          >
                            <img
                              src={item.productImage}
                              alt="earring1"
                              width="150"
                              height="120"
                              alignitems="left"
                            />
                          </Grid>
                          <Grid item s={6} md={7} style={{ padding: 5 }}>
                            <Link
                              href="#"
                              sx={{ color: "purple" }}
                              underline="hover"
                            >
                              {item.productName}
                            </Link>
                            <Typography
                              sx={{ color: "#808080" }}
                              variant="body2"
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
                            <Typography
                              sx={{ color: "#808080" }}
                              variant="body2"
                              gutterBottom
                              component="div"
                            >
                              {item.productDescription}
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            s={12}
                            md={2}
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
                            s={12}
                            md={1}
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
                      </Box>
                    );
                  })}
                  {order.status !== "Cancelled" &&
                    order.status !== "Delivered" && (
                      <Button
                        sx={{
                          color: "#800080",
                          border: "1px solid #80008059",
                          "&:hover": {
                            backgroundColor: "#e8b8ff96",
                            opacity: [0.9, 0.8, 0.7],
                          },
                        }}
                        onClick={() => CancelOrder(order._id)}
                      >
                        Cancel
                      </Button>
                    )}
                </Box>
              );
            })}
          <Divider />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default PreviousOrder;
