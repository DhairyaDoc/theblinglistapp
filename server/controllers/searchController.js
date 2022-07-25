const { Search } = require("../models/Search");
const { Products } = require("../models/Product");
const { Favourites } = require("../models/Favourites");
const { getProductsFavouriteData } = require("./productController");
const ObjectId = require("mongodb").ObjectId;

exports.addToSearch = async (req, res) => {
  try {
    const { user_id, keyword } = req.body;

    const data = await Search({
      userId: ObjectId(user_id),
      keyword: keyword,
    }).save();
    if (data == null) {
      return res.status(400).json({ message: "Fail", success: false });
    } else {
      return res.status(200).json({ message: "Success", success: true });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `Something went wrong! ${error}`,
      data: [],
    });
  }
};

exports.searchProducts = async (req, res) => {
  try {
    const user_id = req.query.id;
    const keyword = req.query.keyword;
    const data = await Products.find({
      $or: [
        { productName: { $regex: new RegExp(keyword, "i") } },
        { productDescription: { $regex: new RegExp(keyword, "i") } },
        { productType: { $regex: new RegExp(keyword, "i") } },
        { productColor: { $regex: new RegExp(keyword, "i") } },
        { metalType: { $regex: new RegExp(keyword, "i") } },
      ],
    });

    if (data.length > 0) {
      const result = await getProductsFavouriteData(data, user_id);
      return res.status(200).json({
        data: result,
        success: true,
        message: "Products fetched with keyword: " + keyword + " successfully",
      });
    } else if (data.length == 0) {
      return res.status(404).json({
        message: "Product with keyword '" + keyword + "' not found",
        data: [],
        success: true,
      });
    } else {
      return res
        .status(400)
        .json({ message: "Something went wrong", data: [], success: false });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `Something went wrong! ${error}`,
      data: [],
    });
  }
};

fetchSearchProductDetails = (data, keyword) => {
  return Promise.all(
    data.map(async (favourite) => {
      productData = await Products.find({
        $and: [
          { _id: favourite.productId },
          {
            $or: [
              { productName: { $regex: new RegExp(keyword, "i") } },
              { productDescription: { $regex: new RegExp(keyword, "i") } },
              { productType: { $regex: new RegExp(keyword, "i") } },
              { productColor: { $regex: new RegExp(keyword, "i") } },
              { metalType: { $regex: new RegExp(keyword, "i") } },
            ],
          },
        ],
      });
      return productData[0];
    })
  );
};

exports.searchFavourites = async (req, res) => {
  try {
    const id = req.query.id;
    const keyword = req.query.keyword;

    let favourites = [];
    favourites = await Favourites.find({ userId: ObjectId(id) })
      .then(async (data) => {
        const favourites = await fetchSearchProductDetails(data, keyword);
        return favourites;
      })
      .catch((err) => {
        return res.status(400).json({
          success: false,
          message: `Something went wrong! ${err}`,
          data: [],
        });
      });
    if (favourites == null) {
      return res.status(400).json({
        success: false,
        message: `Something went wrong!`,
      });
    } else if (favourites.length == 0) {
      return res.status(200).json({
        data: [],
        success: true,
        message: `You have not added any favourites yet!`,
      });
    } else {
      favourites = favourites.filter((favourite) => {
        if (favourite != null) {
          return favourite;
        }
      });
      return res.status(200).json({
        data: favourites,
        message: `Favourite Products fetched successfully!`,
        success: true,
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `Something went wrong! ${error}`,
      data: [],
    });
  }
};
