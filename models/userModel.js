const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  gender: {
    type: String,
  },
  mobilenumber: {
    type: String,
  },
  address: {
    type: addressSchema,
  },
  profileImg: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    default: "User",
  },
});

const users = mongoose.model("users", userSchema);
module.exports = users;
