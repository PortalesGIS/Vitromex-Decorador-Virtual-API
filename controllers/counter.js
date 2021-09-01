const { response } = require("express");
const { burbuja } = require("../helpers/burbuja");
const Counter = require("../models/counter");

const addPointCounter = async(req,res=response)=>{
    const {id} = req.params;
    const productClik = await Counter.findById(id);
    if(!productClik){
        res.status(400).json({        
            msg:"no existe el id"
        })
    }
    
    const today = new Date().toISOString().slice(0,10)
    const isfind = productClik.dates.find(element=>element.date===today)
    if(!isfind){
        await  productClik.updateOne({total:parseInt(parseInt(productClik.total))+1,dates:[...productClik.dates,
            {
                date:today,
                total:1
            }
        ]})
    }
    else{
        const index = productClik.dates.findIndex(element=>element.date===today)
        let updated = productClik.dates
        updated[index] = {date:today,total:updated[index].total+1}
        await  productClik.updateOne({total:parseInt(parseInt(productClik.total))+1,dates:updated})
    }
    res.json({        
        msg:"Agregado correctamente",
        position:productClik.total+1
    })
}

const getCounterList = async (req,res=response)=>{
    const list  = await Counter.find({platform:"vitromex"}).where("total").gte(1).exec()
    const order = burbuja(list)
    res.json({
        msg:"ok",
        list: order
    })
} 
const getCounterListArko = async (req,res=response)=>{
    const list  = await Counter.find({platform:"arko"}).where("total").gte(1).exec()
    const order = burbuja(list)
    res.json({
        msg:"ok",
        list: order
    })
} 

module.exports ={
    addPointCounter,
    getCounterList,
    getCounterListArko
}
