const { Cart } = require("../models/Cart");
exports.addCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ userid: req.body.userid });
    if (cart !== null) {
      cart.items = req.body.items;
      await cart.save();
    } else {
      const newCart = Cart(req.body);
      await newCart.save();
    }
    res.status(201);
    res.send({ success: "Cart Added Successfully" });
  } catch (error) {
    res.status(400);
    res.send({ error: error });
  }
};
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userid: req.body.userid });
    res.status(200);
    if(cart !== null){
      res.send(cart);
    }
    else{
      res.send({userid : req.body.userid,items:[]})
    }
    
  } catch (error) {
    res.status(404);
    res.send({ error: 404 });
  }
};
