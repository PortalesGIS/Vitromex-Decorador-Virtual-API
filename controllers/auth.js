const { response } = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const nodemailer = require('nodemailer');


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
        html:`<!doctype html>
        <html >
        <head>
            <meta charset="utf-8">
            <style amp4email-boilerplate>
                body {
                    visibility: hidden
                }
            </style>
            <script async src="https://cdn.ampproject.org/v0.js"></script>
            <style amp-custom>
               
                p,
                ul li,
                ol li {
                    font-family: arial, "helvetica neue", helvetica, sans-serif;
                    line-height: 150%;
                }
            </style>
        </head>
        
        <body>
            <div class="es-wrapper-color">
                <!--[if gte mso 9]><v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t"> <v:fill type="tile" color="#f6f6f6"></v:fill> </v:background><![endif]-->
                <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
                    <tr>
                        <td valign="top">
                            <table cellpadding="0" cellspacing="0" class="es-content" align="center">
                                <tr>
                                    <td align="center">
                                        <table class="es-content-body" align="center" cellpadding="0" style="background-color: #333333;"
                                            cellspacing="0" width="600">
                                            <tr>
                                                <td class="es-p20t es-p20r es-p20l" align="left">
                                                    <table width="100%" cellspacing="0" cellpadding="0">
                                                        <tr>
                                                            <td class="es-m-p0r" width="560" valign="top" align="center">
                                                                <table width="100%" cellspacing="0" cellpadding="0"
                                                                    role="presentation">
                                                                    <tr>
                                                                        <td align="center" style="color: blue;">
                                                                            <p style="color: white; font-size:20px">Hola,${user.name} <br><br>Tu contraseña
                                                                                es:<br>
                                                                                <br>
                                                                                ${user.password}
                                                                                <br></p>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
        </body>
        
        </html>`
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