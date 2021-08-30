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

 const addPointToPlatformNewDevice= async (req,res=response)=>{

    const {platform} = req.body
    if(platform !=='android' && platform !== 'ios' && platform !== 'web'){
        res.status(402).json({
            error:'la plataforma no se ecuentra'
        })
    }
    else{
        const platformSelected = await Analytic.findOne({name:platform})
        await platformSelected.updateOne({
            total:platformSelected.total+1 })
        res.json({
            msg:'agregado'
        })
    }
        
}

const addPointToSpaceSelected = async (req,res=response) =>{
    res.json({
        msg:'ok'
    })
}


module.exports={
    addPointToPlatformNewDevice,
    addPointToSpaceSelected,
    getVisitsToPlatform,
    getVisitsToPlatformArko,
}