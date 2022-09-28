const productModel = require("../models/products/productModel");
const dotenv = require("dotenv");
const connectDB = require("../config/database");
const products = require("./data/products.json");
const { connect } = require("mongoose");

dotenv.config({path: "backend/config/config.env"});
connectDB();

const seedProducts = async()=>{
  try{
    await productModel.deleteMany();
    await productModel.insertMany(products);
    process.exit();

  }catch(error){
    console.error(error.message);
    process.exit();
  }
}
seedProducts();