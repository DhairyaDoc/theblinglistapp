const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const blogSchema = new mongoose.Schema(
  {
    blogTitle: String,
    blogDescription: String,
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
exports.Blog = mongoose.model("Blog", blogSchema);