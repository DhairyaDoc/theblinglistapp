const router = require("express").Router();

const { getLocations } = require("../controllers/locationController");

router.get("/location", getLocations);

module.exports = router;
