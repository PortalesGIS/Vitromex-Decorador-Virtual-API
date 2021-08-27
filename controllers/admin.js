const { response } = require("express");
const Admin = require("../models/admin")
const { genJWT } = require("../helpers/jwt");

const login = async(req,res=response)=>{
    const {email,password} = req.body;
    const admin = await Admin.findOne({email})
        if(!admin || !admin.status){
            return res.status(400).json({
                msg:"Ususario no adminitdo"
            })
        }
        // TODO: peticion a su endpoint
        // aqui pon tu servicio de laffsbfsdbfsf
        // JWT
        const token = await genJWT(admin._id);
        console.log("suponiendo que valido user and pass entoncs",{admin})
    res.json({
        ok:true,
        token,
        msg:"entro",
        name:admin.name
    })
}

const getAllAdmins = async(req,res=response)=>{
    const query ={status:true}
    
 const admins = await Admin.find(query)
 res.json({
    admins
 })
}

const createAdmin = async (req,res=response)=>{
    const {name, email} = req.body
    const adminexist =await Admin.findOne({email})
    if(adminexist){
       return res.status(400).json({
            error:"ya existe usuario "+email            
        })
    }
    const adm = new Admin({name, email, dateCreated:new Date().toISOString().slice(0,10)})
    adm.save()
    adm.sa
    res.json({
        msg:"UserAdmin created!",
        adm
    })
}

 const deleteAdmin = async(req,res=response) =>{
    const {id:adminId} = req.body
    const admin =await  Admin.findById(adminId)
    if(!admin){
        return res.status(400).json({
            error:"no existe el admin"
        })
    }
    else{
        admin.deleteOne()
        res.json({
            msg:"Admin eliminado!"
        })        
    }

}

module.exports={
    login,
    getAllAdmins,
    deleteAdmin,
    createAdmin
}