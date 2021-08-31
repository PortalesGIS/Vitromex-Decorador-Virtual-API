const { response } = "express";

const Analytic = require("../models/analytic");

const getVisitsToPlatform = async(req, res=response)=>{
    const {platform} = req.params;
    if(platform === 'web' || platform === 'ios' || platform === 'android' ){
        const result = await Analytic.findOne({name:platform,platform:'vitromex'})
        res.json({
            result
        })
    }
    else{
        res.status(404).json({
            error: "plataforma no encontrada"
        })
    }
}
const getVisitsToPlatformArko = async(req, res=response)=>{
    const {platform} = req.params;
    if(platform === 'web' || platform === 'ios' || platform === 'android' ){
        const result = await Analytic.findOne({name:platform,platform:'arko'})
        res.json({
            result
        })
    }
    else{
        res.status(404).json({
            error: "plataforma no encontrada"
        })
    }
}

 const addPointToPlatformNewDeviceVitromex= async (req,res=response)=>{
    const {platform} = req.body
    if(platform !=='android' && platform !== 'ios' && platform !== 'web'){
        res.status(402).json({
            error:'la plataforma no se ecuentra'
        })
    }
    else{
        const platformSelected = await Analytic.findOne({name:platform,platform:"vitromex"})
        await platformSelected.updateOne({
            total:platformSelected.total+1 })
        res.json({
            msg:'agregado'
        })
    }
}
 const addPointToPlatformNewDeviceARko= async (req,res=response)=>{
    const {platform} = req.body
    if(platform !=='android' && platform !== 'ios' && platform !== 'web'){
        res.status(402).json({
            error:'la plataforma no se ecuentra'
        })
    }
    else{
        const platformSelected = await Analytic.findOne({name:platform,platform:'arko'})
        await platformSelected.updateOne({
            total:platformSelected.total+1 })
        res.json({
            msg:'agregado'
        })
    }
}

const addPointToSpaceSelectedVitromex = async (req,res=response) =>{
    const {space} =  req.body
    if(space==='banio' || space==='sala' || space==='comedor' ||space==='cocina' ||space==='fachada'){
        const spacesSelected =await Analytic.findOne({name:'space_more_visited',platform:'vitromex'})
        const spaces = spacesSelected.objectSpaces
        spaces[space].total++ 
       await spacesSelected.updateOne({objectSpaces:spaces})
        res.json({
            msg:'Actualizado!',
            
        })
    }
    else{
        res.status(404).json({
            error:'no se encontro el espacio enviado revisa los espacios validos'
        })
    }
}
const addPointToSpaceSelectedArko = async (req,res=response) =>{
    const {space} =  req.body
    if(space==='banio' || space==='sala' || space==='comedor' ||space==='cocina' ||space==='fachada'){
        const spacesSelected =await Analytic.findOne({name:'space_more_visited',platform:'arko'})
        const spaces = spacesSelected.objectSpaces
        spaces[space].total++ 
       await spacesSelected.updateOne({objectSpaces:spaces})
        res.json({
            msg:'Actualizado!',
            
        })
    }
    else{
        res.status(404).json({
            error:'no se encontro el espacio enviado revisa los espacios validos'
        })
    }
}


module.exports={
    addPointToSpaceSelectedVitromex,
    getVisitsToPlatform,
    getVisitsToPlatformArko,
    addPointToPlatformNewDeviceVitromex,
    addPointToSpaceSelectedArko,
    addPointToPlatformNewDeviceARko

}