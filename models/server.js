
const express = require('express');
const cors = require('cors');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usersRoutePath ="/api/user";
        // middlewares
        this.middlewares();
        // rutas de app
        this.routes();
    }

    middlewares(){

        // cors
        this.app.use(cors());
        // directorio publico
        this.app.use(express.static("public"))
    }

    routes(){
        this.app.use(this.usersRoutePath, require("../routes/user"))
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log("servidor corriendo en ",+this.port)
        })
    }
}


module.exports = Server;