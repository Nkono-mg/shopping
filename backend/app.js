const express = require("express");
const app = express();

app.use(express.json());

//import all routes
const products = require("./routes/products/productRoute");
app.use("/api/shopping/", products)

module.exports = app;