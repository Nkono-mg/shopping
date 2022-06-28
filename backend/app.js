const express = require("express");
const app = express();
const errorMiddleware = require("./middlewares/errors");

app.use(express.json());

//import all routes
const products = require("./routes/products/productRoute");
app.use("/api/shopping/", products)

//Middlewares to handle errors
app.use(errorMiddleware);

//export app
module.exports = app;