import mongoose from 'mongoose'

const catagorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    type: {
        type: String
    },
    parentId: {
        type: String
    },
    catagoryPicture: {
        type: String
    }
})

export default mongoose.model('catagories', catagorySchema)