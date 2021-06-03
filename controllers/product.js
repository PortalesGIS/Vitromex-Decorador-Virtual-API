const {response } = require('express') ;
const Product = require('../models/product');



const productGet =async (req,res = response) => {
    const { limit = 5,start = 0 } = req.query;
    const query = {available:true};
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
        Product.countDocuments(query),
    ])

    res.json({
        AlltotalProducts:total,
        toalProductsInThisQuery:products.length,
        products
    })
}
const getProductsArko= async (req,res=response)=>{
    const query ={available:true,branding:"ARKO"}
    const [products,total]= await Promise.all([
        Product.find(query),
        Product.countDocuments(query),
    ]);
    res.json({
        toalProductsInThisQuery:total,
        products
    })
}
const getProductsVitromex= async (req,res=response)=>{
    const query ={available:true,branding:"VITROMEX"}
    const [products,total]= await Promise.all([
        Product.find(query),
        Product.countDocuments(query),
    ]);
    res.json({
        toalProductsInThisQuery:total,
        products
    })
}

const getProductById = async(req,res = response) => {
    const {id} = req.params;
    const product = await Product.findById(id)
    res.json({
        product
    })
}

module.exports={
    productGet,
    getProductsArko,
    getProductsVitromex,
    getProductById
}