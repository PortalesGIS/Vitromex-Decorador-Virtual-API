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
        msg:"aplication updated",
    })
}

const updateTypologies = async (req,res = response) =>{
    const {name,id:productId} = req.body;
    const typologie =await Typologies.findById(productId)
    if(!typologie){
        res.status(400).json({
            error:"no existe el producto"
        })
    }
    if(req.files ){
        const {file}= req.files
        uploadAzureImg(file,process.env.AZURE_BLOB_CONTAINER_TYPOLOGIAS,async (url)=>{ 
            
            await typologie.updateOne({img:url})
        })  
        }
    if(name){
            await typologie.updateOne({name:name})
    }
    res.json({
        msg:"typologie  updated"
    })
}

const createAplications = (req,res = response)=>{
    if(!req.files || Object.keys(req.files).length ===0 ){
        res.status(400).json({
            msg:"No hay archivos de imagenes que subir"
        })
    }
    const {file} =req.files

    const {name} = req.body

    uploadAzureImg(file,process.env.AZURE_BLOB_CONTAINER_APLICATIONS, async(url)=>{
        const aplication = new Aplications({
            name:name,
            img:url,
            dateCreated:new Date().toISOString().slice(0,10)
          })
          await  aplication.save()
    
        res.json({
            msg:"create aplication!"
        })
    })
}

module.exports={
    getAllAplications,
    getAllTypologies,
    getAllTypologiesCMS,
    updateAplication,
    updateTypologies,
    createAplications
}