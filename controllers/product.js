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

const uploadProduct = async(req,res = response)=>{

    if(!req.files || Object.keys(req.files).length ===0 ){
        res.status(400).json({
            msg:"No hay archivosde imagenes que subir"
        })
    }
    if( !req.files.albedo || !req.files.normal || !req.files.miniatura || !req.files.render1 ){
        res.status(400).json({
            msg: "hace falta una imagen"
        })
    }
    const {id:idProduct} = req.body
    uploadProductClearCamp("renders",[],idProduct)
    const {albedo,normal,miniatura,render1,render2,render3} = req.files
    const files = [
    {...albedo,key:"albedo"},
    {...normal,key:"normal"},
    {...miniatura,key:"smallPicture"},
    {...render1,key:"renders"},
    {...render2,key:"renders"},
    {...render3,key:"renders"},
]
    // const finalpathslocals = saveStorageAndReturnPaths(files)    
    await uploadAzureImg(files,idProduct)
    
    res.json({
        msg:"ok"
    })
}

const uploadProductDB = async(nameData,data,id)=>{
    const product = await Product.findById(id)
    if(nameData === "renders" ){
        await product.updateOne({[nameData]:[...product.renders,data]})
        console.log("render update")
    }
    else{
        await product.updateOne({[nameData]:data})
        console.log(`update: ${nameData}`)
    }
}
const uploadProductClearCamp = async (nameData,clearValue,id) =>{
    const product = await Product.findById(id)
    await product.updateOne({[nameData]:clearValue})
    console.log(`camp clear : ${nameData}`)

}

// const saveStorageAndReturnPaths = (arrayFiles) => {
//     const pathsLocals = arrayFiles.map((file)=>{
//         if(file){
//             const pathLocal = path.join(__dirname,'../imgUploads/',file.name)
//             file.mv(pathLocal, (err)=>{
//                 if(err){
//                     console.log(err)
//                     return res.json(500).json({err})
//                 }
//             })
//             return pathLocal
//         }
//     })
//     return pathsLocals
// }

const uploadAzureImg = async (arrayFiles, productId)=>{
    const blobservice =await azure.createBlobService(process.env.AZURE_STORAGE_CONNECTION_STRING);
    arrayFiles.map((file)=>{
    if(file.tempFilePath){
        blobservice.createBlockBlobFromLocalFile("imagenes",uuidv4()+file.name.replace(/ /g, ""),file.tempFilePath,{
            contentType: 'image/jpeg'
         },
    function(error, result, response) {
       if (!error) {
           const url=  blobservice.host.primaryHost + result.container +"/"+ result.name
            uploadProductDB(file.key,url,productId)
          return blobservice.host.primaryHost + result.container +"/"+ result.name
       }
       else
       console.log(error)
     })
    }
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
    changeStatusProduct,
    uploadProduct
}