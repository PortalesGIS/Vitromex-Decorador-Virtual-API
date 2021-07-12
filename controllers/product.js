const azure = require('azure-storage');
const { v4: uuidv4 } = require('uuid');
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

const changeStatusProduct = async(req,res = response) =>{
    const {id,available} = req.body
    const product = await Product.findById(id)
    await product.updateOne({available})
    res.json({
        msg:"status cambio",

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
    uploadAzureImg(file,async (url)=>{
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
    uploadAzureImg(file,async (url)=>{
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

const uploadAzureImg = async (file, callBack)=>{
    const blobservice =await azure.createBlobService(process.env.AZURE_STORAGE_CONNECTION_STRING);
    fileName = uuidv4()+file.name.replace(/ /g, "")
    if(file.tempFilePath){
        blobservice.createBlockBlobFromLocalFile(`imagenes`,fileName,file.tempFilePath,{
            contentType: 'image/jpeg'
         },
    function(error, result, response) {
       if (!error) {
           const url=  blobservice.host.primaryHost + `imagenes`+"/"+ fileName
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
    uploadProductsOptions
}