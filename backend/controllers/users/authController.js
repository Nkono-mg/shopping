const userModel = require("../../models/users/user");
const ErrorHandler = require("../../utils/errorHandler");
const catchAsyncError = require("../../middlewares/catchAsyncError");
const sendToken = require("../../utils/jwtToken");

//Register a user 
module.exports.registerUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body
    const user = await userModel.create({ name, email, password,
         avatar: {
            public_id: 'zzz',
            url: 'zzzzzzzzzzzzzzzzzzzzzzzz'
        } 
    });
    /* const token = user.getJwtToken();
    return res.status(200).json({
        success: true,
        token
    }) */

    //Replaced by sendToken function
    return await sendToken(user, 200, res)
})

//login user 
module.exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    if(!email || !password){
        return next(new ErrorHandler("Please enter email and password", 400));
    }
    //Finding user in database
    const user = await userModel.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid email or Password", 401));
    }
    //check if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Password", 401));
    } 
 /*    const token = user.getJwtToken();
    return res.status(200).json({
        success: true,
        token
    }) */

     //Replaced by sendToken function
    return await sendToken(user, 200, res)
})

//logout user
module.exports.logoutUser = catchAsyncError(async (req, res, next) => {
    await res.cookie('token', null, { 
        expires: new Date(Date.now()), 
        httpOnly: true
    })
    return res.status(200).json({  
        success: true,
        message: "Logged out"
    }) 
})