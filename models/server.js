
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const {getDB,ActualizarDB} = require('../Agenda/getDB');
const fileUpload = require('express-fileupload');

   
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
        this.analyticsPath = "/api/analytics"
        this.formatsPath = "/api/formats"
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
        getDB.start();
        ActualizarDB();
    }

    middlewares(){
        // cors
        this.app.use(cors());

        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            // res.header('Access-Control-Allow-Origin', 'http://localhost:8081');
            res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
            res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
            next();
        });
        
        // parseo y lectura de body
        this.app.use(express.json());

        // directorio publico
        this.app.use(express.static("public"))

        // fileUpload 
        this.app.use(fileUpload({
            useTempFiles:true,
            tempFileDir: "/temp/",
            createParentPath:true
        }))
    }

    routes(){
        console.log('\x1b[37m%s\x1b[0m',"routes")
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
        this.app.use(this.analyticsPath,require("../routes/analytic"));
        this.app.use(this.formatsPath,require("../routes/format"));
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('actual version is: V1.0.1')
            console.log("servidor corriendo en ",+this.port)
        })
    }
}


module.exports = Server;