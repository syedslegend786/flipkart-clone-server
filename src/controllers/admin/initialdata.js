import ProductSchema from './../../modules/product.js'
import CatagorySchema from './../../modules/catagory.js'

//
const modifyCatagory = (catagory, parentId = null) => {
    let _modified_catagory;
    const _catagory_array = []
    if (parentId == null) {
        _modified_catagory = catagory.filter(cat => cat.parentId == undefined)
    } else {
        _modified_catagory = catagory.filter(cat => cat.parentId == parentId)
    }
    for (let cat of _modified_catagory) {
        _catagory_array.push({
            _id: cat._id,
            name: cat.name,
            slug: cat.slug,
            parentId: cat.parentId,
            type: cat.type,
            children: modifyCatagory(catagory, cat._id)
        })
    }
    return _catagory_array;
}
//
export const initialData = async (req, res) => {
    const products = await ProductSchema.find({})
        .select('_id name description quantity productPictures catagory price type')
        .populate({ path: 'catagory', select: '_id name' })
        .exec()
    const catagories = await CatagorySchema.find({})
        .exec()
    const finalCatagory = modifyCatagory(catagories)
    res.status(200).json({
        products,
        catagories: finalCatagory,
    })
}