import slugify from 'slugify'
import productSchema from './../modules/product.js'
import catagorySchema from './../modules/catagory.js'
export const productController = (req, res) => {
    const {
        name,
        description,
        catagory,
        quantity,
        price,
    } = req.body
    let productPictures = [];
    if (req.files.length > 0) {
        productPictures = req.files.map((file) => ({
            img: file.filename
        }))
    }

    const _product = new productSchema({
        name: name,
        slug: slugify(name),
        description: description,
        catagory,
        quantity,
        price,
        createdBy: req.user._id,
        productPictures,
    })
    _product.save((error, product) => {
        if (error) {
            return res.status(400).json({
                error
            })
        }
        if (product) {
            return res.status(200).json({
                product
            })
        }
    })
}

export const productsBySlug = (req, res) => {
    const { params } = req;
    const { slug } = params
    catagorySchema.findOne({ slug: slug })
        .select('_id')
        .exec((error, catagories) => {
            if (error) {
                res.status(400).json({
                    error
                })
            }
            if (catagories) {
                productSchema.find({ catagory: catagories._id })
                    .exec((error, products) => {
                        if (error) {
                            res.status(400).json({
                                error
                            })
                        }
                        if (products) {
                            res.status(200).json({
                                products,
                                productUnder5k: products.filter(p => p.price <= 5000),
                                productUnder10k: products.filter(p => p.price > 5000 && p.price <= 10000),
                                productsUnder15k: products.filter(p => p.price > 10000 && p.price <= 15000),
                                productsUnder20k: products.filter(p => p.price > 15000 && p.price <= 20000),
                                productsUnder25k: products.filter(p => p.price > 20000 && p.price <= 25000),
                            })
                        }
                    })

            }
        })
}
export const getProductDetailById = (req, res) => {
    const { productId } = req.params
    productSchema.findOne({ _id: productId })
        .exec((error, product) => {
            if (error) {
                return res.status(400).json({
                    error: error
                })
            }
            if (product) {
                return res.status(200).json({
                    product: product,
                })
            }
        })
}

//API DATA ENTETING....
// {
// 	"slug" : "SAMSUNG-Galaxy-F41-(Fusion-Blue-128-GB)-(6-GB-RAM)",
// 	"user":"60f9e26670586c1fe8276690",
// 	"review": "hellow i am adding the msg",
// 	"rating": "5"
// }

export const addReviews = (req, res) => {

    productSchema.findOneAndUpdate({ slug: req.body.slug }, {
        $push: {
            "reviews": {
                user: req.body.user,
                review: req.body.review,
                rating: req.body.rating,
            }
        }
    })
        .exec((error, founded) => {
            if (error) {
                return res.status(400).json({
                    error
                })
            } else if (founded) {
                return res.status(200).json({
                    review: founded
                })
            } else {
                return res.status(400).json({
                    error: 'not founded'
                })
            }
        })
}


