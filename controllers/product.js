const azure = require('azure-storage');
const { v4: uuidv4 } = require('uuid');
const {response } = require('express') ;
const Product = require('../models/product');
const Serie = require("../models/serie");


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

const changeStatusProduct = async(req,res = response) =>{
    const {id,available} = req.body
    const product = await Product.findById(id)
    await product.updateOne({available})
    verifyAndUploadStatusSerie(product,available)
    res.json({
        msg:"status cambio",
    })
}

const verifyAndUploadStatusSerie = async(product,available)=>{
    const ser = Serie.find({name:product.serie})   
    if(available === true || available === "true"){
       await ser.updateOne({available:true})
       console.log("serie esta en true")
    }
    else{
        const exist =await Product.find({serie:product.serie})
        let numberProducts = exist.length
        exist.forEach((prodct)=>{
            if(prodct.available === false){
                numberProducts--
            }
        })
        if(numberProducts <= 0){
            await ser.updateOne({available:false})
            console.log("series esta en false")
        }
    }
}

const changeStatusIsNew = async(req,res = response) =>{
    const {id,isNew} = req.body
    const product = await Product.findById(id)
    await product.updateOne({isNewProduct:isNew})
    res.json({
        msg:`el estatus del producto ${product.name} cambio a ${isNew}`,
    })
}

const uploadProductsOptions = async(req,res = response)=>{
    const {id:idProduct, camp, value} = req.body
    if(camp!="name"  &&  camp!="textureWidth" && camp!="textureHeight" && camp!="aplications"){
        return res.status(400).json({
            msg:"el campo a cambiar no es valido"
        })
    }
    if(camp === "aplications" && typeof value != "object"){
        return res.status(400).json({
            msg:"tiene que ser un Array"
        })
    }
    const product = await Product.findById(idProduct)
    await product.updateOne({[camp]:value})
    res.json({
        msg:"ok",
        [camp]:value
    })
} 

const uploadProductImg = async(req,res = response)=>{

    if(!req.files || Object.keys(req.files).length ===0 ){
        res.status(400).json({
            msg:"No hay archivosde imagenes que subir"
        })
    }
    const { id:idProduct, camp} = req.body
    const {file} = req.files
    uploadAzureImg(file,process.env.AZURE_BOLB_CONTAINER_NAME,async (url)=>{
        const product = await Product.findById(idProduct)
        await product.updateOne({[camp]:url})
        res.json({
            msg:"ok",
            url
        })
    })
}

const uploadProductImgRender = async (req,res = response)=>{
    if(!req.files || Object.keys(req.files).length ===0 ){
        res.status(400).json({
            msg:"No hay archivosde imagenes que subir"
        })
    }
    const { id:idProduct, positionArray} = req.body
    if(positionArray<-1 || positionArray>3){
        return res.status(400).json({
            msg:"Esa posicion no es valida",
            positionInvalid: positionArray
        })
    }
    const {file} = req.files
    uploadAzureImg(file,process.env.AZURE_BOLB_CONTAINER_NAME_RENDERS,async (url)=>{
        const product = await Product.findById(idProduct)
        let renderToUpload = product.renders
        renderToUpload[positionArray] = url
        await product.updateOne({renders:renderToUpload})
        return res.json({
            msg:"ok",
            url,
            renders:renderToUpload
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

const getProductsDB = async (query) => {
    const [products,total]= await Promise.all([
        Product.find(query),
        Product.countDocuments(query),
    ]);
    return [products,total];
}

const deleteImgProduct = async (req,res = response)=>{
    const {id,positionImg} = req.body;
    if(positionImg=== 1 || positionImg === 2){
        const product = await Product.findById(id)
        let images= product.renders
        images[positionImg]=""
        await product.updateOne({renders:images})
        res.json({
            ok: "imagen de producto eliminada"
        })
    }
    else{
        res.status(502).json({
            error:"la posicion no se puede borrar"
        })
    }
}


module.exports={
    productGet,
    getProductsArko,
    getProductsVitromex,
    getProductById,
    getProductsVitromexCMS,
    getProductsARKOCMS,
    changeStatusProduct,
    uploadProductImg,
    uploadProductImgRender,
    changeStatusIsNew,
    uploadProductsOptions,
    deleteImgProduct
}