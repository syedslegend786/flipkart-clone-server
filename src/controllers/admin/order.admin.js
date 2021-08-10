import orderSchema from '../../modules/order.js'


// {
// 	"type": "shiped",
// 	"orderId": "610a570d8cac74211089e7f2"
// }

export const updateOrderStatus = (req, res) => {
    orderSchema.updateOne({ _id: req.body.orderId, "orderStatus.type": req.body.type }, {
        $set: {
            "orderStatus.$": {
                type: req.body.type,
                date: new Date,
                isCompleted: true
            }
        }
    })
        .exec((error, updated) => {
            if (error) {
                return res.status(400).json({
                    error
                })
            }
            else if (updated) {
                return res.status(200).json({
                    order: updated
                })
            }
            else {
                return res.status(400).json({
                    error: 'something else happened ...'
                })
            }
        })
}

export const getOrders = (req, res) => {
    orderSchema.find({})
        .select('_id orderStatus products totalPrice paymentType paymentStatus')
        .populate("products.productId", "name")
        .exec((error, founded) => {
            if (error) {
                return res.status(400).json({
                    error
                })
            }
            else if (founded) {
                return res.status(200).json({
                    order: founded
                })
            }
            else {
                return res.status(400).json({
                    error: 'something else happened'
                })
            }
        })
}