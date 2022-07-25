const router = require("express").Router();

router.use("/checkout", require("./payment"));
router.use("/", require("./order"));
router.use("/administration", require("./admin"));
router.use("/favourites", require("./favourites"));
router.use("/search", require("./search"));
router.use("/recommendation", require("./recommend"));
router.use("/blogs", require("./blog"));
router.use("/", require("./auth"));
router.use("", require("./favourites"));
router.use("", require("./reveiws"));
router.use("/", require("./products"));
router.use("", require("./cart"));

module.exports = router;
