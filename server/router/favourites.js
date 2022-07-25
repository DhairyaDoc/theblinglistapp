const router = require("express").Router();

const { addToFavourites, fetchFavourites, removeFavourites, addToCart, addToSearch } = require("../controllers/favouriteController");

router.post("/addToFavourites", addToFavourites);
router.get("/fetchfavourites", fetchFavourites);
router.put("/removefavourites",removeFavourites);
router.post("/addToCart", addToCart);

module.exports = router;

