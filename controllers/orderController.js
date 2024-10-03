// import express from "express";
// import userModel from "../models/userModel.js";
// import orderModel from "../models/orderModel.js";
// import stripe from "stripe";

// const placeOrder = async(req,res) => {


// }

// export { placeOrder };

import orderModel from '../models/orderModel.js';
import deliverySlotModel from '../models/deliverSlotModel.js'
import sendEmail from '../utils/sendEmail.js';
import userModel from "../models/userModel.js";// Ensure you have access to the User model

import mongoose from 'mongoose';

// Create a New Order with Scheduling
const createOrder = async(req, res) => {
    const { orderDetails, scheduledTime, deliverySlotId } = req.body;
    const userId = req.user.id;

    // Validate inputs
    if (!orderDetails || !scheduledTime || !deliverySlotId) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Start a session for transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Find the delivery slot and check availability
        const deliverySlot = await deliverySlotModel.findById(deliverySlotId).session(session);
        if (!deliverySlot) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ message: 'Delivery slot not found' });
        }

        if (deliverySlotModel.currentOrders >= deliverySlotModel.maxOrders) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ message: 'Selected delivery slot is fully booked' });
        }

        // Increment currentOrders
        deliverySlotModel.currentOrders += 1;
        await deliverySlotModel.save();

        // Create the order
        const order = new orderModel({
            user: userId,
            orderDetails,
            scheduledTime,
            deliverySlot: deliverySlotId
        });

        const savedOrder = await order.save({ session });

        // Commit transaction
        await session.commitTransaction();
        session.endSession();

        res.status(201).json(savedOrder);
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error(error.message);
        res.status(500).send('Server Error');
    }
    // Inside createOrder function, after successfully creating the order
    const User = await userModel.findById(req.user._id);

    const emailSubject = 'Order Confirmation';
    const emailText = `Hello ${User.name},

    Thank you for your order! Your delivery has been scheduled for ${new Date(scheduledTime).toLocaleString()}.

    Order Details:
    ${orderDetails}

    We appreciate your business!

    Best regards,
    Food Delivery Team
    `;

    try {
        await sendEmail(user.email, emailSubject, emailText);
    } catch (error) {
        // Handle email sending error (optional: you might choose to log this)
        console.error('Failed to send confirmation email:', error);
    }

};

// Get Orders of Logged-in User
const getUserOrders = async (req, res) => {
    const userId = req.user.id;

    try {
        const orders = await orderModel.find({ user: userId })
            .populate('deliverySlot')
            .sort({ scheduledTime: -1 });
        res.json(orders);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// Get All Orders (Admin)
const getAllOrders = async (req, res) => {
    try {
        const orders = await orderModel.find()
            .populate('user', 'name email phone')
            .populate('deliverySlot')
            .sort({ scheduledTime: -1 });
        res.json(orders);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// Update Order Status (Admin)
const updateOrderStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    const validStatuses = ['Pending', 'Confirmed', 'Delivered', 'Cancelled'];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
    }

    try {
        const order = await orderModel.findById(id);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        order.status = status;
        await order.save();

        res.json(order);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};






export { createOrder,getUserOrders, getAllOrders, updateOrderStatus }