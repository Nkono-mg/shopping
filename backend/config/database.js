const mongoose = require("mongoose");

const connectDB = ()=>{
    mongoose.connect(process.env.DB_LOCAL_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((con)=>{
      console.log(`MongoDB connected on ${con.connection.host}`)
    })
}
module.exports = connectDB;