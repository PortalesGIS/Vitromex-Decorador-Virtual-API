const { response } = require("express");
const Serie = require("../models/serie");


// este NO regresa el campo "dateCreated"
const getAllSeries =async (req,res = response) => {
    const serie =await Serie.find();
    const total = await Serie.count();
    res.json({total,
        serie
    })
}

// este regresa el campo "dateCreated"
const getAllSeriesCMS =async (req,res = response) => {
    const ie =await Serie.find();
    const serie = []
    ie.forEach(elm=>{
        serie.push( {
            name:elm.name,               
            img:elm.img,
            _id:elm._id,
            dateCreated:elm.dateCreated,
            render:elm.render
         } )
     })
     console.log(serie)
    const total = await Serie.countDocuments();
    res.json({total,
       serie
    })
}


module.exports={
    getAllSeries,
    getAllSeriesCMS
}