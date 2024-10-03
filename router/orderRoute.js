// import express from "express";
// import authMiddleware from "../middlewares/auth.js";
// import { placeOder } from "../controllers/orderController.js"

// const orderRouter = express.Router();

// orderRouter.post('/place',authMiddleware,placeOder)

// export default orderRouter;

import express from "express";
import {
    createOrder,
    getUserOrders,
    getAllOrders,
    updateOrderStatus
} from "../controllers/orderController.js"
const orderRouter = express.Router();
import authMiddleware  from '../middlewares/auth.js';

// @route   POST /api/orders
// @desc    Create a new order with scheduling
// @access  Private
orderRouter.post('/', authMiddleware, createOrder);

// @route   GET /api/orders/my-orders
// @desc    Get orders of the logged-in user
// @access  Private
orderRouter.get('/my-orders', authMiddleware, getUserOrders);

// @route   GET /api/orders
// @desc    Get all orders (Admin)
// @access  Private/Admin
orderRouter.get('/', authMiddleware, getAllOrders);

// @route   PUT /api/orders/:id/status
// @desc    Update order status (Admin)
// @access  Private/Admin
orderRouter.put('/:id/status', authMiddleware, updateOrderStatus);

export default orderRouter;
