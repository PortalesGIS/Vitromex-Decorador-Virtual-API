const getTempleEmail=(user) =>{
    return `<!doctype html>
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
}

module.exports={
    getTempleEmail
}