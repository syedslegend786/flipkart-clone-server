import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    cartItems: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
            qty: { type: Number, required: true },
        }
    ]
}, { timestamps: true })


export default mongoose.model('carts', cartSchema)