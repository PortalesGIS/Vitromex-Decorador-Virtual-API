const { response } = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const nodemailer = require('nodemailer');
const { getTempleEmail } = require("../helpers/templeEmail");


const login = async(req,res=response) =>{

    loginGlobal("vitromex",req,res);
    
}
const loginArko = async(req,res=response) =>{

    loginGlobal("arko",req,res);
    
}

const loginGlobal = async (platform,req,res=response)=>{
    const {email,password} = req.body;
    try {        
        // verificar si el email existe
        const user = await User.findOne({email,platform})
        if(!user){
            return res.status(400).json({
                msg:"Ususario/password no son correctos"
            })
        }
        // usuario activos
        if(!user.state){
            return res.status(400).json({
                msg:"Ususario/password no son correctos"
            })
        }
        // verificar password
        // const isValidPassword = bcryptjs.compareSync(password,user.password);
        const isValidPassword = password === user.password
        if(!isValidPassword){
            return res.status(400).json({
                msg:"Ususario/password no son correctos"
            })
        }

        // generar JWT
        return res.json({
            state:user.state,
            favorites:user.favorites,
            _id:user._id,
            name:user.name,
            email:user.email,
            lastName:user.lastName
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Algo salio mal hable con el administrador"
        })
    }
}

const restorePassword = async(req,res=response) =>{
    try {
        const {email} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                msg:"Ususario/password no son correctos"
            })
        }
        sendEmailRestorePassword(user)
        res.json({
            msg:"email enviado"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Algo salio mal hable con el administrador"
        })
    }
}

const sendEmailRestorePassword = (user)=>{
    // TODO: aqui implementar el servicio de email para
    // se tiene que cambiar el trasporter a la plataform que utilizen 
    // documentacion: https://nodemailer.com/about/
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'decoradorvirtualvitromex@gmail.com',
          pass: 'd8df1w1g5s13hu'
        }
      });
      const mailOptions = {
        from: 'decoradorvirtualvitromex@gmail.com',
        to: user.email,
        subject: 'recuperar contraseña',
        html:getTempleEmail(user)
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

module.exports ={
    login,
    restorePassword,
    loginArko
}