const { response, request } = require('express')
const jwt = require('jsonwebtoken')

const validateJwt = (req=request,res=response,next) =>{
    const token = req.header("key");
    
    if(!token){
        res.status(401).json({
            msg:"no hay token en la peticion"
        })
    }
    try {
        jwt.verify(token, process.env.SECRETKEY);
        next();
    } catch (error) {
        res.status(401).json({
            msg:"no valido"
        })
    }

}


module.exports ={
    validateJwt
}