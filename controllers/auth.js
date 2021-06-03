const { response } = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");

const login = async(req,res=response) =>{

    const {email,password} = req.body;

    try {        
        // verificar si el email existe
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                msg:"Ususario/password no son correctos"
            })
        }
        // usuario activos
        if(!user.state){
            return res.status(400).json({
                msg:"Ususario/password no son correctos state=false"
            })
        }
        // verificar password
        const isValidPassword = bcryptjs.compareSync(password,user.password);
        if(!isValidPassword){
            return res.status(400).json({
                msg:"Ususario/password no son correctos p"
            })
        }

        // generar JWT
        return res.json({
            state:user.state,
            favorites:user.favorites,
            _id:user._id,
            name:user.name,
            email:user.email,
            lastName:user.lastName
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Algo salio mal hable con el administrador"
        })
    }
    
}

module.exports ={
    login
}