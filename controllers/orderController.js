const orders = require('../models/ordersModel')

exports.getOrderDetailsController = async(req,res)=>{
    console.log("Inside get order details controller");
    const userId = req.userId
    try {
        const ordersDetails = await orders.find({userId})
        // console.log(ordersDetails);
        res.status(200).json(ordersDetails)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.getAllOrdersController = async(req,res)=>{
    console.log("Inside Get All Order Controller");
    try {
        const allOrders = await orders.find()
        res.status(200).json(allOrders)
    } catch (error) {
        res.status(401).json(error)
    }
}