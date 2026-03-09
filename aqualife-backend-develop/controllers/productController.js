const Product = require("../models/Product");
const cloudinary = require("../utils/cloudinary");

// @desc Create new product
// @route POST /products
// @access Private
const createNewProduct = async (req, res) => {
  const {
    name,
    price,
    quantity,
    currency,
    file,
    description
  } = req.body;

  // Confirm data
  if (
    !name ||
    !price ||
    !quantity ||
    !currency ||
    !description
  ) {
    return res.json({ message: "All fields are required", result: false });
  }

  if (!file) {
    return res.json({ message: "Product image is required", result: false });
  }

  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: "products",
    });

    // Create and store the new product
    const project = await Product.create({
      seller: req.user,
      name,
      price,
      quantity,
      currency,
      imgURL: result.secure_url,
      description
    });

    if (project) {
      return res.json({ message: "New product created", result: true });
    } else {
      return res.json({ message: "Invalid product data received", result: false });
    }
  } catch (err) {
    console.error("Create product error:", err);
    return res.status(500).json({
      message: err?.message || "Failed to upload image or save product",
      result: false,
    });
  }
};


// @desc Update product
// @route PATCH /products
// @access Private
const updateProduct = async (req, res) => {
  const {
    _id,
    name,
    price,
    quantity,
    currency,
    description
  } = req.body;

  // Confirm data
  if (
    !_id ||
    !name ||
    !price ||
    !quantity ||
    !currency ||
    !description
  ) {
    return res.json({ message: "All fields are required", result: false });
  }

  // Confirm product exists to update
  const product = await Product.findById(_id).exec();

  if (!product) {
    return res.json({ message: "Product not found", result: false });
  }

  product.name = name;
  product.price = price;
  product.quantity = quantity;
  product.currency = currency;
  product.description = description;

  const updatedProduct = await product.save();

  res.json({ message: `'${updatedProduct.name}' updated`, result: true });
};

// @desc Delete a product
// @route DELETE /products
// @access Private
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "product ID required", result: false });
  }

  // Confirm product exists to delete
  const product = await Product.findById(id).exec();

  if (!product) {
    return res.status(400).json({ message: "product not found", result: false });
  }

  const result = await product.deleteOne();

  const reply = `product '${result.name}' with ID ${result._id} deleted`;

  res.json({ reply, result: true });
};

// @desc Retrieve product
// @route GET /products
// @access Private
const getProduct = async (req, res) => {
  const { id } = req.params;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "product ID required", result: false });
  }

  // Confirm product exists to delete
  const product = await Product.findById(id).exec();

  if (!product) {
    return res.status(400).json({ message: "product not found", result: false });
  }

  res.json({ product, result: true });
};

// @desc Retrieve all products (public)
// @route GET /product
// @access Public
const getAllProducts = async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 }).exec();
  res.json({ products, result: true });
};

// @desc Retrieve products sellerwise
// @route GET /products
// @access Private
const getProductsSellerWise = async (req, res) => {
  // Confirm product exists to delete
  const products = await Product.find({ seller: req.user }).exec();

  res.json({ products, result: true });
};

// @desc Retrieve search products
// @route POST /products
// @access Private
const getSearchedProduct = async (req, res) => {
  const { productName } = req.body;

  const products = await Product.find({ name: { $regex: '.*' + productName + '.*' } });

  res.json({ products, result: true });
};

module.exports = {
  getAllProducts,
  createNewProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getProductsSellerWise,
  getSearchedProduct
};
