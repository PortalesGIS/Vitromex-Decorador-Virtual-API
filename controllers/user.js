const {response } = require('express') ;
const bcryptjs = require('bcryptjs');
const User =require('../models/user');


const userPost = async  (req,res = response) => {
    saveUser("vitromex",req,res)
    
}
const userPostArko = async  (req,res = response) => {
    saveUser("arko",req,res)
}
const saveUser = async (platform, req,res = response)=>{
    const {name,email,password,lastName,country="none",city="none"} = req.body;
    const user = new User({name,email,password,lastName,country,city,
        dateUserCreated:new Date().toISOString().slice(0,10),
        platform,
    }) 
    //
    // encriptadr password
    // const salt = bcryptjs.genSaltSync();
    // user.password = bcryptjs.hashSync(password,salt)
    // 
    try {
        await user.save();       
        res.json({
            state:user.state,
            favorites:user.favorites,
            _id:user._id,
            name:user.name,
            email:user.email,
            lastName:user.lastName,
            country:user.country,
            city:user.city,
        })
    } catch (error) {
        console.log(error)
    }
}


const userGet = async(req,res=response) => {
    getUsers("vitromex", req,res)
}

const userGetArko = async(req,res=response) => {
    getUsers("arko", req,res)
}

const getUsers = async (platform,req,res=response) =>{
    // TODO: limite de 100000 usuarios esta pendiente la paginacion, fuera de alcanze? 
    const { limit = 100000,start=0 } = req.query;
    const query = {state:true,platform};
    // if(!Number(limit)){
    //     return res.status(400).json({
    //         ok:false,
    //         error:'el -limit y el -start tienen que ser numeros revisa tu peticion'
    //     })
    // }
    // if(!Number(start)){
    //     return res.status(400).json({
    //         ok:false,
    //         error:'el -limit y el -start tienen que ser numeros revisa tu peticion'
    //     })
    // }
    const [users,total]= await Promise.all([
        User.find(query)
        .skip(Number(start))
        .limit(Number(limit)),
        User.countDocuments(query)
    ])

    res.json({
        total,
        users
    })
}


const userDelete = async(req,res = response) => {
    const {id} = req.params;
    const user = await User.findByIdAndUpdate(id,{state:false})
    res.json({
        user
    })
}

const numberOfUsers = async(req,res=response)=>{
    const total = await User.countDocuments({state:true})
    res.json({
        total
    })
}


module.exports ={
    userGet,
    userPost,
    userDelete,
    numberOfUsers,
    userPostArko,
    userGetArko
}
