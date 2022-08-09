const app = require("./app");
const dotenv = require("dotenv");
const cloudinary = require('cloudinary')
const connectDB = require("./config/database");

//handle uncaught exception
process.on('uncaughtException', error =>{
    console.log(`Error: ${error.message}`);
    process.exit(1);
})

//setting up config file
dotenv.config({path: "backend/config/config.env"}); 
// connect to database
connectDB(); 

//Setting up cloudinary config
 /*  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    cloud_api_key: process.env.CLOUDINARY_API_KEY, 
    cloud_api_secret: process.env.CLOUDINARY_API_SECRET,
  });   */

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT} in ${process.env.NODE_ENV}mode`);
});

//handle unhandle promise rejections error
process.on('unhandledRejection', err =>{
    console.log(`Error: ${err.message}`);
    server.close(()=>{
        process.exit(1);
    })
}) 
