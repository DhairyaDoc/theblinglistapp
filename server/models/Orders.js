/***
 * @author : Dhairya Analbhai Doctor
 * @bannerID : B00864868
 * @email : dh973257@dal.ca
 * @description: Model for order schema.
 ***/

const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const productSchema = require("../models/Product");

const ordersSchema = new mongoose.Schema(
  {
    userID: ObjectId,
    totalPrice: Number,
    quantity: Number,
    tax: Number,
    discount: Number,
    retail: Number,
    address: String,
    itemsList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Products" }],
    status: String,
    delivery: Date,
  },
  {
    timestamps: true,
  }
);

exports.Orders = mongoose.model("orders", ordersSchema);
