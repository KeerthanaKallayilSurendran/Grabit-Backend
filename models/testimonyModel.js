const mongoose = require('mongoose')

const testimonyShema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }
})

const testimonials = mongoose.model('testimonials', testimonyShema)
module.exports = testimonials