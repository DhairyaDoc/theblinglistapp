const { JWT_SECRET } = require("../config/app");
const mongoose = require('mongoose')
const jwt = require("jsonwebtoken");
const { User } = require("../models/User");

const requireLogin = function (req, res, next) {    
    const{authorization} = req.headers;
    if(!authorization){
        return res.status(401).json({
            success: false,
             message: "You must be logged in to access this resource"
        });
    }
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, JWT_SECRET, (err, payload) => {    
        if(err){
            return res.status(401).json({
                success: false,
                message: "You must be logged in to access this resource"
            });
        }
        const {_id} = payload;
        User.findById(_id).then(userdata => {         
        req.user = userdata;
        next()
    })
   
})
};

module.exports = {requireLogin};


//References :https://github.com/mukeshphulwani66/Instagram-clone-MERN-Stack