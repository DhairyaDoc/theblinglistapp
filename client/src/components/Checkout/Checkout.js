/***
 * @author : Dhairya Analbhai Doctor
 * @bannerID : B00864868
 * @email : dh973257@dal.ca
 * @description: React component displaying Checkout page.
 ***/

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import StripeCheckout from "react-stripe-checkout";

import {
  checkoutPayment,
  checkPromoCode,
  getCartItems,
} from "../../store/actions/payment";

import "react-toastify/dist/ReactToastify.css";
import "./Checkout.css";
import { stripePaymentPublishKey } from "../../config/config";
import { isUserLoggedIn } from "../../Helpers/helper";

const Checkout = () => {
  const navigate = useNavigate();
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [cartDetails, setCartDetails] = useState();
  const [cartID, setCartID] = useState();
  const [cartIdList, setCartIdList] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [disablePromoCodeButton, setDisablePromoCodeButton] = useState(false);
  const [totalItemQuantity, setTotalItemQuantity] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    let role = localStorage.getItem("role");
    if (isUserLoggedIn()) {
      if (role === "customer") {
        getCartItems().then((response) => {
          setCartItems(response.data[0].items);
          setCartID(response.data[0]._id);
          let items = response.data[0].items;
          let totalCartAmount = 0,
            totalItemsQuantityInCart = 0;

          const cartItemList = items.map((item) => {
            totalCartAmount =
              totalCartAmount + item.productPrice * item.quantity;
            totalItemsQuantityInCart = totalItemsQuantityInCart + item.quantity;
            return {
              id: item._id,
              quantity: item.quantity,
              inventoryQuantity: item.inventoryQuantity,
            };
          });

          const productIDList = items.map((item) => {
            return item._id;
          });

          setTotalItemQuantity(totalItemsQuantityInCart);
          setCartIdList(productIDList);
          setCartDetails(cartItemList);
          calculateTotalAmount(totalCartAmount);
          setSubTotalAmount(totalCartAmount);
          if (discount !== 0) {
            applyDiscount(discount);
          }
        });
      } else {
        navigate("/admin");
      }
    } else {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const makePayment = (token) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const body = {
      token: token,
      totalPayableAmount: parseFloat(totalAmount),
      quantity: totalItemQuantity,
      orders: cartIdList,
      cartID: cartID,
      subTotal: subTotal,
      discount: discount,
      cartDetails: cartDetails,
      user: {
        id: user._id,
        name: user.firstName + user.lastName,
        email: user.email,
        deliveryLocation: deliveryLocation,
      },
    };

    if (deliveryLocation === "") {
      toast.error("Please add delivery address!", {
        position: "bottom-right",
        theme: "dark",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      checkoutPayment(body).then((result) => {
        if (result.success === true) {
          toast.success("Payment successfull!", {
            position: "bottom-right",
            theme: "dark",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            onClose: () => {
              localStorage.removeItem("cart");
              navigate("/cart");
            },
          });
        } else {
          toast.error("Please fill all the fields!", {
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
      });
    }
  };

  const calculateTotalAmount = (amount) => {
    setTotalAmount(parseFloat(amount + 4.99 + amount * 0.15));
  };

  const setSubTotalAmount = (amount) => {
    setSubTotal(parseFloat(amount));
  };

  const setDiscountedAmount = (discountPrecent) => {
    setDiscount(parseFloat(discountPrecent));
  };

  const applyDiscount = (discountPercent) => {
    setTotalAmount(
      parseFloat(totalAmount - totalAmount * (discountPercent / 100)).toFixed(2)
    );
  };

  const disableButton = () => {
    setDisablePromoCodeButton(true);
  };

  const checkUserPromoCode = () => {
    if (promoCode === "") {
      toast.error("No promocode applied", {
        position: "bottom-right",
        theme: "dark",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      checkPromoCode(promoCode).then((response) => {
        if (response.success) {
          disableButton();
          setDiscountedAmount(response.data[0].discount);
          toast.success("Promocode applied!", {
            position: "bottom-right",
            theme: "dark",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            onClose: () => applyDiscount(response.data[0].discount),
          });
        } else {
          toast.info("No such promo code exists!", {
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
      });
    }
  };

  return (
    <div>
      <div>
        <Grid mt={4} mb={4} align="center" className="page-title">
          <Typography
            mb={1}
            variant="body1"
            color="initial"
            className="heading-2"
          >
            Your Bag ({cartItems.length}{" "}
            {cartItems.length === 1 ? "Item" : "Items"})
          </Typography>
          <Typography variant="p" color="initial" className="heading-3">
            Items are not reserved until payment is made.
          </Typography>
        </Grid>
      </div>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={8} className="items-checklist">
            <Paper elevation={10} className="item-checklist-card">
              <Grid container>
                {cartItems.map((item) => {
                  return (
                    <div style={{ marginBottom: "3%" }}>
                      <Grid
                        onClick={() => {
                          navigate("/viewdetails");
                        }}
                        xs={12}
                        container
                        mb={3}
                      >
                        <Grid xs={4}>
                          <img
                            alt=""
                            src={item.productImage}
                            height="80%"
                            width="90%"
                          />
                        </Grid>
                        <Grid xs={6}>
                          <Typography
                            className="item-info-title"
                            variant="subtitle2"
                            gutterBottom
                            component="div"
                          >
                            {item.productName}
                          </Typography>
                          <div>
                            <Typography className="item-info-text">
                              <b>Product number:</b> {item._id}
                            </Typography>
                            <hr />
                            <Typography className="item-info-text">
                              {item.productDescription}
                            </Typography>
                            <br />
                            <Typography className="item-info-text">
                              <b>Product Type:</b> {item.productType}
                            </Typography>
                            <Typography className="item-info-text">
                              <b>Metal:</b> {item.metalType}
                            </Typography>
                            <Typography className="item-info-text">
                              {item.item_stones}
                            </Typography>
                            <Typography className="item-info-text">
                              <b>Color: </b>
                              {item.productColor}
                            </Typography>
                            <Typography className="item-info-text">
                              <b>Quantity Ordered: </b>
                              {item.quantity}
                            </Typography>
                          </div>
                        </Grid>
                        <Grid xs={2} align="right">
                          C${item.productPrice}
                        </Grid>
                      </Grid>
                    </div>
                  );
                })}
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={4} className="order-summary">
            <Paper elevation={10} className="order-summary-card">
              <Typography className="order-summary-title">
                Order Summary
              </Typography>
              <div className="pricing-information">
                <div>
                  <span className="pricing-type">Subtotal</span>
                </div>
                <div>C$ {subTotal}</div>
              </div>
              <div className="pricing-information">
                <div>
                  <span className="pricing-type">Shipping</span>
                </div>
                <div>C$ 4.99</div>
              </div>
              <div className="pricing-information">
                <div>
                  <span className="pricing-type">Estimated Tax</span>
                </div>
                <div>15%</div>
              </div>
              {discount > 0 && (
                <div className="pricing-information">
                  <div>
                    <span className="pricing-type">Discount Applied</span>
                  </div>
                  <div>{discount}%</div>
                </div>
              )}
              <div className="total">
                <div>
                  <span>Total</span>
                </div>
                <div>C$ {totalAmount}</div>
              </div>
              <div className="deliveryAddress">
                <TextField
                  id="outlined-multiline-static"
                  label="Delivery Address"
                  multiline
                  fullWidth
                  value={deliveryLocation}
                  rows={4}
                  placeholder="Add address..."
                  onChange={(event) => {
                    setDeliveryLocation(event.target.value);
                  }}
                />
              </div>
              <div className="coupon-class">
                <Typography variant="h6" gutterBottom component="div">
                  Have a coupon Code?
                </Typography>
                <TextField
                  id="outlined-basic"
                  label="Apply Coupon Code"
                  variant="outlined"
                  placeholder="PROMO CODE"
                  className="coupon-input"
                  value={promoCode}
                  disabled={disablePromoCodeButton}
                  onChange={(event) => setPromoCode(event.target.value)}
                />
                <Button
                  variant="contained"
                  onClick={checkUserPromoCode}
                  disabled={disablePromoCodeButton}
                  className="promo-code-btn"
                >
                  APPLY
                </Button>
              </div>
              <StripeCheckout
                stripeKey={stripePaymentPublishKey}
                token={(token) => makePayment(token)}
                amount={totalAmount * 100}
                name="Buy Item"
              >
                <Button className="checkout-btn">CHECKOUT</Button>
              </StripeCheckout>
            </Paper>
          </Grid>
          <ToastContainer />
        </Grid>
      </div>
    </div>
  );
};

export default Checkout;
