import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    addressId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'addresses',
        required: true,
    },
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
            payablePrice: { type: String, required: true },
            quantity: { type: Number, required: true },
        }
    ],
    totalPrice: { type: String },
    paymentStatus: {
        type: String,
        enum: ['pending', 'dilivered'],
        default: 'pending',
    },
    paymentType: {
        type: String,
        enum: ['cod', 'card'],
        required: true,
    },
    orderStatus: [
        {
            type: {
                type: String,
                enum: ['ordered', 'packed', 'shiped', 'dilivered'],
                default: 'ordered'
            },
            date: {
                type: Date,
            },
            isCompleted: {
                type: Boolean,
                default: false
            }
        }
    ]
}, { timestamps: true })
export default mongoose.model('orders', orderSchema);