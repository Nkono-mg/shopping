//create and send token and save in the cookie
//require(dotenv).config({path: "../config/config.env"});

const sendToken = (user, statusCode, res)=>{ 

  const maxAge = 3 * 24 * 60 * 60 * 1000; //3 days
  //create jwt token
  const token = user.getJwtToken();
  const options = {
    expiresIn: maxAge,//new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000) ,
    httpOnly: true 
  }
  return res.status(statusCode).cookie('token', token, options).json({ 
    success: true,
    token,
    user
  }); // 'jwt' is the name of this token
}
module.exports = sendToken; 