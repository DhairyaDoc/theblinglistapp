const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const SearchSchema = new mongoose.Schema(
  {
    userId: ObjectId,
    keyword: String,
  },
  {
    timestamps: true,
  }
);

exports.Search = mongoose.model("search", SearchSchema);