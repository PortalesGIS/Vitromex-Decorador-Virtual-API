const { response } = require("express");
const Aplications = require("../models/aplications");
const typologies = require("../models/typologies");
const Typologies = require("../models/typologies");


const getAllAplications =async (req,res = response) => {
    const aplications =await Aplications.find();
    const total = await Aplications.count();
    res.json({total,
        aplications
    })
}

const getAllTypologies =async (req,res = response) => {
    const aplications =await Typologies.find();
    const total = await typologies.count();
    res.json({
        total,
        aplications
    })
}


module.exports={
    getAllAplications,
    getAllTypologies
}