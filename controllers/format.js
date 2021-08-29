const { response} = require("express");
const Format = require("../models/format");

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
        res.json({
            ok:"actualizado! "
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