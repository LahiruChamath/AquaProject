const express = require('express');
const router = express.Router();
const {
  addOrderItems,
  getOrderById,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
} = require('../controllers/orderController');
const verifyJWT = require('../middleware/verifyJWT');

router.route('/').post(verifyJWT, addOrderItems).get(verifyJWT, getOrders);
router.route('/myorders').get(verifyJWT, getMyOrders);
router.route('/:id').get(verifyJWT, getOrderById);
router.route('/:id/deliver').put(verifyJWT, updateOrderToDelivered);

module.exports = router;
