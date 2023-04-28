const express = require("express");
const {addCartItems} =require('../Controllers/addcart.controller');
// const {requireSignin}=require('../Controllers/Admin/Auth');
const {userMiddleware,requireSignin}=require('../Middleware/common')
const router = express.Router();

router.post("/user/cart/cartitems",requireSignin,userMiddleware, addCartItems);


module.exports = router;