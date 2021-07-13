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
    if(!req.files || Object.keys(req.files).length ===0 ){
        res.status(400).json({
            msg:"No hay archivosde imagenes que subir"
        })
    }
    const {name,id:productId} = req.body;
    const {file}= req.files
    uploadAzureImg(file,process.env.AZURE_BLOB_CONTAINER_APLICATIONS,async (url)=>{        
        const aplications =await Aplications.findById(productId)
        if(name){
            await aplications.updateOne({img:url,name:name})
        }        
        else{
            await aplications.updateOne({img:url})
        }
        res.json({
            ok:"updated!",
            url,
        })
    })  
}

module.exports={
    getAllAplications,
    getAllTypologies,
    getAllTypologiesCMS,
    updateAplication
}