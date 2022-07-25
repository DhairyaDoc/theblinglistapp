const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  storeName: String,
  storeAddress: String,
  serviceOptions: Number,
  contact: String,
});

exports.Location = mongoose.model("Location", locationSchema);
