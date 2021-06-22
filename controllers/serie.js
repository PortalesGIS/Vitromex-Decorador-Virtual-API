const { response } = require("express");
const Serie = require("../models/serie");


const getAllSeries =async (req,res = response) => {
    const serie =await Serie.find();
    const total = await Serie.count();
    res.json({total,
        serie
    })
}


module.exports={
    getAllSeries,
}