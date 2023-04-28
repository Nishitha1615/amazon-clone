const express = require("express");
// const {addCategory,getCategory} =require('../Controllers/category.controller');
// const {requireSignin}=require('../Controllers/Admin/Auth');
const multer=require('multer');
const {adminMiddleware,requireSignin}=require('../Middleware/common');
const { createProd } = require("../Controllers/product.controller");
const router = express.Router();
const shortid = require('shortid');
const path=require('path');


const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null,path.join(path.dirname(__dirname),'uploads'))
        },
        filename: function (req, file, cb) {
          cb(null , shortid.generate() + '-' + file.originalname)
        }
      })

        //  where we are going to upload the file
        //                |
        const upload=multer({storage})

router.post("/product/create",requireSignin,adminMiddleware,upload.array('productPicture'),createProd);


//router.get('/category/getcategory', getCategory);

module.exports = router;
