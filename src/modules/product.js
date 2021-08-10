import mongoose from 'mongoose';


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    productPictures: [
        {
            img: { type: String, required: true }
        }
    ],
    reviews: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }
        }
    ],
    catagory: {
        type: mongoose.Schema.Types.ObjectId, ref: 'catagories',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users'
            },
            review: { type: String },
            rating: { type: String },
        }
    ],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    updatedAt: Date
})

export default mongoose.model('products', productSchema)