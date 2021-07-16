const { response } = require("express");
const { burbuja } = require("../helpers/burbuja");
const Counter = require("../models/counter");

const addPointCounter = async(req,res=response)=>{
    const {id} = req.params;
    const state = await Counter.findById(id);
    if(!state){
        res.status(400).json({        
            msg:"no existe el id"
        })
    }
    await state.updateOne({total:state.total+1});
    res.json({        
        msg:"Agregado correctamente",
        position:state.total+1
    })
}

const getCounterList = async (req,res=response)=>{
    const list  = await Counter.find()
    const order = burbuja(list)
    res.json({
        msg:"ok",
        list: order
    })
} 

module.exports ={
    addPointCounter,
    getCounterList
}
