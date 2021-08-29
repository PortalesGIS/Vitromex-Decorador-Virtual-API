const { response } = "express";

const Analytic = require("../models/analytic");

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
    addPointToSpaceSelected
}