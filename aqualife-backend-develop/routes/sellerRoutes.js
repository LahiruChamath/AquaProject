const express = require("express");
const router = express.Router();
const sellerController = require("../controllers/sellerController");
const verifyJWT = require("../middleware/verifyJWT");

router.route("/").get(verifyJWT, sellerController.getProductsSellerWise);

router.route("/:id").delete(verifyJWT, sellerController.deleteProduct);

router
  .route("/search-product")
  .post(verifyJWT, sellerController.getSearchedProduct);

router
  .route("/get-product/:id")
  .get(verifyJWT, sellerController.getProductDetails);

module.exports = router;
