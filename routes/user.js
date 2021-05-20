
const {Router} = require('express');
const { check } = require('express-validator');
const { userGet, userPost, userDelete } = require('../controllers/user');
const {validateCampos} = require('../middlewares/validateCampos');

const router = Router();

router.get('/',userGet)

router.post('/',[
    check("email", "El correo no es valido").isEmail(),
    check("name", "El nombre es requerido").not().isEmpty(),
    check("password", "la contraseña es requerida y mayor a 6 caracteres ").isLength({min:6}),
    check("lastName", "El apellido es requerido").not().isEmpty(),
    validateCampos
],userPost)
// 
router.delete('/',userDelete)

module.exports =router;