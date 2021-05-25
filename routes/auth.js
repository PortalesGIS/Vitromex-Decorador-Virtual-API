const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth");
const { validateCampos } = require("../middlewares/validateCampos");

const router = Router();

router.post("/login",[
    check("email","El email es obligatorio").isEmail(),
    check("password","la contraseña es obligatorio").not().isEmpty(),
    validateCampos
],login)


module.exports = router;