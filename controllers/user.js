const {response } = require('express') ;

const userGet = (req,res=response) => {
    res.json({
        ok:true,
        msg:"get API-controlador"
    })
}

const userPost = (req,res = response) => {
    res.json({
        msg:"post-controller"
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
