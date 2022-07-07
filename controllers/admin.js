const { response } = require("express");
const Admin = require("../models/admin")
const { genJWT } = require("../helpers/jwt");
const fetch = require('node-fetch');
const jwt = require('jsonwebtoken')

const login = async(req,res=response)=>{
    const {email,password} = req.body;
    const admin = await Admin.findOne({email})
        if(!admin || !admin.status){
            return res.status(400).json({
                msg:"Ususario no adminitdo"
            })
        }
        // 
        // TODO: aqui colorcar el End point para consultar su servicio de autentificacion 
        // si la llamada es de tipo POST solo cambiar el link de abajo 
        // si la llamada es de algun otro tipo o necesita mas parametros editar la peticion en la linea 38
        consultingServiceClientAuthAdmin(`${process.env.POST_AUTH_ADMIN}`,email,password, async (response)=>{
            // sutituir por si la variable bandera que verifique si la respuesta es correcta (id, response etc....)
            if(response.ok){
                const token = await genJWT(admin._id);
                res.json({
                    ok:true,
                    token,
                    msg:"entro",
                    name:admin.name
                })
            }
            else{
                res.status(404).json({
                    msg:"Ususario no adminitdo" 
                })
            }
        })
    }
const consultingServiceClientAuthAdmin = async (url,email,password,callback)=>{
        fetch(`${url}?Username=${email}&Password=${password}`,{
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
        .then((res) =>{
            if(res.status === 200){
                callback({ok:true})
            }            
            else{
                callback({ok:false})
            }
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

const checkAndRenewJwt = async (req,res=response) =>{
    const token = req.header("key");
    if(!token){
        res.status(401).json({
            error:"no hay token en la peticion"
        })
    }
    try {
        jwt.verify(token, process.env.SECRETKEY, async (error,decoded)=>{
            if(error ){
                if( error.name === "TokenExpiredError"){
                    const newToken = await genJWT("0000");
                    res.json({
                        newToken,
                        isNewToken:true
                    })
                }
                else{
                    res.json({error:true})
                }
            }
            else{
                res.json({isNewToken:false})
            }
        });
    } catch (error) {
        res.json({error:true})
    }
}

module.exports={
    login,
    getAllAdmins,
    checkAndRenewJwt,
    deleteAdmin,
    createAdmin
}