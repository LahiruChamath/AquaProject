const Product = require("../models/Product");
const User = require("../models/User");
const cloudinary = require("../utils/cloudinary");

// @desc Retrieve products with seller's details
// @route GET /products
// @access Private
const getProductsWithSellerDetails = async (req, res) => {

  const products = await Product.find().populate('seller').exec();

  res.json({ products, result: true });
};

// @desc Update product
// @route PATCH /products
// @access Private
const updateProductStatus = async (req, res) => {
  const {
    id,
    status
  } = req.body;

  // Confirm data
  if (
    !id ||
    !status
  ) {
    return res.json({ message: "All fields are required", result: false });
  }

  // Confirm product exists to update
  const product = await Product.findById(id).exec();

  if (!product) {
    return res.json({ message: "Product not found", result: false });
  }

  product.status = status;

  const updatedProduct = await product.save();

  res.json({ message: `'${updatedProduct.name}' updated`, result: true });
};

// @desc Retrieve search sellers
// @route POST /users
// @access Private
const getSearchedUsers = async (req, res) => {
  const { userName } = req.body;

  const users = await User.find({ $and: [{ firstName: { $regex: userName }, $options: "i" }, { roles: 'seller' }] });

  res.json({ users, result: true });
};

// @desc Retrieve sellers
// @route POST /users
// @access Private
const getUsers = async (req, res) => {
  const users = await User.find({ roles: 'seller' });

  res.json({ users, result: true });
};

// @desc Retrieve search products
// @route POST /products
// @access Private
const getSearchedProduct = async (req, res) => {
  const { productName } = req.body;

  const products = await Product.find({ name: { $regex: productName, $options: "i" } });

  res.json({ products, result: true });
};

// @desc Update user
// @route PATCH /users
// @access Private
const updateUserStatus = async (req, res) => {
  const {
    id,
    status
  } = req.body;

  // Confirm data
  if (
    !id ||
    !status
  ) {
    return res.json({ message: "All fields are required", result: false });
  }

  // Confirm user exists to update
  const user = await User.findById(id).exec();

  if (!user) {
    return res.json({ message: "User not found", result: false });
  }

  user.status = status;

  const updatedUser = await user.save();

  res.json({ message: `'${updatedUser.firstName}' updated`, result: true });
};

// @desc Get product
// @route GET /products
// @access Private
const getProductDetails = async (req, res) => {
  const {
    id
  } = req.params;

  // Confirm data
  if (
    !id
  ) {
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
  getProductsWithSellerDetails,
  updateProductStatus,
  getSearchedUsers,
  getUsers,
  getSearchedProduct,
  updateUserStatus,
  getProductDetails
};
