import addressSchema from './../modules/address.js'

export const createAddress = (req, res) => {
    const _address = new addressSchema({
        user: req.user._id,
        address: [{ ...req.body }]
    })
    addressSchema.findOneAndUpdate({ user: req.user._id }, {
        $push: {
            "address": { ...req.body }
        }
    }, { new: true, upsert: true })
        .exec((error, pushed) => {
            if (error) {
                return res.status(400).json({
                    error
                })
            }
            else if (pushed) {
                return res.status(200).json({
                    address: pushed
                })
            } else {
                return res.status(400).json({
                    msg: "something else happened"
                })
            }
        })
}


export const getUserAddresses = (req, res) => {
    addressSchema.findOne({ user: req.user._id })
        .exec((error, founded) => {
            if (error) {
                return res.status(400).json({
                    error
                })
            } else if (founded) {
                return res.status(200).json({
                    address: founded
                })
            } else {
                return res.status(400).json({
                    error: 'no address found',
                })
            }
        })
}
//API STRUCTURE
// {
//     "addressId":"6101be14880afe1dd804b49a",
//     "payload": {
//     	"name":"syed salleh",
// "province":"punjab",
// "city":"sindh",
// "mobileNumber":"03410411465",
// "emailAddress":"syedslegend786@gmail.com"
//     }
// }
export const userAddressEdit = (req, res) => {
    addressSchema.findOneAndUpdate({ user: req.user._id, "address._id": req.body.addressId }, {
        $set: {
            "address.$": {
                ...req.body.payload
            }
        }
    }, { new: true })
        .exec((error, founded) => {
            if (error) {
                return res.status(400).json({
                    error
                })
            } else if (founded) {
                return res.status(200).json({
                    founded
                })
            } else {
                return res.status(400).json({
                    msg: 'something went wrong.. F'
                })
            }
        })
}



export const deleteAddress = (req, res) => {
    addressSchema.findOneAndUpdate({ user: req.user._id }, {
        $pull: {
            address: req.body.addressId
        }
    }, { new: true })
        .exec((error, removed) => {
            if (error) {
                return res.status(400).json({
                    error
                })
            } else if (removed) {
                return res.status(200).json({
                    removed
                })
            } else {
                return res.status(400).json({
                    msg: 'something else happened'
                })
            }
        })
}