const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/errors");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const dotenv = require("dotenv");


//Access API 
dotenv.config({path: "backend/config/config.env"}); 
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());


//import all routes
const products = require("./routes/products/productRoute");
const orders = require("./routes/products/orderRoute");
const userAuth = require("./routes/users/auth");
const payments = require("./routes/payment/paymentRoute");
app.use("/api/shopping", products);
app.use("/api/shopping", orders);
app.use("/api/shopping", userAuth);
app.use("/shopping", payments);

//Middleware to handle errors
app.use(errorMiddleware);

//export app
module.exports = app;
