 const productModel = require("../models/products/productModel");
 const dotenv = require("dotenv");
 const connectDB = require("../config/database");
 const dataSeederProduct = require("./productData");

 //setting dotenv file
 dotenv.config({path: "backend/config/config.env"});
 connectDB();

 const seederProduct = async() =>{
    try{
        await productModel.deleteMany();
        await productModel.insertMany(dataSeederProduct);
        process.exit();

    }catch(error){
        console.log(error.message);
        process.exit(1);
    }
 }
 seederProduct();