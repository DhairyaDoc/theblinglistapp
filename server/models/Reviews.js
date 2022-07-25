const mongoose = require("mongoose");

const reviewsSchema = new mongoose.Schema({
  product_id: String,
  user_id: String,
  user_name: String,
  title: String,
  description: String,
  rating: Number,
});

exports.Reviews = mongoose.model("Comments", reviewsSchema);