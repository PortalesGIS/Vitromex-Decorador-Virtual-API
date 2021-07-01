const {response } = require('express') ;
const Shop = require('../models/shop');


const getAllShops =async (req,res = response) => {
    const shops =await Shop.find({status:true});
    const total = await Shop.countDocuments();
    res.json({
        total,
        shops
    })
}

// este regresa el campo "dateCreated"
const getAllShopsCMS =async (req,res = response) => {
    const ie =await Shop.find();
    const shop = []
    ie.forEach(elm=>{
        shop.push( {
            status:elm.status,
            _id:elm._id,
            name:elm.name,
            state:elm.state,
            city:elm.city,
            suburb:elm.suburb,
            street:elm.street,
            num :elm.num,
            phone: elm.phone,
            country:elm.country,
            lat:elm.lat,
            lng :elm.lng,
            dateCreated:elm.dateCreated,
         } )
     })
     console.log(shop)
    const total = await Shop.countDocuments();
    res.json({total,
       shop
    })
}

module.exports={
    getAllShops,
    getAllShopsCMS
}