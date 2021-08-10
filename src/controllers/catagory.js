import catagorySchema from './../modules/catagory.js'
import dotenv from 'dotenv'
import shortid from 'shortid'
dotenv.config()

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
            type: cat.type,
            parentId: cat.parentId,
            children: modifyCatagory(catagory, cat._id)
        })
    }
    return _catagory_array;
}
export const createCatagory = (req, res) => {
    const _catagory = {
        name: req.body.name,
        slug: `${req.body.name}${shortid.generate()}`,
    }
    if (req.body.parentId) {
        _catagory.parentId = req.body.parentId
    }
    //add image...
    if (req.file) {
        _catagory.catagoryPicture = process.env.API + "/public/" + req.file.filename
    }
    const catagory = new catagorySchema(_catagory)
    catagory.save((error, catagory) => {
        if (error) {
            return res.status(400).json({
                error: error
            })
        }
        if (catagory) {
            return res.status(200).json({
                catagory
            })
        } else {
            return res.status(400).json({
                error: 'something wrong'
            })
        }
    })
}

export const getCatagory = (req, res) => {
    catagorySchema.find({})
        .exec((error, catagory) => {
            if (error) {
                return res.status(400).json({
                    error: error
                })
            }
            if (catagory) {
                const catagoryList = modifyCatagory(catagory)
                return res.status(200).json({
                    catagoryList
                })
            }
        })
}
export const catagoryBySlug = (req, res) => {
    const { params } = req;
    const { slug } = params
    productSchema.find({ slug: slug })
        .exec((error, products) => {
            if (error) {
                res.status(400).json({
                    error
                })
            }
            if (products) {
                res.status(200).json({
                    products
                })
            }
        })
}
export const updateCatagory = async (req, res) => {
    const { _id, name, parentId, type } = req.body
    const catagories = [];
    if (name instanceof Array) {
        for (let i = 0; i < name.length; i++) {
            const _catagory = {
                name: name[i],
                slug: `${name}${shortid.generate()}`
            }
            if (type[i] == '' || type[i] == undefined) {
                _catagory.type = undefined
            } else {
                _catagory.type = type[i]
            }
            if (parentId[i] !== '') {
                _catagory.parentId = parentId[i]
            }
            const catagory = await catagorySchema.findOneAndUpdate({ _id: _id[i] }, _catagory, { new: true })
            catagories.push(catagory)
        }
        return res.status(200).json({
            catagories
        })
    } else {
        const _catagory = {
            name: name,
            slug: `${name}${shortid.generate()}`,
        }
        if (type == '' || type == undefined) {
            _catagory.type = undefined
        } else {
            _catagory.type = type
        }
        if (parentId !== '') {
            _catagory.parentId = parentId
        }
        const catagory = await catagorySchema.findOneAndUpdate({ _id: _id }, _catagory, { new: true })
        catagories.push(catagory)

        return res.status(200).json({
            catagories
        })
    }
}

export const deleteCatagory = async (req, res) => {
    const { payload } = req.body;
    const deletedItems = []
    if (payload.length > 0) {
        for (let i = 0; i < payload.length; i++) {
            const deleted = await catagorySchema.findOneAndDelete({ _id: payload[i] })
            deletedItems.push(deleted);
        }
        return res.status(200).json({
            deletedItems
        })
    }

}