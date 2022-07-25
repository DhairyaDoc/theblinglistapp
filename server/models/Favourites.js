const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const favouritesSchema = new mongoose.Schema(
  {
    userId: ObjectId,
    productId: ObjectId,
  },
  {
    timestamps: true,
  }
);

exports.Favourites = mongoose.model("favourites", favouritesSchema);