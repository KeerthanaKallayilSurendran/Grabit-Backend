const products = require('../models/productModel')

exports.getAllProductController = async(req,res)=>{
    console.log("Inside Get All Product Controller");
    try {
        const allProducts = await products.find()
        res.status(200).json(allProducts)
    } catch (error) {
        res.status(401).json(error)
    }
    
}

// getRecipe
exports.getAProductContrller = async(req,res)=>{
    console.log('Get A Recipe Contrller');
    const {id} = req.params
    try {
        const product = await products.findById({_id:id})
        res.status(200).json(product)
    } catch (error) {
        res.status(401).json(error)
    }
    
}

// related products
exports.getRelatedProductsController = async(req,res)=>{
    console.log("Get Related Products Controller");
    const category = req.query.category
    try {
        allRelatedProducts = await products.find({category})
        res.status(200).json(allRelatedProducts)
    } catch (error) {
        res.status(401).json(error)
    }
    
}