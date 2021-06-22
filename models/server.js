
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const {getDB,ActualizarDB} = require('../Agenda/getDB')

   
class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usersRoutePath ="/api/user";
        this.productsPath = "/api/product";
        this.authPath = "/api/auth";
        this.adminUsers = "/api/admin";
        this.favoritePath = "/api/favorite";
        this.shopPath = "/api/shop";
        this.counterPath = "/api/counter";
        this.onboardingPath = "/api/onboarding";
        this.seriesPath = "/api/series";
        // router testing
        this.testPath = "/api/test";

        // 
        // conectar a DB
        this.conectDB()
        
        // middlewares
        this.middlewares();
        // rutas de app
        this.routes();
        
    }

    async conectDB(){
        await dbConnection()
       // actualizar DB servicio de oracle
        // getDB.start();
        ActualizarDB();
    }

    middlewares(){

        // cors
        this.app.use(cors());

        // parseo y lectura de body
        this.app.use(express.json());
        // directorio publico
        this.app.use(express.static("public"))
        // 
        
    }

    routes(){
        console.log("routes")
        this.app.use(this.usersRoutePath, require("../routes/user"));
        this.app.use(this.productsPath, require("../routes/product"));
        this.app.use(this.authPath, require("../routes/auth"));
        this.app.use(this.adminUsers,require("../routes/admin"));
        this.app.use(this.favoritePath,require("../routes/favorite"));
        this.app.use(this.shopPath,require("../routes/shop"));
        this.app.use(this.counterPath,require("../routes/counter"));
        this.app.use(this.onboardingPath,require("../routes/onboarding"));
        this.app.use(this.testPath,require("../routes/test"));
        this.app.use(this.seriesPath,require("../routes/series"));
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log("servidor corriendo en ",+this.port)
        })
    }
}


module.exports = Server;