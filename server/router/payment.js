/***
 * @author : Dhairya Analbhai Doctor
 * @bannerID : B00864868
 * @email : dh973257@dal.ca
 * @description: Defining routes for checkout, gift card payment, and getting cart items.
 ***/
const router = require("express").Router();

const {
  makePayment,
  makeGiftCardPayment,
  checkPromoCode,
  getCartItems,
} = require("../controllers/paymentController");

router.post("/payment", makePayment);
router.post("/payGiftCard", makeGiftCardPayment);
router.get("/checkPromoCode/:promoCode", checkPromoCode);
router.get("/getUserCartItems/:userID", getCartItems);

module.exports = router;
