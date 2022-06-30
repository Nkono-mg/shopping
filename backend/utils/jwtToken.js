//create and send token and save in the cookie
const sendToken = async (user, statusCode, res)=>{ 
  //create jwt token
  const token = await user.getJwtToken();
  // options for token
  const options = {
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000),
    httpOnly: true
  }
  return res.status(statusCode).cookie('token', token, options).json({ 
    success: true,
    token,
    user
  }); // 'token' is the name of this token
}
module.exports = sendToken;