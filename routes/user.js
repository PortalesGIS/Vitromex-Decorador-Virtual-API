
const {Router} = require('express');
const { check } = require('express-validator');
const { userGet, userPost, userDelete, numberOfUsers } = require('../controllers/user');
const {validateCampos} = require('../middlewares/validateCampos');
const {emailExist,exitUserById} = require('../helpers/db-validators')

const router = Router();

router.get('/',userGet)

router.post('/',[
    check("email", "El correo no es valido").isEmail(),
    check("name", "El nombre es requerido").not().isEmpty(),
    check("password", "la contraseña es requerida y mayor a 6 caracteres ").isLength({min:6}),
    check("lastName", "El apellido es requerido").not().isEmpty(),
    check("email").custom(emailExist),
    validateCampos
],userPost)
// 
router.delete('/:id',[
    check("id","No es un ID valido").isMongoId(),
    check("id").custom(exitUserById),
    validateCampos
],userDelete)
// 

router.get("/total",numberOfUsers)

router.get("/test", (req,res) => {    
    
    res.json({
        mensaje:"loquesea"
    })
})
module.exports =router;