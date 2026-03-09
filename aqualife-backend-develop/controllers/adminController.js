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

// Helper function to calculate seller rating
const addSellerRatingToUsers = async (users) => {
  return await Promise.all(
    users.map(async (user) => {
      // Find all products for this seller
      const products = await Product.find({ seller: user._id });
      
      let totalRating = 0;
      let totalReviews = 0;
      
      products.forEach(product => {
        // Average the product's overall rating out
        totalRating += (product.rating || 0);
        totalReviews += (product.numReviews || 0);
      });

      const avgRating = products.length > 0 ? totalRating / products.length : 0;

      // Convert mongoose doc to plain object to attach new properties
      const userObj = user.toObject();
      userObj.sellerRating = avgRating;
      userObj.numProductReviews = totalReviews;
      
      return userObj;
    })
  );
};

// @desc Retrieve search sellers
// @route POST /users
// @access Private
const getSearchedUsers = async (req, res) => {
  const { userName } = req.body;

  const users = await User.find({ $and: [{ firstName: { $regex: userName }, $options: "i" }, { roles: 'seller' }] });
  const usersWithRatings = await addSellerRatingToUsers(users);

  res.json({ users: usersWithRatings, result: true });
};

// @desc Retrieve sellers
// @route POST /users
// @access Private
const getUsers = async (req, res) => {
  const users = await User.find({ roles: 'seller' });
  const usersWithRatings = await addSellerRatingToUsers(users);

  res.json({ users: usersWithRatings, result: true });
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



// @desc Get seller reviews
// @route GET /seller-reviews/:id
// @access Private
const getSellerReviews = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.json({ message: "Seller Id is required", result: false });
  }

  // Find all products by this seller
  const products = await Product.find({ seller: id }).exec();

  // Extract and flatten all reviews from these products
  let allReviews = [];
  products.forEach(product => {
    if (product.reviews && product.reviews.length > 0) {
      // Opt: attach product name so admin knows what product was reviewed
      const reviewsWithProductName = product.reviews.map(r => {
        const reviewObj = typeof r.toObject === 'function' ? r.toObject() : r;
        return { ...reviewObj, productName: product.name };
      });
      allReviews.push(...reviewsWithProductName);
    }
  });

  // Sort by newest first (assuming timestamps exist on review subdoc, or just use natural order)
  allReviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  res.json({ reviews: allReviews, result: true });
};


module.exports = {
  getProductsWithSellerDetails,
  updateProductStatus,
  getSearchedUsers,
  getUsers,
  getSearchedProduct,
  updateUserStatus,
  getProductDetails,
  getSellerReviews
};
