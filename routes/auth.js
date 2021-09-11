const { Router } = require("express");
const { check } = require("express-validator");
const { login, restorePassword, loginArko } = require("../controllers/auth");
const { validateCamposLogin } = require("../middlewares/validateCampos");

const router = Router();

router.post("/login",[
    check("email","El email es obligatorio").isEmail(),
    check("password","la contraseña es obligatorio").not().isEmpty(),
    validateCamposLogin
],login)

router.post("/login/arko",[
    check("email","El email es obligatorio").isEmail(),
    check("password","la contraseña es obligatorio").not().isEmpty(),
    validateCamposLogin
],loginArko)

router.post("/restorePassword",[
    check("email","El email es obligatorio").isEmail(),    
    validateCamposLogin
],restorePassword)


router.get("/imagenDeUsuario",
    (req,res)=>{
        console.log(req.headers['x-forwarded-for'] || req.connection.remoteAddress)
        res.json(
            {mensaje:""}
        )
    }
)


module.exports = router;