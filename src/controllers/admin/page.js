import pageSchema from './../../modules/page.js';
export const createPage = (req, res) => {
    const {
        title,
        createdBy,
        description,
        catagory,
        type,
    } = req.body;
    const {
        banners,
        products,
    } = req.files
    if (banners.length > 0) {
        req.body.banners = banners.map((val) => {
            return {
                img: `${process.env.API}/public/${val.filename}`,
                navigateTo: `/bannerClicked?catagory=${catagory}&type=${type}`
            }
        })
    }
    req.body.createdBy = req.user._id;
    if (products.length > 0) {
        req.body.products = products.map((val) => {
            return {
                img: `${process.env.API}/public/${val.filename}`,
                navigateTo: `/productsClicked?catagory=${catagory}&type=${type}`
            }
        })
    }
    pageSchema.findOne({ catagory: req.body.catagory })
        .exec((error, cat) => {
            if (error) {
                return res.status(400).json({
                    error: error
                })
            }
            if (cat) {
                pageSchema.findOneAndUpdate({ catagory: req.body.catagory }, req.body)
                    .exec((error, __page) => {
                        if (error) {
                            return res.status(400).json({
                                error: error
                            })
                        }
                        if (__page) {
                            return res.status(200).json({
                                page: __page,
                            })
                        }
                    })
            } else {
                const _page = new pageSchema(req.body)
                _page.save((error, paged) => {
                    if (error) {
                        return res.status(400).json({
                            error: error
                        })
                    }
                    if (paged) {
                        return res.status(200).json({
                            page: paged
                        })
                    }
                }
                )
            }
        })

}


export const getPageBySlug = async (req, res) => {
    const { cid, type } = req.params;
    if (type === 'page') {
        await pageSchema.findOne({ catagory: cid })
            .exec((error, foundedPage) => {
                if (error) {
                    return res.status(400).json({
                        error: error
                    })
                }
                if (foundedPage) {
                    return res.status(200).json({
                        page: foundedPage
                    })
                }
            })
    } else {
        return res.status(400).json({
            error: 'this is not a page..'
        })
    }
}