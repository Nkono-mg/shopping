const errorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => { 
  err.statusCode = err.statusCode || 500;
  if (process.env.NODE_ENV === "DEVELOPMENT") {
     return res.status(err.statusCode).json({ 
      success: false,
      error: err, 
      errorMessage: err.message,
      stack: err.stack,
    });
  } else if (process.env.NODE_ENV === "PRODUCTION") {
    let error = { ...err };
    error.message = err.message; 
    //wrong Mongoose Object ID Error 
    if(err.name == "CastError"){
        const message = `Ressource not found . Invalid ${err.path}`
        error = new errorHandler(message, 400)
    }
    //Handling Mongoose Validation Error
    if(err.name == "ValidationError"){
        const message = Object.values(err.errors).map(value => value.message);
        error = new errorHandler(message, 400)
    }
    return res.status(error.statusCode).json({ 
      success: false, 
      message: error.message || `Internal Server Error`,
    });
  } 
};
   