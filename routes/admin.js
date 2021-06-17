
const {Router} = require('express');
const { check } = require('express-validator');
const { login, getAllAdmins } = require('../controllers/admin');
const {validateCampos} = require('../middlewares/validateCampos');

const router = Router();
router.post("/login",[
    check("email", "El correo no es valido").isEmail(),
    check("password", "la contraseña es requerida y mayor a 6 caracteres ").not().isEmpty(),
    validateCampos
],login)

router.get("/",getAllAdmins)

module.exports = router