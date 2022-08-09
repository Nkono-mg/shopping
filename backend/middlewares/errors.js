const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => { 
  let statusCode = err.statusCode ? err.statusCode : 500;
  if (process.env.NODE_ENV.match(/DEVELOPMENT/i)) {
     return res.status(statusCode).json({ 
      success: false,
      error: err, 
      errorMessage: err.message,
      stack: err.stack,
    });
  }else if (process.env.NODE_ENV.match(/PRODUCTION/i)){
    let error = { ...err }; 
    error.message = err.message; 
    //wrong Mongoose Object ID Error 
    if(err.name === "CastError"){ 
        const message = `Ressource not found . Invalid ${err.path}`
        error = new ErrorHandler(message, 400)
    }
    //Handling Mongoose Validation Error
    if(err.name === "ValidationError"){
        const message = Object.values(err.errors).map(value => value.message);
        error = new ErrorHandler(message, 400)
    }
    //Handling Mongoose duplicate key error 
    if(err.code === 11000){
      const message = `${Object.keys(err.keyValue)} is existed`
      error = new ErrorHandler(message, 400)
    }
    //Handling wrong JWT error 
    if(err.name === "JsonWebTokenError"){
      const message = `Json Web Token is invalid, Please try again`;
      error = new ErrorHandler(message, 400)
  }
  //Handling expired JWT error 
  if(err.name === "TokenExpiredError"){
    const message = `Json Web Token is expired, Please try again`;
    error = new ErrorHandler(message, 400)
}
    return res.status(statusCode).json({ 
      success: false, 
      error: err, 
      message: error.message || `Internal Server Error`,
    });
  }  
};
   