const express = require("express");
const {addCategory,getCategory} =require('../Controllers/category.controller');
// const {requireSignin}=require('../Controllers/Admin/Auth');
const {adminMiddleware,requireSignin}=require('../Middleware/common')
const router = express.Router();
const path=require('path');
const shortid = require('shortid');
const multer=require('multer');

const storage = multer.diskStorage ({
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

router.post("/category/create",requireSignin,adminMiddleware,upload.single('ImageCategory'), addCategory);
router.get('/category/getcategory', getCategory);

module.exports = router;
