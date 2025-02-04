const Razorpay = require("razorpay");
const orders = require("../models/ordersModel");
const crypto = require("crypto");

exports.orderController = async (req, res) => {
  console.log("inside ordercontroller");
  console.log(req.body);
  const {
    receipt,
    amount,
    currency,
    itemDetails,
    name,
    address,
    phonenumber,
    locality,
    pincode,
    city,
    state,
  } = req.body;
  const userId = req.userId;

  try {
    const razorpay = new Razorpay({
      key_id: process.env.KEY_ID,
      key_secret: process.env.KEY_SECRET,
    });

    const option = { receipt, amount, currency, payment_capture: 1 };
    const order = await razorpay.orders.create(option);
    if (!order) {
      res.status(500).json("Error");
    } else {
      const newOrder = new orders({
        receipt,
        amount,
        currency,
        itemDetails,
        name,
        address,
        phonenumber,
        locality,
        pincode,
        city,
        state,
        userId,
      });
      await newOrder.save();
      console.log(newOrder);
      console.log(order);
      res.status(200).json(order);
    }
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
  }
};

exports.paymentValidateController = async (req, res) => {
  console.log("Inside payment Validate Controller");
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  const sha = crypto.createHmac("sha256", process.env.KEY_SECRET);
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = sha.digest("hex");
  if (digest != razorpay_signature) {
    res.status(401).json("Transaction is not valid");
  } else {
    res.status(200).json("Transaction is Successfull");
  }
};
