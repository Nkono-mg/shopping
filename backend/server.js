const app = require("./app");
const dotenv = require("dotenv");
const connectDB = require("./config/database");

//setting up config file
dotenv.config({path: "backend/config/config.env"});

// connect to database
connectDB(); 

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT} in ${process.env.NODE_ENV}mode`);
});