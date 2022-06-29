const express = require("express");
const app = express();
const bodyPrser = require("body-parser");
const cookieParser = require('cookie-parser'); 
const errorMiddleware = require("./middlewares/errors");

app.use(express.json());
app.use(bodyPrser.json());
app.use(bodyPrser.urlencoded({ extended: true })); 
//app.use(cookieParser);

//import all routes
const products = require("./routes/products/productRoute");
const userAuth = require("./routes/users/auth");
app.use("/api/shopping/", products);
app.use("/api/shopping", userAuth);

//Middlewares to handle errors
app.use(errorMiddleware);

//export app
module.exports = app;