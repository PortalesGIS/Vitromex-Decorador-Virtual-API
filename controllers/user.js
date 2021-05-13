const {response } = require('express') ;

const userPost = (req,res = response) => {

    const {name,email,password} = req.body;

    res.json({
        ok:true,
        msg:"user Created",
        name,
        email,
        password
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
