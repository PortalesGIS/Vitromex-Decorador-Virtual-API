
const {Router} = require('express');
const { check } = require('express-validator');
const { login, getAllAdmins, createAdmin, deleteAdmin } = require('../controllers/admin');
const {validateCampos} = require('../middlewares/validateCampos');
const { validateJwt } = require("../middlewares/validateJwt");

const router = Router();
router.post("/login",[
    check("email", "El correo no es valido").isEmail(),
    check("password", "la contraseña es requerida y mayor a 6 caracteres ").not().isEmpty(),
    validateCampos
],login)

router.get("/",getAllAdmins)

router.post("/create",[
    validateJwt,
    check("name","Es necesario un nombre").not().isEmpty(),          
    check("email","Es necesario un email").not().isEmpty(),          
    validateCampos
],createAdmin)

router.delete("/delete",[
    validateJwt,
    check("id","Es necesario un id").not().isEmpty(),          
    validateCampos
],deleteAdmin)

module.exports = router