const products = require("../models/productModel");

exports.getAllProductController = async (req, res) => {
  console.log("Inside Get All Product Controller");
  try {
    const allProducts = await products.find();
    res.status(200).json(allProducts);
  } catch (error) {
    res.status(401).json(error);
  }
};

// getRecipe
exports.getAProductContrller = async (req, res) => {
  console.log("Get A Recipe Contrller");
  const { id } = req.params;
  try {
    const product = await products.findById({ _id: id });
    res.status(200).json(product);
  } catch (error) {
    res.status(401).json(error);
  }
};

// related products
exports.getRelatedProductsController = async (req, res) => {
  console.log("Get Related Products Controller");
  const category = req.query.category;
  try {
    allRelatedProducts = await products.find({ category });
    res.status(200).json(allRelatedProducts);
  } catch (error) {
    res.status(401).json(error);
  }
};

exports.addProductsController = async (req, res) => {
  console.log("Inside Add Product Controller");
  const {
    title,
    description,
    category,
    price,
    thumbnail,
    returnPolicy,
    reviews,
  } = req.body;
  try {
    const existingProduct = await products.findOne({ title });
    if (existingProduct) {
      res.status(406).json("Existing Product");
    } else {
      const newProduct = new products({
        title,
        description,
        category,
        price,
        thumbnail,
        returnPolicy,
        reviews,
      });
      await newProduct.save();
      res.status(200).json(newProduct);
    }
  } catch (error) {
    res.status(401).json(error);
  }
};

exports.updateProductController = async (req, res) => {
  console.log("Inside Update Prodcut Controller");
  const {
    title,
    description,
    category,
    price,
    thumbnail,
    returnPolicy,
    reviews,
  } = req.body;
  const { id } = req.params;
  try {
    const updateProduct = await products.findByIdAndUpdate({_id:id}, {
        title,
        description,
        category,
        price,
        thumbnail,
        returnPolicy,
        reviews,
      }, {new:true})
    await updateProduct.save()
    res.status(200).json(updateProduct)
  } catch (error) {}
};

exports.deleteProductController = async(req,res)=>{
    console.log("Inside delete product controller");
    const {id} = req.params
    try {
        const deleteProduct = await products.findByIdAndDelete({_id:id})
        res.status(200).json(deleteProduct)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.addReviewController = async(req,res)=>{
  console.log("Inisde add review controller");
  const {id} = req.params
  const reviewData = req.body
  try {
    const addReview = await products.findByIdAndUpdate(
      {_id:id},
      { $push: { reviews: reviewData } }, 
      { new: true } 
    );
    res.status(200).json(addReview)
  } catch (error) {
    res.status(401).json(error)
  }
}
