const mongoose = require("mongoose");

const wishlistSchema = mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    require: true,
  },
});

const wishlistProducts = mongoose.model("wishlistProducts", wishlistSchema);
module.exports = wishlistProducts;
