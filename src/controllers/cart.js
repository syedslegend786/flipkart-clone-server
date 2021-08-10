//this Route input 
// {
// 	"cartItems":{
// 		"product": "60c1f38b8c3d1a1c58f0c60f",
// 		"qty": 1
// 	}
// }

import cartSchema from './../modules/cart.js'
import productSchema from './../modules/product.js'

const findingLastqty = (products, request) => {
    let quantity = 1;
    const { cartItems } = products;
    cartItems.forEach(val => {
        if (val.product == request) {
            quantity = val.qty;
            return
        }
    });
    return quantity;
}
export const addToCartController = (req, res) => {

    const _cart = new cartSchema({
        user: req.user._id,
        cartItems: [req.body.cartItems],
    })
    cartSchema.findOne({ user: req.user._id })
        .exec((error, founded) => {
            if (error) {
                return res.status(400).json({
                    error: error
                })
            }
            //if user founded just push new object into it....
            else if (founded) {
                //find the product if already exist///
                cartSchema.findOne({ user: req.user._id, "cartItems.product": req.body.cartItems.product })
                    .exec((error, productExists) => {
                        if (error) {
                            return res.status(400).json({
                                error
                            })
                        }
                        else if (productExists) {
                            const quantity = findingLastqty(productExists, req.body.cartItems.product)
                            cartSchema.findOneAndUpdate({ user: req.user._id, "cartItems.product": req.body.cartItems.product }, {
                                "$set": {
                                    "cartItems.$.qty": parseInt(quantity + 1),
                                }
                            }, { new: true })
                                .exec((error, setted) => {
                                    if (error) {
                                        return res.status(400).json({
                                            error
                                        })
                                    } else if (setted) {
                                        return res.status(200).json({
                                            cartItems: setted
                                        })
                                    }
                                })
                        } else {
                            //if the cart is not already exist then simply push the new item into carItems...
                            cartSchema.findOneAndUpdate({ user: req.user._id }, {
                                $push: {
                                    cartItems: {
                                        ...req.body.cartItems
                                    }
                                }
                            }, { new: true })
                                .exec((error, pushed) => {
                                    if (error) {
                                        return res.status(400).json({
                                            error
                                        })
                                    }
                                    else if (pushed) {
                                        return res.status(200).json({
                                            cartItems: pushed
                                        })
                                    }
                                })
                        }
                    })
            }
            else {
                _cart.save((error, created) => {
                    if (error) {
                        return res.status(400).json({
                            error: error,
                        })
                    }
                    if (created) {
                        return res.status(200).json({
                            cartItems: created
                        })
                    }
                })
            }
        })
}

export const getCartItems = async (req, res) => {
    cartSchema.findOne({ user: req.user._id })
        .populate("cartItems.product", "_id name productPictures price")
        .exec((error, founded) => {
            if (error) {
                return res.status(400).json({
                    error
                })
            }
            else if (founded) {
                console.log(founded)
                let cartItems = {};
                if (founded.cartItems.length > 0) {
                    founded.cartItems.forEach(val => {
                        cartItems[val.product._id] = {
                            name: val.product.name,
                            qty: val.qty,
                            productPictures: val.product.productPictures[0].img,
                            price: val.product.price,
                        }
                    })
                }
                return res.status(200).json({
                    cartItems
                    // founded

                })
            } else {
                return res.status(200).json({
                    carItems: {}
                })
            }
        })
}


export const incrementProductQty = (req, res) => {
    const { slug } = req.params;
    cartSchema.findOne({ user: req.user._id, "cartItems.product": slug })
        .exec((error, productExists) => {
            if (error) {
                return res.status(400).json({
                    error
                })
            }
            else if (productExists) {
                const quantity = findingLastqty(productExists, slug)
                cartSchema.findOneAndUpdate({ user: req.user._id, "cartItems.product": slug }, {
                    "$set": {
                        "cartItems.$.qty": parseInt(quantity + 1),
                    }
                }, { new: true })
                    .exec((error, setted) => {
                        if (error) {
                            return res.status(400).json({
                                error
                            })
                        } else if (setted) {
                            return res.status(200).json({
                                cartItems: setted
                            })
                        }
                    })
            }
        })
}
export const decrementProductQty = (req, res) => {
    const { slug } = req.params;
    cartSchema.findOne({ user: req.user._id, "cartItems.product": slug })
        .exec((error, productExists) => {
            if (error) {
                return res.status(400).json({
                    error
                })
            }
            else if (productExists) {
                const quantity = findingLastqty(productExists, slug)
                cartSchema.findOneAndUpdate({ user: req.user._id, "cartItems.product": slug }, {
                    "$set": {
                        "cartItems.$.qty": parseInt(quantity - 1 == 0 ? 1 : quantity - 1),
                    }
                }, { new: true })
                    .exec((error, setted) => {
                        if (error) {
                            return res.status(400).json({
                                error
                            })
                        } else if (setted) {
                            return res.status(200).json({
                                cartItems: setted
                            })
                        }
                    })
            }
        })
}



// {
// 	"productId": "60c3320e4a9c400a9867cf71"
// }
export const removeProductFromCrt = (req, res) => {
    const { productId } = req.body;
    cartSchema.findOneAndUpdate({ user: req.user._id }, {
        $pull: {
            cartItems: {
                product: productId,
            }
        }
    })
        .exec((error, founded) => {
            if (error) {
                return res.status(400).json({
                    error
                })
            }
            else if (founded) {
                return res.status(200).json({
                    founded
                })
            }
            else {
                return res.status(400).json({
                    error: 'product not exist'
                })
            }
        })
}