/***
 * @author : Aayushi Rashesh Gandhi
 * @bannerID : B00890697
 * @email : aayushi.gandhi@dal.ca
 ***/

const router = require("express").Router();

const { getSearchProducts, getNewArrivalsProducts, getMostPopularProducts, getYouMayLikeProducts } = require("../controllers/recommendationController");

router.get("/recommend/:search", getSearchProducts);
router.get("/newarrivals", getNewArrivalsProducts);
router.get("/mostpopular", getMostPopularProducts);
router.get("/youmaylike/:id", getYouMayLikeProducts);

module.exports = router;