const {response } = require('express') ;
const Product = require('../models/product');



const productGet =async (req,res = response) => {
    const { limit = 5,start = 0 } = req.query;
    const query = {available:true};
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
    const [products,total] = await getProductsDB({available:true,branding:"ARKO"})
    res.json({
        toalProductsInThisQuery:total,
        products
    })
}
const getProductsVitromexCMS = async (req,res=response)=>{
    const [products,total] =await getProductsDB({branding:"VITROMEX"});
    res.json({
        toalProductsInThisQuery:total,
        products
    })
}

const getProductsARKOCMS = async (req,res=response)=>{
    const [products,total] =await getProductsDB({branding:"ARKO"});
    res.json({
        toalProductsInThisQuery:total,
        products
    })
}


const getProductsVitromex= async (req,res=response)=>{
    const [products,total] = await getProductsDB({available:true,branding:"VITROMEX"})    
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


const getProductsDB = async (query) => {
    const [products,total]= await Promise.all([
        Product.find(query),
        Product.countDocuments(query),
    ]);
    return [products,total];

}
module.exports={
    productGet,
    getProductsArko,
    getProductsVitromex,
    getProductById,
    getProductsVitromexCMS,
    getProductsARKOCMS,
}