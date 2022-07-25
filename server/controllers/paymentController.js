/***
 * @author : Dhairya Analbhai Doctor
 * @bannerID : B00864868
 * @email : dh973257@dal.ca
 * @description: Controller defining payment methods using stripe, and getting items for cart.
 ***/
const mongoose = require("mongoose");
const stripe = require("stripe")(
  "sk_test_51LIC1bE41Y5D29LDh8L9rJtAivoKhMhAxj7dp1oQlIlmiZ73wAg8mKWlFeO0tJkMVzsCknQIRMXyge0HzgEyIFtc00SYXO38ly"
);

const { Cart } = require("../models/Cart");
const { Products } = require("../models/Product");
const { Orders } = require("../models/Orders");
const { GiftCards } = require("../models/GiftCard");
const { PromoCode } = require("../models/PromoCode");

exports.makePayment = async (req, res) => {
  try {
    const {
      token,
      user,
      orders,
      totalPayableAmount,
      cartID,
      quantity,
      subTotal,
      discount,
      cartDetails,
    } = req.body;

    await stripe.customers
      .create({
        email: user.email,
        source: token.id,
      })
      .then((customer) => {
        stripe.charges.create({
          amount: Math.ceil(totalPayableAmount),
          currency: "cad",
          customer: customer.id,
          receipt_email: user.email,
          description: `Payment is successful and $${totalPayableAmount} is paid by ${user.name} for order.`,
        });
      })
      .then(() => {
        let currentDate = new Date();

        const order = new Orders({
          userID: user.id,
          totalPrice: totalPayableAmount,
          quantity: quantity,
          itemsList: orders,
          status: "Order Placed",
          retail: subTotal,
          tax: 15,
          discount: discount,
          address: user.deliveryLocation,
          delivery: currentDate.setDate(currentDate.getDate() + 15),
        });

        order
          .save()
          .then((result) => {
            Cart.findByIdAndDelete(cartID, (err, docs) => {
              if (err) {
                return res
                  .status(502)
                  .json({ success: false, message: "Something went wrong!" });
              }

              return res
                .status(200)
                .json({ success: true, message: "Payment done successfully!" });
            });
          })
          .catch((err) => {
            return res
              .status(501)
              .json({ success: false, error: `Somethingg went wrong! ${err}` });
          });
      })
      .catch((err) => {
        return res
          .status(502)
          .json({ success: false, error: `Something went wrong!!! ${err}` });
      });
  } catch (err) {
    return res
      .status(502)
      .json({ success: false, error: `Something went wrong!! ${err}` });
  }
};

exports.makeGiftCardPayment = async (req, res) => {
  try {
    const { token, amount, user, giftCardImage } = req.body;
    return await stripe.customers
      .create({
        email: user.email,
        source: token.id,
      })
      .then((customer) => {
        stripe.charges.create({
          amount: amount,
          currency: "cad",
          customer: customer.id,
          receipt_email: user.email,
          description: "Gift card payment successful!",
        });
      })
      .then(async () => {
        const giftCard = new GiftCards({
          email: user.email,
          username: user.username,
          deliveryAddress: user.address,
          amount: amount * 100,
          giftCardImage: giftCardImage,
        });

        return await giftCard
          .save()
          .then((result) => {
            return res.status(200).json({
              success: true,
              message: `Payment done! Email is ${user.email}!`,
            });
          })
          .catch((err) => {
            return res.status(502).json({
              success: false,
              error: `Something went wrong!! ${err}`,
            });
          });
      });
  } catch (error) {
    return res
      .status(502)
      .json({ success: false, error: `Something went wrong!! ${error}` });
  }
};

exports.checkPromoCode = async (req, res) => {
  const { promoCode } = req.params;

  await PromoCode.find({ name: promoCode })
    .then((response) => {
      if (response.length > 0) {
        return res.status(200).json({ success: true, data: response });
      }
      return res.status(200).json({ success: false, data: response });
    })
    .catch((err) => {
      return res
        .status(502)
        .json({ success: false, message: "Something went wrong!" });
    });
};

exports.getCartItems = async (req, res) => {
  try {
    const { userID } = req.params;

    await Cart.find({ userid: userID })
      .then((response) => {
        return res.status(200).json({ success: true, data: response });
      })
      .catch((err) => {
        return res
          .status(502)
          .json({ success: false, error: `Error in finding items! ${err}` });
      });
  } catch (error) {
    return res
      .status(502)
      .json({ success: false, error: `Something went ${error}` });
  }
};
