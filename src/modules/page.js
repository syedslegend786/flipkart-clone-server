import mongoose from 'mongoose';


const pageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    catagory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'catagories',
        unique: true,
    },
    banners: [
        {
            img: { type: String },
            navigateTo: { type: String },
        }
    ],
    products: [
        {
            img: { type: String },
            navigateTo: { type: String },
        }
    ],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    type: {
        type: String,
    }
}, { timestamps: true })

export default mongoose.model('page', pageSchema)
