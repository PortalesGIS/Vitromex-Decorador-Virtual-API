const {Router} = require('express');
const { check } = require('express-validator');
const { productGet, getProductsArko, getProductsVitromex, getProductById, getProductsVitromexCMS, getProductsARKOCMS } = require('../controllers/product');
const { exitProductById } = require('../helpers/db-validators');
const {validateCampos} = require('../middlewares/validateCampos');
const { validateJwt } = require('../middlewares/validateJwt');


const router = Router();

router.get("/",productGet)

router.get("/arko",getProductsArko)
router.get("/arko/cms",getProductsARKOCMS)

router.get("/vitromex",getProductsVitromex)
router.get("/vitromex/cms",
[
    validateJwt,
],getProductsVitromexCMS)

router.get("/one/:id",[
    check("id","No es un ID valido").isMongoId(),
    check("id").custom(exitProductById),
    validateCampos
],getProductById)

module.exports =router;