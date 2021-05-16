const {response } = require('express') ;
// TODO: lastname
const userPost = (req,res = response) => {

    const {name,email,password,lastName} = req.body;

    res.json({
        ok:true,
        msg:"user Created",
        name,
        lastName,
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
