const { response } = require("express");
const Admin = require("../models/admin")

const login = async(req,res=response)=>{
    const {email,password} = req.body;
    const admin = await Admin.findOne({email})
        if(!admin || !admin.status){
            return res.status(400).json({
                msg:"Ususario no adminitdo"
            })
        }
        // TODO: peticion a su endpoint
        console.log("suponiendo que valido user and pass entoncs",{admin})
    res.json({
        ok:true,
        msg:"entro"
    })
}

module.exports={
    login
}