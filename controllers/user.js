const {response } = require('express') ;
const bcryptjs = require('bcryptjs');
const User =require('../models/user');


const userPost = async  (req,res = response) => {

    const {name,email,password,lastName} = req.body;
    const user = new User({name,email,password,lastName}) 
    //
    // encriptadr password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password,salt)
    // 
    try {
        await user.save();        
        res.json({
            ok:true,
            msg:"user Created",
            user
        })
    } catch (error) {
        console.log(error)
    }
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
