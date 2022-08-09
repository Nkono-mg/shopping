const userModel = require("../../models/users/user");
const ObjectId = require("mongoose").Types.ObjectId;
const ErrorHandler = require("../../utils/errorHandler");
const catchAsyncError = require("../../middlewares/catchAsyncError");
const sendToken = require("../../utils/jwtToken");
const sendEmail = require("../../utils/sendEmail");
const crypto = require("crypto");
const cloudinary  = require("../../utils/cloudinary");

//Register a user
module.exports.registerUser = catchAsyncError(async (req, res, next) => {
  
  //console.log(req.body.avatar)
  //set up avatar
    const result = await cloudinary.uploader.upload(req.body.avatar, {
    folder: "profiles", 
    with: 150,
    crop: "scale",
    upload_preset: "shopping_cloud"
  })   
  const { name, email, password } = req.body;
  const user = await userModel.create({ 
    name, 
    email,
    password,
       avatar: {
      public_id: result.public_id,
      url: result.secure_url,
    },    
  });
  /* const token = user.getJwtToken();
    return res.status(200).json({
        success: true,
        token
    }) */

  //Replaced by sendToken function
  return await sendToken(user, 200, res);
});

//login user
module.exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }
  //Finding user in database
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or Password", 401));
  }
  //check if password is correct or not
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Password", 401));
  }
  /*    const token = user.getJwtToken(); 
    return res.status(200).json({
        success: true,
        token
    }) */

  //Replaced by sendToken function
  setTimeout(async () => {
    return await sendToken(user, 200, res);
  }, 1000);
});

//Forgot password send email
module.exports.forgotPasswordUser = catchAsyncError(async (req, res, next) => {
  const user = await userModel.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("Email address not found", 404));
  }
  //Get reset token
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforSave: false });
  //create reset password url
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/shopping/reset/password/${resetToken}`;
  const message = `Your password reset link is \n\n${resetUrl}`;
  try {
    await sendEmail({
      email: user.email,
      subject: "Shopping Password Recovery",
      message,
    });
    return res.status(200).json({
      success: true,
      message: `Email sent to ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

//Reset password for a new
module.exports.resetPasswordUser = catchAsyncError(async (req, res, next) => {
  //Hash URL token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await userModel.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(new ErrorHandler("Reset password Invalid Or expired", 400));
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler(`Password doesn't match`, 400));
  }
  //Setup a new  password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  sendToken(user, 200, res);
});

//logout user
module.exports.logoutUser = catchAsyncError(async (req, res, next) => {
  await res.cookie("jwt", "", {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  return res.status(200).json({
    success: true,
    message: "Logged out",
  });
});

//Get currently logged in user details
module.exports.getUserProfile = catchAsyncError(async (req, res, next) => {
  const user = await userModel.findById(req.user.id);
  return res.status(200).json({
    success: true,
    user,
  });
});

//Update change password
module.exports.updateUserPassword = catchAsyncError(async (req, res, next) => {
  const user = await userModel.findById(req.user.id).select("+password");
  //check previous user password
  const isMatched = await user.comparePassword(req.body.oldPassword);
  if (!isMatched) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }
  user.password = req.body.password;
  await user.save();
  sendToken(user, 200, res);
});

//update user profil
module.exports.updateUserProfil = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };
  //update avatar:: todo

  const user = await userModel.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  return res.status(200).json({
    success: true,
    message: `Your profile is updated`,
  });
});

//Get all users
module.exports.getAllUser = catchAsyncError(async (req, res, next) => {
  const users = await userModel.find();
  if (!users) {
    return next(new ErrorHandler("No users found", 404));
  }
  return res.status(200).json({
    success: true,
    users,
  });
});

//Get a single user details
module.exports.getSingleUser = catchAsyncError(async (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return next(new ErrorHandler(`User not found: ${req.params.id}`, 404));
  } else {
    const user = await userModel.findById(req.params.id);
    return res.status(200).json({
      success: true,
      user,
    });
  }
});

//Update user
module.exports.updateUserInfo = catchAsyncError(async (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return next(new ErrorHandler(`User not found: ${req.params.id}`, 404));
  } else {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    };
    await userModel.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    return res.status(200).json({
      success: true,
      message: `User is updated`,
    });
  }
});

//Delete user
module.exports.deleteUser = catchAsyncError(async (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return next(new ErrorHandler(`User not found: ${req.params.id}`, 404));
  } else {
    await userModel.findByIdAndDelete(req.params.id);
    //Remove avatar=>todo
    return res.status(200).json({
      success: true,
      message: `User is deleted`,
    });
  }
});
