const Product = require('../model/product');
const cloudinary = require('cloudinary');
const fs = require('fs-extra')

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


/**
     * Becomes a product (if there is the Product) from MongoDB sending the ID of the Product as parameter in the URL
     * @param {string} req
     * @param {string} res
     */
const getProduct = function (req, res) {
    let productId = req.params.productId;
    Product.findById(productId, (err, product) => {
        if (err) {
            return res.status(500).send(`Error getting the product, Error: ${err}`);
        } else if (!product) {
            return res.status(404).send(`The product doesn't exist.`)
        } else {
            res.status(200).send({ product: product });
        }
    })
}

/**
     * Becomes every product of the List from a User. Must send ID of the User as parameter in the URL
     * @param {string} req
     * @param {string} res
     */
const getProducts = function (req, res) {
    Product.find({ userId: req.params.userId }, (err, products) => {
        if (err) {
            return res.status(500).send(`Error getting the products: ${err}`);
        } else if (!products) {
            return res.status(404).send(`There are no existing products.`)
        } else {
            res.status(200).send({ products: products.sort((a, b) => {return (a.name - b.name)}) })
        }
    })
}

/**
     * Saves a product in MongoDB. The picture sent by the User will be saved in Cloudinary and in MongoDB the Path to the picture
     * @param {string} req
     * @param {string} res
     */
const saveProduct = async (req, res) => {
    const data = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: 'Cocktails',
        overwrite: true,
    });
    let product = new Product();
    product.name = req.body.name;
    product.picture = data.url;
    product.picture_public_id = data.public_id;
    product.ingredients = req.body.ingredients;
    product.description = req.body.description;
    product.userId = req.body.userId;

    await product.save((err, productStored) => {
        if (err) res.status(500).send({ message: `Error saving your Product, Error: ${err}` });

        res.status(200).send({ message: 'Product saved', product: productStored });
    })
    await fs.unlink(req.file.path)
    
}

/**
     * Updates a product in MongoDB by sending the ID of the Product in the UR and the part to update in the body
     * @param {string} req
     * @param {string} res
     */
const updateProduct = function (req, res) {
    let productId = req.params.productId;
    let update = req.body;

    Product.findByIdAndUpdate(productId, update, (err, productUpdated) => {
        if (err) {
            return res.status(500).send({ message: `Error updating the product: ${err}` })
        }
        res.status(200).send({ message: `Product Updated` , product: productUpdated })
    })
}

/**
     * Deletes a product in MongoDB by sending the ID in the URL. The Picture (if there is one) will be also deleted from Cloudinary
     * @param {string} req
     * @param {string} res
     */
const deleteProduct = function (req, res) {
    let productId = req.params.productId;

    Product.findById(productId, async (err, product) => {
        if (err) {
            return res.status(500).send({ message: `Error deleting the product: ${err}` })
        }
        if (product.picture_public_id) {
            await cloudinary.v2.uploader.destroy(product.picture_public_id)
        }
        product.remove(err => {
            if (err) {
                return res.status(500).send({ message: `Error deleting the product: ${err}` })
            }
            res.status(200).send({ message: 'Product deleted' })
        })
    })
}

module.exports = {
    getProduct,
    saveProduct,
    getProducts,
    updateProduct,
    deleteProduct,
}