const jwt = require('jsonwebtoken');

const genJWT = (uid="")=> {

    return new Promise ((resolve,reject)=>{

        const payload = {uid};

        jwt.sign(payload, process.env.SECRETKEY,{
            expiresIn: "7d"
        },(err,token)=>{
            if(err){
                console.log(err)
                reject("no se pudo egenrar el JWT")
            }
            else{
                resolve(token)
            }
        })

    })

}


module.exports ={
    genJWT,
}