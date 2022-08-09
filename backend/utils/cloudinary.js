const cloudinary = require('cloudinary').v2
//setting up config file
//dotenv.config({path: "backend/config/config.env"}); 

cloudinary.config({ 
    cloud_name: 'shopping-easy', 
    api_key: '975325685936344', 
    api_secret: '2X40CKDtv9o6xp23Auag1Mc5Oqc' 
  });

module.exports = cloudinary