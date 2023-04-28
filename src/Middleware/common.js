const jwt = require("jsonwebtoken");

// exports.requireSignin=(req,res,next)=>
// {
//     const token = req.headers.authorization.split(" ")[1];
//      const usertoken=jwt.verify(token,process.env.JWT_SECRET_KEY);
//      req.user = usertoken;
//     next();
//     // jwt.decode()
// }

exports.requireSignin = async (req, res, next) => {
    if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = user;
    
  }
  else{
    return res.status(400).json({ message: "Authorization required" });
  }
  

  next();

  // jwt.decode()
};

exports.userMiddleware = (req, res, next) => {

    if (req.user.role !== "user") {
        return res.status(400).json({ message: "Only user can access" });
      }
      // BackEnd\Middleware
      next();
};

exports.adminMiddleware = async(req, res, next) => {
    if (req.user.role !== "admin") {
    return res.status(400).json({ message: "Only admin can access" });
  }
  // BackEnd\Middleware
  next();

};
