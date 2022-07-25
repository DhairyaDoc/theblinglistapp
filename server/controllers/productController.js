const { Products } = require("../models/Product");
const { Favourites } = require("../models/Favourites");
const ObjectId = require("mongodb").ObjectId;

exports.getProductsFavouriteData = async (data, user_id) => {
  return Promise.all(data.map(async item => {
    const isFavorite = await Favourites.find({ userId: ObjectId(user_id), productId: ObjectId(item._id) })
    if (isFavorite.length > 0) {
      return {
        ...item["_doc"],
        favourite: 1
      }
    } else {
      return {
        ...item["_doc"],
        favourite: 0
      }
    }
  }))
}


exports.getProducts = async (req, res) => {
  try {
    const data = await Products.find();
    if (data.length > 0) {
      const result = await this.getProductsFavouriteData(data, req.query.id)
      return res.status(200).json({ data: result, success: true, message: "Products fetched successfully" });
    } else if (data.length == 0) {
      return res.status(404).json({ message: "Product not found", data: [], success: true });
    } else {
      return res.status(400).json({ message: "Something went wrong", data: [], success: false });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message, data: [], success: false });
  }
};

exports.getProductsById = async (req, res) => {
  try {
    const data = await Products.find({ _id: ObjectId(req.query.id) });
    if (data.length > 0) {
      const result = await this.getProductsFavouriteData(data, req.query.user_id)
      return res.status(200).json({ data: result[0], success: true, message: "Products fetched successfully" });
    } else if (data.length == 0) {
      return res.status(404).json({ message: "Product not found", data: [], success: true });
    } else {
      return res.status(400).json({ message: "Something went wrong", data: [], success: false });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message, data: [], success: false });
  }
};