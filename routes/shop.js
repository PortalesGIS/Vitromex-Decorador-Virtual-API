const { Router } = require("express");
const { check } = require("express-validator");
const { getAllShops, getAllShopsCMS, changeStatusStore } = require('../controllers/shop');
const { existShopById } = require("../helpers/db-validators");
const { validateCampos } = require("../middlewares/validateCampos");
const { validateJwt } = require("../middlewares/validateJwt");


const router = Router();

router.get("/",getAllShops);

router.get("/cms",getAllShopsCMS);

router.post("/chagestatus",[
    validateJwt,
    check("id","No es un ID valido").isMongoId(),
    check("id").custom(existShopById),
    check("status","No tienes el estado a cambiar").not().isEmpty(),
    validateCampos
],changeStatusStore)

module.exports = router;