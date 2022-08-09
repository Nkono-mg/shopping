const cloudinary = require('cloudinary').v2
//setting up config file
dotenv.config({path: "backend/config/config.env"}); 

//Setting up cloudinary config
  cloudinary.config({
    cloud_url: process.env.CLOUDINARY_URL,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    cloud_api_key: process.env.CLOUDINARY_API_KEY, 
    cloud_api_secret: process.env.CLOUDINARY_API_SECRET,
  });  
module.exports = { cloudinary }