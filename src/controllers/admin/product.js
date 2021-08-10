import productSchema from '../../modules/product.js'
export const removeProductAdmin = (req, res) => {
    const { productId } = req.body
    productSchema.findOneAndDelete({ _id: productId })
        .exec((error, deleted) => {
            if (error) {
                return res.status(400).json({
                    error
                })
            }
            else if (deleted) {
                return res.status(200).json({
                    deleted
                })
            }
            else {
                return res.status(400).json({
                    error: `something else happened...`
                })
            }
        })
}