// **Name** : Suchitra Dhamu
// **Banner ID** : B0897187
// **Group Id** : 7

const router = require("express").Router();

const { getOrders,getOrderById,updateOrder,getOrderByUserId } = require("../controllers/orderController");

router.get("/previousorders/:id", getOrderByUserId);
router.get("/orderdetails/:id",getOrderById);
router.post("/previousorder/:id",updateOrder);
router.get("/orders",getOrders)
module.exports = router;
