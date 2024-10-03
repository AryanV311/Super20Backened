    // import mongoose from "mongoose";

// const orderSchema = mongoose.Schema({
//     userId:{type:String, required:true},
//     items:{type:Array, required:true},
//     amount:{type:Number, required:true},
//     address:{type:Object, required:true},
//     status:{type:String, default:"Food Processing"},
//     date:{type:Date, default:Date.now()},    
//     payment:{type:Boolean, default:false},    
// })

// const orderModel = new mongoose.model('order',orderSchema)
// export default orderModel;

import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    orderDetails: {
        type: String,
        required: true
    },
    scheduledTime: {
        type: Date,
        required: true
    },
    deliverySlot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DeliverySlot',
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Delivered', 'Cancelled'],
        default: 'Pending'
    }
}, { timestamps: true });

const orderModel = new mongoose.model('Order', orderSchema);

export default orderModel;
