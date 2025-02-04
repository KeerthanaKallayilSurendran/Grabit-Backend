const mongoose = require("mongoose");

const ordersSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  locality: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  receipt: {
    type: String,
    required: true,
  },
  itemDetails: {
    type: Array,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

const orders = mongoose.model("orders", ordersSchema);
module.exports = orders;
