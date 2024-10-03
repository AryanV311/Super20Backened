import mongoose from "mongoose";

const deliverySlotSchema = mongoose.Schema({
    slotStart: {
        type: Date,
        required: true
    },
    slotEnd: {
        type: Date,
        required: true
    },
    maxOrders: {
        type: Number,
        required: true,
        default: 10
    },
    currentOrders: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const deliverySlotModel = new mongoose.model('DeliverySlot', deliverySlotSchema);

export default deliverySlotModel;
