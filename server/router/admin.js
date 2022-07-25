/***
 * @author : Aayushi Rashesh Gandhi
 * @bannerID : B00890697
 * @email : aayushi.gandhi@dal.ca
 ***/

const router = require("express").Router();

const { getProducts, getProduct, createProduct, deleteProduct, editProduct } = require("../controllers/adminController");

router.get("/admin/:search", getProducts);
router.get("/admin/product/:id", getProduct);
router.post("/admin", createProduct);
router.delete("/admin/:id", deleteProduct)
router.patch('/admin/:id', editProduct)

module.exports = router;
