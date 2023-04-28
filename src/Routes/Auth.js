const express=require('express');
const router=express.Router();
const {signup,signin}=require('../Controllers/Auth');
const { validateRequest,isRequestValidated } = require('../Validation/both-signin-and-signup');
// const {check}=require('express-validator')

router.post('/signin',signin)
router.post('/signup',
// [
//     check('firstname')
//     .notEmpty()
//     .withMessage("please enter your first name"),
//     check('lastname')
//     .notEmpty()
//     .withMessage("please enter your last name"),
//     check('email')
//     .notEmpty()
//     .withMessage("please enter your email"),
//     check('password')
//     .isLength({min:6})
//     .withMessage("password must be at least 6 characters")
// ],

validateRequest,isRequestValidated,

signup);


// to verify the token before login
// router.post('/profile',requireSignin,(req,res)=>
// {
//     res.status(200).json({person:"profile"})
// });



module.exports =router;