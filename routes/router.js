const express = require("express");
const productController = require("../controllers/productController");
const testimonyController = require("../controllers/testimonialController");
const userController = require("../controllers/userController");
const jwtMiddleware = require("../middlewares/jwtMiddleware");
const wishlistController = require("../controllers/wishlistController");
const cartController = require("../controllers/cartController");
const paymentController = require("../controllers/paymentController");
const orderController = require("../controllers/orderController");

const router = new express.Router();

router.get("/all-products", productController.getAllProductController);
router.get("/products/:id/view", productController.getAProductContrller);
router.get("/related-products", productController.getRelatedProductsController);
router.post("/addtestimony", testimonyController.addTestimonialController);
router.post("/register", userController.addUserController);
router.post("/login", userController.loginController);
router.post(
  "/products/:id/wishlist",
  jwtMiddleware,
  wishlistController.addWishlistProduct
);
router.get("/wishlist", jwtMiddleware, wishlistController.getAllWishlist);
router.delete(
  "/wishlist/:id/remove",
  jwtMiddleware,
  wishlistController.removeProductFromWishlist
);
router.post(
  "/products/:id/cart",
  jwtMiddleware,
  cartController.addCartProductController
);
router.get("/cart", jwtMiddleware, cartController.getAllCartController);
router.put(
  "/cart/:id/updatecount",
  jwtMiddleware,
  cartController.updateCountController
);
router.delete(
  "/cart-empty",
  jwtMiddleware,
  cartController.deleteUserCartController
);
router.delete(
  "/cart/:id/remove",
  jwtMiddleware,
  cartController.removeProductFromCart
);
router.post("/order", jwtMiddleware, paymentController.orderController);
router.post(
  "/order/validate",
  jwtMiddleware,
  paymentController.paymentValidateController
);
router.get(
  "/get-orders",
  jwtMiddleware,
  orderController.getOrderDetailsController
);
router.get("/get-user", jwtMiddleware, userController.getUserDetailsController);
router.put(
  "/update-user",
  jwtMiddleware,
  userController.updateUserDetailsController
);
router.get("/all-users", jwtMiddleware, userController.allUserViewController);
router.get(
  "/get-admin",
  jwtMiddleware,
  userController.getAdminDetailsController
);
router.put(
  "/edit-admin",
  jwtMiddleware,
  userController.editAdminDetailsController
);
router.get(
  "/all-orders",
  jwtMiddleware,
  orderController.getAllOrdersController
);
router.get(
  "/all-message",
  jwtMiddleware,
  testimonyController.getAllMessageController
);
router.post(
  "/add-product",
  jwtMiddleware,
  productController.addProductsController
);
router.put(
  "/product/:id/edit",
  jwtMiddleware,
  productController.updateProductController
);
router.delete(
  "/product/:id/delete",
  jwtMiddleware,
  productController.deleteProductController
);

router.put("/product/:id/review", jwtMiddleware, productController.addReviewController)

module.exports = router;
