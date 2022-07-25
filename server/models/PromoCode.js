/***
 * @author : Dhairya Analbhai Doctor
 * @bannerID : B00864868
 * @email : dh973257@dal.ca
 * @description: Model for promo code.
 ***/
const mongoose = require("mongoose");

const promoCodeSchema = new mongoose.Schema(
  {
    name: String,
    discount: Number,
  },
  { timestamps: true }
);

exports.PromoCode = mongoose.model("PromoCode", promoCodeSchema);
