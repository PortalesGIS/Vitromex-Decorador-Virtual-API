const { response } = require("express");
const { uploadAzureImg } = require("../helpers/azure");
const Aplications = require("../models/aplications");
const Typologies = require("../models/typologies");


const getAllAplications =async (req,res = response) => {
    const aplications =await Aplications.find();
    const total = await Aplications.countDocuments();
    res.json({total,
        aplications
    })
}

const getAllTypologies =async (req,res = response) => {
    const typologies =await Typologies.find();
    const total = await Typologies.countDocuments();
    res.json({
        total,
        typologies
    })
}

const getAllTypologiesCMS =async (req,res = response) => {
    const typo =await Typologies.find();
    const typologies = []
    typo.forEach(elm=>{
        typologies.push( {
            name:elm.name,               
            img:elm.img,
            _id:elm._id,
            dateCreated:elm.dateCreated,
            render:elm.render
         } )
     })
    const total = await Typologies.countDocuments();
    res.json({total,
       typologies
    })
}

const updateAplication = async (req,res = response) =>{
    const {name,id:productId} = req.body;
    const aplications =await Aplications.findById(productId)
    if(!aplications){
        res.status(400).json({
            error:"no existe el producto"
        })
    }
    if(req.files ){
        const {file}= req.files
        uploadAzureImg(file,process.env.AZURE_BLOB_CONTAINER_APLICATIONS,async (url)=>{ 
                await aplications.updateOne({img:url})
        })  
    }
    if(name){
        await aplications.updateOne({name:name})
    }
    res.json({
        msg:"updated",
    })
}

module.exports={
    getAllAplications,
    getAllTypologies,
    getAllTypologiesCMS,
    updateAplication
}