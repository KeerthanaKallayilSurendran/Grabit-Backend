const wishlistProducts = require("../models/wishlistModel");

exports.addWishlistProduct = async (req, res) => {
  console.log("Inside Add Wishlist Product");
  const { id } = req.params;
  const { title, price, thumbnail } = req.body;
  const userId = req.userId;
  try {
    // console.log(title, price, thumbnail, id, userId);

    const existingProduct = await wishlistProducts.findOne({
      productId: id,
      userId,
    });
    if (existingProduct) {
      res.status(404).json("Already added");
    } else {
      const newProduct = new wishlistProducts({
        productId: id,
        title,
        price,
        thumbnail,
        userId,
      });
      await newProduct.save();
      res.status(200).json(newProduct);
    }
  } catch (error) {
    res.status(404).json(error);
  }
};

exports.getAllWishlist = async (req, res) => {
  console.log("Inside Get All Wishlist");
  const userId = req.userId;
  try {
    const wishlist = await wishlistProducts.find({ userId });
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(404).json(error);
  }
};

exports.removeProductFromWishlist = async (req, res) => {
  console.log("Inside Remove Product From Wishlist");
  const userId = req.userId;
  const { id } = req.params;
  try {
    const removeProduct = await wishlistProducts.findByIdAndDelete({ _id: id });
    res.status(200).json(removeProduct);
  } catch (error) {
    res.status(404).json(error);
  }
};
