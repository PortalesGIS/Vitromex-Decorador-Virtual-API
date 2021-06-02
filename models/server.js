
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usersRoutePath ="/api/user";
        this.productsPath = "/api/product";
        this.authPath = "/api/auth";
        this.adminUsers = "/api/admin";
        // conectar a DB
        this.conectDB()

        // middlewares
        this.middlewares();
        // rutas de app
        this.routes();
    }

    async conectDB(){
        await dbConnection()
    }

    middlewares(){

        // cors
        this.app.use(cors());

        // parseo y lectura de body
        this.app.use(express.json());
        // directorio publico
        this.app.use(express.static("public"))
    }

    routes(){
        this.app.use(this.usersRoutePath, require("../routes/user"))
        this.app.use(this.productsPath, require("../routes/product"))
        this.app.use(this.authPath, require("../routes/auth"))
        this.app.use(this.adminUsers,require("../routes/admin"))
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log("servidor corriendo en ",+this.port)
        })
    }
}


module.exports = Server;