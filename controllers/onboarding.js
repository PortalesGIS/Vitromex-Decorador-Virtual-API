const { response } = require("express");
const Aplications = require("../models/aplications");
const Typologies = require("../models/typologies");


const getAllAplications =async (req,res = response) => {
    const aplications =await Aplications.find();
    const total = await Aplications.count();
    res.json({total,
        aplications
    })
}

const getAllTypologies =async (req,res = response) => {
    const typologies =await Typologies.find();
    const total = await Typologies.count();
    res.json({
        total,
        typologies
    })
}


module.exports={
    getAllAplications,
    getAllTypologies
}