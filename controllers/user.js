const {response } = require('express') ;
const bcryptjs = require('bcryptjs');
const User =require('../models/user');


const userPost = async  (req,res = response) => {
    
    const {name,email,password,lastName,country="s",city="s"} = req.body;
    const user = new User({name,email,password,lastName,country,city}) 
    //
    // encriptadr password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password,salt)
    // 
    try {
        await user.save();       
        res.json({
            user
        })
    } catch (error) {
        console.log(error)
    }
}


const userGet = async(req,res=response) => {
    const { limit = 5,start=1 } = req.query;
    const query = {state:true};
    if(!Number(limit)){
        return res.status(400).json({
            ok:false,
            error:'el -limit y el -start tienen que ser numeros revisa tu peticion'
        })
    }
    if(!Number(start)){
        return res.status(400).json({
            ok:false,
            error:'el -limit y el -start tienen que ser numeros revisa tu peticion'
        })
    }
    const [users,total]= await Promise.all([
        User.find(query)
        .skip(Number(start))
        .limit(Number(limit)),
        User.countDocuments(query)
    ])

    res.json({
        ok:true,
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



module.exports ={
    userGet,
    userPost,
    userDelete
}
