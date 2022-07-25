/***
 * @author : Aayushi Rashesh Gandhi
 * @bannerID : B00890697
 * @email : aayushi.gandhi@dal.ca
 ***/

const { Products } = require("../models/Product");

exports.getProduct = async (req, res) => {
    try {
        const {id} = req.params;
        const getProduct = await Products.findById(id);
        
        res.status(200).json({ product: getProduct, success: true });
      } catch (error) {
        res.status(404).json({ message: error.message, success: false });
    }
}

exports.getProducts = async (req, res) => {
    try {
        const getProducts = await Products.find();
        
        res.status(200).json({ products: getProducts, success: true });
      } catch (error) {
        res.status(404).json({ message: error.message, success: false });
    }
}


exports.createProduct = async (req, res) => {
    try{
        const product = req.body;

        //const existingProduct = await Products.find({ productName: product.productName })

        const newProduct = new Products({...product, createdAt: new Date().toISOString()});
        await newProduct.save();

        res.status(201).json({
            success: true,
            message: "Product added successfully",
          });
    }
    catch(error){
        res.status(409).json({success: false, message: error.message})
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const {id} = req.params;

        await Products.findByIdAndRemove(id)
        res.json({ message: "Deleted successfully", success: true });
    }
    catch (error) {
        res.status(500).json({ message: error.message, success: false });
      }
}

exports.editProduct = async (req, res) => {
    const {id: _id} = req.params;
    const { productName, productType, productPrice, productDescription, productColor, metalType, inventoryQuantity, productImage } = req.body

    //if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with this id");

    const updatedProduct = await Products.findByIdAndUpdate(_id, {
        productName, productType, productPrice, productDescription, productColor, metalType, inventoryQuantity, productImage
    });

    res.json({ updatedProduct: updatedProduct, success: true });
}