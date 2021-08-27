const { Router } = require("express");
const { check } = require("express-validator");
const { addPointFavorite, removePointFavorite, getFavoritesFilterDate, getAllFavoritesUser, getFavoritesList, getFavoritesListArko } = require("../controllers/favorite");
const { existFavoriteId,exitUserById } = require("../helpers/db-validators");
const { validateCampos } = require("../middlewares/validateCampos");

const router = Router();

router.post('/add/',[
    check("userId","No es un ID valido").isMongoId(),
    check("productId","No es un ID valido").isMongoId(),
    check("userId").custom(exitUserById),
    check("productId").custom(existFavoriteId),
    validateCampos
],addPointFavorite)

router.post('/remove/',[
    check("userId","No es un ID valido").isMongoId(),
    check("productId","No es un ID valido").isMongoId(),
    check("userId").custom(exitUserById),
    check("productId").custom(existFavoriteId),
    validateCampos
],removePointFavorite)

router.get("/list",getFavoritesList)
router.get("/list/arko",getFavoritesListArko)

router.get("/date",[
    check("start","Es necesario una fecha de inicio").not().isEmpty(),   
    check("end","Es necesario una fecha final").not().isEmpty(), 
    validateCampos      
],getFavoritesFilterDate)

router.get('/:id',[
    check("id","No es un ID valido").isMongoId(),
    check("id").custom(exitUserById),
    validateCampos
],getAllFavoritesUser)



module.exports = router;