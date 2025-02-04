const cartProducts = require("../models/cartModel");

exports.addCartProductController = async (req, res) => {
  console.log("Inside Add Cart Product Controller");
  const { id } = req.params;
  const { title, price, thumbnail } = req.body;
  const userId = req.userId;
  console.log(userId);

  try {
    const existingProduct = await cartProducts.findOne({
      productId: id,
      userId,
    });
    console.log(existingProduct);
    if (existingProduct) {
      res.status(404).json("Already added");
    } else {
      console.log(14);
      console.log(userId);
      
      const newProduct = new cartProducts({
        productId: id,
        title,
        price,
        thumbnail,
        count:1,
        userId,
      });
      console.log(newProduct);
      
      console.log(newProduct);
      await newProduct.save();
      console.log(26);

      res.status(200).json(newProduct);
    }
  } catch (error) {
    res.status(401).json(error);
  }
};

exports.getAllCartController = async (req, res) => {
  console.log("Inside Get all Cart Controller");
  const userId = req.userId;
  try {
    console.log(userId);

    const cart = await cartProducts.find({ userId });
    res.status(200).json(cart);
  } catch (error) {
    res.status(404).json(error);
  }
};

exports.updateCountController = async (req, res) => {
  console.log("Inside Update Count Controller");
  const { id } = req.params;
  const { count } = req.body;
  console.log(count);
  
  try {
    const existingProduct = await cartProducts.findOne({ _id: id });
    console.log(existingProduct);
    existingProduct.count = count
    await existingProduct.save()
    res.status(200).json(existingProduct)
  } catch (error) {
    res.status(404).json(error);
  }
};

exports.deleteUserCartController = async(req,res) =>{
    const userId = req.userId
    
    try {
        const deleteProducts = await cartProducts.deleteMany({userId})
        res.status(200).json(deleteProducts)

    } catch (error) {
        res.status(404).json(error);
    }
}

  exports.removeProductFromCart = async (req, res) => {
    console.log("Inside Remove Product From Cart");
    const { id } = req.params;
    try {
      const removeProduct = await cartProducts.findByIdAndDelete({ _id: id });
      res.status(200).json(removeProduct);
    } catch (error) {
      res.status(404).json(error);
    }
  };
