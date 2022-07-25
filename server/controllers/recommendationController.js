/***
 * @author : Aayushi Rashesh Gandhi
 * @bannerID : B00890697
 * @email : aayushi.gandhi@dal.ca
 ***/

const { Products } = require("../models/Product");
const { Orders } = require("../models/Orders");
const { Search } = require("../models/Search");

exports.getSearchProducts = async (req, res) => {
  try {
    const { search } = req.params;
    const getProducts = await Products.find({ productType: search });

    res.status(200).json({ products: getProducts, success: true });
  } catch (error) {
    res.status(404).json({ message: error.message, success: false });
  }
}

exports.getNewArrivalsProducts = async (req, res) => {
  try {
    const recentEarringProducts = await Products.find({ productType: "earring" }).sort({ createdAt: -1 }).limit(6)
    const recentNecklaceProducts = await Products.find({ productType: "necklace" }).sort({ createdAt: -1 }).limit(6)
    const recentRingProducts = await Products.find({ productType: "ring" }).sort({ createdAt: -1 }).limit(6)

    res.status(200).json({ earring: recentEarringProducts, necklace: recentNecklaceProducts, ring: recentRingProducts, success: true });
  } catch (error) {
    res.status(404).json({ message: error.message, success: false });
  }
}

exports.getMostPopularProducts = async (req, res) => {
  try {
    Orders.aggregate(
      [
        {
          "$project": {
            "itemsList": 1
          }
        },
        { "$unwind": "$itemsList" },
        { "$group": { _id: "$itemsList", count: { $sum: 1 } } },
        {
          "$lookup": {
            "from": "products",
            "localField": "_id",
            "foreignField": "_id",
            "as": "productsList"
          },
        },
        { "$unwind": "$productsList" },
      ],
      (err, docs) => {
        if (err) {
          res.status(404).json({ message: err.message, success: false });
        } else {
          res.status(200).json({
            message: docs,
            success: true,
          });
        }
      })
  } catch (error) {
    res.status(404).json({ message: error.message, success: false });
  }
}

exports.getYouMayLikeProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const userSearchProducts = await Search.find({ userId: id })
    const products1 = []

    for (var i = 0; i < userSearchProducts.length; i++) {
      const keyword = userSearchProducts[i]["keyword"]

      const searchedProduct = await Products.find({
        $or: [
          { productName: { $regex: new RegExp(keyword, "i") } },
          { productDescription: { $regex: new RegExp(keyword, "i") } },
          { productType: { $regex: new RegExp(keyword, "i") } },
          { productColor: { $regex: new RegExp(keyword, "i") } },
          { metalType: { $regex: new RegExp(keyword, "i") } },
        ],
      });
      products1.push(searchedProduct)
    }

    var newArr = [];
    for (var k = 0; k < products1.length; k++) {
      newArr = newArr.concat(products1[k]);
    }

    const products2 = await Products.find({ productType: "ring" }).limit(3)
    const products3 = await Products.find({ productType: "necklace" }).limit(3)

    res.status(200).json({ products1: newArr, products2: products2, products3: products3, success: true });
  } catch (error) {
    res.status(404).json({ message: error.message, success: false });
  }
}