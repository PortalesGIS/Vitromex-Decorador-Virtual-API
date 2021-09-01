const { response} = require("express");
const Format = require("../models/format");
const Product = require('../models/product');

const getAllFormats = async(req,res=response)=>{
    const formats = await Format.find()
    res.json({
        formats
    })
}

const updateOneFormat =async(req,res=reponse)=>{
    const {id,rounded} = req.body
    const formatToUpdate =await Format.findById(id)
    if(formatToUpdate){
        await formatToUpdate.updateOne({rounded:rounded})
        const productsUpdated =[]
        const productsToUpdate = await Product.find({sizedDefault:formatToUpdate.format}) 
        productsToUpdate.forEach(async(product) =>{
            productsUpdated.push(product._id)
            await product.updateOne({sized:rounded})
        })
        res.json({
            ok:"actualizado!",
            productsUpdated
        })
    }
    else{
        res.status(404).json({
            error:"Formato no encontrado"
        })
    }
}

module.exports={
    getAllFormats,
    updateOneFormat
}