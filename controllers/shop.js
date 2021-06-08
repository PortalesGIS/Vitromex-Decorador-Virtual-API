const {response } = require('express') ;
const Shop = require('../models/shop');


const getAllShops =async (req,res = response) => {
    const shops =await Shop.find({status:true});
    const total = await Shop.count();
    res.json({
        total,
        shops
    })
}


module.exports={
    getAllShops
}