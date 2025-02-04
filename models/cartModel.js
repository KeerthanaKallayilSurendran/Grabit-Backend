const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
    productId:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
    count:{
        type:Number,
        required:true
    },
    userId:{
        type:String,
        required:true
    }
})

const cartProducts = mongoose.model('cartProducts', cartSchema)
module.exports = cartProducts

