const router = require("express").Router();

const { addToSearch, searchProducts, searchFavourites } = require("../controllers/searchController");

router.post("/addToSearch", addToSearch);
router.get("/products", searchProducts);
router.get("/favourites", searchFavourites);

module.exports = router;