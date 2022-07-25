const { Favourites } = require("../models/Favourites");
const { Products } = require("../models/Product");
const ObjectId = require("mongodb").ObjectId;

exports.addToFavourites = async (req, res) => {
    try {
        const { user_id, product_id } = req.body;
        const alreadyFavourited = await Favourites.find({ userId: ObjectId(user_id), productId: ObjectId(product_id) })
        if (alreadyFavourited.length == 0) {
            const data = await Favourites({ userId: ObjectId(user_id), productId: ObjectId(product_id) }).save();
            if (data == null || data == '') {
                return res.status(400).json({
                    success: false,
                    error: `Something went wrong!`
                });
            } else {
                return res.status(200).json({
                    data: data,
                    message: `Product added to favourites successfully!`,
                    success: true
                });
            }
        } else {
            return res.status(400).json({
                success: false,
                error: `Product already added to favourites!`
            });
        }
    } catch (error) {
        return res
            .status(400)
            .json({
                success: false,
                error: `Something went wrong! ${error}`
            });
    }
}

fetchProductDetails=(data)=>{
    return Promise.all(data.map(async favourite => {
        productData = await Products.find({ _id: favourite.productId })
        return productData[0] 
    }))
}

exports.fetchFavourites = async (req, res) => {
    try {
        const id = req.query.id;
        let favourites = []
        favourites = await Favourites.find({ userId: ObjectId(id) }).then(async data => {
            const favourites=await fetchProductDetails(data)
            return favourites;
        }).catch(err => {
            return res
                .status(400)
                .json({
                    success: false,
                    message: `Something went wrong! ${err}`,
                    data: []
                });
        })
        if (favourites == null) {
            return res.status(400).json({
                success: false,
                message: `Something went wrong!`
            });
        } else if(favourites.length == 0) {
            return res.status(200).json({
                data: [],
                success: true,
                message: `You have not added any favourites yet!`
            });
        }else {
            return res.status(200).json({
                data: favourites,
                message: `Favourite Products fetched successfully!`,
                success: true
            });
        }
    } catch (error) {
        return res
            .status(400)
            .json({
                success: false,
                message: `Something went wrong! ${error}`,
                data: []
            });
    }
}

exports.removeFavourites = async (req, res) => {
    try {
        const { user_id, product_id } = req.body;
        const data = await Favourites.findOneAndRemove({ userId: user_id, productId: product_id })
        if(data == null) {
            return res.status(400).json({ data:[], message: 'Something went wrong', success: false})
        }
        return res.status(200).json({  data: data, message: 'Success', success: true });
    } catch (error) {
        return res
            .status(400)
            .json({
                success: false,
                message: `Something went wrong! ${error}`,
                data: []
            });
    }
}

exports.addToCart = async (req, res) => {
    try {
        const { user_id, product_id } = req.body;
        return res.status(400).json({})
    } catch (error) {
        return res
            .status(400)
            .json({
                success: false,
                message: `Something went wrong! ${error}`,
                data: []
            });
    }
}