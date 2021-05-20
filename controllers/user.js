const {response } = require('express') ;
const bcryptjs = require('bcryptjs');
const User =require('../models/user');


const userPost = async  (req,res = response) => {

    // errores del middlewares
    // 

    const {name,email,password,lastName} = req.body;
    const user = new User({name,email,password,lastName}) 
    // 
    // verificar si email existe
    const emailExist = await User.findOne({email:email});
    if(emailExist){
        return res.status(400).json({
            msg:"El email ya esta registrado"
        })
    }
    // encriptadr password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password,salt)
    // 
    try {
        await user.save();        
    } catch (error) {
        console.log(error)
    }
    res.json({
        ok:true,
        msg:"user Created",
        user
    })
}


const userGet = (req,res=response) => {
    res.json({
        ok:true,
        msg:"get API-controlador"
    })
}

const userDelete = (req,res = response) => {
    res.json({
        msg:"delete user -controller"
    })
}



module.exports ={
    userGet,
    userPost,
    userDelete
}
