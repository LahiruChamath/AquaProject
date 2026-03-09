const Order = require('../models/Order');

// @desc    Create new order
// @route   POST /orders
// @access  Private
const addOrderItems = async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400).json({ message: 'No order items', result: false });
    return;
  } else {
    const order = new Order({
      orderItems,
      user: req.user,
      shippingAddress,
      paymentMethod,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json({ order: createdOrder, result: true });
  }
};

// @desc    Get order by ID
// @route   GET /orders/:id
// @access  Private
const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'firstName lastName email'
  );

  if (order) {
    res.json({ order, result: true });
  } else {
    res.status(404).json({ message: 'Order not found', result: false });
  }
};

// @desc    Get logged in user orders
// @route   GET /orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user });
  res.json({ orders, result: true });
};

// @desc    Get all orders
// @route   GET /orders
// @access  Private/Admin
const getOrders = async (req, res) => {
  const orders = await Order.find({}).populate('user', 'firstName lastName email').sort({ createdAt: -1 });
  res.json({ orders, result: true });
};

// @desc    Update order to delivered
// @route   GET /orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.json({ order: updatedOrder, result: true });
  } else {
    res.status(404).json({ message: 'Order not found', result: false });
  }
};

module.exports = {
  addOrderItems,
  getOrderById,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
};
