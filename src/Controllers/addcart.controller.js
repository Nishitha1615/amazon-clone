const Cart = require("../Models/AddCart");

exports.addCartItems = async (req, res) => {
  const data = await Cart.findOne({ user: req.user._id });

  if (data) {
    // if cart is already present then update the cart quantity
    const product=await req.body.Items.product
    const isItemExist= await data.Items.find(item=> item.product==product);
   
    if(isItemExist)
    {

        const usercart=await Cart.findOneAndUpdate({ "user":req.user._id,"Items.product":product},{
            "$set":{
                "Items.$":{
                    ...req.body.Items,
                    quantity:isItemExist.quantity + req.body.Items.quantity
                }
            }
        })
    
        if(usercart)
        {
            return res.status(200).json({
                // message: "User created successfully ",
                cart:usercart
              });
        }

    }
    else{
        const usercart=await Cart.findOneAndUpdate({ user:req.user._id},{
            "$push":{
                "Items":req.body.Items
            }
        })
    
        if(usercart)
        {
            return res.status(200).json({
                // message: "User created successfully ",
                cart:usercart
              });
        }
    }

   
    // return res.status(200).send({
    //   message: data,
    // });
  } else {
    // if cart is not present then create the cart
    const cart = new Cart({
      user: req.user._id,
      Items: [req.body.Items],
    });

    cart.save().then((items) => {
      if (items) {
        return res.status(200).send({
          // message: "User created successfully ",
          items,
        });
      }
    });
  }
};
