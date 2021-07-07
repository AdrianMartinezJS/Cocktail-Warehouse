const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;


const ProductSchema = Schema({
    name: String,
    picture: String,
    picture_public_id: String,
    ingredients: String,
    description: String,
    userId: String,
    rating: String
});

module.exports = mongoose.model('Product', ProductSchema);
