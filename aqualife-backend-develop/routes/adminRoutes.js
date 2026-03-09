const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const verifyJWT = require("../middleware/verifyJWT");

router
  .route("/get-users")
  .get(verifyJWT, adminController.getUsers);

router
  .route("/get-products")
  .get(verifyJWT, adminController.getProductsWithSellerDetails);

router
  .route("/update-product-status")
  .post(verifyJWT, adminController.updateProductStatus);

router
  .route("/search-user")
  .post(verifyJWT, adminController.getSearchedUsers);

router
  .route("/search-product")
  .post(verifyJWT, adminController.getSearchedProduct);

router
  .route("/update-user-status")
  .post(verifyJWT, adminController.updateUserStatus);

router
  .route("/get-product/:id")
  .get(verifyJWT, adminController.getProductDetails);

module.exports = router;
