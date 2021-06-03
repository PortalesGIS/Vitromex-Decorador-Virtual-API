const {response } = require('express') ;
const Shop = require('../models/shop');


const getAllShops =async (req,res = response) => {
    const shops =await Shop.find({status:true});
    res.json({
        shops
    })
}


module.exports={
    getAllShops
}