const testimonials = require('../models/testimonyModel')

exports.addTestimonialController = async(req,res)=>{
    console.log("Inside Add Testimonial Controller")
    const {name, email, phone, message} = req.body
    try {
        const newTestimony = new testimonials({name, email, phone, message})
        await newTestimony.save()
        res.status(200).json(newTestimony)
    } catch (error) {
        res.status(401).json(error)
    }
}