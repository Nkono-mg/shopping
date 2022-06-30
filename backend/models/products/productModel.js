const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
    trim: true,
    maxLength: [100, "Product name can't exceed 100 character"],
  },
  price: {
    type: Number,
    required: [true, "Please enter product price"],
    trim: true,
    maxLength: [5, "Product price can't exceed 5 character"],
    default: 0.0,
  },
  description: {
    type: String,
    required: [true, "Please enter product description"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
       // required: true,
      },
      url: {
        type: String,
        //required: true,
      },
    },
  ],
  category: {
    type: String, 
   // required: [true, "Please select category for this product"],
    /* enum: {
      values: ["Electronics", "Cameras", "Laptop", "Food", "Books"],
      message: "Please select category for product",
    }, */
  },
  seller: {
    type: String,
    //required: [true, "Please enter product seller"],
  },
  stock: {
    type: Number,
    //required: [true, "Please enter product stock"],
    default: 0,
  },
  numOfReviws: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        //required: true,
      },
      rating: {
        type: Number,
        //required: true,
      },
      comment: {
        type: String,
        //required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model("products", productSchema);
