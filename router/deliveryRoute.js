import express from "express";
// import authMiddleware from "../middlewares/auth.js"
const deliverRouter = express.Router();
import {
  getAvailableSlots,
  createDeliverySlot,
  updateDeliverySlot,
  deleteDeliverySlot,
  getAllDeliverySlots
} from "../controllers/deliveryController.js";
import authMiddleware from "../middlewares/auth.js"

// @route   GET /api/delivery-slots
// @desc    Get available delivery slots
// @access  Public
deliverRouter.get("/available", getAvailableSlots);

// @route   POST /api/delivery-slots
// @desc    Create a new delivery slot
// @access  Private/Admin
deliverRouter.post("/", authMiddleware, createDeliverySlot);

//Amin Route
deliverRouter.get('/all', authMiddleware, getAllDeliverySlots);

// @route   PUT /api/delivery-slots/:id
// @desc    Update a delivery slot
// @access  Private/Admin
deliverRouter.put("/:id", authMiddleware, updateDeliverySlot);

// @route   DELETE /api/delivery-slots/:id
// @desc    Delete a delivery slot
// @access  Private/Admin
deliverRouter.delete("/:id", authMiddleware, deleteDeliverySlot);

export default deliverRouter;
