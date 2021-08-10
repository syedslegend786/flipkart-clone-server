import mongoose from 'mongoose';


const addressSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    province: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    mobileNumber: {
        type: String,
        required: true,
    },
    streatAddress: {
        type: String,
        trim: true,
        max: 30,
    },
    postCode: {
        type: String,
    },
    emailAddress: {
        type: String,
    },
    oderNotes: {
        type: String,
        trim: true,
        max: 50,
    }
})


const userAddress = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    address: [addressSchema],
}, { timestamps: true })

export default mongoose.model('addresses', userAddress)