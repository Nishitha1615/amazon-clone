const Product=require('../Models/Product')
const shortid = require('shortid');
const slugify = require("slugify");


exports.createProd=async (req,res)=>
{

    //res.status(200).json({file:req.files,body:req.body});

    const {Productname,price,description,category,createdBy}=req.body;

    let productPicture=[];

    if(req.files.length>0)
    {
        productPicture=req.files.map((file)=>{
            return {img:file.filename}
        })
    }

    console.log(productPicture)

    const product = new Product({
      Productname: Productname,
      slug: slugify(Productname),
      price,
      description,
      productPicture,
      category,
      createdBy: req.user._id,
    });

    product.save().then((product) => {
        if (product) {
          return res.status(200).send({
            // message: "User created successfully ",
            product
          });
        }
      });
}