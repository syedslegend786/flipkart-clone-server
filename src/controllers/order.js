
import orderSchema from './../modules/order.js'
import cartSchema from './../modules/cart.js'
import addressSchema from './../modules/address.js'

// {
// 	"user": "60f9e26670586c1fe8276690",
// "addressId": "6105bc43b13da818e02040cc",
// "products": [
// 	{
// 		"productId": "60c1f38b8c3d1a1c58f0c60f",
// "payablePrice": "19000",
// "quantity": 10
// 	}
// 	],
// "totalPrice": "19000",
// "paymentStatus": "pending",
// paymentType: 'cod',
//     orderStatus: [
//         {
//             type: 'ordered',
//             date: new Date,
//             isCompleted: true
//         },
//         {
//             type: 'packed',
// date: new Date,
//             isCompleted: false
//         },
//         {
//             type: 'shiped',
// date: new Date,
//             isCompleted: false
//         },
//         {
//             type: 'dilivered',
// date: new Date,
//             isCompleted: false
//         },
// }
export const createOrder = (req, res) => {
    cartSchema.deleteOne({ user: req.user._id })
        .exec((error, deleted) => {
            if (error) {
                return res.status(400).json({
                    error
                })
            } else if (deleted) {
                const _order = new orderSchema({
                    ...req.body,
                })
                _order.save((error, saved) => {
                    if (error) {
                        return res.status(400).json({
                            error
                        })
                    } else if (saved) {
                        return res.status(200).json({
                            order: saved,
                        })
                    } else {
                        return res.status(400).json({
                            error: "something else happend"
                        })
                    }
                })
            } else {
                return res.status(400).json({
                    error: "something else happend while deletting"
                })
            }
        })

}


const handleOrder = (order) => {
    let arr = [];
    order.forEach((val) => {
        let obj = {
            _id: val._id,
            addressId: val.addressId,
            paymentStatus: val.paymentStatus,
            products: val.products.map((_val) => (
                {
                    name: _val.productId.name,
                    pic: _val.productId.productPictures[0].img,
                    price: _val.productId.price,
                    qty: _val.quantity,
                }
            )),
        }
        arr.push(obj)
    })
    console.log(arr)
    // return order
    return arr;
}

export const getOrders = (req, res) => {
    orderSchema.find({ user: req.user._id })
        .select("_id paymentStatus addressId products")
        .populate("products.productId", "name productPictures price")
        .exec((error, found) => {
            if (error) {
                return res.status(400).json({
                    error
                })
            }
            else if (found) {
                return res.status(200).json({
                    order: handleOrder(found)
                })
            } else {
                return res.status(400).json({
                    error: 'something else happened'
                })
            }
        })
}


const handleAddress = (f, addressId) => {
    console.log(addressId)
    let toReturn = {};
    f.address.forEach(val => {
        if ((val._id).toString() === (addressId).toString()) {
            toReturn = val
        }
    })
    return toReturn
}


// http://localhost:3001/api/order/detailpage/610c32a024a56b18cc2e48ad/6107f967fba3101ee8f7409e

export const orderDetailPage = (req, res) => {
    const { orderId, addressId } = req.params;
    orderSchema.findOne({ _id: orderId })
        .select('addressId')
        .exec(async (error, founded) => {
            if (error) {
                return res.status(400).json({
                    error
                })
            }
            else if (founded) {
                addressSchema.findOne({ user: req.user._id })
                    .select('address')
                    .exec((error, _f) => {
                        if (error) {
                            return res.status(400).json({
                                error
                            })
                        } else if (_f) {
                            const toReturn = handleAddress(_f, addressId)
                            return res.status(200).json({
                                address: toReturn
                            })
                        } else {
                            return res.status(400).json({
                                error: "not ............"
                            })
                        }
                    })
            }
            else {
                error: 'sorry not founded'
            }
        })
}