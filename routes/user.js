
const {Router} = require('express');
const { check } = require('express-validator');
const { userGet, userPost, userDelete, numberOfUsers,userPostArko, userGetArko, numberOfUsersArko } = require('../controllers/user');
const {validateCampos} = require('../middlewares/validateCampos');
const {emailExist,emailExistArko,exitUserById} = require('../helpers/db-validators')

const router = Router();

router.get('/',userGet)
router.get('/arko',userGetArko)

router.post('/',[
    check("email", "El correo no es valido").isEmail(),
    check("name", "El nombre es requerido").not().isEmpty(),
    check("password", "la contraseña es requerida y mayor a 6 caracteres ").isLength({min:6}),
    check("lastName", "El apellido es requerido").not().isEmpty(),
    check("email").custom(emailExist),
    validateCampos
],userPost)

router.post('/arko',[
    check("email", "El correo no es valido").isEmail(),
    check("name", "El nombre es requerido").not().isEmpty(),
    check("password", "la contraseña es requerida y mayor a 6 caracteres ").isLength({min:6}),
    check("lastName", "El apellido es requerido").not().isEmpty(),
    check("email").custom(emailExistArko),
    validateCampos
],userPostArko)
// 
router.delete('/:id',[
    check("id","No es un ID valido").isMongoId(),
    check("id").custom(exitUserById),
    validateCampos
],userDelete)
// 

router.get("/total/vitromex",numberOfUsers)
router.get("/total/arko",numberOfUsersArko)

module.exports =router;