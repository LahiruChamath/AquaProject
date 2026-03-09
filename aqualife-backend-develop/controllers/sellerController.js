const Product = require("../models/Product");
const cloudinary = require("../utils/cloudinary");

// @desc Retrieve products sellerwise
// @route GET /products
// @access Private
const getProductsSellerWise = async (req, res) => {
  // Confirm product exists to delete
  const products = await Product.find({ seller: req.user }).exec();

  res.json({ products, result: true });
};

// @desc Delete a product
// @route DELETE /products
// @access Private
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  // Confirm data
  if (!id) {
    return res
      .status(400)
      .json({ message: "product ID required", result: false });
  }

  // Confirm product exists to delete
  const product = await Product.findById(id).exec();

  if (!product) {
    return res
      .status(400)
      .json({ message: "product not found", result: false });
  }

  const result = await product.deleteOne();

  const reply = `product '${result.name}' with ID ${result._id} deleted`;

  res.json({ reply, result: true });
};

// @desc Retrieve search products
// @route POST /products
// @access Private
const getSearchedProduct = async (req, res) => {
  const { productName } = req.body;

  const products = await Product.find({
    name: { $regex: productName, $options: "i" },
  });

  res.json({ products, result: true });
};

const getProductDetails = async (req, res) => {
  console.log(2);
  const { id } = req.params;

  // Confirm data
  if (!id) {
    return res.json({ message: "Product Id is required", result: false });
  }

  // Confirm user exists to update
  const product = await Product.findById(id).exec();

  if (!product) {
    return res.json({ message: "Product not found", result: false });
  }

  res.json({ product, result: true });
};

module.exports = {
  getProductsSellerWise,
  deleteProduct,
  getSearchedProduct,
  getProductDetails,
};
