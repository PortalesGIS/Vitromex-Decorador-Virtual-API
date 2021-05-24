const {response } = require('express') ;
const Product = require('../models/product');



const productGet =async (req,res = response) => {
    const { limit = 5,start = 0 } = req.query;
    const query = {abailable:true};
    // if(!Number(limit)){
    //     return res.status(400).json({
    //         ok:false,
    //         error:'el -limit y el -start tienen que ser numeros revisa tu peticion'
    //     })
    // }
    // if(!Number(start)){
    //     return res.status(400).json({
    //         ok:false,
    //         error:'el -limit y el -start tienen que ser numeros revisa tu peticion'
    //     })
    // }
    const [products,total]= await Promise.all([
        Product.find(query)
        .skip(Number(start))
        .limit(Number(limit)),
        Product.countDocuments(query)
    ])

    res.json({
        ok:true,
        total,
        products
    })
}



module.exports={
    productGet,
}