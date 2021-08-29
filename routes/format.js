const { Router } = require("express");
const { check } = require("express-validator");
const { getAllFormats, updateOneFormat } = require("../controllers/format");
const { validateCampos } = require("../middlewares/validateCampos");

const router = Router();

router.get('/',getAllFormats)

router.post('/update',[
    check("id","Es necesario el id del formato").not().isEmpty(),
    check("rounded","Es necesario el formato a cambiar").not().isEmpty(),
    validateCampos
],updateOneFormat)

module.exports = router;