const azure = require('azure-storage');
const { v4: uuidv4 } = require('uuid');
const { response } = require("express");
const Serie = require("../models/serie");

// este NO regresa el campo "dateCreated"
const getAllSeries =async (req,res = response) => {
    const serie =await Serie.find({platform:"vitromex"});
    const total = await Serie.countDocuments({platform:"vitromex"});
    res.json({total,
        serie
    })
}
const getAllSeriesArko =async (req,res = response) => {
    const serie =await Serie.find({platform:"arko"});
    const total = await Serie.countDocuments({platform:"arko"});
    res.json({total,
        serie
    })
}

// este regresa el campo "dateCreated"
const getAllSeriesCMS =async (req,res = response) => {
    const ie =await Serie.find();
    const serie = []
    ie.forEach(elm=>{
        serie.push( {
            name:elm.name,               
            img:elm.img,
            _id:elm._id,
            dateCreated:elm.dateCreated,
            render:elm.render
         } )
     })
    const total = await Serie.countDocuments();
    res.json({total,
       serie
    })
}
const getAllSeriesCMSArko =async (req,res = response) => {
    const ie =await Serie.find({platform:"arko"});
    const serie = []
    ie.forEach(elm=>{
        serie.push( {
            name:elm.name,               
            img:elm.img,
            _id:elm._id,
            dateCreated:elm.dateCreated,
            render:elm.render
         } )
     })
    const total = await Serie.countDocuments();
    res.json({total,
       serie
    })
}

const uploadSerieImg = async(req,res = response)=>{

    if(!req.files || Object.keys(req.files).length ===0 ){
        res.status(400).json({
            msg:"No hay archivosde imagenes que subir"
        })
    }
    const {id:productId} = req.body
    const {file} = req.files
    uploadAzureImg(file, process.env.AZURE_BLOB_CONTAINER_SERIES ,async(url)=>{
        const serie =await Serie.findById(productId)
        await serie.updateOne({img:url})
        res.json({
            msg:"ok",
            url
        })
    })   
}

const uploadAzureImg = async (file,blob, callBack)=>{
    const blobservice =await azure.createBlobService(process.env.AZURE_STORAGE_CONNECTION_STRING);
    fileName = uuidv4()+file.name.replace(/ /g, "")
    if(file.tempFilePath){
        blobservice.createBlockBlobFromLocalFile(`${blob}`,fileName,file.tempFilePath,{
            contentType: 'image/jpeg'
         },
    function(error, result, response) {
       if (!error) {
           const url=  blobservice.host.primaryHost + `${blob}`+"/"+ fileName
           callBack(url)
       }
       else
       console.log(error)
     })
    }
}


module.exports={
    getAllSeries,
    getAllSeriesCMS,
    uploadSerieImg,
    getAllSeriesArko,
    getAllSeriesCMSArko
}