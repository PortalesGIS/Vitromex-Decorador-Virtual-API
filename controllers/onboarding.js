const { response } = require("express");
const Aplications = require("../models/aplications");
const Typologies = require("../models/typologies");


const getAllAplications =async (req,res = response) => {
    const aplications =await Aplications.find();
    const total = await Aplications.countDocuments();
    res.json({total,
        aplications
    })
}

const getAllTypologies =async (req,res = response) => {
    const typologies =await Typologies.find();
    const total = await Typologies.countDocuments();
    res.json({
        total,
        typologies
    })
}

const getAllTypologiesCMS =async (req,res = response) => {
    const typo =await Typologies.find();
    const typologies = []
    typo.forEach(elm=>{
        typologies.push( {
            name:elm.name,               
            img:elm.img,
            _id:elm._id,
            dateCreated:elm.dateCreated,
            render:elm.render
         } )
     })
    const total = await Typologies.countDocuments();
    res.json({total,
       typologies
    })
}

module.exports={
    getAllAplications,
    getAllTypologies,
    getAllTypologiesCMS
}