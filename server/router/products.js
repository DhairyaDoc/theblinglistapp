const router = require("express").Router();

const { getProducts, getProductsById } = require("../controllers/productController");

router.get("/products/getproducts", getProducts);
router.get("/products/getproductsbyid", getProductsById);


module.exports = router;