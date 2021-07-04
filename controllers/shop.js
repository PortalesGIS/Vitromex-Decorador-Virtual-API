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
    const shops = []
    ie.forEach(elm=>{
        shops.push( {
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
    const total = await Shop.countDocuments();
    res.json({total,
       shops
    })
}

const changeStatusStore = async(req,res = response) =>{
    const {id,status} = req.body
    const store = await Shop.findById(id)
    await store.updateOne({status})
    res.json({
        msg:"status cambio",
    })
}

module.exports={
    getAllShops,
    getAllShopsCMS,
    changeStatusStore
}