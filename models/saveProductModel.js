const mongoose = require('mongoose')

const whishlistSchema = new mongoose.Schema({
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
    image:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    }
})

const whishlists = mongoose.model('whishlists',whishlistSchema)
module.exports = whishlists
