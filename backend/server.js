const app = require("./app");
const dotenv = require("dotenv");
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
