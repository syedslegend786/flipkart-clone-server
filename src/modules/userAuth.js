import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 30,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 30,
    },
    userName: {
        type: String,
        trim: true,
        unique: true,
        index: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    hash_password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    contactNumber: {
        type: String
    },
    prfilePicture: {
        type: String
    }
}, { timestamps: true })

userSchema.methods = {
    authenticate: async function (password) {
        return await bcrypt.compareSync(password, this.hash_password)
    }
}
userSchema.virtual('fullName')
    .get(function () {
        return `${this.firstName} ${this.lastName}`
    })

export default mongoose.model('users', userSchema)
