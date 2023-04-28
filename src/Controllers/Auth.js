const usermodel=require('../Models/user');
const jwt=require('jsonwebtoken');
// const {validationResult}=require('express-validator')


exports.signup = async(req,res) => {


    // const errors=  validationResult(req);

    //     if(errors.array().length>0)
    //     {
    //         return res.status(400).json({error: errors.array()[0].msg}); 
    //     }

    // return res.status(400).json({error: errors.array()}); 


    const user=await usermodel.findOne ({email: req.body.email})
    if(user)
{
    return res.status(400).json({message:"User has already been registered"});
}

const {FirstName, LastName,email,password} =req.body;
const userdetails=new usermodel({FirstName,LastName,email,password,UserName:Math.random().toString()})

userdetails.save().then((data)=>
{
    if(data)
    {
        return res.status(200).send({
            message:"User created successfully "
            // user:data
        })

       
    }
})
}



exports.signin= async(req,res)=>
{
    const data=await usermodel.findOne({email:req.body.email})

    if(data)
    {
        if(data.authenticate(req.body.password))
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
//     const token = req.headers.authorization.split(" ")[1];
//      const usertoken=jwt.verify(token,process.env.JWT_SECRET_KEY);
//      req.user = usertoken;
//     next();
//     // jwt.decode()
// }
