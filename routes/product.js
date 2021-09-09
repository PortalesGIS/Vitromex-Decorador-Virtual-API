const {Router} = require('express');
const { check } = require('express-validator');
const { productGet, getProductsArko, getProductsVitromex, getProductById,
    getProductsVitromexCMS,
    getProductsARKOCMS,
    changeStatusProduct,
    uploadProductImg, 
    uploadProductImgRender,
    uploadProductsOptions,
    changeStatusIsNew,
    deleteImgProduct} = require('../controllers/product');
const { exitProductById } = require('../helpers/db-validators');
const {validateCampos} = require('../middlewares/validateCampos');
const { validateJwt } = require('../middlewares/validateJwt');


const router = Router();

router.get("/",productGet)

router.get("/arko",getProductsArko)
router.get("/arko/cms",getProductsARKOCMS)

router.get("/vitromex",getProductsVitromex)
router.get("/vitromex/cms",getProductsVitromexCMS)

router.post("/chagestatus",[
    validateJwt,
    check("id","No es un ID valido").isMongoId(),
    check("id").custom(exitProductById),
    check("available","No tienes el estado a cambiar").not().isEmpty(),
    validateCampos
],changeStatusProduct)

router.post("/chagestatusNew",[
    validateJwt,
    check("id","No es un ID valido").isMongoId(),
    check("id").custom(exitProductById),
    check("isNew","No tienes el estado a cambiar").not().isEmpty(),
    validateCampos
],changeStatusIsNew)

// delete img 
router.post("/deleteimg",[
    validateJwt,
    check("id","No tienes el estado a cambiar").not().isEmpty(),
    check("positionImg","No tienes el estado a cambiar").not().isEmpty(),
    check("id").custom(exitProductById),
    validateCampos
    ], deleteImgProduct)
// 

router.post("/upload-img",[
    validateJwt,
    check("id","No es un ID valido").isMongoId(),
    check("id").custom(exitProductById),
    // check("available","No tienes el estado a cambiar").not().isEmpty(),
    validateCampos
],uploadProductImg)

router.post("/upload-img-render",[
    validateJwt,
    check("id","No es un ID valido").isMongoId(),
    check("id").custom(exitProductById),
    check("positionArray","es necesaria la posicion del array 0-1-2").not().isEmpty(),        
    validateCampos
],uploadProductImgRender)

router.post("/upload-options",[
    validateJwt,
    check("id","No es un ID valido").isMongoId(),
    check("id").custom(exitProductById),
    check("camp","es necesario el campo a cambiar").not().isEmpty(),    
    check("value","es necesario el valor del campo a cambiar").not().isEmpty(),    
    validateCampos
],uploadProductsOptions)

router.get("/one/:id",[
    check("id","No es un ID valido").isMongoId(),
    check("id").custom(exitProductById),
    validateCampos
],getProductById)

module.exports =router;