const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const cartSchema = new mongoose.Schema({
  userid: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  items:[]
});

exports.Cart = mongoose.model("cart", cartSchema);