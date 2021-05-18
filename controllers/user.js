const {response } = require('express') ;
const User =require('../models/user');

const userPost = async  (req,res = response) => {

    const {name,email,password,lastName} = req.body;
    const user = new User(req.body) 
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
