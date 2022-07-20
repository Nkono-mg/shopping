const catchAsyncError = require("./catchAsyncError");
const ErrorHandler = require("../utils/errorHandler"); 
const jwt = require("jsonwebtoken");
const userModel = require("../models/users/user")

//Check if user is authenticated or not
module.exports.isAuthenticatedUser = catchAsyncError(async (req, res, next)=>{
    const { token } = req.cookies;
    if(!token){
        return next(new ErrorHandler("Login first to access this resource", 401));
    }
    //decoded token and verify it
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await userModel.findById(decodedToken.id);
    next();
})

//Authorize role for user
module.exports.authorizeRoles = (...roles) => {
 return (req,res, next)=>{
    if(!roles.includes(req.user.role)){
        return next(new ErrorHandler(`Role ${req.user.role} is not authorized for this resource}`, 403))
    }
    next();
 }
}