const user = require('../../Models/user');
const usermodel=require('../../Models/user');
const jwt=require('jsonwebtoken');

exports.signup = async(req,res) => {
    const user=await usermodel.findOne ({email: req.body.email})
    if(user)
{
    return res.status(400).json({message:"Admin has already been registered"});
}

const {FirstName, LastName,email,password} =req.body;
const userdetails=new usermodel({FirstName,LastName,email,password,UserName:Math.random().toString(),role:"admin"})

userdetails.save().then((data)=>
{
    if(data)
    {
        return res.status(200).send({message:"Admin created successfully "})
    }
})
}



exports.signin= async(req,res)=>
{
    const data=await usermodel.findOne({email:req.body.email})

    if(data)
    {
        if(data.authenticate(req.body.password) && data.role==="admin")
        {
                const token=jwt.sign({_id:data._id,role:data.role},process.env.JWT_SECRET_KEY,{expiresIn:'1d'});
                const {_id,FirstName,LastName,email,role,fullname}=data
                res.status(200).json({
                    token,
                    data:{
                        _id,FirstName,LastName,email,role,fullname
                    }
                })
        }

    }
    else{
        return res.status(400).json({message:"Something Went wrong..."});
    }
}


                //    we are going to get the token in the request
                //      |
// exports.requireSignin=(req,res,next)=>
// {

//     if(req.headers.authorization)
//     {
//         const token = req.headers.authorization.split(" ")[1];
//      const usertoken=jwt.verify(token,process.env.JWT_SECRET_KEY);
//      req.user = usertoken;
//     next();
//     }
//     return res.status(400).json({message:"Authorization required"})
    
//     // jwt.decode()
// }

