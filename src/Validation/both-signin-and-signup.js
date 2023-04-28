const {check,validationResult}=require('express-validator')

exports.validateRequest = [
    check('firstname')
    .notEmpty()
    .withMessage("please enter your first name"),
    check('lastname')
    .notEmpty()
    .withMessage("please enter your last name"),
    check('email')
    .notEmpty()
    .withMessage("please enter your email"),
    check('password')
    .isLength({min:6})
    .withMessage("password must be at least 6 characters")
];





exports.isRequestValidated=(req,res,next) => {
   const errors=  validationResult(req);
    console.log(errors);
//    return res.status(400).json({error: errors.array() }); 
    // if(errors.array().length > 0)
    // {
    //     return res.status(400).json({error: errors.array() }); 
    // }
    next();
}

    