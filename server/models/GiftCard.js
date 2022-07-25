/***
 * @author : Dhairya Analbhai Doctor
 * @bannerID : B00864868
 * @email : dh973257@dal.ca
 * @description: Model for Gift Card.
 ***/
const mongoose = require("mongoose");

const giftCardSchema = new mongoose.Schema(
  {
    giftCardImage: String,
    amount: Number,
    deliveryAddress: String,
    username: String,
    email: String,
  },
  { timestamps: true }
);

exports.GiftCards = mongoose.model("GiftCards", giftCardSchema);
