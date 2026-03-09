const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const verifyJWT = require("../middleware/verifyJWT");

router.route("/")
  .get(productController.getAllProducts)
  .post(verifyJWT, productController.createNewProduct)
  .patch(verifyJWT, productController.updateProduct);


router.route("/:id").get(productController.getProduct);

router.route("/:id").delete(verifyJWT, productController.deleteProduct);

router.route("/:id/reviews").post(verifyJWT, productController.createProductReview);

router
  .route("/search-product")
  .post(productController.getSearchedProduct);


module.exports = router;
