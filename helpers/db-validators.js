const Favorite = require('../models/favorite');
const Product = require('../models/product');
const shop = require('../models/shop');
const User = require('../models/user')


const emailExist = async (email = "") =>{
    const exist = await User.findOne({email});
    if(exist){
        throw new Error("Email ya registrado")
    }
}

const exitUserById =async ( id ) => {
    const exist = await User.findById(id);
    if(!exist){
        throw new Error(`El id no existe ${id}`);
    }
}
const exitProductById =async ( id ) => {
    const exist = await Product.findById(id);
    if(!exist){
        throw new Error(`El producto con el id no existe ${id}`);
    }
}
const existShopById =async ( id ) => {
    const exist = await shop.findById(id);
    if(!exist){
        throw new Error(`la tienda con el id no existe ${id}`);
    }
}

const existFavoriteId =async ( id ) => {
    const exist = await Favorite.findById(id);
    if(!exist){
        throw new Error(`El id no existe ${id}`);
    }
}


module.exports = {
    emailExist,
    exitUserById,
    exitProductById,
    existFavoriteId,
    existShopById
}